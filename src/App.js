import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'; //react에서 제공하는 기본함수

function Header(props) {
  return <header>
    <h1><a href="/" onClick={event => {
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
      <a id={t.id} href={'/read/' + t.id} onClick={event => {
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
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;  //여기서 target은 form이고 title값을 지정
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="타이틀" /></p>
      <p><textarea name="body" placeholder='내용'></textarea></p>
      <p><input type="submit" value='c생성'></input></p>
    </form>
  </article>
}
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="타이틀" value={title} onChange={(event => {   //props들어온걸 state로 환생 onChange로 키입력시마다 새로운 value로 변경 렌더링
        setTitle(event.target.value);
      })} /></p>
      <p><textarea name="body" placeholder='내용' value={body} onChange={(event => {
        setBody(event.target.value);
      })}></textarea></p>
      <p><input type="submit" value='업데이트'></input></p>
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
  let contextControl = null; //지역변수
  if (page === 'WELCOME') {
    content = <Article title='안녕 첫화면 제목' body='첫화면 내용1'></Article>
  } else if (page === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
      <li><a href={"/update/" + id} onClick={event => {
        event.preventDefault();
        setPage('UPDATE');
      }}>update</a></li>
      <li><input type='button' value='delete' onClick={(event => {
        const newTopics = [] //빈배열을 만듬
        for (let i = 0; i < topics.length; i++) {
          if (topics[i].id !== id) { // '!==' 는 앞의 값과 뒤의 값이 다를때 {}안의 코드가 실행된다.
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setPage('WELCOME');
      })}></input></li>
    </>
  } else if (page === 'CREATE') {
    content = <Create onCreate={(titlex, bodyx) => {
      //어떻게 호출해야함?
      const newTopic = { id: nextId, title: titlex, body: bodyx }
      const newTopics = [...topics] //topics에 새로운 원소번호를 추가하기 위해서
      newTopics.push(newTopic);
      setTopics(newTopics);
      setPage('READ'); //생성하고 read페이지로 돌아오기
      setId(nextId); //생성된 페이지에 다음id지정?
      setNextId(nextId + 1); //생성후 다음 순번 Id 설정 (+1)
    }}></Create>
  } else if (page === 'UPDATE') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      console.log(title, body);
      const newTopics = [...topics]
      const updatedTopic = { id: id, title: title, body: body }
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {  //newTopic[i]번째 id랑 현재 id랑 일치한다면?
          newTopics[i] = updatedTopic; //newTopic[i]번째는 updatedtopic이 된다.
          break;
        }
      }
      setTopics(newTopics);
      setPage('READ');
    }}></Update>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setPage('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setPage('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li>
          <a href="/creat" onClick={event => {
            event.preventDefault();
            setPage('CREATE');
          }}>Creat</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;