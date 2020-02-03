import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { GitHub } from './github';

class GithubDisplay extends React.Component<{}, {APIData : any}> {
	github : GitHub = new GitHub('hannesottt');

	componentDidMount() {
		this.github.getUserData()
			.then(data => {
				this.setState({APIData: data})
			});
	}

	renderPfpColumn() : JSX.Element {
		return (
			<div className="col bg-dark text-white pfp-column">
				<img className="img-thumbnail mx-auto d-block" alt="Profile picture" src={this.state.APIData.profile.avatar_url}></img>
				<h2 className="text-center">{this.state.APIData.profile.name}</h2>
				<h4 className="text-center profile-login">{this.state.APIData.profile.login}</h4>
			</div>
		);
	}

	renderButtons() : JSX.Element {
		return (
			<div className="col button-column text-center">
				<a className="btn btn-dark text-white" href={this.state.APIData.profile.html_url}>Profile Link</a>
			</div>
		);
	}

	renderRepo(index : number) : JSX.Element {
		let repoData = this.state.APIData.repos[index];
		return (
			<div className="col-lg-8 offset-lg-2 repo-column" key={repoData.id}>
				<div className="card">
					<div className="card-body">
						<h5 className="card-title"><a href={repoData.html_url}>{repoData.full_name}</a><span className="float-right">{repoData.language}</span></h5>
						<div className="card-info">{repoData.watchers_count} watching; {repoData.stargazers_count} stars; {}{repoData.forks_count} forks</div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		console.log(this.state);
		if (this.state) {
			let repoElements : JSX.Element[] = new Array();
			for (let i = 0; i < this.state.APIData.repos.length; i++) {
				repoElements.push(this.renderRepo(i));
			}
			return (
				<div className="container-fluid">
					{this.renderPfpColumn()}
					{this.renderButtons()}
					<h4 className="text-center repo-title">Repositories</h4>
					{repoElements}
				</div>
			);
		} else {
			return (
				<div className="container">
					<div className="text-center">Loading...</div>
				</div>
			);
		}
	}
}

ReactDOM.render(<GithubDisplay />, document.getElementById('root'));
