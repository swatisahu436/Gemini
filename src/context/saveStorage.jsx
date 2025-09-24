import { v4 as uuidv4 } from "uuid";

export function saveChat(title) {
  const id = uuidv4();
  const timestamp = new Date().toLocaleString();

  let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

  const newEntry = {
    id,
    title,
    timestamp,
    messages: [],
  };

  chatHistory.push(newEntry);
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  localStorage.setItem("currentChatId", id);
  return id;
}

export function saveMessage(chatId, question, onUpdate) {
  if (!chatId || !question) return;

  const timestamp = new Date().toLocaleString();
  let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  let existingChat = chatHistory.find((chat) => chat.id === chatId);

  if (!existingChat) {
    existingChat = { id: chatId, title: "Untitled Chat", timestamp, messages: [] };
    chatHistory.push(existingChat);
  }

  if (!existingChat.messages) existingChat.messages = [];


  existingChat.messages.push({ id: uuidv4(), question, answer: null, timestamp });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  onUpdate?.(chatHistory);

 
  setTimeout(() => {
    if (!existingChat.messages) existingChat.messages = [];
    const lastIndex = existingChat.messages.length - 1;
    existingChat.messages[lastIndex].answer = "This is Gemini response";
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    onUpdate?.(chatHistory);
  }, 2000);
}
