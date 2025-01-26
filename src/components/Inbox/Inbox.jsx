import React, { useEffect } from "react";
import inboxstyles from "./Inbox.module.scss";
import useTokenStore from "@/stores/TokenStore";
import { baseURL } from "@/Services/ApiClient/Services";

function Inbox({
  onNotificationCountChange,
  messages,
  setMessages,
  notificationCount,
  setNotificationCount,
  fetchOfflineNotifications,
}) {
  const { accessToken } = useTokenStore();
  // const [messages, setMessages] = useState([]);
  // const [notificationCount, setNotificationCount] = useState(0);

  // // Fetch unread messages from the API
  // const fetchOfflineNotifications = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://104.168.46.4:8000/notifications/user-notifications/",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const offlineMessages = await response.json();
  //       // Map messages to a standard format
  //       const formattedMessages = offlineMessages.map((item) => ({
  //         id: item.id || new Date().getTime(),
  //         message: item.message || item.text || "پیام آفلاین",
  //         count: item.count || 1,
  //       }));

  //       setMessages((prevMessages) => {
  //         const updatedMessages = [...prevMessages, ...formattedMessages];
  //         setNotificationCount(updatedMessages.length);
  //         return updatedMessages;
  //       });
  //     } else {
  //       console.error("Failed to fetch offline notifications.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching offline notifications:", error);
  //   }
  // };

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
        `${baseURL}/notifications/read-notification/${messageId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

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
    <div
      className={`${inboxstyles.notificationCenterRight} ${inboxstyles["notification-container"]}`}
    >
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
