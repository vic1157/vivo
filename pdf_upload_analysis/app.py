from flask import Flask, request, jsonify
import pdfplumber
import openai
import os
from dotenv import load_dotenv
from flask_cors import CORS  # Import CORS for handling cross-origin requests

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Configure OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Helper function to summarize text using OpenAI
def summarize_text(pdf_text):
    # Use the new OpenAI API method
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an assistant that summarizes documents."},
            {"role": "user", "content": f"Summarize the following PDF content:\n{pdf_text}"}
        ]
    )
    return response.choices[0].message['content']

# API endpoint to handle file uploads and analysis
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Process the PDF file
    try:
        pdf_text = ""
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                pdf_text += page.extract_text() + "\n"

        # Get the summary from OpenAI
        summary = summarize_text(pdf_text)

        return jsonify({'summary': summary}), 200
    except Exception as e:
        print(f"Error during file upload: {str(e)}")  # Log the error for debugging
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

