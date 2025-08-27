import React from "react";
import { BellOutlined, UserOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";

const MyCard: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 h-16 shadow-md">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold"><a href="/">TrelloClone</a></div>
      </div>

      <div className="flex items-center rounded px-2 py-1 w-2/3">
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 w-full p-3 border  rounded-md mx-5"
        />
        <SearchOutlined />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2  rounded transition">
          <BellOutlined />
        </button>

        <button className="flex items-center gap-1 px-3 py-1 rounded transition">
          <UserOutlined /> <a href="/auth">Profile</a> 
        </button>
      </div>
    </header>
  );
};

export default MyCard;
