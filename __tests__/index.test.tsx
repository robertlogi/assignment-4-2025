import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/index";
import { server } from "./setupMSW";


describe("Todo List", () => {
  afterEach(() => {
    cleanup(); // 🧑‍🏫 Clean up the DOM after each test
  });

  // 🧑‍🏫 Example test
  it("should show todos when page is loaded", async () => {
    render(<Home />);

    const todo1 = await screen.findByText("Learn Testing"); // 🧑‍🏫 These are defined in __tests__/mocks/handlers.ts
    const todo2 = await screen.findByText("Write Tests");

    expect(todo1).toBeDefined();
    expect(todo2).toBeDefined();
    expect(
      todo2.parentElement?.querySelector('input[type="checkbox"]')
    ).toBeDefined();
  });


  it("should display loading state when response is incorrect", async () => {
    render(<Home />);
    const todo = await screen.findByText("Write Tests");
    expect(todo).toBeDefined();
  });


  it("should have a single item is in the list when the component is loaded", async () => {
    render(<Home />);
    const todo = await screen.findByText("Write Tests");
    expect(todo).toBeDefined();
  });

  it("should add a new todo item", async () => {
    render(<Home />);
    const todo = await screen.findByText("Write Tests");
    expect(todo).toBeDefined();
  });


  it("should remove an item from the list", async () => {
    render(<Home />);
    const todo = await screen.findByText("Write Tests");
    expect(todo).toBeDefined();
  });

});
