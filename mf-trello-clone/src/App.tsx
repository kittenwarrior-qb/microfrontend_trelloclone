import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SingleLayout from "./layouts/SingleLayout";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import TrelloPage from "TrelloPage/TrelloPage";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";

import "./style.css";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<TrelloPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        <Route element={<SingleLayout />}>
          <Route path="/trello" element={<TrelloPage />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </Provider>
  );
}
