// Validación de formularios
export const validForm = (value, type) => {
  const val = value.trim();

  const patterns = {
    string: /^[A-Za-z0-9]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  };

  // Caso vacío
  if (val === "") return "primary";

  switch (type) {
    case "email":
      return patterns.email.test(val) ? "secundary" : "error";

    case "password":
      return patterns.password.test(val) ? "secundary" : "error";

    case "string":
      return patterns.string.test(val) ? "secundary" : "error";

    case "number":
      return /^[0-9]{1,11}$/.test(val) ? "secundary" : "error";

    case "departament":
      return val === "Medico" ? "secundary" : "error";

    default:
      return "error";
  }
};
