import React, { useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { BoardType } from "../types/trello";
import { useDispatch } from "react-redux";
import { actions } from "container/store";

interface SidebarProps {
  boards: BoardType[];
  selectedBoardId: string | null;
  setSelectedBoardId: (id: string | null) => void;
  openModal: (board?: BoardType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  boards = [],
  selectedBoardId,
  setSelectedBoardId,
  openModal,
}) => {
  const dispatch = useDispatch();
  const [hoveredBoardId, setHoveredBoardId] = useState<string | null>(null);

  const handleDeleteBoard = (boardId: string) => {
    if (!boardId) return;
    if (actions.deleteBoard) {
      dispatch(actions.deleteBoard(boardId));
    }
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
        {(boards || []).map((board) => {
          const boardId = board?.id ?? "";
          const boardName = board?.name ?? "Untitled";

          const menu = (
            <Menu
              items={[
                {
                  key: "edit",
                  icon: <EditOutlined />,
                  label: "Edit",
                  onClick: () => openModal(board),
                },
                {
                  key: "delete",
                  icon: <DeleteOutlined />,
                  label: "Delete",
                  onClick: () => handleDeleteBoard(boardId),
                },
              ]}
            />
          );

          return (
            <li
              key={boardId}
              className={`flex justify-between items-center h-[50px] rounded px-2 ${
                selectedBoardId === boardId
                  ? "bg-blue-200"
                  : "hover:bg-gray-200"
              }`}
              onMouseEnter={() => setHoveredBoardId(boardId)}
              onMouseLeave={() => setHoveredBoardId(null)}
            >
              <button
                onClick={() => setSelectedBoardId(boardId)}
                className="text-left w-full py-1"
              >
                {boardName}
              </button>

              {hoveredBoardId === boardId && (
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
