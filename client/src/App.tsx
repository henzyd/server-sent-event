import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "https://server-sent-event.onrender.com"
    );

    eventSource.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    eventSource.onerror = () => {
      console.log("EventSource failed.");
      eventSource.close();
    };

    return () => {
      eventSource.close(); // Cleanup the EventSource connection when the component unmounts
    };
  }, []);

  return (
    <div>
      <h1>Server Sent Events</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gridGap: "10px",
          alignItems: "center",
        }}
      >
        {messages.map((message, idx) => (
          <span key={idx}>
            {idx + 1}. {message}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
