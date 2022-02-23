import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Loader from './components/Loader';
import { Provider } from "react-redux";
import store from './store';
import PageLogin from './components/views/PageLogin';
import PageForgotPassword from './components/views/PageForgotPassword';

//link names
import { linkForgotPassword } from "./routes";
//page names
import { linkNameForgotPassword } from "./routes";

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Page404 = React.lazy(() => import('./components/views/Page404'));

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router basename="/">
          <React.Suspense fallback={<div>Loading</div>}>
            <Switch>
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Route exact path="/" name="Login" render={props => <PageLogin {...props} />} />
              <Route
                exact
                path={linkForgotPassword}
                name={linkNameForgotPassword}
                render={props => <PageForgotPassword {...props} />}
              />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
            </Switch>
          </React.Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;
