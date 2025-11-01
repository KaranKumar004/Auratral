import React from "react";

function Popup({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm text-center">
        <p className="mb-4">This is a demo version — data upload is not enabled.</p>
        <button
          onClick={onClose}
          className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default Popup;
