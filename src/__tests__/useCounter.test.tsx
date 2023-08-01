import { act, renderHook, screen } from "@testing-library/react";
import { useCounter } from "../components/hooks/useCounter";

describe.skip("Hooks USECOUNTER TESTS", () => {
  it("should render initial count", () => {
    const { result }: any = renderHook(() => useCounter());
    // console.log("result", result);
    expect(result.current.count).toBe(0);
  });

  it("should accept and render the same initial count", () => {
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialCount: 10,
      },
    });
    // console.log("result", result);
    expect(result.current.count).toBe(10);
  });

  it("should increment the count", () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it("should decrement the count", () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.decrement());
    expect(result.current.count).toBe(-1);
  });
});
