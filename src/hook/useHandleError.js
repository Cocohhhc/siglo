"use client";

import { useState } from "react";

export function useFormErrors() {
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleError = (response) => {
    if (!response.ok) {
      if (response.field) {
        setErrors((prev) => ({
          ...prev,
          [response.field]: response.message,
        }));
      } else {
        setGeneralError(response.message);
      }
    }
  };

  const clearErrors = () => {
    setErrors({});
    setGeneralError("");
  };

  return {
    errors,
    generalError,
    handleError,
    clearErrors,
  };
}