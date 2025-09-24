# Gemini Chat Clone

A fully functional, responsive conversational AI frontend inspired by Google Gemini, built with React.js.  
The project simulates a real-time chat interface where users can interact with an AI assistant, view responses,
 and manage chat history — similar to modern AI chat apps.

---

## Features (Implemented)

- Login with Phone Number (authentication screen)  
- Real-Time Chat UI with simulated AI responses  
- Local Storage Chat History (conversations persist after reload)  
- Create and Manage Chats with unique titles (UUID-based IDs)  
- Persistent Conversations stored in browser storage  
- Sucessfully implemented pagination for long conservation
- Copy-to-clipboard on hover for each message

---

##  Tech Stack

- React.js – Frontend UI library  
- CSS / Tailwind CSS – Styling and responsiveness  
- LocalStorage API – Persistent data storage  
- UUID – Unique chat IDs generation  

---

## Project Structure

GEMINI AI/
├─ project/
│  ├─ node_modules/
│  ├─ public/
│  ├─ src/
│  │   ├─ assets/
│  │   ├─ component/
│  │   │   ├─ auth/
│  │   │   │   └─ Login.jsx
│  │   │   ├─ Dashboard/
│  │   │   │   ├─ Chatroom.jsx
│  │   │   │   ├─ Dashboard.jsx
│  │   │   │   └─ Sidebar.jsx
│  │   ├─ context/
│  │   │   ├─ Pop.jsx
│  │   │   └─ saveStorage.jsx
│  │   ├─ App.css
│  │   ├─ App.jsx
│  │   ├─ index.css
│  │   └─ main.jsx
│  ├─ index.html
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ .gitignore
│  ├─ eslint.config.js
│  └─ README.md


##  Getting Started

1. Clone the repository
git clone https://github.com/your-username/gemini-chat-clone.git

cd gemini-chat-clone


2. Install dependencies


npm install


3. Start the development server


npm run dev


The app will be available at http://localhost:3000  

---

## 🤝 Contributing

Feel free to fork this repo and open pull requests to add new features or fix bugs.

---