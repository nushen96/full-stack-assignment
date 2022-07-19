import ReleasesList from "./screens/ReleasesList";

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1>ReleaseCheck</h1>
        <h3>Your all-in one release checklist tool</h3>
      </div>
      <div className="app-content">
        <ReleasesList/>
      </div>
    </div>
  );
}

export default App;
