import React, { useEffect, useState } from "react";
import inboxstyles from "./Inbox.module.scss";
import useTokenStore from "@/stores/TokenStore";

function Inbox({
  onNotificationCountChange,
  messages,
  setMessages,
  notificationCount,
  setNotificationCount,
  fetchOfflineNotifications,
}) {
  const { accessToken } = useTokenStore();

  // Handle WebSocket connection
  useEffect(() => {
    if (!accessToken) return;

    // WebSocket connection
    const ws = new WebSocket(
      `wss://bombfundingbackend.liara.run/ws/notifications/${accessToken}/`
    );

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Map WebSocket data to standard format
        const newNotifications = Array.isArray(data)
          ? data.map((item) => ({
              id: item.id || new Date().getTime(),
              message: item.message || item.text || "پیام جدید",
              count: item.count || 1,
            }))
          : [
              {
                id: data.id || new Date().getTime(),
                message: data.message || data.text || "پیام جدید",
                count: data.count || 1,
              },
            ];

        setMessages((prevMessages) => {
          const updatedMessages = [...newNotifications, ...prevMessages];
          setNotificationCount(updatedMessages.length);
          return updatedMessages;
        });

        console.log("WebSocket notifications:", newNotifications);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
    };

    return () => {
      ws.close();
    };
  }, [accessToken]);

  // Fetch offline notifications when component mounts
  useEffect(() => {
    if (accessToken) {
      fetchOfflineNotifications();
    }
  }, [accessToken]);

  // Notify parent component about the count change
  useEffect(() => {
    if (onNotificationCountChange) {
      onNotificationCountChange(notificationCount);
    }
  }, [notificationCount, onNotificationCountChange]);

  // Remove a notification
  const handleRemoveMessage = async (messageId) => {
    try {
      const response = await fetch(
        `https://bombfundingbackend.liara.run/notifications/read-notification/${messageId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        // Remove the message locally if the request is successful
        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.filter(
            (message) => message.id !== messageId
          );
          setNotificationCount(updatedMessages.length);
          return updatedMessages;
        });
      } else {
        console.error(
          `Failed to mark notification ${messageId} as read:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error marking notification ${messageId} as read:`, error);
    }
  };

  return (
    <div className={inboxstyles["notification-container"]}>
      <h3>{notificationCount > 0 ? "اطلاعیه ها" : "هیچ اطلاعیه جدیدی نیست"}</h3>

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
              {message.message}
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
