import React, { useEffect, useState } from "react";
import { Layout as AntdLayout, Modal, Input, Button } from "antd";
import Sidebar from "../components/Sidebar";
import TrelloContent from "../components/TrelloContent";
import { BoardType } from "../types/trello";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, addBoard, updateBoard } from "container/store";
import { RootState } from "../types/trello";

const { Header, Sider, Content } = AntdLayout;

const TrelloPage: React.FC = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards.boards);

  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardColor, setBoardColor] = useState("#1890ff"); // 🎨 mặc định
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const openModal = (board?: BoardType) => {
    if (board) {
      setEditingBoardId(board.id);
      setBoardName(board.name);
      setBoardColor(board.color || "#1890ff");
    } else {
      setEditingBoardId(null);
      setBoardName("");
      setBoardColor("#1890ff");
    }
    setIsModalOpen(true);
  };

  const handleSaveBoard = () => {
    if (!boardName.trim()) return;

    if (editingBoardId) {
      const currentBoard = boards.find((b) => b.id === editingBoardId);
      if (currentBoard) {
        dispatch(
          updateBoard({
            ...currentBoard,
            name: boardName,
            color: boardColor,
          })
        );
      }
    } else {
      dispatch(
        addBoard({
          id: Date.now().toString(),
          name: boardName,
          color: boardColor,
          lists: [],
        })
      );
    }

    setIsModalOpen(false);
    setBoardName("");
    setBoardColor("#1890ff");
    setEditingBoardId(null);
  };

  return (
    <AntdLayout style={{ height: "100vh" }}>
      <Header>
        <a href="/" className="text-white font-bold">
          Trello Clone
        </a>
      </Header>

      <AntdLayout>
        <Sider width={280}>
          <Sidebar
            boards={boards}
            selectedBoardId={selectedBoardId}
            setSelectedBoardId={setSelectedBoardId}
            openModal={openModal}
          />
        </Sider>
        <Content>
          <TrelloContent selectedBoardId={selectedBoardId} />
        </Content>
      </AntdLayout>

      <Modal
        title={editingBoardId ? "Edit Board" : "Add Board"}
        open={isModalOpen}
        onOk={handleSaveBoard}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="mb-3">
          <Input
            placeholder="Board name"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="mb-3"
          />
          <input
            type="color"
            value={boardColor}
            onChange={(e) => setBoardColor(e.target.value)}
            style={{ width: "100%", height: "40px", border: "none", cursor: "pointer" }}
          />
        </div>
      </Modal>
    </AntdLayout>
  );
};

export default TrelloPage;
