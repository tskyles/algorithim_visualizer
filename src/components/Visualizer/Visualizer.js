import React from 'react';
import Grid from '../Grid/Grid';
import Menu from '../Menu/Menu';
import './Visualizer.css';

export default class Visualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      selectedAlgorithm: '',
      menuSelected: '',
      runVisualization: false,
    };
  }
  
  handleMenuClick = (e) => {
    let [type, name] = e.target.getAttribute('value').split('-');
    switch(type){
      case 'menu':
        this.setState({menuSelected: name});
        if(name === 'run') {
          if(!this.state.selectedAlgorithm){
            // TODO: do something else when no selected algorithm
            console.log('no selection');
            return;
          }
          else {
            this.setState({runVisualization: true});
          }
        }
        break;
      case 'algorithm':
        this.setState({selectedAlgorithm: name});
        console.log(name)
        break;
      default:
          return
    }
  }

  

	render() {
		return (
			<>
				<div className='header'>
					<h1 id='title'>Algorithm Visualizer</h1>
					<Menu 
            selectedAlgorithm={this.state.selectedAlgorithm} 
            handleMenuClick={(e) => this.handleMenuClick(e)} 
            />
				</div>
				<div className='info-container'></div>
				<Grid
					// menuSelected={this.state.menuSelected}
          runVisualization={this.state.runVisualization}
					selectedAlgorithm={this.state.selectedAlgorithm}
          // ref={ref => { this.Grid = ref; }}
				/>
			</>
		);
	}
}
