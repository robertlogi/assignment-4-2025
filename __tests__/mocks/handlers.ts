import { http, HttpResponse } from "msw";
import type { Todo } from "../../types/todo";

const initialTodos: Todo[] = [
  { id: "1", text: "Learn Testing", completed: false },
  { id: "2", text: "Write Tests", completed: true },
];

let mockTodos = [...initialTodos];

export const resetTodos = () => {
  mockTodos = [...initialTodos];
};

export const handlers = [
  // GET /api/todos - Return the list of todos
  http.get("/api/todos", () => {
    return HttpResponse.json(mockTodos);
  }),

  // POST /api/todos - Add a new todo
  http.post("/api/todos", async ({ request }) => {
    const newTodo: Todo = await request.json();

    // Assign a unique ID to the new todo
    newTodo.id = crypto.randomUUID();

    mockTodos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  // DELETE /api/todos?id=1 - Remove a todo by query param
  http.delete("/api/todos", ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return HttpResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    mockTodos = mockTodos.filter(todo => todo.id !== id);
    return HttpResponse.json({ success: true }, { status: 200 });
  })
];
