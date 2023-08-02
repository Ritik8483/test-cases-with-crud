import { fireEvent, render, screen } from "@testing-library/react";
import TotalSum from "../pages/TotalSum";

describe("Hooks USECOUNTER TESTS", () => {
  it("should render Total sum component", () => {
    render(<TotalSum />);
    const heading = screen.getByRole("heading", { name: /total sum/i });
    const findSumBtn = screen.getByRole("button", { name: /find sum/i });
    expect(heading).toBeInTheDocument();
    expect(findSumBtn).toBeInTheDocument();
  });
  it("Calculates and Shows the Sum on Button Click", async () => {
    render(<TotalSum />);
    const findSumBtn = screen.getByRole("button", { name: /find sum/i });
    fireEvent.click(findSumBtn);
    // const sumResult = await screen.findByText("25");
    const sumResult = screen.getByText("25");
    expect(sumResult).toBeInTheDocument();
  });
  xit("calculates and displays the sum correctly", () => {
    render(<TotalSum />);
    const findSumBtn = screen.getByRole("button", { name: /find sum/i });

    window.prompt = jest //mocking window.prompt here
      .fn()
      .mockReturnValueOnce("10") // First prompt value
      .mockReturnValueOnce("20"); // Second prompt value

    fireEvent.click(findSumBtn);

    const sumValue = screen.getByText("30");
    expect(sumValue).toBeInTheDocument();
  });

  xit("displays NaN for invalid input", () => {
    render(<TotalSum />);
    const findSumBtn = screen.getByRole("button", { name: /find sum/i });

    window.prompt = jest
      .fn()
      .mockReturnValueOnce("abc") // Invalid input
      .mockReturnValueOnce("20"); // Second prompt value

    fireEvent.click(findSumBtn);

    const sumValue = screen.getByText("NaN");
    expect(sumValue).toBeInTheDocument();
  });
});
