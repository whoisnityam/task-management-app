import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { TaskListPage } from "./pages/TaskListPage/TaskListPage";
import { TaskFormPage } from "./pages/TaskFormPage/TaskFormPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/task/new" element={<TaskFormPage />} />
          <Route path="/task/:id" element={<TaskFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
