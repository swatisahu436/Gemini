import { useState } from "react";

const Pop = ({ onClose, refreshChats }) => {
  const [title, setTitle] = useState("");

  const handleCreateChat = () => {

    if (!title.trim()) {
      return;
    }
    alert("Title saved successfully")
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

    const newChat = {
      id: Date.now().toString(),
      title: title,
      createdAt: new Date().toLocaleString(),
      message: [],
    };

    chatHistory.unshift(newChat);
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    refreshChats();
    localStorage.setItem("currentChatId", newChat.id);

    onClose();
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Start New Chat</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Enter chat title..."
        className="w-full p-2 border rounded mb-4"
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            onClose();
          }}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleCreateChat}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Pop;
