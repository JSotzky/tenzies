import logo from './logo.svg';
import './App.css';
import Die from './components/die.js'

function App() {
  return (
    <div className="App">
      <main>
      <div className='dicebox'>
                <Die value="1"/>
                <Die value="1"/>
                <Die value="1"/>
                <Die value="1"/>
                <Die value="1"/>
                <Die value="1"/>
                <Die value="1"/>
                <Die value="1"/>
                <Die value="1"/>
                <Die value="1"/>
            </div>
      </main>
    </div>
  );
}

export default App;
