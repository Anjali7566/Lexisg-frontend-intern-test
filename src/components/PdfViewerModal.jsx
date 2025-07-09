import React from "react";
import "../index.css";

const PdfViewerModal = ({ citation, onClose }) => {
  if (!citation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 w-11/12 h-[90vh] rounded relative shadow-xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Close
        </button>

        {/* Open in New Tab Button */}
        <a
          href={citation.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-24 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Open PDF in New Tab
        </a>

        {/* Simulated Paragraph Highlight Info */}
        <div className="text-sm text-gray-700 dark:text-gray-300 text-center py-2 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
          📌 Scrolling to <strong>Paragraph {citation.paragraph || "7"}</strong> —<br />
          <em>“{citation.text.slice(0, 100)}...”</em>
        </div>

        {/* PDF Iframe Viewer */}
        <iframe
          src={`${citation.link}#page=1`}
          title="PDF Viewer"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default PdfViewerModal;
