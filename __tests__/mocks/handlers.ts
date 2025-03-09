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
    mockTodos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  // DELETE /api/todos/:id - Remove a todo
  http.delete("/api/todos/:id", ({ params }) => {
    const { id } = params;
    mockTodos = mockTodos.filter(todo => todo.id !== id);
    return HttpResponse.json({ success: true }, { status: 200 });
  })
];
