import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FollowersList from "../components/FollowersList/FollowersList";

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

/* Instead of mocking axios in a __mock__ folder, we can also mock an API endpoint with msw (mock service worker).
We install the msw package as a dev dependency. */

const server = setupServer(
  rest.get("https://randomuser.me/api/?results=5", (req, res, ctx) => {
    return res(ctx.json(mockResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("gets the data", async () => {
  render(<FollowersList />);
  const out = await waitFor(() => screen.findByTestId("follower-item-0"));
  expext(out).toHaveTextContent();
});
