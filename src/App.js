import logo from "./logo.svg";
import "./App.css";
import Banner from "./components/Banner/Banner";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import TodoPage from "./pages/TodoPage/TodoPage";
import FollowersPage from "./pages/FollowersPage/FollowersPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Banner />
        <Routes>
          <Route strict exact path="/" element={<TodoPage />} />
          <Route strict exact path="/followers" element={<FollowersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
