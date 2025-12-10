"use client";
import { createContext, useState, useContext } from "react";

const FormDataContext = createContext();

export function FormDataProvider({ children }) {
    const [formData, setFormData] = useState({});

    return (
        <FormDataContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormDataContext.Provider>
    );
}

export function useFormData() {
    return useContext(FormDataContext);
}
