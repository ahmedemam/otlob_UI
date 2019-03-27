import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

//! components
import Navbar from "./components/Navbar/Navbar";

//! pages
import HomePage from "./pages/HomePage/HomePage";
// import FriendsPage from "./pages/FriendsPage/FriendsPage";
// import GroupsPage from "./pages/GroupsPage/GroupsPage";
// import OrdersPage from "./pages/OrdersPage/OrdersPage";
import AddOrderPage from "./pages/AddOrderPage/AddOrderPage";
// import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <React.Fragment>
            <Switch>
              <Route path="/" exact component={HomePage} />
              {/* <Route path="/login" render={() => <LoginPage />} /> */}
              {/* <Route path="/register" render={() => <RegisterPage />} /> */}
              {/*<Route path="/friends" component={FriendsPage} />*/}
              {/*<Route path="/groups" component={GroupsPage} />*/}
              {/*<Route path="/orders" render={() => <OrdersPage />} />*/}
              {/*<Route path="/add-order" render={() => <AddOrderPage />} />*/}
              {/*<Route path="/order-details" render={() => <OrderDetailsPage />}/>*/}
            </Switch>
          </React.Fragment>
        </BrowserRouter>
        {/*<AddOrderPage/>*/}
      </div>
    );
  }
}

export default App;
