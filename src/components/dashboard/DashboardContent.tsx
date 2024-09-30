// // components/DashboardContent.tsx
// import React from "react";
// import Image from "next/image";
// import PlaceholderImage from "public/placeholder-image.jpg"; // Placeholder image for lab report thumbnails
// import { HomeIcon, ChatIcon, UploadIcon, NotesIcon } from "@/components/icons/Icons"; // Import your custom icons
// import PeaceIcon from "@/components/icons/Icons"; // Import PeaceIcon separately

// const DashboardContent = () => {
//   return (
//     <div className="p-6">
//       {/* Top section with welcome message */}
//       <div className="flex items-center justify-between mb-10">
//         <div>
//           <h1 className="text-5xl font-semibold text-gray-800">Welcome Back, Anais!</h1>
//           <p className="text-xl text-gray-500 mt-2">Here’s what’s happening with your reports today.</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
//             Upload a New Report
//           </button>
//         </div>
//       </div>

//       {/* Activity Center */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Activity Center</h3>
//           <div className="space-y-4">
//             <ActivityItem icon={<UploadIcon className="w-6 h-6" />} label="Uploads" value={50} />
//             <ActivityItem icon={<NotesIcon className="w-6 h-6" />} label="Notes" value={25} />
//             <ActivityItem icon={<ChatIcon className="w-6 h-6" />} label="Chats" value={45} />
//             <ActivityItem icon={<PeaceIcon className="w-6 h-6" />} label="Peace" value={"High"} />
//           </div>
//         </div>

//         {/* Placeholder images for lab reports */}
//         <ImageCard src={PlaceholderImage.src} alt="Latest Lab Report 1" />
//         <ImageCard src={PlaceholderImage.src} alt="Latest Lab Report 2" />
//         <ImageCard src={PlaceholderImage.src} alt="Latest Lab Report 3" />
//       </div>

//       {/* Latest Lab Report Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-10">
//         <h2 className="text-4xl font-semibold text-gray-800 mb-6">Latest Lab Report</h2>
//         <p className="text-xl text-gray-500 mb-4">Rubella / Measles</p>
//         <p className="text-gray-600 mb-6">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas magna id magnis habitasse justo, magna quam.
//           Sollicitudin quisque varius ex sit leo. Adipiscing auctor cras integer magna at sagittis pharetra torquent risus.
//         </p>

//         {/* Lab Report Summaries */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <LabReportItem
//             title="Rubella"
//             result="10.70 Units"
//             interval="Immune >0.99"
//             suggestion="Results Suggest: Immune"
//           />
//           <LabReportItem
//             title="Measles"
//             result=">300 Au/ML"
//             interval="Immune >16.4"
//             suggestion="Results Suggest: Immune"
//           />
//           <LabReportItem
//             title="Mumps"
//             result=">300 Au/ML"
//             interval="Immune >10.9"
//             suggestion="Results Suggest: Immune"
//           />
//           <LabReportItem
//             title="Rubella"
//             result="10.70 Units"
//             interval="Immune >0.99"
//             suggestion="Results Suggest: Immune"
//           />
//         </div>
//       </div>

//       {/* Progress Bar */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">Progress</h3>
//         <ProgressBar value={70} />
//       </div>
//     </div>
//   );
// };

// // Component for each activity item in the Activity Center
// const ActivityItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: number | string }) => {
//   return (
//     <div className="flex items-center space-x-4">
//       <div className="p-4 bg-blue-600 text-white rounded-full">{icon}</div>
//       <div>
//         <h4 className="text-lg font-medium text-gray-700">{value}</h4>
//         <p className="text-gray-500">{label}</p>
//       </div>
//     </div>
//   );
// };

// // Component for each lab report item
// const LabReportItem = ({ title, result, interval, suggestion }: { title: string, result: string, interval: string, suggestion: string }) => {
//   return (
//     <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//       <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
//       <p className="text-lg text-gray-600">{result}</p>
//       <p className="text-sm text-gray-500">{interval}</p>
//       <p className="text-sm text-blue-600 font-semibold">{suggestion}</p>
//     </div>
//   );
// };

// // Progress Bar component
// const ProgressBar = ({ value }: { value: number }) => {
//   return (
//     <div className="w-full bg-gray-200 rounded-full h-4">
//       <div
//         className="bg-blue-600 h-4 rounded-full"
//         style={{ width: `${value}%` }}
//       ></div>
//     </div>
//   );
// };

// // Component for images in the dashboard
// const ImageCard = ({ src, alt }: { src: string, alt: string }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <Image src={src} alt={alt} width={200} height={200} className="w-full h-full rounded-lg shadow-md object-cover" />
//     </div>
//   );
// };

// export default DashboardContent;
