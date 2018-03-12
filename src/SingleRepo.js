import React from "react";
import Paper from "material-ui/Paper";
import { compose } from "redux";
import { connect } from "react-redux";

class SingleRepoComponent extends React.Component {
  state = {
    currRepo: {}
  };

  async componentWillMount() {
    let { currRepo } = this.props
    console.log(currRepo)
    let repoInfo = JSON.parse(sessionStorage.getItem("repositories")).filter (value => value.id === currRepo)
    await this.setState({ currRepo: repoInfo[0] });
  }

  render() {
    let { currRepo } = this.state
      return (
        <Paper zDepth={2} style={this.style}>
          <h4>Name: {currRepo.name}</h4>
          <h5>Language: {currRepo.language}</h5>
          <h5>Stars: {currRepo.stargazers_count}</h5>
          <h5>Description: {currRepo.description}</h5>
          <h5>Creation date: {currRepo.created_at}</h5>
          <h5>Update date: {currRepo.updated_at}</h5>
          <h5>URL: {currRepo.url}</h5>
        </Paper>
      );
  }

  style = {
    "marginTop": "35px",
    padding: "15px"
  };
}

const mapStateToProps = state => ({
  currRepo: state.currRepo
});

export const SingleRepo = compose (connect(mapStateToProps))(SingleRepoComponent);
