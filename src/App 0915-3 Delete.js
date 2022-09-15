import logo from './logo.svg'; // eslint-disable-line no-unused-vars
import './App.css';
import React, { useState } from 'react';
function Header(props) {
  console.log('props', props, props.title);
  return (<header>
    <h1>
      <a href="/" onClick={(event) => {
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
  </header>);
}
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read' + t.id} onClick={(event) => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a></li>);
  }
  return (
    <nav >
      <ol>{lis}</ol>
    </nav>
  );
}
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="타이틀입력" /></p>
      <p><textarea name="body" placeholder="본문내용입력"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  //props(외부자)로 들어온 데이터를 수정하기 위해 state(내부자)로 변환
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="타이틀입력" value={title} onChange={event => {
        setTitle(event.target.value);
        //키를 입력할때마다 setTitle(state)값을 지정 > component 변경 새로운 렌더링 발생?
      }} /></p>
      <p><textarea name="body" placeholder="본문내용입력" value={body} onChange={event => {
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

function App() {
  const [mode33, setMode33] = useState('WELCOME');
  const [id, setID] = useState('null');
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' }
  ]);
  let content = null;
  let contextControl = null;
  if (mode33 === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode33 === 'READ') { //READ 에 진입했을 떄만 나타나게
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <><li><a href={'/update' + id} onClick={event => {
      event.preventDefault();
      setMode33('UPDATE');
    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics= []
      for (let i=0; i<topics.length; i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode33('WELCOME');
    }} /></li>
    </>
  } else if (mode33 === 'CREATE') { //CREATE
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body }
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode33('READ');
      setID(nextId);
      setNextId(nextId + 1);
    }}></Create>
  } else if (mode33 === 'UPDATE') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = (<Update title={title} body={body} onUpdate={(title, body) => {
      //이전의 title,body prop값을 준다..?
      console.log(title, body);
      const newTopics = [...topics]
      const updatedTopic = { id: id, title: title, body: body }
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode33('READ');
    }}></Update>
    );
  }
  return (
    <div>
      <Header title="React" onChangeMode={() => {
        setMode33('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode33('READ');
        setID(_id);
      }}> </Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event => {
          event.preventDefault();
          setMode33('CREATE');
        }}>Create</a></li>
        {contextControl}

      </ul>
    </div>
  );
}

export default App;
