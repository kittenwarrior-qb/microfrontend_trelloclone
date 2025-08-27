import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, ListType, CardType } from "../types/trello";
import { actions } from "container/store";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Input, Modal, Button, Spin } from "antd";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

interface ContentProps {
  selectedBoardId: string | null;
  boardColor?: string;
}

const TrelloContent: React.FC<ContentProps> = ({
  selectedBoardId,
  boardColor,
}) => {
  const dispatch = useDispatch();
  const listsState = useSelector((state: RootState) => state.lists);
  const cardsState = useSelector((state: RootState) => state.cards);

  const [editingList, setEditingList] = useState<ListType | null>(null);
  const [listName, setListName] = useState("");
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [editingCardListId, setEditingCardListId] = useState<string | null>(
    null
  );
  const [cardName, setCardName] = useState("");
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  useEffect(() => {
    if (selectedBoardId) {
      dispatch(actions.fetchLists(selectedBoardId));
    }
  }, [selectedBoardId, dispatch]);

  useEffect(() => {
    if (listsState.items.length && selectedBoardId) {
      listsState.items
        .filter((list) => list.board_id === selectedBoardId)
        .forEach((list) => dispatch(actions.fetchCards({ listId: list.id })));
    }
  }, [listsState.items, selectedBoardId, dispatch]);

  if (!selectedBoardId) return <p className="p-4">No board selected</p>;
  // if (listsState.loading || cardsState.loading) return <Spin className="p-4" />;

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
    if (!listName.trim() || !selectedBoardId) return;

    if (editingList) {
      dispatch(actions.updateList({ ...editingList, name: listName }));
    } else {
      dispatch(
        actions.addList({
          boardId: selectedBoardId,
          list: { name: listName, board_id: selectedBoardId },
        })
      );
    }

    dispatch(actions.fetchLists(selectedBoardId));

    setIsListModalOpen(false);
    setListName("");
    setEditingList(null);
  };

  const handleDeleteList = (listId: string) => {
    dispatch(actions.deleteList(listId));
  };

  // ================== CARD ==================
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
    if (!cardName.trim() || !editingCardListId) return;

    if (editingCard) {
      dispatch(actions.updateCard({ ...editingCard, title: cardName }));
    } else {
      dispatch(
        actions.addCard({
          listId: editingCardListId,
          card: { title: cardName, list_id: editingCardListId },
        })
      );
    }
    dispatch(actions.fetchLists(selectedBoardId));

    setIsCardModalOpen(false);
    setCardName("");
    setEditingCard(null);
    setEditingCardListId(null);
  };

  const handleDeleteCard = (cardId: string) => {
    dispatch(actions.deleteCard(cardId));
  };

  // ================== DND ==================
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    console.log("Payload sent:", { cardId: active.id, toListId: over.id });
    dispatch(actions.moveCard({ cardId: active.id.toString(), toListId: over.id.toString() }));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div
        className="p-4 overflow-x-auto h-[calc(100vh-64px)]"
        style={{ backgroundColor: boardColor || "#f3f4f6" }}
      >
        <div className="flex gap-4 items-start">
          {listsState.items
            .filter((list) => String(list.board_id) === String(selectedBoardId))
            .map((list) => {
              const cards = cardsState.items.filter((c) => c.list_id === list.id);

              const listMenu = (
                <Menu
                  items={[
                    {
                      key: "edit",
                      icon: <EditOutlined />,
                      label: "Edit",
                      onClick: () => handleOpenListModal(list),
                    },
                    {
                      key: "delete",
                      icon: <DeleteOutlined />,
                      label: "Delete",
                      onClick: () => handleDeleteList(list.id),
                    },
                  ]}
                />
              );

              return (
                <Droppable key={list.id} id={list.id.toString()}>
                  <div className="min-w-[250px] bg-gray-200 rounded p-2 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-800">{list.name}</h4>
                      <Dropdown overlay={listMenu} trigger={["click"]}>
                        <Button type="text" icon={<MoreOutlined />} size="small" />
                      </Dropdown>
                    </div>

                    <div className="flex flex-col gap-2">
                      {cards.map((card) => {
                        const cardMenu = (
                          <Menu
                            items={[
                              {
                                key: "edit",
                                icon: <EditOutlined />,
                                label: "Edit",
                                onClick: () => handleOpenCardModal(list.id, card),
                              },
                              {
                                key: "delete",
                                icon: <DeleteOutlined />,
                                label: "Delete",
                                onClick: () => handleDeleteCard(card.id),
                              },
                            ]}
                          />
                        );

                        return (
                          <Draggable key={card.id} id={card.id}>
                            <div className="bg-white p-2 rounded shadow flex justify-between items-center">
                              <span>{card.title}</span>
                              <div className="invisible group-hover:visible">
                                <Dropdown overlay={cardMenu} trigger={["click"]}>
                                  <Button
                                    type="text"
                                    icon={<MoreOutlined />}
                                    size="small"
                                  />
                                </Dropdown>
                              </div>
                            </div>
                          </Draggable>
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
                </Droppable>
              );
            })}

          <div
            className="min-w-[250px] bg-gray-300 rounded p-2 flex items-center justify-center cursor-pointer hover:bg-gray-400 transition"
            onClick={() => handleOpenListModal()}
          >
            <span>+ Thêm danh sách</span>
          </div>
        </div>

        <Modal
          title={editingList ? "Sửa danh sách" : "Thêm danh sách"}
          open={isListModalOpen}
          onOk={handleSaveList}
          onCancel={() => setIsListModalOpen(false)}
        >
          <Input
            placeholder="List name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </Modal>

        <Modal
          title={editingCard ? "Sửa thẻ" : "Thêm thẻ"}
          open={isCardModalOpen}
          onOk={handleSaveCard}
          onCancel={() => setIsCardModalOpen(false)}
        >
          <Input
            placeholder="Card title"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </Modal>
      </div>
    </DndContext>
  );
};

export default TrelloContent;
