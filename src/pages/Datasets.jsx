import React, { useState } from "react";
import Popup from "../components/Popup";

function UploadDataset() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upload Dataset</h2>
      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <p className="mb-4">Choose a dataset to upload:</p>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Upload File
        </button>
      </div>

      <Popup show={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}

export default UploadDataset;
