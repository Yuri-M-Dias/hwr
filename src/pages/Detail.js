import React from 'react';
import ajax from 'superagent';
import Link from 'react-router';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { forks: [], commits: [], pulls: [], mode: 'commits' };
  }

  componentWillMount() {
    this.fetchFeed('commits');
    this.fetchFeed('forks');
    this.fetchFeed('pulls');
  }

  fetchFeed(type) {
    ajax
      .get(`https://api.github.com/repos/facebook/react/${type}`)
      .end((error, response) => {
        if (!error && response) {
          console.dir(response.body);
          this.setState({ [type]: response.body });
        } else {
          console.log(`Error fetching ${type}`, error);
        }
      });
  }

  selectMode(mode) {
    this.setState({ mode });
  }

  renderButtons() {
    return (
      <div>
        <button onClick={this.selectMode.bind(this, 'commits')}>Commits</button>
        <button onClick={this.selectMode.bind(this, 'forks')}>Forks</button>
        <button onClick={this.selectMode.bind(this, 'pulls')}>Pulls</button>
      </div>
    );
  }

  renderSelectedMode() {
    let selectedMode;
    switch (this.state.mode) {
      case 'commits':
        selectedMode = this.renderCommits();
        break;
      case 'pulls':
        selectedMode = this.renderPullRequests();
        break;
      case 'forks':
        selectedMode = this.renderForks();
        break;
    }
    return (
      <div>
        {selectedMode}
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
        {this.renderSelectedMode()}
      </div>
    );
  }
}

export default Detail;

