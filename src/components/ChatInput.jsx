import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import "../index.css";

const ChatInput = ({ input, setInput, loading, onSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading && input.trim()) {
        onSubmit();
      }
    }
    if (e.key === "Escape") {
      setInput("");
    }
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice input not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + (prev ? " " : "") + transcript);
    };

    recognition.onerror = (event) => {
      alert("Voice input error: " + event.error);
    };
  };

  const quickPrompts = [
    "What is Section 166?",
    "Can FIR be withdrawn?",
    "Claim process for accident",
  ];

  return (
    <div className="w-full">
      {/* Quick Prompts */}
      <div className="flex gap-2 flex-wrap mb-2 text-sm">
        {quickPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => setInput(prompt)}
            className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-end gap-2">
        <TextareaAutosize
          minRows={2}
          maxRows={6}
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Ask your legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Voice Input Button */}
       <button
  onClick={handleVoiceInput}
  className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center"
  title="Voice Input"
  aria-label="Voice Input"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7 text-gray-700 dark:text-gray-300"
    fill="currentColor"
    viewBox="0 0 26 26"
  >
    <path d="M12 14a3 3 0 003-3V7a3 3 0 10-6 0v4a3 3 0 003 3z" />
    <path d="M19 11a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 10-2 0 7 7 0 006 6.92V21h2v-3.08A7 7 0 0019 11z" />
  </svg>
</button>


        {/* Submit Button */}
       <button
  onClick={onSubmit}
  disabled={loading || !input.trim()}
  className={`w-11 h-11 flex items-center justify-center rounded-md transition ${
    loading || !input.trim()
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
  aria-label="Submit"
>
  {loading ? (
    <svg
      className="animate-spin w-6 h-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M3 12l18-9-9 18-2-8-7-1z" />
    </svg>
  )}
</button>

      </div>
    </div>
  );
};

export default ChatInput;
