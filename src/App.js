import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Hello world!2!</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

function FuncComp(프롭) {
  return (
    <div className="container">
      <h2>function style Component</h2>
      <p>Number : {프롭.initNumber}</p>
    </div>
  );
}
class ClassComp extends React.Component {
  state = {
    number:this.props.initNumber
  }
  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)
        }></input>
      </div>
    )
  }
}
export default App;