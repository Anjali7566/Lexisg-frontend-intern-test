import React from "react";
import "../index.css";

const ChatInput = ({ input, setInput, loading, onSubmit }) => (
  <div className="flex items-center gap-2">
    <textarea
      className="flex-1 border p-2 rounded resize-none"
      placeholder="Ask your legal question..."
      rows={2}
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
    <button
      onClick={onSubmit}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {loading ? "Loading..." : "Submit"}
    </button>
  </div>
);

export default ChatInput;
