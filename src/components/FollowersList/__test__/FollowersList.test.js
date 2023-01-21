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
  test("should fetch and render one follower item", async () => {
    render(<MockFollowersList />);
    const followerDivElement = await screen.findByTestId("follower-item-0");
    expect(followerDivElement).toBeInTheDocument();
  });

  test("should fetch and render multiple follower items", async () => {
    render(<MockFollowersList />);
    const followerDivElements = await screen.findAllByTestId(/follower-item-/i);
    expect(followerDivElements.length).toBe(5);
  });
});
