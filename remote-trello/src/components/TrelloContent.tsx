import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BoardType, ListType, CardType } from "../types/trello";
import { Layout as AntdLayout, Card, Input, Button, Modal, Dropdown, Menu } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { RootState } from "../types/trello";

const { Content } = AntdLayout;

interface ContentProps {
  selectedBoardId: string | null;
}

const TrelloContent: React.FC<ContentProps> = ({ selectedBoardId }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards.boards);
  const [boardState, setBoardState] = useState<BoardType | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingList, setEditingList] = useState<ListType | null>(null);
  const [listName, setListName] = useState("");

  useEffect(() => {
    if (boards.length > 0) {
      const board = boards.find((b) => b.id === selectedBoardId) || boards[0];
      setBoardState(board || null);
    }
  }, [boards, selectedBoardId]);

  if (!boardState) return <p>No board selected</p>;

  const handleOpenModal = (list?: ListType) => {
    if (list) {
      setEditingList(list);
      setListName(list.name);
    } else {
      setEditingList(null);
      setListName("");
    }
    setIsModalOpen(true);
  };

  const handleSaveList = () => {
    if (!listName.trim() || !boardState) return;
    // dispatch add/update list ở đây nếu cần (từ container store)
    setIsModalOpen(false);
    setListName("");
    setEditingList(null);
  };

  const handleDeleteList = (listId: string) => {
    // dispatch delete list ở đây nếu cần
  };

  return (
    <Content style={{ padding: 16, overflowX: "auto" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        {boardState.lists.map((list) => {
          const menu = (
            <Menu
              items={[
                { key: "edit", icon: <EditOutlined />, label: "Edit", onClick: () => handleOpenModal(list) },
                { key: "delete", icon: <DeleteOutlined />, label: "Delete", onClick: () => handleDeleteList(list.id) },
              ]}
            />
          );

          return (
            <div key={list.id} style={{ minWidth: 250, background: "white", borderRadius: 4, padding: 8 }}>
              <div className="flex justify-between items-center">
                <h4>{list.name}</h4>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button type="text" icon={<MoreOutlined />} size="small" />
                </Dropdown>
              </div>
              {list.cards.map((card) => (
                <Card key={card.id} size="small" style={{ marginBottom: 8 }}>
                  {card.title}
                </Card>
              ))}
            </div>
          );
        })}

        {/* Add List */}
        <div
          style={{
            minWidth: 250,
            background: "#e0e0e0",
            borderRadius: 4,
            padding: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => handleOpenModal()}
        >
          <p style={{ margin: 0 }}>+ Add List</p>
        </div>
      </div>

      <Modal
        title={editingList ? "Edit List" : "Add List"}
        open={isModalOpen}
        onOk={handleSaveList}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input placeholder="List name" value={listName} onChange={(e) => setListName(e.target.value)} />
      </Modal>
    </Content>
  );
};

export default TrelloContent;
