import { render, screen } from "@testing-library/react";
import Header from "../Header";

// Unit tests
// Checking for text with regex, so capitalisation does not matter
test("should render same text passed into title prop", () => {
  render(<Header title="My header" />);
  const headingElement = screen.getByText(/my header/i);
  expect(headingElement).toBeInTheDocument();
});

// When having two headings in the same page this, test will fail
// test("should render same text passed into title prop", () => {
//   render(<Header title="My header" />);
//   const headingElement = screen.getByRole("heading");
//   expect(headingElement).toBeInTheDocument();
// });

// // Here we get only the heading element that has also the name of our title prop. Name in this case is a text match of the content. Name also applies to aria-labels
// test("should render same text passed into title prop", () => {
//   render(<Header title="My header" />);
//   const headingElements = screen.getByRole("heading", {
//     name: "My header",
//   });
//   expect(headingElements).toBeInTheDocument();
// });

// // Here we check for a title property in the heading
// test("should render same text passed into title prop", () => {
//   render(<Header title="My header" />);
//   const headingElement = screen.getByTitle("header");
//   expect(headingElement).toBeInTheDocument();
// });

// // Here we check for the data-testid property of the heading
// test("should render same text passed into title prop", () => {
//   render(<Header title="My header" />);
//   const headingElement = screen.getByTestId("header-1");
//   expect(headingElement).toBeInTheDocument();
// });

// // When retrieving multiple elements, we cannot check for the array to be in the document. But instead we can check for the length of the returned array to have a certain length
// test("should render same text passed into title prop", () => {
//   render(<Header title="My header" />);
//   const headingElements = screen.getAllByRole("heading");
//   expect(headingElements.length).toBe(2);
// });

// //FIND BY
// // findBy is always asynchronous, so we have to specify the function to be async and await the result
// test("should render same text passed into title prop", async () => {
//   render(<Header title="My header" />);
//   const headingElement = await screen.findByText(/my header/i);
//   expect(headingElement).toBeInTheDocument();
// });

// // QUERY BY
// // If we want to check for something that we cannot get from the document, we use queryBy. Since getBy will automatically fail, we cannot check for somethig that is NOT in the document. QueryBy will not automatically fail right away and lets us successfully run our test.
// test("should render same text passed into title prop", () => {
//   render(<Header title="My header" />);
//   const headingElement = screen.queryByText(/dogs/i);
//   expect(headingElement).not.toBeInTheDocument();
// });
