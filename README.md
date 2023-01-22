# React Testing Library Crash Course

## Unit tests

```js
import { render, screen } from "@testing-library/react";
import Header from "../Header";

// Checking for text with regex, so capitalisation does not matter
test("should render same text passed into title prop", () => {
  render(<Header title="My header" />);
  const headingElement = screen.getByText(/my header/i);
  expect(headingElement).toBeInTheDocument();
});

// When having two headings in the same page this, test will fail
test("should render same text passed into title prop", () => {
  render(<Header title="My header" />);
  const headingElement = screen.getByRole("heading");
  expect(headingElement).toBeInTheDocument();
});

// Here we get only the heading element that has also the name of our title prop. Name in this case is a text match of the content. Name also applies to aria-labels
test("should render same text passed into title prop", () => {
  render(<Header title="My header" />);
  const headingElements = screen.getByRole("heading", {
    name: "My header",
  });
  expect(headingElements).toBeInTheDocument();
});

// Here we check for a title property in the heading
test("should render same text passed into title prop", () => {
  render(<Header title="My header" />);
  const headingElement = screen.getByTitle("header");
  expect(headingElement).toBeInTheDocument();
});

// Here we check for the data-testid property of the heading
test("should render same text passed into title prop", () => {
  render(<Header title="My header" />);
  const headingElement = screen.getByTestId("header-1");
  expect(headingElement).toBeInTheDocument();
});

// When retrieving multiple elements, we cannot check for the array to be in the document. But instead we can check for the length of the returned array to have a certain length
test("should render same text passed into title prop", () => {
  render(<Header title="My header" />);
  const headingElements = screen.getAllByRole("heading");
  expect(headingElements.length).toBe(2);
});

//FIND BY
// findBy is always asynchronous, so we have to specify the function to be async and await the result
test("should render same text passed into title prop", async () => {
  render(<Header title="My header" />);
  const headingElement = await screen.findByText(/my header/i);
  expect(headingElement).toBeInTheDocument();
});

// QUERY BY
// If we want to check for something that we cannot get from the document, we use queryBy. Since getBy will automatically fail, we cannot check for somethig that is NOT in the document. QueryBy will not automatically fail right away and lets us successfully run our test.
test("should render same text passed into title prop", () => {
  render(<Header title="My header" />);
  const headingElement = screen.queryByText(/dogs/i);
  expect(headingElement).not.toBeInTheDocument();
});
```

## Describe block and different assertions

```js
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
```

## Fire Events

```js
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
```

## Integration Tests

```js
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
```

## Async functions

```js
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FollowersList from "../FollowersList";

const MockFollowersList = () => {
  return (
    <BrowserRouter>
      <FollowersList />
    </BrowserRouter>
  );
};
/* In this example we check if a follower item is rendered, which is fetched from an API. Therefore it is essential to mark our test function as asynchronous and await the result when retrieving the element. Also we cannot us getBy or queryBy, but need to use the findBy methods for asynchronous behaviour. */
describe("FollowersList", () => {
  /* React testing library comes with hooks, which help us to execute logic for example before or after each test. In this example we use the beforeEach hook inside the describe block, which means beforeEach is only scoped to the tests inside of the block.*/
  beforeEach(() => {
    console.log("Running before each test...");
  });

  // beforeAll runs once before all tests inside the describe block
  beforeAll(() => {
    console.log("Running once before all tests...");
  });

  afterEach(() => {
    console.log("Running after each test...");
  });

  afterAll(() => {
    console.log("Running once after all tests...");
  });

  test("should fetch and render one follower item", async () => {
    render(<MockFollowersList />);
    const followerDivElement = await screen.findByTestId("follower-item-0");
    // With screen.debug we can see how the data from our response is rendered in the component
    // screen.debug();
    expect(followerDivElement).toBeInTheDocument();
  });

  test("should fetch and render one follower item", async () => {
    render(<MockFollowersList />);
    const followerDivElement = await screen.findByTestId("follower-item-0");
    expect(followerDivElement).toBeInTheDocument();
  });

  test("should fetch and render one follower item", async () => {
    render(<MockFollowersList />);
    const followerDivElement = await screen.findByTestId("follower-item-0");
    expect(followerDivElement).toBeInTheDocument();
  });

  // test("should fetch and render multiple follower items", async () => {
  //   render(<MockFollowersList />);
  //   const followerDivElements = await screen.findAllByTestId(/follower-item-/i);
  //   expect(followerDivElements.length).toBe(5);
  // });
});
```

## Mocking axios

```js
/* When testing asynchronous code that is reliant on an API response, in order to test our application it is a good idea to mock the response.
One way of doing that is mocking axios. For that we create a folder called '__mocks__' (name is important), in which we put a regular .js file which contains the mocked version of axios, in our case. It is important that the name of the file is exactly the same as the name of the function we want to mock.
One issue is that React by default will automatically reset our mock every time. One way is to change code directly in react-scripts inside of node_modules, another solution is to simply add following code to our package.json file:

jest": {

    "resetMocks": false

  },

*/

const mockResponse = {
  data: {
    results: [
      {
        name: {
          first: "Laith",
          last: "Harp",
        },
        picture: {
          large: "https://randomuser.me/api/portraits/men/39.jpg ",
        },
        login: {
          username: "HarpyHarper",
        },
      },
    ],
  },
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
```

## Mocking API endpoint with msw

```js
import { rest } from "msw";
import { setupServer } from "msw/node";
/* Instead of mocking axios in a __mock__ folder, we can also mock an API endpoint with msw (mock service worker).
We install the msw package as a dev dependency. */

const server = setupServer(
  rest.get("https://randomuser.me/api/?results=5", (req, res, ctx) => {
    return res(ctx.json(mockResponse));
  })
);
```
