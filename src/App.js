import "./App.css";

import Users from "./components/Users";

function App() {
  return (
    <>
      <h1 className="intro">Split bill between your friends</h1>
      <div className="app">
        <Users />
      </div>
    </>
  );
}

export default App;
