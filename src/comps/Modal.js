import React from "react";
import { motion } from "framer-motion";
import { firebaseFireStore } from "../firebase/config";

const Modal = ({ setSelectedImg, selectedImg }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  const datifyUploadTime = (seconds) => {
    const date = new Date(seconds * 1000).toLocaleString("tr-TR", {
      timeZone: "America/New_York",
    }); // convert to local time
    return date;
  };

  const handleDelete = async (img) => {
    console.log("delete fired", img);
    firebaseFireStore.collection("images").doc(img.id).delete();
    setSelectedImg(null);
  };

  return (
    <>
      <motion.div
        className="backdrop"
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.img
          src={selectedImg.url}
          className="image"
          alt="enlarged pic"
          initial={{ y: "-200vh" }}
          animate={{ y: 0 }}
        />
        <motion.div className="text">
          <div className="info-container">
            <h1 className="name">{selectedImg.metadata.name}</h1>
            <p className="date">
              {datifyUploadTime(selectedImg.createdAt.seconds)}
            </p>
          </div>
          <button
            className="delete-btn"
            onClick={() => handleDelete(selectedImg)}
          >
            U
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Modal;
