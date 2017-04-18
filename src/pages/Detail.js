import React from 'react';
import ajax from 'superagent';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { forks: [], commits: [], pulls: [], view: 1 };
  }

  componentWillMount() {
    ajax
      .get('https://api.github.com/repos/facebook/react/commits')
      .end((error, response) => {
        if (!error && response) {
          console.dir(response.body);
          this.setState({ commits: response.body });
        } else {
          console.log('There was an error fetching from GitHub', error);
        }
      });
    ajax
      .get('https://api.github.com/repos/facebook/react/forks')
      .end((error, response) => {
        if (!error && response) {
          console.dir(response.body);
          this.setState({ forks: response.body });
        } else {
          console.log('There was an error fetching from GitHub', error);
        }
      });
    ajax
      .get('https://api.github.com/repos/facebook/react/pulls')
      .end((error, response) => {
        if (!error && response) {
          console.dir(response.body);
          this.setState({ pulls: response.body });
        } else {
          console.log('There was an error fetching from GitHub', error);
        }
      });
  }

  buttonClicked(viewId) {
    this.setState({ view: viewId });
  }

  renderButtons() {
    return (
      <div>
        <button onClick={() => this.buttonClicked(1)}>Commits</button>
        <button onClick={() => this.buttonClicked(2)}>Pulls</button>
        <button onClick={() => this.buttonClicked(3)}>Forks</button>
      </div>
    );
  }

  renderSelectedView() {
    let selectedView;
    switch (this.state.view) {
      case 1:
        selectedView = this.renderCommits();
        break;
      case 2:
        selectedView = this.renderPullRequests();
        break;
      case 3:
        selectedView = this.renderForks();
        break;
    }
    return (
      <div>
        {selectedView}
      </div>
    );
  }

  renderCommits() {
    return (
      <div>
        {this.state.commits.map((commit, index) => {
            const author = commit.author ? commit.author.login : 'Anonymous';

            return (
              <div key={index}>
                <strong>{author}</strong>
                <a href={commit.html_url}>{commit.commit.message}</a>
              </div>
            );
          })}
      </div>
    );
  }

  renderForks() {
    return (
      <div>
        {this.state.forks.map((fork, index) => {
            return (
              <div key={index}>
                <strong>{fork.owner.login}</strong>
                <a href={fork.html_url}>{fork.description}</a>
              </div>
            );
          })}
      </div>
    );
  }

  renderPullRequests() {
    return (
      <div>
        {this.state.pulls.map((pull, index) => {
            return (
              <div key={index}>
                <strong>{pull.user.login}</strong>
                <a href={pull.html_url}>{pull.title}</a>
              </div>
            );
          })}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderButtons()}
        {this.renderSelectedView()}
      </div>
    );
  }
}

export default Detail;

