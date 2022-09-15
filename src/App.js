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
    <p><h2>{props.title}</h2>
    {props.body}</p>
  </article>
  );
}
function Create(props) {
  return <article>
    <h2>Create</h2>
  <form onSubmit={event=>{
    event.preventDefault();
    const title = event.target.title.value;  //여기서 target은 form이고 title값을 지정
    const body = event.target.body.value;
    props.onCreate(title,body);
  }}>
    <p><input type="text" name="title" placeholder="타이틀" /></p>
    <p><textarea name="body" placeholder='내용'></textarea></p>
    <p><input type="submit" value='c생성'></input></p>
  </form>
  </article>
}
function App() {
  const [page, setPage] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4); //nextId를 통해서 newTopic의 다음 id값을 결정?
  const [topics, setTopics] = useState([ // useState()로 감싸서 state상태로 승격
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' }
  ]);
  

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

    content = <Article title={title} body={body}></Article>
  } else if(page === 'CREATE'){
    content = <Create onCreate={(titlex,bodyx)=>{
      //어떻게 호출해야함?
      const newTopic = {id:nextId, title:titlex, body:bodyx} 
      const newTopics = [...topics] //topics에 새로운 원소번호를 추가하기 위해서
      newTopics.push(newTopic);
      setTopics(newTopics);
      setPage('READ'); //생성하고 read페이지로 돌아오기
      setId(nextId); //생성된 페이지에 다음id지정?
      setNextId(nextId+1); //생성후 다음 순번 Id 설정 (+1)
    }}></Create>
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
      <a href="/creat" onClick={event=>{
        event.preventDefault();
        setPage('CREATE');
      }}>Creat</a>
    </div>
  );
}

export default App;