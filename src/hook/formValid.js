const patterns = {
  string: /^[A-Za-z0-9 ]{3,20}$/,
  number: /^[0-9]{1,11}$/,
  email: /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/,
  date: /^(?:19|20)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/,
};

// =========================
// Validación real de cédula
// =========================
export function validateCedula(cedula) {
  if (!cedula) return false;

  cedula = cedula.replace(/-/g, '');

  if (!/^\d{11}$/.test(cedula)) return false;

  const pesos = [1, 2];
  let suma = 0;

  for (let i = 0; i < 10; i++) {
    let num = parseInt(cedula[i], 10);
    let mult = num * pesos[i % 2];

    if (mult > 9) {
      mult = Math.floor(mult / 10) + (mult % 10);
    }

    suma += mult;
  }

  const digitoVerificador = (10 - (suma % 10)) % 10;

  return digitoVerificador === parseInt(cedula[10], 10);
}

// =========================
// Mapa de validadores
// =========================
const validators = {
  string: (value) => patterns.string.test(value),
  number: (value) => patterns.number.test(value),
  email: (value) => patterns.email.test(value),
  password: (value) => patterns.password.test(value),
  date: (value) => patterns.date.test(value),
  idCard: validateCedula,
  department: (value) => value == "1", // ajustable
};

// =========================
// Validar un solo campo
// =========================
export const showValue = (value, type) => {
  if (value === undefined || value === null || value === "")
    return "primary";

  const validator = validators[type];

  if (!validator) return "error";

  return validator(value) ? "success" : "error";
};

// =========================
// Validar formulario dinámico
// =========================
export const validateData = (data, schema) => {
  return Object.entries(schema).every(([field, type]) => {
    const value = data[field];
    return showValue(value, type) === "success";
  });
};