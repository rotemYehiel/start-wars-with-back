import React from 'react';
import { createBrowserHistory } from 'history';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import { connect } from 'react-redux';

import './App.css';

import PersonList from './pages/PersonList'
import PersonEdit from './pages/PersonEdit'
import PersonDetails from './pages/PersonDetails'

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <main className="main-layout">
          <button style={(history.location.pathname === "#/PersonList") ? { visibility: "hidden" } : { visibility: "visible" }}><Link to='/PersonList'>Go To Pepole List</Link></button>
          <Switch>
            <Route path="/PersonList" exact component={PersonList} />
            <Route path="/PersonEdit" exact component={PersonEdit} />
            <Route path="/PersonEdit/:id" component={PersonEdit} />
            <Route path="/Person/:id" component={PersonDetails} />
          </Switch>
        </main>
      </Router>

    </div>
  );
}

// const mapStateToProps = (state) => {
//   // console.count('calls to state in App')
//   console.log('state in App:', state)
//   return {
//     // pepoles: state.app.pepoles,
//   }
// }
// const mapDispatchToProps = {
//   // loadPepoles
// }
// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default App