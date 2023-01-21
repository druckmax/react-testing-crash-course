import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Todo from "../Todo";

/* When rendering the Todo component we get the error of a missing Router context. This is because when we render a parent component, we are also rendering its children, and in our case the TodoFooter is rendering a Link component. This is why we need to wrap our Todo component again in the context of a Router. */

const MockTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  );
};

// With this function we abstract the repetitive task for setting an change event and click event for each element of the provided array.
const addTask = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole("button", { name: /Add/i });
  tasks.forEach((task) => {
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.click(buttonElement);
  });
};

// Integration test
describe("Todo", () => {
  test("should render the provided user input inside of the TodoList component when the add button is clicked", () => {
    render(<MockTodo />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.change(inputElement, { target: { value: "Go grocery shopping" } });
    fireEvent.click(buttonElement);
    const divElement = screen.getByText(/Go grocery shopping/i);
    expect(divElement).toBeInTheDocument();
  });

  // We loop through the array with the add task function and retrieve all the elements by a common property. For this we utilise the data-testid property on in the TodoList component, which is set to "task-container". With getAll we get an array back, which we validate to have the length of the provided array added to the addTask function.
  test("should render multiple tasks which are added by the user one by one", () => {
    render(<MockTodo />);
    addTask(["Go grocery shopping", "Pet the cat", "Sleep"]);
    const divElements = screen.getAllByTestId("task-container");
    expect(divElements.length).toBe(3);
  });

  test("task should not have completed class when initally rendered", () => {
    render(<MockTodo />);
    addTask(["Go grocery shopping"]);
    const divElement = screen.getByText(/Go grocery shopping/i);
    expect(divElement).not.toHaveClass("todo-item-active");
  });

  test("task should have completed class when clicked", () => {
    render(<MockTodo />);
    addTask(["Go grocery shopping"]);
    const divElement = screen.getByText(/Go grocery shopping/i);
    fireEvent.click(divElement);
    expect(divElement).toHaveClass("todo-item-active");
  });
});
