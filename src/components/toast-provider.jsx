"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          border: "1px solid #dce5dc",
          borderRadius: "6px",
          color: "#173b2e",
          fontFamily: "inherit",
        },
      }}
    />
  );
}