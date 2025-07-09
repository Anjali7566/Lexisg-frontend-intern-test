import React from "react";
import "../index.css";

const ChatBubble = ({ role, content, citations = [], onCitationClick }) => {
  const isUser = role === "user";
  return (
    <div className={`p-3 rounded ${isUser ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
      <p>{content}</p>
      {!isUser && citations.length > 0 && (
        <div className="mt-2 border-l-2 border-blue-400 pl-3 text-sm text-blue-700">
          {citations.map((c, idx) => (
            <div key={idx} className="cursor-pointer underline" onClick={() => onCitationClick(c)}>
              {c.source} — “{c.text.slice(0, 80)}...”
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
