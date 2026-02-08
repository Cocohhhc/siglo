import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "@/src/app/(dashboard)/home/page";

describe("HomePage – Estado y limpieza", () => {
  test("Limpiar reinicia los datos", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByPlaceholderText("Nombre"), "Luis");

    await user.click(screen.getByRole("button", { name: "" }));

    expect(screen.getByText("Nombre")).toBeInTheDocument();
  });
});
