
import HeaderComponent from "./components/HeaderComponent"
import {
  Route,
  Routes
} from "react-router-dom";
import  History  from "./components/History";
import  Launches  from "./components/Launches";  
import  Rockets  from "./components/Rockets"; 
import Details from "./components/Details";
import './App.css';

function App() {
  const BrowserRouter = window.history.pathname
  return (
    <div data-testId="App" className="App">
      <header className="App-header">
        <HeaderComponent />
      </header>

      <Routes history={BrowserRouter}>
        <Route path="/" element={ <History/> } />
        <Route exact path="/launches" element={ <Launches/> } />
        <Route exact path="/rockets" element={ <Rockets/> } />
        <Route exact path="/rockets/details" element={<Details/>} />
        <Route exact path="/launches/details" element={<Details/>} />
        <Route exact path="/details" element={<Details/>} />
      </Routes>
    </div>
  );
}

export default App;
