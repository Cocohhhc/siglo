import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "@/src/app/(dashboard)/home/page";
import { register } from "@/src/app/api/routes/route";

jest.mock("@/src/app/api/routes/route", () => ({
  register: jest.fn(),
}));

describe("HomePage – Tests críticos de negocio", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("❌ NO envía si hay campos vacíos", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.click(screen.getByRole("button", { name: /guardar/i }));

    expect(register).not.toHaveBeenCalled();
  });

  test("❌ NO envía si edad es inválida", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByPlaceholderText("Nombre"), "Luis");
    await user.type(screen.getByPlaceholderText("Apellido"), "Perez");
    await user.type(screen.getByPlaceholderText("Edad"), "0");
    await user.type(
      screen.getByPlaceholderText("Fecha de nacimiento"),
      "2024-01-01"
    );
    await user.type(screen.getByPlaceholderText("Cedula"), "123");

    await user.click(screen.getByRole("button", { name: /guardar/i }));

    expect(register).not.toHaveBeenCalled();
  });

  test("✅ Envía SOLO una vez con datos válidos", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByPlaceholderText("Nombre"), "Luis");
    await user.type(screen.getByPlaceholderText("Apellido"), "Perez");
    await user.type(screen.getByPlaceholderText("Edad"), "25");
    await user.type(
      screen.getByPlaceholderText("Fecha de nacimiento"),
      "2024-01-01"
    );
    await user.type(screen.getByPlaceholderText("Cedula"), "123");

    await user.click(screen.getByRole("button", { name: /guardar/i }));

    expect(register).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith({
      name: "Luis",
      lastName: "Perez",
      age: 25,
      date_of_birth: "2024-01-01",
      IdNumber: "123",
    });
  });

  test("❌ NO envía si la fecha es inválida", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByPlaceholderText("Nombre"), "Luis");
    await user.type(screen.getByPlaceholderText("Apellido"), "Perez");
    await user.type(screen.getByPlaceholderText("Edad"), "25");
    await user.type(
      screen.getByPlaceholderText("Fecha de nacimiento"),
      "fecha-rara"
    );
    await user.type(screen.getByPlaceholderText("Cedula"), "123");

    await user.click(screen.getByRole("button", { name: /guardar/i }));

    expect(register).not.toHaveBeenCalled();
  });
});
