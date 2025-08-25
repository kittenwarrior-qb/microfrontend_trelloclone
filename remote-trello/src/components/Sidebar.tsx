import React, { useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BoardType } from "../types/trello";
import { useDispatch } from "react-redux";
import { deleteBoard, getBoards } from "container/store";

interface SidebarProps {
  boards: BoardType[];
  selectedBoardId: string | null;
  setSelectedBoardId: (id: string | null) => void;
  openModal: (board?: BoardType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  boards,
  selectedBoardId,
  setSelectedBoardId,
  openModal,
}) => {
  const dispatch = useDispatch();
  const [hoveredBoardId, setHoveredBoardId] = useState<string | null>(null);

  const handleDeleteBoard = (boardId: string) => {
    dispatch(deleteBoard(boardId));
    dispatch(getBoards());
    if (selectedBoardId === boardId) setSelectedBoardId(null);
  };

  return (
    <div style={{ background: "white", padding: 20, height: "100%" }}>
      <div className="flex justify-between items-center mb-5">
        <p className="text-lg font-bold">Boards</p>
        <Button size="small" onClick={() => openModal()}>
          Add
        </Button>
      </div>

      <ul>
        {boards.map((board) => {
          const menu = (
            <Menu
              items={[
                { key: "edit", icon: <EditOutlined />, label: "Edit", onClick: () => openModal(board) },
                { key: "delete", icon: <DeleteOutlined />, label: "Delete", onClick: () => handleDeleteBoard(board.id) },
              ]}
            />
          );

          return (
            <li
              key={board.id}
              className={`flex justify-between items-center h-[50px] rounded ${selectedBoardId === board.id ? "bg-blue-200" : "hover:bg-gray-200"}`}
              onMouseEnter={() => setHoveredBoardId(board.id)}
              onMouseLeave={() => setHoveredBoardId(null)}
            >
              <button onClick={() => setSelectedBoardId(board.id)} className="text-left w-full px-2 py-1">
                {board.name}
              </button>

              {hoveredBoardId === board.id && (
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button type="text" icon={<MoreOutlined />} size="large" />
                </Dropdown>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
