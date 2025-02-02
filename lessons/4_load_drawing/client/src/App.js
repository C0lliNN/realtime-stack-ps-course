import React, { Component } from 'react';
import './App.css';
import Drawing from './Drawing';
import DrawingForm from './DrawingForm';
import DrawingList from './DrawingList';

class App extends Component {
  state = {

  }

  selectDrawing = (drawing) => {
    this.setState({ selectedDrawing: drawing })
  }

  render() {
    let ctrl = (
      <div>
        <DrawingForm />
        <DrawingList selectDrawing={this.selectDrawing}/>
      </div>
    )


    if (this.state.selectedDrawing) {
      ctrl = <Drawing drawing={this.state.selectedDrawing} key={this.state.selectedDrawing.id} />
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Our awesome drawing app</h2>
        </div>
        {ctrl}
      </div>
    );
  }
}

export default App;
