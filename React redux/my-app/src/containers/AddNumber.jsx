import AddNumber from "../components/AddNumber";
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) { //map redux의 dispatch를 react의 props로 연결
    return {
        onClick: function (size) {
            dispatch({ type: 'INCREMENT', size: size });
        }
    }
}
export default connect(null, mapDispatchToProps)(AddNumber);






// import { Component } from 'react';
// import AddNumber from '../components/AddNumber';
// import store from '../store';
// export default class extends Component{
//     render(){
//         return <AddNumber onClick={function(size){
//             store.dispatch({type:'INCREMENT', size:size});
//         }.bind(this)}></AddNumber>
//     }

// } //redux 기능을 래핑 컨테이너로 감싸서 모아놓음