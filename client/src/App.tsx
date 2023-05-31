import React from "react";
import "./App.css";

function App() {
  const eventSource = new EventSource("http://localhost:8000");
  const [messages, setMessages] = React.useState<string[]>([]);

  eventSource.onmessage = (event) => {
    setMessages((messages) => [...messages, event.data]);
  };

  eventSource.onerror = () => {
    console.log("EventSource failed.");
    eventSource.close();
  };

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
          <span>
            {idx + 1}. {message}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
