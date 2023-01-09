import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow]=useState(true);
  var [classShow, setclassShow]=useState(true);
  return (
    <div className="container">
      <h1>Hello world!2!</h1>
      <input type="button" value="remove func" onClick={function(){
        setFuncShow(false);
      }}></input>
      <input type="button" value="remove class" onClick={function(){
        setclassShow(false);
      }}></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  )
}

var funcStyle = 'color:pink';
var funcId = 0;

function FuncComp(프롭) {
  var numberState = useState(프롭.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1];

  // var dateState = useState((new Date()).toString());
  // var 날짜 = dateState[0];
  // var setDate = dateState[1];

  var [날짜, setDate] = useState((new Date()).toString());

  useEffect(function(){
    console.log('%cfunc => useEffect (componentDidMount)'+(++funcId),funcStyle);
    document.title = number;
    return function(){
      console.log('%cfunc => useEffect return(componentWillUnmount)'+(++funcId),funcStyle);
    }
  },[]); // useEffect 함수의 두번째 인자 빈대괄호[]를 설정하면 최초로 처음 1회만 실행하도록함
  
  //side effect : 부작용 부가적인 작용
  useEffect(function(){
    console.log('%cfunc => useEffect 랜덤(componentDidMount & componentDidUpdate)'+(++funcId),funcStyle);
    document.title = number;
    return function(){
      console.log('%cfunc => useEffect 랜덤 return(componentWillUnmount)'+(++funcId),funcStyle);
    }
  },[number]); //useEffect 함수의 두번째 인자[number]를 설정했을때 [number]가바꼇을떄만 실행하도록함

  useEffect(function(){
    console.log('%cfunc => useEffect 날짜(componentDidMount & componentDidUpdate)'+(++funcId),funcStyle);
    document.title = 날짜;
    return function(){
      console.log('%cfunc => useEffect 날짜 return(componentWillUnmount)'+(++funcId),funcStyle);
    }
  },[날짜]); // 여기서는 [날짜]
  
  console.log('%cfunc => render'+(++funcId),funcStyle);
  return (
    <div className="container">
      <h2>function style Component</h2>
      <p>Number : {number}</p>
      <p>Date : {날짜}</p>
      <input type="button" value="random" onClick={
          function(){
            setNumber(Math.random());
          }
        }></input>
        <input type="button" value="date" onClick={
        function(){
          setDate((new Date()).toString());
        }
      }></input>
    </div>
  );
}


var classStyle = 'color:red';
class ClassComp extends React.Component {
  state = {
    number:this.props.initNumber,
    date:(new Date()).toString()
  }
  componentWillMount(){
    console.log('%cclass => componentWillMount', classStyle);
  }
  componentDidMount(){
    console.log('%cclass => componentDidMount', classStyle);  
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true; //렌더를 호출할 필요가 있냐없냐 true는 호출
  }
  componentWillUpdate(nextProps, nextState){
    console.log('%cclass => componentWillUpdate', classStyle);
  }
  componentDidUpdate(nextProps, nextState){
    console.log('%cclass => componentDidUpdate', classStyle);
  }
  componentWillUnmount(nextProps, nextState){
    console.log('%cclass => componentWillUnmount', classStyle);
  }
  render() {
    console.log('%cclass => render', classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)
        }></input>
                <input type="button" value="date" onClick={
          function(){
            this.setState({date:(new Date()).toString()})
          }.bind(this)
        }></input>
      </div>
    )
  }
}
export default App;