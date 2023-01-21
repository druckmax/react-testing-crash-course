import { render, screen, fireEvent } from "@testing-library/react";
import AddInput from "../AddInput";

// Here we are mocking the setTodo function, because in our first test we do not care about its functionality, yet, since we are only doing unit tests until this point. This mock function is a better approach to just simply setting setTodos to a function returning an empty object like this 'setTodos={() => {}}'.
const mockedSetTodo = jest.fn();

describe("AddInput", () => {
  // Here we are just testing that the input field is in the document. We can get an input by its placeholder text.
  test("should render input element", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });

  // Now we want to check of the user is able to type into the input field. We can do this via the fireEvent function, which we import from the testing library. We can listen for the change event with the change method. This method takes the element we want to change (in our case the inputElement) and a option which attribute of that element should be altered. With inputs this is the target.value. Dot notation unfortunately does not work. Now we check for the input element's value toBe the value we defined in the change method.
  test("should be able to type into input", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, { target: { value: "Go grocery shopping" } });
    expect(inputElement.value).toBe("Go grocery shopping");
  });

  // Here we are testing for the input field to reset to an empty string, as soon as the button is clicked. We set a value to the input with the change method, then we mimic a click event on the button with fireEvent.click, which takes the retrieved button element as an argument. Lastly we check if the inputElement value is empty.
  test("should have empty input when add button is clicked", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.change(inputElement, { target: { value: "Go grocery shopping" } });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe("");
  });
});
