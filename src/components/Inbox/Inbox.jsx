import React, { useEffect, useState } from "react";
import inboxstyles from "./Inbox.module.scss";
import useTokenStore from "@/stores/TokenStore";

function Inbox({ onNotificationCountChange }) {
  const { accessToken } = useTokenStore();
  const [messages, setMessages] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (!accessToken) return;

    const ws = new WebSocket(
      `wss://bombfundingbackend.liara.run/ws/notifications/${accessToken}/`
    );

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        const newNotifications = Array.isArray(data) ? data : [data];

        setMessages((prevMessages) => {
          const updatedMessages = [...newNotifications, ...prevMessages];
          setNotificationCount(updatedMessages.length);
          return updatedMessages;
        });

        console.log("New notifications:", newNotifications);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
      console.error("WebSocket URL:", ws.url);
    };

    return () => {
      ws.close();
    };
  }, [accessToken]);

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
            <em className={inboxstyles["number"]}>{message.count || "1"}</em>
            <span className={inboxstyles["text"]} id={`message_${message.id}`}>
              {message.message || message.text}
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
