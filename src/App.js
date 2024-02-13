import logo from './logo.svg';
import './App.css';
import Select from 'react-select'
import React, {useState,useEffect} from 'react'



function App() {
  const searchParams = new URLSearchParams(document.location.search);
  const [users, setUsers] = useState([]);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]; 
  useEffect(() => {
    fetch('https://connections-societal-thinking-f49fc4a0c28b.herokuapp.com/users')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);
  console.log(searchParams);
  return (
    <div className="App">
      {searchParams.get('user') ? 
  <Select options={options} />
: <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to           {searchParams.get('user')} reload.

        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>}
      
    </div>
  );
}

export default App;
