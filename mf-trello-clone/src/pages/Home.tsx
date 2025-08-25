import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGoTrello = () => {
    navigate("/trello");
  };

  return (
    <div className="w-full h-[calc(100vh-200px)] bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-6 text-center">
        Welcome to Trello Clone
      </h1>
      <p className="text-xl mb-8 text-center max-w-xl">
        Organize your tasks and projects efficiently. Click below to start your journey.
      </p>
      <button
        onClick={handleGoTrello}
        className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Go to Trello
      </button>
    </div>
  );
};

export default Home;
