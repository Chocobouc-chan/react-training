import React from "react";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import Chip from "material-ui/Chip";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress"
import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { setCurrentRepository } from "./actions";

class RepositoryComponent extends React.Component {
  state = {
    userRepo: null,
    userInfo: null,
    search: "",
    currRepo:"",
    errorBlock:""
  };

  async componentWillMount() {
    const { search } = this.props;
    await this.loadUserInfoInState(search)
  }

  async loadUserInfoInState(username) {
    let rawUserData = await fetch(
      `https://api.github.com/users/${username}`
    );
    
    switch (rawUserData.status){
      case 403:
        this.setState({ errorBlock:<h1>GIT API CALL LIMIT</h1> })
        return
      case 404:
        this.setState({ errorBlock:<h1>USER NOT FOUND</h1> })
        return
      default:
        this.setState({ errorBlock:<CircularProgress size={60} thickness={7}/> })
    }
    
    let rawUserRepoData = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    let userData = await rawUserData.json();
    let userRepoData = await rawUserRepoData.json();
    await this.setState({
      userRepo: userRepoData,
      userInfo: userData
    });
    sessionStorage.setItem("repositories", JSON.stringify(userRepoData))
  }

  onItemClick = repoId => {
    let { history, updateCurrentRepo } = this.props
    updateCurrentRepo(repoId)
    history.push("/singleRepo");
  };

  render() {
    const { userRepo, userInfo } = this.state;
    let repoBlock = null;
    if (userRepo !== null && userInfo !== null) {
      repoBlock = userRepo.map(repo => {
        return (
          <div key = {repo.id}>
            <ListItem
              leftIcon={<ContentInbox />}
              onClick={() => this.onItemClick(repo.id)}
            >
              {repo.name}
            </ListItem>
          </div>
        );
      });
    }
    if (userInfo !== null){
      return (
        <div style={this.style}>
          <div>
            <Chip>
              <Avatar src={userInfo.avatar_url} />
              {userInfo.login}
            </Chip>
          </div>
          <List>{repoBlock}</List>
        </div>
      );
    }
    else return this.state.errorBlock
   
  }

  style = {
    display: "flex",
    "alignItems": "center",
    "flexDirection": "column",
    "marginTop": "25px"
  };

}
const mapStateToProps = state => ({
  search: state.search
});

const mapDispatchToProps = dispatch => ({
  updateCurrentRepo: currRepo => dispatch(setCurrentRepository(currRepo))
});

export const Repository = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  RepositoryComponent
);