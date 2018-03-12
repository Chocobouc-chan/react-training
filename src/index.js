import React from "react";
import { render } from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem"
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux'

import { SearchField } from "./SearchField";
import { Repository } from "./Repository";
import { SingleRepo } from "./SingleRepo";
import { store } from "./store";

class App extends React.Component {
  state = {
    username: "",
    currentRepo: {},
    open: false
  };
  handleMenu = () => {
    this.setState((previousState, props) => ({ open: !previousState.open }));
  }

  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
        <div style={this.style}>
          <AppBar
            title="Github Dashboard sample"
            onLeftIconButtonClick={this.handleMenu}
          />
          <Drawer open={this.state.open}
            docked={false}
            width={200}
            onRequestChange={(open) => this.setState({ open })}>
            <a href="/"><MenuItem>Search</MenuItem></a>
          </Drawer>
          <Router>
            <div>
              <Route exact path="/" component={SearchField} />
              <Route path="/repository" component={Repository} />
              <Route path="/singleRepo" component={SingleRepo} />
            </div>
          </Router>
        </div>
        </Provider>
      </MuiThemeProvider>
    );
  }

  style = {
    display: "flex",
    "alignItems": "center",
    "flexDirection": "column"
  };
}

render(<App />, document.getElementById("root"));