"use client";
import { useState } from "react";

export function useFormSession() {
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("formData");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const saveData = (newData) => {
    setData(newData);
    sessionStorage.setItem("formData", JSON.stringify(newData));
  };

  const clearData = () => {
    setData(null);
    sessionStorage.removeItem("formData");
  };

  return { data, saveData, clearData };
}