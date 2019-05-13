import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Overview from './components/Overview'
import AppNavBar from './components/AppNavBar'

function App() {
  const [devices, setDevices] = useState([]);

  const handleFetchDevices = () => {
    
    fetch('/api/devices')
      .then(res => {return res.json()})
      .then(data => {
        console.log(data);
        setDevices(data);
      });
  }

  return (
    <Router>
      <AppNavBar getDevices={handleFetchDevices}></AppNavBar>
      <Switch>
        <Route path="/" exact component={Overview} />
      </Switch>
    </Router>
  );
}

export default App;
