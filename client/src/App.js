import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AppNavBar from './components/AppNavBar'
import Overview from './components/Overview'
import Details from './components/Details'

function App() {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchBtn, setFetchBtn] = useState(false);

  const handleFetchDevices = () => {
    setIsLoading(true);
    fetch('/api/devices')
      .then(res => { if(res.status === 200) {return res.json() }})
      .then(data => {
        data.devices.sort((a, b) => b.timestamp - a.timestamp);
        setDevices(data.devices);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }


  const toggleButton = (val) => {
    setFetchBtn(val);
  }
  
  useEffect(() => {
    handleFetchDevices();
  }, [])

  return (
    <Router>
      <AppNavBar getDevices={handleFetchDevices} showBtn={fetchBtn}></AppNavBar>
      <Switch>
        <Route path="/" exact render={props => <Overview {...props} data={devices} isLoading={isLoading} showFetchBtn={toggleButton}/>}/>
        <Route path="/device_details/:mac/:ip/:timestamp/:blocked/:name" component={Details}/>
      </Switch>
    </Router>
  );
}

export default App;
