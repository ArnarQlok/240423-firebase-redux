import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import MovieList from "./components/MovieList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<MovieList />} />
      </Routes>
    </div>
  );
}

export default App;
