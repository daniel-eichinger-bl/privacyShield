import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Overview from './components/Overview'
import AppNavBar from './components/AppNavBar'

function App() {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchDevices = () => {
    setIsLoading(true);
    fetch('/api/devices')
      .then(res => {return res.json()})
      .then(data => {
        console.log(data);
        setDevices(data);
        setIsLoading(false);
      });
  }

  return (
    <Router>
      <AppNavBar getDevices={handleFetchDevices}></AppNavBar>
      <Switch>
        <Route path="/" exact render={props => <Overview {...props} devices={devices} isLoading={isLoading}/> } />
      </Switch>
    </Router>
  );
}

export default App;
