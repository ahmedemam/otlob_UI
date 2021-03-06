import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { StreamApp } from 'react-activity-feed';
import {NotificationDropdown} from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
import "./App.css";

//! components
import Navbar from "./components/Navbar/Navbar";

//! pages
import HomePage from "./pages/HomePage/HomePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import AddOrderPage from "./pages/AddOrderPage/AddOrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";

import Login from "./pages/LoginPage/LoginPage";
import RegistrationForm from "./pages/RegisterPage/RegisterPage";
import ForgotPassword from "./pages/ForgetPage/ForgetPassword";


class App extends Component {
  constructor(props) {
    super(props);

    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    this.state = {
      user: currentUser
    };
  }

  render() {
    // return this.state.user ? (
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <React.Fragment>
            <Switch>

              <Route path="/" exact component={HomePage} />
              <Route path="/register" exact component={RegistrationForm} />
              <Route path="/login" exact component={Login} />
              <Route path="/forgotPassword" exact component={ForgotPassword} />
              {/* <Route path="/login" render={() => <LoginPage />} /> */}
              {/* <Route path="/register" render={() => <RegisterPage />} /> */}
              <Route path="/friends" component={FriendsPage} />
              <Route path="/groups" component={GroupsPage} />
              <Route path="/orders" render={() => <OrdersPage />} />
              <Route path="/add-order" render={() => <AddOrderPage />} />
              <Route
                path="/order-details"
                render={() => <OrderDetailsPage />}
              />

            </Switch>
          </React.Fragment>
        </BrowserRouter>
        {/*<AddOrderPage/>*/}
      </div>
    );
    // ) : (
    //   <>
    //     <BrowserRouter>
    //       <Switch>
    //         <Route path="/login" exact component={Login} />
    //       </Switch>
    //       <Link to="/login"> PLEASE LOGIN</Link>
    //     </BrowserRouter>
    //   </>
    // );
  }
}

export default App;
