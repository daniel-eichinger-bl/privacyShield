import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AppNavBar from './components/AppNavBar'
import Overview from './components/Overview'
import Details from './components/Details'

function App() {
  const mockupData = { "devices": [ { "mac": "6C:40:08:9E:EB:8E", "timestamp": 1557964958920, "ip": "10.70.107.38", "blocked": 0 }, { "mac": "04:D6:AA:C2:4B:FF", "timestamp": 1557888376044, "ip": "10.70.107.234", "blocked": 0 } ] };

  const [devices, setDevices] = useState(mockupData);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchBtn, setFetchBtn] = useState(false);

  const handleFetchDevices = () => {
    setIsLoading(true);
    fetch('/api/devices')
      .then(res => { return res.json() })
      .then(data => {
        data.devices.sort((a, b) => b.timestamp - a.timestamp);
        console.log(data);
        setDevices(data);
        setIsLoading(false);
      });
  }


  const toggleButton = (val) => {
    setFetchBtn(val);
  }


  return (
    <Router>
      <AppNavBar getDevices={handleFetchDevices} showBtn={fetchBtn}></AppNavBar>
      <Switch>
        <Route path="/" exact render={props => <Overview {...props} data={devices} isLoading={isLoading} showFetchBtn={toggleButton}/>}/>
        <Route path="/device_details/:mac/:ip/:timestamp/:blocked" component={Details}/>
      </Switch>
    </Router>
  );
}

export default App;
