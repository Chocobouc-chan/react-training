import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { compose } from "redux";
import { connect } from "react-redux";
import { setSearch } from "./actions";
import { withRouter } from 'react-router'

class SearchFieldComponent extends React.Component {
  state = {
    username: "",
  };

  handleSearchClick = () => {
    const { history, updateSearch } = this.props;
    const { username } = this.state;
    updateSearch(username);
    history.push(`/repository/`);
  };

  handleUserWriting = event => this.setState({ username: event.target.value });

  render() {
      return (
        <div style={this.style}>
          <div style={this.alignStyle}>
            <TextField
              hintText="Username"
              onChange={this.handleUserWriting}
              style={this.marginRight}
            />
            <RaisedButton
              label="Search"
              secondary={true}
              onClick={this.handleSearchClick}
            />
          </div>
          <div style={this.disabled}>
            <TextField
              value={this.state.username}
              hintText="Username will appear here"
            />
          </div>
        </div>
      );
  }
  disabled = {
    disabled: "true"
  };
  marginRight = {
    "marginRight": "20px"
  };
}

const mapDispatchToProps = dispatch => ({
  updateSearch: searchTerm => dispatch(setSearch(searchTerm))
});

export const SearchField = compose (connect(null,mapDispatchToProps), withRouter)(SearchFieldComponent);
