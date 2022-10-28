import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { SideBarProvider } from "./context/sideBarContext";

function App() {
  return (
    <div className="App">
      <SideBarProvider>
        <Dashboard />
      </SideBarProvider>
    </div>
  );
}

export default App;
