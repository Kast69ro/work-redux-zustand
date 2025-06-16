import { useState } from "react";
import { useStore } from "../store/store-zustand";
import { Space, Table, Button, Modal, Input } from "antd";

export default function ThridPage() {
  const { data, deleteUs, addUser, editUser } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addName, setAddName] = useState("");

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState(null);

  const showModal = () => setIsModalOpen(true);

  const handleOk = () => {
    if (addName.trim()) {
      const newUser = {
        name: addName,
        id: Date.now(),
      };
      addUser(newUser);
      setAddName("");
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalEdit = (record) => {
    setEditId(record.id);
    setEditName(record.name);
    setIsModalOpenEdit(true);
  };

  const handleOkEdit = () => {
      editUser({ id: editId, name: editName });
      setEditId(null);
      setEditName("");
      setIsModalOpenEdit(false);
    
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "red",
            }}
            onClick={() => deleteUs(record.id)}
          >
            delete
          </button>
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "blue",
            }}
            onClick={() => showModalEdit(record)}
          >
            edit
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        NEW+
      </Button>

      <Modal
        title="Add new"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Name"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
        />
      </Modal>

      <Modal
        title="Edit user"
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        <Input
          placeholder="New name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
      </Modal>

   <div style={{marginTop:'20px'}}>
       <Table columns={columns} dataSource={data} rowKey="id" />
   </div>
    </div>
  );
}
