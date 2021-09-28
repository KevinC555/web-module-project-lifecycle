import React from 'react';
import axios from 'axios';

class App extends React.Component {
	state = {
		userImage: [],
		userName: [],
		userFollowers: []
	}

	componentDidMount() {
		axios.get('https://api.github.com/users/KevinC555')
			.then(resp => {
				this.setState({
					...this.state,
					userImage: [resp.data.avatar_url],
					userName: [resp.data.login],
					userFollowers: [resp.data.followers]

				});
				console.log(resp.data)
			})
	}

	componentDidUpdate(prevProps, prevState) {
		console.log("updates");
		if (this.state.userFollowers !== prevState.userFollowers) {
			console.log("userFollowers changed");
			if (this.state.userName === "KevinC555") {
				axios.get('https://api.github.com/users/KevinC555')
					.then(resp => {
						this.setState({
							...this.state,
							userImage: [resp.data.avatar_url],
							userName: [resp.data.login],
							userFollowers: [resp.data.followers]
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
					{
						this.state.userImage.map(image => {
							return (<img key={image} width="200" src={image} alt={image} />);
						})
					}
				</div>
				{
					this.state.userName.map(name => {
						return (<p key={name}>Username: {this.state.userName}</p>)
					})
				}
				{
					this.state.userFollowers.map(followers => {
						return (<p key={followers}>Follower Count: {this.state.userFollowers}</p>)
					})
				}
			</form>
		</div>);
	}
}

export default App;