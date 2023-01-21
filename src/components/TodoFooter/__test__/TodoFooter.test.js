import { render, screen } from "@testing-library/react";
import TodoFooter from "../TodoFooter";
import { BrowserRouter } from "react-router-dom";

const MockTodoFooter = ({ numberOfIncompleteTasks }) => {
  return (
    <BrowserRouter>
      <TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks} />
    </BrowserRouter>
  );
};

// We can use describe blocks to group and organize common tests. All the tests below describe the TodoFooter, which makes them suitable for a describe block. It is also possible to have another child-describe-block nested inside another describe block to further pin down and describe the purpose of these tests. A describe block takes the description of the block as the first argument and needs a callback function as the second argument, in which we define all of our grouped tests.

describe("test the content of the TodoFooter", () => {
  test("should render correct amount of incomplete tasks", () => {
    render(<MockTodoFooter numberOfIncompleteTasks={5} />);
    const paragraphElement = screen.getByText(/5 tasks left/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  // Here we are using the toBeVisible assertion. This is different to be toBeInDocument as we are checking if the element is actually visible to the user (e.g. no visibility:hidden or opacity:0)
  test("should render singular 'task' if number of tasks is 1", () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByText(/1 task left/i);
    expect(paragraphElement).toBeVisible();
  });

  // Here we check for a certain HTML element inside of the footer
  test("should render singular 'task' if number of tasks is 1", () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByText(/1 task left/i);
    expect(paragraphElement).toContainHTML("p");
  });

  // Here we check for a for text content in the assertion. This can be used if we cannot get the element by text but only by test id or role for example. So after we've got the element we check for the text content in the second step.
  test("should render singular 'task' if number of tasks is 1", () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByTestId("paragraph");
    expect(paragraphElement).toHaveTextContent("1 task left");
  });

  // We also have access to the attributes of the retrieved HTML element right away. In this case we can access the textContent of the retrieved paragraph element. Same is true for the value attribute of an input tag for example.
  test("should render singular 'task' if number of tasks is 1", () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByTestId("paragraph");
    expect(paragraphElement.textContent).toBe("1 task left");
  });

  // It is also possible to have multiple assertions in one test. But generally speaking it is better to limit the number of assertions to a minimum and not make the tests too complex.
  test("should render singular 'task' if number of tasks is 1", () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const paragraphElement = screen.getByTestId("paragraph");
    expect(paragraphElement.textContent).toBe("1 task left");
    expect(paragraphElement).toBeTruthy();
    expect(paragraphElement).toHaveTextContent("1 task left");
  });

  /* Because we are using the Link element inside the TodoFooter component, all tests will fail, because <Link> cannot be used outside of the context of a react-router-dom Router.
      In order to solve this problem, we can create a mock component of the TodoFooter, which wraps the actual component we want to test inside of a BrowserRouter. This mock component is a regular hook component, which takes the prop we want to test for as prop, and then passes it down to the to-be-tested component.
      This way we can mimic the the behaviour of a React Router and make our test pass.
       */
});
