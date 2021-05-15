import './App.css';
import Mplus from './components/Mplus'
import Raids from './components/Raids';
import Reset from './components/Reset';

function App() {
  return (
    <div>
      <h1>Weekly WoW</h1> 
      <div className="App">
        <Mplus></Mplus>
        <Raids difficulty="NHC"></Raids>
        <Raids difficulty="HC"></Raids>
        <Reset></Reset>
      </div>
    </div>
  );
}

export default App;
