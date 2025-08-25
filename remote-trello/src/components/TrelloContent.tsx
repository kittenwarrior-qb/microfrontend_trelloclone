import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BoardType, ListType, CardType, RootState } from "../types/trello";
import { addList, updateList, deleteList, addCard, updateCard, deleteCard } from "container/store";
import { MoreOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Input, Modal, Button } from "antd";

interface ContentProps {
  selectedBoardId: string | null;
}

const TrelloContent: React.FC<ContentProps> = ({ selectedBoardId }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards.boards);
  const [boardState, setBoardState] = useState<BoardType | null>(null);

  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [editingList, setEditingList] = useState<ListType | null>(null);
  const [listName, setListName] = useState("");

  const [editingCardListId, setEditingCardListId] = useState<string | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [cardName, setCardName] = useState("");

  useEffect(() => {
    if (boards.length > 0) {
      const board = boards.find((b) => b.id === selectedBoardId) || boards[0];
      setBoardState(board || null);
    }
  }, [boards, selectedBoardId]);

  if (!boardState) return <p>No board selected</p>;

  // --- List handlers ---
  const handleOpenListModal = (list?: ListType) => {
    if (list) {
      setEditingList(list);
      setListName(list.name);
    } else {
      setEditingList(null);
      setListName("");
    }
    setIsListModalOpen(true);
  };

  const handleSaveList = () => {
    if (!listName.trim() || !boardState) return;
    if (editingList) {
      dispatch(updateList({ boardId: boardState.id, list: { ...editingList, name: listName } }));
    } else {
      dispatch(addList({ boardId: boardState.id, list: { id: Date.now().toString(), name: listName, cards: [] } }));
    }
    setIsListModalOpen(false);
    setListName("");
    setEditingList(null);
  };

  const handleDeleteList = (listId: string) => {
    if (!boardState) return;
    dispatch(deleteList({ boardId: boardState.id, listId }));
  };

  // --- Card handlers ---
  const handleOpenCardModal = (listId: string, card?: CardType) => {
    setEditingCardListId(listId);
    if (card) {
      setEditingCard(card);
      setCardName(card.title);
    } else {
      setEditingCard(null);
      setCardName("");
    }
    setIsCardModalOpen(true);
  };

  const handleSaveCard = () => {
    if (!cardName.trim() || !boardState || !editingCardListId) return;

    if (editingCard) {
      // === Update card ===
      dispatch(updateCard({ boardId: boardState.id, listId: editingCardListId, card: { ...editingCard, title: cardName } }));
    } else {
      // === Add new card ===
      dispatch(addCard({ boardId: boardState.id, listId: editingCardListId, card: { id: Date.now().toString(), title: cardName } }));
    }

    // Reset modal state
    setIsCardModalOpen(false);
    setCardName("");
    setEditingCard(null);
    setEditingCardListId(null);
  };

  const handleDeleteCard = (listId: string, cardId: string) => {
    if (!boardState) return;
    dispatch(deleteCard({ boardId: boardState.id, listId, cardId }));
  };

  return (
    <div className="p-4 overflow-x-auto h-[calc(100vh-64px)]" style={{ backgroundColor: boardState.color || "#f0f0f0" }}>
      <div className="flex gap-4 items-start">
        {boardState.lists.map((list) => {
          const listMenu = (
            <Menu
              items={[
                { key: "edit", icon: <EditOutlined />, label: "Edit", onClick: () => handleOpenListModal(list) },
                { key: "delete", icon: <DeleteOutlined />, label: "Delete", onClick: () => handleDeleteList(list.id) },
              ]}
            />
          );

          return (
            <div key={list.id} className="min-w-[250px] bg-gray-200 rounded p-2 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-800">{list.name}</h4>
                <Dropdown overlay={listMenu} trigger={["click"]}>
                  <Button type="text" icon={<MoreOutlined />} size="small" />
                </Dropdown>
              </div>

              <div className="flex flex-col gap-2">
                {list.cards.map((card) => {
                  const cardMenu = (
                    <Menu
                      items={[
                        { key: "edit", icon: <EditOutlined />, label: "Edit", onClick: () => handleOpenCardModal(list.id, card) },
                        { key: "delete", icon: <DeleteOutlined />, label: "Delete", onClick: () => handleDeleteCard(list.id, card.id) },
                      ]}
                    />
                  );

                  return (
                    <div key={card.id} className="relative group">
                      <div className="bg-white p-2 rounded shadow flex justify-between items-center">
                        <span>{card.title}</span>
                        <div className="invisible group-hover:visible">
                          <Dropdown overlay={cardMenu} trigger={["click"]}>
                            <Button type="text" icon={<MoreOutlined />} size="small" />
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  className="mt-1 p-2 rounded flex gap-1 hover:bg-gray-300 transition"
                  onClick={() => handleOpenCardModal(list.id)}
                >
                  <PlusOutlined /> Thêm thẻ
                </button>
              </div>
            </div>
          );
        })}

        <div
          className="min-w-[250px] bg-gray-300 rounded p-2 flex items-center justify-center cursor-pointer hover:bg-gray-400 transition"
          onClick={() => handleOpenListModal()}
        >
          <span>+ Thêm danh sách</span>
        </div>
      </div>

      {/* List modal */}
      <Modal
        title={editingList ? "Sửa danh sách" : "Thêm danh sách"}
        open={isListModalOpen}
        onOk={handleSaveList}
        onCancel={() => setIsListModalOpen(false)}
      >
        <Input placeholder="List name" value={listName} onChange={(e) => setListName(e.target.value)} />
      </Modal>

      <Modal
        title={editingCard ? "Sửa thẻ" : "Thêm thẻ"}
        open={isCardModalOpen}
        onOk={handleSaveCard}
        onCancel={() => setIsCardModalOpen(false)}
      >
        <Input placeholder="Card title" value={cardName} onChange={(e) => setCardName(e.target.value)} />
      </Modal>
    </div>
  );
};

export default TrelloContent;
