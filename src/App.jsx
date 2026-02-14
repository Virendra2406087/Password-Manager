import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/manager";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="content">
        <div className="mana">
          <Manager />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
