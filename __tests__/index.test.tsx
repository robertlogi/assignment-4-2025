import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw"; // ✅ Fix: Import rest
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

  it("should display loading state when fetching data", async () => {
    server.use(
      rest.get("/api/todos", (_, res, ctx) => res(ctx.delay(5000)))
    );

    render(<Home />);
    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  it("should add a new todo item", async () => {
    render(<Home />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const addButton = screen.getByText(/add/i);

    await userEvent.type(input, "New Task");
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });

  it("should remove an item from the list", async () => {
    render(<Home />);

    await waitFor(async () => {
      const deleteButton = await screen.findByRole("button", { name: /delete/i });
      await userEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(screen.queryByText("Learn Testing")).not.toBeInTheDocument();
    });
  });
});