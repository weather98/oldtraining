import DisplayNumber from "../components/DisplayNumber";
import { connect } from 'react-redux';

function mapReduxStateToReactProps(state) { //map redux의 state를 react의 props로 연결
    return {
        number:state.number
    }
}  

function mapReduxDispatchToReactProps(){ //map redux의 dispatch를 react의 props로 연결
    return {

    }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(DisplayNumber);

/*
import DisplayNumber from "../components/DisplayNumber";
import React, { Component } from "react";
import store from "../store";
export default class extends Component {
    state = { number: store.getState().number } //state초기화한값
    constructor(props) {
        super(props);  
        store.subscribe(function () {
            this.setState({ number: store.getState().number }); //구독한값
        }.bind(this));
    }
    render() {
        return (
            <DisplayNumber number={this.state.number} //표시값
            unit={this.props.unit}></DisplayNumber>
        )
    }
}
*/