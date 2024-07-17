"use client";

import React from "react";
import { useState } from "react";
import PopUpCoinTemplate from "../portfolioComponents/popUpCoinTemplate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ButtonProps {
  text: string;
}

const BaseButton: React.FC<ButtonProps> = ({ text }) => {
  const [showAddAssetContainer, setShowAddAssetContainer] = useState(false);

  const handleClick = () => {
    setShowAddAssetContainer(!showAddAssetContainer);
  };

  const successfulClick = () => {
    toast.success("Coin Successfully Added!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const failureClick = () => {
    toast.error("Failure to Add Coin!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex h-10 w-48 items-center justify-center rounded-md bg-light-purple-full text-lg"
      >
        {text}
      </button>
      {showAddAssetContainer && (
        <PopUpCoinTemplate
          successClick={successfulClick}
          failureClick={failureClick}
          handleClick={handleClick}
        />
      )}
      <div className="absolute">
        <ToastContainer />
      </div>
    </>
  );
};

export default BaseButton;
