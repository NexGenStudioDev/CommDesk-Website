import { describe, it, expect } from "vitest";
import { add, divide, multiply, subtract } from "../src/features/utils/math";



describe("Math Utility Functions", () => {

  it("should add two numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("should subtract two numbers correctly", () => {
    expect(subtract(5, 3)).toBe(2);
  });

  it("should multiply two numbers correctly", () => {
    expect(multiply(4, 3)).toBe(12);
  });

  it("should divide two numbers correctly", () => {
    expect(divide(10, 2)).toBe(5);
  });

  it("should throw error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });

});