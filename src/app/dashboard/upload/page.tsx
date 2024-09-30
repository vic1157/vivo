// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Correct import for App Router
// import { FaFileUpload } from "react-icons/fa";
// import Sidebar from "@/components/dashboard/Sidebar";
// import Navbar from "@/components/dashboard/DashboardNavbar";
// import Image from "next/image";

// const UploadPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // For analyzing/loading state
//   const router = useRouter();

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleFileRemove = () => {
//     setFile(null);
//   };

//   const handleSubmit = async () => {
//     if (!file || !title || !date) {
//       alert("Please fill out all fields and upload a file.");
//       return;
//     }

//     // Set loading to true and simulate the analyzing phase
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title);
//     formData.append("date", date);

//     try {
//       const response = await fetch("/api/dashboard/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.text(); // Change to .text() instead of .json()
//         console.error("File upload or analysis failed:", errorData);
//         alert(`Error: ${errorData || "File upload or analysis failed"}`);
//       } else {
//         const result = await response.json();
//         console.log("Upload and analysis success:", result);

//         // Navigate to the result page after successful upload and analysis
//         router.push("/dashboard/upload/report-results");
//       }
//     } catch (error) {
//       console.error("Error during file upload:", error);
//       alert("Something went wrong during file upload.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Navbar />
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
//         <div className="w-1/2 flex flex-col justify-center items-center p-10">
//           {/* Upload Section */}
//           <div className="bg-white shadow-md p-10 rounded-2xl w-96">
//             {!file ? (
//               <label className="cursor-pointer flex flex-col items-center justify-center h-64 w-full bg-blue-50 rounded-lg border-dashed border-2 border-blue-300 hover:bg-blue-100 transition">
//                 <FaFileUpload className="text-blue-600 text-4xl mb-4" />
//                 <span className="text-lg text-blue-600 font-semibold">
//                   Upload PDF/DOCX
//                 </span>
//                 <input
//                   type="file"
//                   className="hidden"
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleFileChange}
//                 />
//               </label>
//             ) : (
//               <div className="flex flex-col items-center">
//                 <Image
//                   src="/file-icon.png"
//                   width={100}
//                   height={100}
//                   alt="Uploaded File"
//                   className="mb-4"
//                 />
//                 <p className="text-center text-blue-600 font-semibold mb-2">
//                   {file.name}
//                 </p>
//                 <button
//                   className="text-sm text-red-600 underline"
//                   onClick={handleFileRemove}
//                 >
//                   Remove File
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className="w-1/2 flex flex-col justify-center items-center p-10">
//           <div className="bg-white shadow-md p-10 rounded-2xl w-96">
//             <h2 className="text-center text-2xl font-semibold text-blue-600 mb-6">
//               Fill Report Details
//             </h2>

//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter Report Title"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
//               />
//             </div>

//             <button
//               className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//               onClick={handleSubmit}
//               disabled={!file || isLoading} // Disable if no file is uploaded or while loading
//             >
//               {isLoading ? "Analyzing..." : "Submit Report"}
//             </button>
//           </div>
//         </div>

//         {/* Analyzing Loading */}
//         {isLoading && (
//           <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
//               <p className="mt-4 text-white text-lg">Analyzing...</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadPage;

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation"; // Use this for navigation
// import { FaFileUpload } from "react-icons/fa"; // Import the upload icon
// import { EdgeStoreProvider } from "@/lib/edgestore";

// const UploadPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleFileRemove = () => {
//     setFile(null);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault(); // Prevent default form submission

//     if (!file || !title || !date) {
//       alert("Please fill out all fields and upload a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file); // Append the file to the form data
//     formData.append("title", title);
//     formData.append("date", date);

//     setIsLoading(true); // Set loading state

//     try {
//       const response = await fetch("/api/dashboard/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.text();
//         console.error("File upload or analysis failed:", errorData);
//         alert(`Error: ${errorData || "File upload or analysis failed"}`);
//       } else {
//         const result = await response.json();
//         console.log("Upload and analysis success:", result);

//         // Navigate to the result page after successful upload and analysis
//         router.push("/dashboard/upload/report-results");
//       }
//     } catch (error) {
//       console.error("Error during file upload:", error);
//       alert("Something went wrong during file upload.");
//     } finally {
//       setIsLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="flex flex-col items-center m-6 gap-6">
//       <div className="bg-white shadow-md p-10 rounded-2xl w-96">
//         {!file ? (
//           <label className="cursor-pointer flex flex-col items-center justify-center h-64 w-full bg-blue-50 rounded-lg border-dashed border-2 border-blue-300 hover:bg-blue-100 transition">
//             <FaFileUpload className="text-blue-600 text-4xl mb-4" />
//             <span className="text-lg text-blue-600 font-semibold">
//               Upload PDF/DOCX
//             </span>
//             <input
//               type="file"
//               className="hidden"
//               accept=".pdf,.doc,.docx"
//               onChange={handleFileChange}
//             />
//           </label>
//         ) : (
//           <div className="flex flex-col items-center">
//             <p className="text-center text-blue-600 font-semibold mb-2">
//               {file.name}
//             </p>
//             <button
//               className="text-sm text-red-600 underline"
//               onClick={handleFileRemove}
//             >
//               Remove File
//             </button>
//           </div>
//         )}
//       </div>

//       <form className="bg-white shadow-md p-10 rounded-2xl w-96" onSubmit={handleSubmit}>
//         <h2 className="text-center text-2xl font-semibold text-blue-600 mb-6">
//           Fill Report Details
//         </h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Title
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter Report Title"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Date
//           </label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
//           />
//         </div>

//         <button
//           className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//           type="submit" // Use type="submit" for form submission
//           disabled={!file || isLoading} // Disable if no file is uploaded or while loading
//         >
//           {isLoading ? "Analyzing..." : "Submit Report"}
//         </button>
//       </form>
//     </div>
//   );
// };

// // Wrap the component in EdgeStoreProvider
// export default function PageWithProvider() {
//   return (
//     <EdgeStoreProvider>
//       <UploadPage />
//     </EdgeStoreProvider>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use this for navigation
import { FaFileUpload } from "react-icons/fa"; // Import the upload icon

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const router = useRouter();

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
    formData.append("date", date);

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

  return (
    <div className="flex flex-col items-center m-6 gap-6">
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

      <form className="bg-white shadow-md p-10 rounded-2xl w-96" onSubmit={handleSubmit}>
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
        <div className="bg-white shadow-md p-5 rounded-lg w-96 mt-6">
          <h3 className="font-semibold">PDF Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

// No EdgeStoreProvider wrapping since we're using a Flask backend
export default function PageWithProvider() {
  return (
    <UploadPage />
  );
}

