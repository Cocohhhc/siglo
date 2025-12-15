"use client";
import { useState, useEffect } from "react";

export function useFormSession() {
  const [data, setData] = useState(null);

  // Al cargar la app, lee la sesión
  useEffect(() => {
    const saved = sessionStorage.getItem("formData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  // Guardar datos (form → sesión)
  const saveData = (newData) => {
    setData(newData);
    sessionStorage.setItem("formData", JSON.stringify(newData));
  };

  // Borrar datos (cuando vuelves al form)
  const clearData = () => {
    setData(null);
    sessionStorage.removeItem("formData");
  };

  return { data, saveData, clearData };
}
