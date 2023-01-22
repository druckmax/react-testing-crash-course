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
