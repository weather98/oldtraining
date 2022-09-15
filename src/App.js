import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'; //react에서 제공하는 기본함수

function Header(props) {
  return <header>
    <h1><a href="/" onClick={event=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
         //문자형으로 나오는것을 Number를 사용해서 숫자로 바꿔줌
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props) {
  return (<article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
  );
}
function App() {
  const [page, setPage] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' }
  ]
  let content = null;
  if(page === 'WELCOME'){
    content = <Article title='안녕 첫화면 제목' body='첫화면 내용1'></Article>
  } else if(page === 'READ') {
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
          title = topics[i].title;
          body = topics[i].body;
      }
    }

    content = <Article title='안녕 뒷화면 제목' body='첫화면 내용body'></Article>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setPage('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setPage('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;