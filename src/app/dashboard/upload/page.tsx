"use client";

import { useState } from "react";
import { FaFileUpload } from "react-icons/fa"; // Import the upload icon
import Link from "next/link"; // Import Link for navigation
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/DashboardNavbar";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString());  // Initialize with current date in ISO format
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    if (!file || !title || !date) {
      alert("Please fill out all fields and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to the form data
    formData.append("title", title);
    formData.append("date", date); // Pass the date in ISO format

    setIsLoading(true); // Set loading state

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("File upload or analysis failed:", errorData);
        alert(`Error: ${errorData || "File upload or analysis failed"}`);
      } else {
        const result = await response.json();
        console.log("Upload and analysis success:", result);
        setSummary(result.summary); // Store the summary for display
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("Something went wrong during file upload.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const encodedSummary = summary ? encodeURIComponent(summary) : "";

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64"> {/* Ensure content doesn’t overlap the sidebar */}
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="flex flex-row items-start justify-center m-6 gap-6">
          {/* Form Container */}
          <div className="bg-white shadow-md p-10 rounded-2xl w-96">
            {!file ? (
              <label className="cursor-pointer flex flex-col items-center justify-center h-64 w-full bg-blue-50 rounded-lg border-dashed border-2 border-blue-300 hover:bg-blue-100 transition">
                <FaFileUpload className="text-blue-600 text-4xl mb-4" />
                <span className="text-lg text-blue-600 font-semibold">
                  Upload PDF/DOCX
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-center text-blue-600 font-semibold mb-2">
                  {file.name}
                </p>
                <button
                  className="text-sm text-red-600 underline"
                  onClick={handleFileRemove}
                >
                  Remove File
                </button>
              </div>
            )}
          </div>

          {/* Form to submit the report */}
          <form
            className="bg-white shadow-md p-10 rounded-2xl w-96"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center text-2xl font-semibold text-blue-600 mb-6">
              Fill Report Details
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Report Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date
              </label>
              <input
                type="date"
                value={date.split('T')[0]}  // Format date to show in "YYYY-MM-DD" format
                onChange={(e) => setDate(new Date(e.target.value).toISOString())}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              type="submit" // Use type="submit" for form submission
              disabled={!file || isLoading} // Disable if no file is uploaded or while loading
            >
              {isLoading ? "Analyzing..." : "Submit Report"}
            </button>
          </form>

          {/* Display Summary */}
          {summary && (
            <div className="bg-white shadow-md p-5 rounded-lg w-96">
              <h3 className="font-semibold">PDF Summary:</h3>
              <p>{summary}</p>
              <Link
                href={`/dashboard/upload/report-results?summary=${encodedSummary}`}
                className="text-blue-600 underline"
              >
                Click here to view the summary
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;


