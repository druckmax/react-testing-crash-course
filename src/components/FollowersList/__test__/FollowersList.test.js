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
