// src/pages/TrelloPage.tsx
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
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);

  // fetch boards khi mount
  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const openModal = (board?: BoardType) => {
    if (board) {
      setEditingBoardId(board.id);
      setBoardName(board.name);
    } else {
      setEditingBoardId(null);
      setBoardName("");
    }
    setIsModalOpen(true);
  };

  const handleSaveBoard = () => {
    if (!boardName.trim()) return;

    if (editingBoardId) {
      dispatch(updateBoard({ id: editingBoardId, name: boardName, lists: [] }));
    } else {
      dispatch(addBoard({ id: Date.now().toString(), name: boardName, lists: [] }));
    }

    setIsModalOpen(false);
    setBoardName("");
    setEditingBoardId(null);
    dispatch(getBoards()); // reload boards sau khi thay đổi
  };

  return (
    <AntdLayout style={{ height: "100vh" }}>
      <Header>
        <p className="text-white font-bold">Trello Clone</p>
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
        <Input
          placeholder="Board name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
      </Modal>
    </AntdLayout>
  );
};

export default TrelloPage;
