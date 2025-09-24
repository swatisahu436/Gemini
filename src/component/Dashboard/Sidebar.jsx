import { IoReorderThree } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import Pop from "../../context/Pop";
import { useState, useEffect } from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const Sidebar = ({ onSelectChat }) => {
  const [showPop, setShowPop] = useState(false);
  const [chattitle, setChattitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const pageSize = 10; 

  const handelPop = () => setShowPop(true);

  const refreshChats = () => {
    const titleHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChattitle(titleHistory);
  };

  useEffect(() => {
    refreshChats();
  }, []);

  const handelDelete = (id) => {
    if (window.confirm("Delete the chat")) {
      let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
      const index = chatHistory.findIndex((chat) => chat.id === id);
      if (index !== -1) {
        chatHistory.splice(index, 1); 
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        refreshChats();
      }
    }
  };


  const totalPages = Math.ceil(chattitle.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedChats = chattitle.slice(startIndex, startIndex + pageSize);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 px-2">
      <div className="p-4 flex justify-between">
        <IoReorderThree className="text-2xl cursor-pointer" />
        <IoMdSearch className="text-2xl" />
      </div>

      {/* New chat button */}
      <div
        onClick={handelPop}
        className="p-2 mt-18 flex items-center rounded-3xl gap-4 text-gray-700 cursor-pointer bg-gray-300"
      >
        <MdOutlineChatBubbleOutline className="text-2xl cursor-pointer" />
        <p>New chat</p>
      </div>

      {/* Recent chats */}
      <div className="flex flex-col px-2">
        <p className="mt-6 mb-5 font-bold text-left">Recent</p>
      </div>

      {paginatedChats.length === 0 ? (
        <p className="text-gray-500 pl-4">No chats</p>
      ) : (
        paginatedChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              localStorage.setItem("currentChatId", chat.id);
              onSelectChat(chat.id);
            }}
            className="flex items-center mb-1 pl-4 p-1.5 rounded-3xl bg-gray-200 text-black cursor-pointer hover:bg-gray-500 justify-between"
          >
            <span>{chat.title}</span>
            <PiDotsThreeVerticalBold
              className="pointer-fine:decoration-neutral-700"
              onClick={(e) => {
                e.stopPropagation(); 
                handelDelete(chat.id);
              }}
              title="Delete chat"
            />
          </div>
        ))
      )}

      {chattitle.length > pageSize && (
        <div className="flex justify-between items-center px-4 py-2 mt-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {showPop && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Pop onClose={() => setShowPop(false)} refreshChats={refreshChats} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
