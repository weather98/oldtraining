// components/App.js
const App = () => {
    return <Button text="IT IS BUTTON"></Button>;
};
 
// components/Button/index.js
const Button = (props) => {
  return <button>{props.text}</button>;
};