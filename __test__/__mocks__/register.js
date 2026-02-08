export const register = jest.fn();

jest.mock("@/src/app/api/routes/route", () => ({
  register: jest.fn(),
}));
