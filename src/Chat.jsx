import React, { useState } from "react";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState({
    John: [
      { text: "Hi from John", sender: "reply", time: "09:01 AM" },
      { text: "How are you", sender: "user", time: "09:02 AM" },
      { text: "I am fine.", sender: "reply", time: "09:03 AM" },
    ],
    Lisa: [
      { text: "Hi from Lisa", sender: "reply", time: "10:05 AM" },
      { text: "How are you", sender: "user", time: "10:06 AM" },
      { text: "I am fine.", sender: "reply", time: "10:07 AM" },
    ],
    Diasy: [
      { text: "Hi from Diasy", sender: "reply", time: "11:15 AM" },
      { text: "How are you", sender: "user", time: "11:16 AM" },
      { text: "I am fine.", sender: "reply", time: "11:17 AM" },
    ],
  });

  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("John");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      const newState = !prev;
      document.body.classList.toggle("sidebar-open", newState);
      return newState;
    });
  };

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const time = getCurrentTime();

    setMessages((prev) => ({
      ...prev,
      [selectedUser]: [
        ...prev[selectedUser],
        { text: newMessage, sender: "user", time },
      ],
    }));

    setNewMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const replyTime = getCurrentTime();

      setMessages((prev) => ({
        ...prev,
        [selectedUser]: [
          ...prev[selectedUser],
          {
            text: "Auto-reply : Got your message!",
            sender: "reply",
            time: replyTime,
          },
        ],
      }));
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`chatContainer ${darkMode ? "dark" : ""}`}>
      <aside className={`leftSide ${sidebarOpen ? "show" : ""}`}>
        <h1>Chat App</h1>
        <ul>
          {Object.keys(messages).map((user) => (
            <li
              key={user}
              className={selectedUser === user ? "active" : ""}
              onClick={() => {
                setSelectedUser(user);
                setSidebarOpen(false);
              }}
            >
              {user}
            </li>
          ))}
        </ul>
      </aside>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <main className="rightSide">
        <header>
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>

          <h1>{selectedUser}</h1>

          <button
            className={`toggle ${darkMode ? "active" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className="toggleO"></div>
          </button>
        </header>

        <div className="messages">
          {messages[selectedUser].map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.sender === "user" ? "user" : "reply"}`}
            >
              <div className="message-meta">
                <span className="text">{msg.text}</span>
                <span className="time">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message reply typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
        </div>

        <form className="bottom" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter your message"
          />
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
}

export default Chat;
