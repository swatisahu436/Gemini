import { FaPlus } from "react-icons/fa6";
import { MdOutlineMic, MdOutlinePhotoFilter } from "react-icons/md";
import { saveMessage } from "../../context/saveStorage";
import { useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";

const PAGE_SIZE = 20;

const Chatroom = ({ chatId }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);
  const [question, setQuestion] = useState("");

  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);
  const isPrependingRef = useRef(false);

  useEffect(() => {
    if (!chatId) {
      setAllMessages([]);
      setVisibleMessages([]);
      return;
    }

    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    const currentChat = chatHistory.find((chat) => chat.id === chatId);

    if (currentChat?.messages) {
      const sorted = [...currentChat.messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setAllMessages(sorted);
      setVisibleMessages(sorted.slice(-PAGE_SIZE));
      setLoadedCount(PAGE_SIZE);
    } else {
      setAllMessages([]);
      setVisibleMessages([]);
      setLoadedCount(PAGE_SIZE);
    }
  }, [chatId]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (!isPrependingRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      isPrependingRef.current = false;
    }
  }, [visibleMessages]);

  const handleSend = () => {
    if (!question.trim() || !chatId) return;

    saveMessage(chatId, question, (updatedChatHistory) => {
      const currentChat = updatedChatHistory.find((chat) => chat.id === chatId);
      if (currentChat?.messages) {
        const sorted = [...currentChat.messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setAllMessages(sorted);
        setVisibleMessages(sorted.slice(-loadedCount));
      }
    });

    setQuestion("");
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-600">
      <div className="flex justify-between text-left p-4">
        <p className="text-2xl font-medium">Gemini</p>
        <CgProfile className="text-2xl" />
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 py-20"
        ref={chatContainerRef}
      >
        {visibleMessages.length === 0 ? (
          <p className="text-4xl pt-24 font-medium text-blue-500">Hello, start asking!</p>
        ) : (
          visibleMessages.map((msg) => (
            <div key={msg.id} className="w-full mb-8 gap-4 grid p-3 rounded">
              <div className="flex justify-end">
                <p className="text-black max-w-[70%] text-left break-words bg-gray-300 rounded-xl p-2">
                  {msg.question}
                </p>
              </div>
              <div>
                <p className="text-left">{msg.answer ?? "gemini answer"}</p>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>


      <div className="mx-auto mb-4 bg-white w-3/4 max-w-4xl p-4 border border-gray-300 rounded-2xl shadow-lg">
        <span className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Ask Gemini?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="text-left bg-transparent border-none outline-none"
          />
          <span className="flex justify-between">
            <FaPlus className="text-xl" />
            <span className="flex gap-4">
              <MdOutlineMic className="text-xl" />
              <MdOutlinePhotoFilter className="text-xl" />
            </span>
          </span>
        </span>
      </div>

    </div>

  );
};

export default Chatroom;
