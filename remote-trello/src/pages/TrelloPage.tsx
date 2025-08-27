import React, { useEffect, useState } from "react";
import { Layout as AntdLayout, Modal, Input } from "antd";
import Sidebar from "../components/Sidebar";
import TrelloContent from "../components/TrelloContent";
import { BoardType, RootState } from "../types/trello";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "container/store";
import "../style.css";

const { Header, Sider, Content } = AntdLayout;

const TrelloPage: React.FC = () => {
  const dispatch = useDispatch();
  const boards: BoardType[] =
    useSelector((state: RootState) => state.boards?.items) || [];

  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardColor, setBoardColor] = useState("#1890ff");
  const [editingBoard, setEditingBoard] = useState<BoardType | null>(null);

  useEffect(() => {
    if (actions.fetchBoards) {
      dispatch(actions.fetchBoards());
    }
  }, [dispatch]);

  const openModal = (board?: BoardType) => {
    if (board) {
      setEditingBoard(board);
      setBoardName(board.name || "");
      setBoardColor(board.color || "#1890ff");
    } else {
      setEditingBoard(null);
      setBoardName("");
      setBoardColor("#1890ff");
    }
    setIsModalOpen(true);
  };

  const handleSaveBoard = () => {
    if (!boardName.trim()) return;

    if (editingBoard) {
      if (actions.updateBoard) {
        dispatch(
          actions.updateBoard({
            ...editingBoard,
            name: boardName,
            color: boardColor,
          })
        );
      }
    } else {
      if (actions.addBoard) {
        dispatch(
          actions.addBoard({
            name: boardName,
            color: boardColor,
          })
        );
      }
    }

    dispatch(actions.fetchBoards());

    setIsModalOpen(false);
    setBoardName("");
    setBoardColor("#1890ff");
    setEditingBoard(null);
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
            boards={boards || []}
            selectedBoardId={selectedBoardId}
            setSelectedBoardId={setSelectedBoardId}
            openModal={openModal}
          />
        </Sider>
        <Content>
          <TrelloContent selectedBoardId={selectedBoardId} boardColor={boards.find(b => b.id === selectedBoardId)?.color} 
 />
        </Content>
      </AntdLayout>

      <Modal
        title={editingBoard ? "Edit Board" : "Add Board"}
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
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              cursor: "pointer",
            }}
          />
        </div>
      </Modal>
    </AntdLayout>
  );
};

export default TrelloPage;
