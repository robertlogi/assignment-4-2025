import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/index";
import { rest } from "msw";
import { server } from "../__tests__/mocks/handlers";


describe("Todo List", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show todos when page is loaded", async () => {
    render(<Home />);

    const todo1 = await screen.findByText("Learn Testing");
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
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should add a new todo item", async () => {
    render(<Home />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const addButton = screen.getByText("Add");

    await userEvent.type(input, "New Task");
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });

  it("should remove an item from the list", async () => {
    render(<Home />);

    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("Learn Testing")).not.toBeInTheDocument();
    });
  });
});
