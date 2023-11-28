import LogoIcon from "./UI/Logo";
import MainContent from "./modules/MainContent";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LogoIcon style={{ margin: "50px 0" }} />
      </div>
      <MainContent />
    </div>
  );
}

export default App;
