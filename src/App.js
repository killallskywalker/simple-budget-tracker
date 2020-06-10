import React from 'react';
import { Route, Switch } from "react-router-dom";
import Welcome from './pages/SplashScreen';
import Dashboard from './pages/Dashboard';
import AddRecord from './pages/record/AddRecord';
import EditRecord from './pages/record/EditRecord';
import Setting from './pages/setting/Setting';
import Filter from './pages/filter/Filter';



const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/add-record">
            <AddRecord/>
        </Route>
        <Route path="/edit-record/:dailyTransactionId">
          <EditRecord />
        </Route>
        <Route path="/setting">
          <Setting />
        </Route>
        <Route path="/filter">
          <Filter />
        </Route>
    </Switch>
  </div>
  );
}

export default App;
