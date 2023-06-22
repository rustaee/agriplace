import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Main } from "components/Main";
import { Vegetables } from "./components/Vegetables";
import { Fruits } from "./components/Fruits";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/admin" element={<Navigate to="/admin/fruits" />} />
          <Route path="/admin/vegetables" element={<Vegetables />} />
          <Route path="/admin/fruits" element={<Fruits />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
