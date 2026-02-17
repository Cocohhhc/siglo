const patterns = {
    string: /^[A-Za-z0-9 ]{3,20}$/,
    email: /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/,
};


// Validación de formularios
export const showValue = (value, type) => {

  // Caso vacío
  if (value === "") return "primary";
  const choice = () => {
    switch (type) {
    case "email":
      return patterns.email.test(value) ? "success" : "error";

    case "password":
      return patterns.password.test(value) ? "success" : "error";

    case "string":
      return patterns.string.test(value) ? "success" : "error";

    case "number":
      return /^[0-9]{1,11}$/.test(value) ? "success" : "error";

    case "departament":
      return value === "1" ? "success" : "error";

    case "date":
      return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value) ? "success" : "error";

    case "idCard":
      return /^[0-9]{1,11}$/.test(value) ? "success" : "error";
      
    default:
      return "error";
  }
};
  return choice();
};

export const validateData = (data) => {
  const { name, lastName, email, password, cardId, departament } = data;

  if (
    showValue(name, "string") === "success" &&
    showValue(lastName, "string") === "success" &&
    showValue(email, "email") === "success" &&
    showValue(password, "password") === "success" &&
    showValue(cardId, "number") === "success" &&
    showValue(departament, "departament") === "success"
  ) {
    return data;
  }
  return false;
}