import React from 'react';
import axios from 'axios';

class App extends React.Component {
	state = {
		userImage: "",
		userName: "",
		userFollowers: 0
	}



	componentDidMount() {
		axios.get('https://api.github.com/users/KevinC555')
			.then(resp => {
				this.setState({
					...this.state,
					userImage: resp.data.avatar_url,
					userName: resp.data.login,
					userFollowers: resp.data.followers

				});
				console.log(resp.data)
			})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.userFollowers !== prevState.userFollowers) {
			console.log("userFollowers changed");
			if (this.state.userName === "KevinC555") {
				axios.get('https://api.github.com/users/KevinC555')
					.then(resp => {
						this.setState({
							...this.state,
							userImage: resp.data.avatar_url,
							userName: resp.data.login,
							userFollowers: resp.data.followers
						});
					})
			}
		}
	}

	render() {
		return (<div>
			<h1>GitHub Account</h1>
			<form>
				<div>
					<img key={this.state.userImage} width="200" src={this.state.userImage} alt={this.state.userImage} />
				</div>

				<p key={this.state.userName}>Username: {this.state.userName}</p>

				<p key={this.state.userFollowers}>Follower Count: {this.state.userFollowers}</p>


			</form>
		</div>);
	}
}

export default App;