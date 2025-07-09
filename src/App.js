import React, { useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatBubble from "./components/ChatBubble";
import PdfViewerModal from "./components/PdfViewerModal";
import { MOCK_RESPONSE } from "./constants/mockResponse";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [pdfModal, setPdfModal] = useState({ visible: false, citation: null });

  const handleSubmit = () => {
    if (!input.trim()) return;

    setLoading(true);
    const userMessage = { role: "user", content: input };

    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: MOCK_RESPONSE.answer,
        citations: MOCK_RESPONSE.citations,
      };
      setChatHistory((prev) => [...prev, userMessage, aiResponse]);
      setInput("");
      setLoading(false);
    }, 1000);
  };

  const openCitation = (citation) => {
    setPdfModal({ visible: true, citation });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow rounded p-6">
        <h1 className="text-xl font-semibold mb-4 text-center">Lexi Legal Assistant</h1>
        <div className="space-y-4 mb-4">
          {chatHistory.map((msg, idx) => (
            <ChatBubble key={idx} {...msg} onCitationClick={openCitation} />
          ))}
        </div>
        <ChatInput
          input={input}
          setInput={setInput}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>

      {pdfModal.visible && (
        <PdfViewerModal
          citation={pdfModal.citation}
          onClose={() => setPdfModal({ visible: false })}
        />
      )}
    </div>
  );
};

export default App;
