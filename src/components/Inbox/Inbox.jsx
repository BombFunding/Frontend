// Inbox.jsx
import React, { useEffect, useState } from "react";
import inboxstyles from "./Inbox.module.scss";

function Inbox({ onNotificationCountChange }) {
  const [messages, setMessages] = useState([
    { id: "message_1", count: 1, text: "یک پیام فارسی." },
    { id: "message_2", count: 2, text: "یک پیام فارسی." },
    { id: "message_3", count: 3, text: "یک پیام فارسی." },
    // { id: "message_4", count: 4, text: "یک پیام فارسی." },
    // { id: "message_5", count: 5, text: "یک پیام فارسی." },
  ]);

  const [notificationCount, setNotificationCount] = useState(messages.length);

  // Notify parent component of changes in notification count
  useEffect(() => {
    if (onNotificationCountChange) {
      onNotificationCountChange(notificationCount);
    }
  }, [notificationCount, onNotificationCountChange]);

  const handleRemoveMessage = (messageId) => {
    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.filter(
        (message) => message.id !== messageId
      );
      setNotificationCount(updatedMessages.length);
      return updatedMessages;
    });
  };

  return (
    <div className={inboxstyles["notification-container"]}>
      <h3>
        {notificationCount > 0 ? "اطلاعیه ها" : "هیچ اطلاعیه جدیدی نیست"}
      </h3>

      {messages.map((message) => (
        <React.Fragment key={message.id}>
          <input
            className={inboxstyles["checkbox"]}
            type="checkbox"
            id={`size_${message.id}`}
            value={`message_${message.id}`}
            checked
          />
          <label
            className={inboxstyles["notification"] + " " + inboxstyles["new"]}
            htmlFor={`size_${message.id}`}
          >
            <em className={inboxstyles["number"]}>{message.count}</em>
            <span className={inboxstyles["text"]} id={`message_${message.id}`}>
              {message.text}
            </span>
            <i
              className="material-icons dp48 right"
              onClick={() => handleRemoveMessage(message.id)}
            >
              clear
            </i>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Inbox;
