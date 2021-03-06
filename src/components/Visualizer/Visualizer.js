import React from 'react';
import Grid from '../Grid/Grid';
import Header from '../Header/Header';
import InfoContainer from '../InfoContainer/InfoContainer';
import './Visualizer.css';

export default class Visualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonClicked: null,
			selectedAlgorithm: '',
			message: '',
			runVisualization: false,
			resetBoard: false,
			setWeight: false,
			clearWeights: false,
			clearWalls: false,
		};
		this.algoTextStore = {
			astar: 'A* Search',
			dijkstras: 'Dijkstras',
			breadthFirst: 'Breadth First',
			btree: 'Binary Tree',
			depthFirst: 'Depth First',
		};
	}

	getAlgorithmText = (selectedAlgorithm) => {
		return this.algoTextStore[selectedAlgorithm];
	};

	handleMenuClick = (e) => {
		let [type, name] = e.target.getAttribute('value').split('-');
		switch (type) {
			case 'menu':
				switch (name) {
					case 'run':
						this.setState({ buttonClicked: 'run' });
						if (!this.state.selectedAlgorithm) {
							this.setState({
								message: 'No Selection, please choose an algorithm to run.',
							});
							return;
						} else {
							this.setState({ runVisualization: true });
						}
						break;
					case 'resetBoard':
						this.setState({ resetBoard: true });
						this.setState({ runVisualization: false });
						this.setState({ message: 'Board Reset!' });
						break;
					case 'clearWalls':
						this.setState({ clearWalls: true });
						this.setState({ message: 'Walls Cleared!' });
						break;
					case 'clearWeights':
						this.setState({ clearWeights: true });
						this.setState({ message: 'Weights Cleared!' });
						break;
					default:
						break;
				}
				break;
			case 'algorithm':
				this.setState({ selectedAlgorithm: name });
				this.setState({
					message: `${this.getAlgorithmText(
						name
					)} selected. Click Visualize to run!`,
				});
				break;
			default:
				return;
		}
	};

	buttonClickedResetState = () => {
		this.setState({ buttonClicked: null });
	};

	runVisualizationResetState = () => {
		this.setState({ runVisualization: false });
	};

	resetBoardResetState = () => {
		this.setState({ resetBoard: false });
	};

	clearWallsResetState = () => {
		this.setState({ clearWalls: false });
	};

	clearWeightsResetState = () => {
		this.setState({ clearWeights: false });
	};

	handleKeyDown = (e) => {
		if (e.key === 'w') this.setState({ setWeight: true });
	};

	handleKeyUp = (e) => {
		if (e.key === 'w') this.setState({ setWeight: false });
	};

	render() {
		return (
			<div
				className='visualizer'
				tabIndex={0}
				onKeyDown={(e) => this.handleKeyDown(e)}
				onKeyUp={(e) => this.handleKeyUp(e)}>
				<Header
					selectedAlgorithm={this.state.selectedAlgorithm}
					handleMenuClick={(e) => this.handleMenuClick(e)}
				/>
				<InfoContainer
					selectedAlgorithm={this.state.selectedAlgorithm}
					message={this.state.message}
				/>
				<Grid
					buttonClicked={this.state.buttonClicked}
					runVisualization={this.state.runVisualization}
					runVisualizationResetState={() => this.runVisualizationResetState()}
					selectedAlgorithm={this.state.selectedAlgorithm}
					resetBoard={this.state.resetBoard}
					resetBoardResetState={() => this.resetBoardResetState()}
					clearWalls={this.state.clearWalls}
					clearWallsResetState={() => this.clearWallsResetState()}
					clearWeights={this.state.clearWeights}
					clearWeightsResetState={() => this.clearWeightsResetState()}
					setWeight={this.state.setWeight}
				/>
			</div>
		);
	}
}
