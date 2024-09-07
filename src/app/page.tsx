import Navbar from "../components/navbar"; // Adjust the import path if necessary
import Link from "next/link"; // For internal navigation
import { currentUser } from "@clerk/nextjs/server"; // Clerk for handling authentication
import Image from "next/image"; // For the placeholder image

export default async function HomePage() {
  const user = await currentUser(); // Fetch the current user, returns null if not authenticated

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center relative">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex justify-between items-center w-[90%] h-[80%] max-w-[1200px] mt-16">
        
        {/* Left Section */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-[150px] font-['Akaya Kanadaka'] text-[#233236]">
            Vivo
          </h1>
          
          <p className="text-[24px] font-semibold text-[#36454f] max-w-[450px]">
            Your health data, revolutionized with Vivo: Transforming your wellness journey with personalized insights, tracking, and guidance for a healthier, happier you.
          </p>

          {/* Conditional Button Based on User State */}
          {user ? (
            <Link href="/dashboard">
              <button className="px-6 py-3 bg-transparent text-black text-[18px] font-semibold rounded-full border-2 border-black hover:bg-gray-100 transition">
                Get Started Now
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="px-6 py-3 bg-transparent text-black text-[18px] font-semibold rounded-full border-2 border-black hover:bg-gray-100 transition">
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* Right Section: Placeholder for Image */}
        <div className="w-[500px] h-[500px] relative">
          <Image
            src="/icons/doctorpic.svg" // Update this path to your image
            alt="Person interacting with health data"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

