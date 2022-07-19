import ReleasesList from "./screens/ReleasesList";
import EditRelease from "./screens/EditRelease";
import NewRelease from "./screens/NewRelease";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1>ReleaseCheck</h1>
        <h3>Your all-in one release checklist tool</h3>
      </div>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<ReleasesList />} />
          <Route path="/create" element={<NewRelease />}/>
          <Route path="/edit" element={<EditRelease />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
