"use client";

import { useSearchParams } from "next/navigation"; // Use for extracting query params
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/DashboardNavbar";
import { useState } from "react";

// Chatbot Component
const Chatbot = ({ summary }: { summary: string }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question) {
      alert('Please enter a question.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/dashboard/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ summary, question }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error fetching response:', error);
      alert('There was an error fetching the chatbot response.');
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Ask Questions About the Summary</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the summary..."
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {isLoading ? 'Asking...' : 'Ask'}
        </button>
      </form>
      {response && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="font-semibold">Chatbot Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

const ReportResultsPage = () => {
  const searchParams = useSearchParams();
  const summary = searchParams.get("summary"); // Extract the summary from the URL

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-10">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">PDF Summary</h2>

            {summary ? (
              <p className="whitespace-pre-line leading-relaxed text-gray-800">
                {summary}
              </p>
            ) : (
              <p>No summary available</p>
            )}

            {/* Chatbot Integration */}
            {summary && <Chatbot summary={summary} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportResultsPage;
