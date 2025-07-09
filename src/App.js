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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Lexi Legal Assistant</h1>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {chatHistory.map((msg, idx) => (
            <ChatBubble key={idx} {...msg} onCitationClick={openCitation} />
          ))}
        </div>

        <div className="mt-6">
          <ChatInput
            input={input}
            setInput={setInput}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>
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
