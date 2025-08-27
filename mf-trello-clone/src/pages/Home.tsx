import React from "react";

const Home: React.FC = () => {
  return (
    <div className="w-full h-[calc(100vh-200px)] bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-6 text-center">
        Welcome to Trello Clone
      </h1>
      <p className="text-xl mb-8 text-center max-w-xl">
        Organize your tasks and projects efficiently. Click below to start your journey.
      </p>
      <button
        className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        <a href="/trello">Go to Trello</a>
       
      </button>
    </div>
  );
};

export default Home;
