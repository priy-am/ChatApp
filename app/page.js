import Image from "next/image";
// import Logo from "./logo.svg";

export default function Home() {
  return (
    <main>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col">
        
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 text-center md:text-left flex-grow bg-[#dedeed]"> {/* Light Gray Background */}
          <div className="container mx-auto">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-6"> {/* Darker Text */}
                  PieChat: Connect, Share, and Chat
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8"> {/* Slightly Darker Text */}
                  Experience seamless communication with PieChat. Instant messaging,
                  group chats, and more, all in one place. Join the conversation today!
                </p>
                <div className="flex justify-center md:justify-start">
                  <button className="bg-indigo-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-600 transition duration-300 mr-4"> {/* Primary Button */}
                    Get Started
                  </button>
                  <button className="bg-transparent border border-indigo-500 text-indigo-500 py-3 px-6 rounded-lg font-medium hover:bg-indigo-50 hover:text-indigo-600 transition duration-300"> {/* Secondary Button */}
                    Learn More
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0">
                <Image
                  src="/logo.svg"
                  alt="PieChat Illustration"
                  width={500}
                  height={400}
                  className="mx-auto md:ml-0 rounded-lg shadow-md" 
                />
              </div>
            </div>
          </div>
        </section>

      {/* Features Section (Optional - Add more sections as needed) */}
      <section className="bg-gray-100 py-12 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Instant Messaging</h3>
              <p className="text-gray-600">Send and receive messages in real-time.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Video Calls</h3>
              <p className="text-gray-600">Connect with friends and family through high-quality video calls.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-800 mb-2">File Sharing</h3>
              <p className="text-gray-600">Easily share files and documents with others.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Group Chats</h3>
              <p className="text-gray-600">Create and manage group chats for collaborative discussions.</p>
            </div>
          </div>
        </div>
      </section>


         {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center text-white">
        <p>&copy; {new Date().getFullYear()} PieChat. All rights reserved.</p>
      </footer>
    </div>


    </main>
  );
}

export const metadata = {
  title: 'Home - PieChat',
  description: '...',
}
