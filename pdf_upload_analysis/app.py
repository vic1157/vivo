import pdfplumber
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Extract text from PDF
def extract_pdf_text(file_path):
    with pdfplumber.open(file_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

# Summarize lab report using OpenAI
def summarize_lab_report(report_text):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a medical assistant that summarizes lab reports."},
            {"role": "user", "content": f"Here is the lab report data: {report_text}. Can you summarize the important findings and provide recommendations?"}
        ]
    )
    return response['choices'][0]['message']['content']

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Save file temporarily
        file_path = f"/tmp/{file.filename}"
        file.save(file_path)

        # Extract text from the PDF
        extracted_text = extract_pdf_text(file_path)
        
        if not extracted_text.strip():
            return jsonify({"error": "The PDF could not be read or is empty."}), 400

        # Summarize the extracted text using OpenAI API
        summary = summarize_lab_report(extracted_text)

        return jsonify({'summary': summary}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
