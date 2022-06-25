// 웹에 띄울 필요 없으니 html 없음! 백엔드 코드! 서버를 띄워 실행할거임
// mpm 쓰기!
// 현재 앱스토어에 내가 다운받은 앱을 볼 수 있는 거처럼, 프로젝트에서 다운받은 mpn 패키지들을 볼 수 있음(package.json에서)
// mpn 패키지들은 하나의 앱이라 보면 됨

// npm install express -> dependencies에 express가 추가됨. (버전도 같이!)
// 추가된 거 1. node_modules : 방금 설치한 express가 담긴 폴더 -> express도 다른 mpn 패키지를 합쳐서 만들어진거
// 추가된 거 2. package-lock.json : express를 설치하면서 package.json에 express와 express 버전이 같이 기록되어 있었는데,
                                // 하지만 express도 다른 package를 포함하거나 의존해서 여기에 express 뿐 아니라 다른 package의 버전 정보를 담음
                            

// 공식문서 https://expressjs.com/ko/starter/hello-world.html


/*
const express = require('express') //(1)
const app = express() //(1) app이 express를 사용한다고 선언하는 부분
const port = 3000 //(2) localhost 뒤에 찍히는 번호. 로컬에서 실행할 때 뒤에 찍힌 포트 번호에 따라 여러가지 앱을 한번에 실행 가능 (여러포트를 열어서 여러 앱?)

app.get('/', (req, res) => { //HttpRequestMethods (req요청, res응답)
  res.send('Hello World!') //사용자가 요청한 주소가 '/(=홈)'일때 응답으로 'Hello World!'를 줄게!
})                          // 주소창에는 localhost:3000이지만, 여기서는 '/'만 쓰면 됨

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

서버 종료는 ctrl+c
터미널에서 방향키 위 버튼 누르면 이전 명령어 나옴
*/

const express = require('express') 
const app = express() 
const port = 5500 

app.use(express.json()); // json 형식으로 추가/보내니 express.json을 쓸 거라고 명시

const users = [
    {
      id: 1,
      name: "james",
      username: "joker",
      email: "james101@gmail.com",
      phonenumber: "123-456-7979",
    },
    {
      id: 2,
      name: "christine",
      username: "crystal",
      email: "christine101@gmail.com",
      phonenumber: "453-326-1299",
    },
    {
      id: 3,
      name: "jammie",
      username: "jam",
      email: "jammie101@gmail.com",
      phonenumber: "963-332-3719",
    },
];

app.get('/', (req, res) => {
  res.send('Welcome!!') 
})                   

app.get('/users', (req, res) => {
    res.json(users) 
})                   
//Request, Response api 목록, 설명 https://expressjs.com/ko/4x/api.html#res


// 각 유저를 따로 접근하고 싶을 때?
app.get('/users/:userId', (req, res) => { //동적으로 입력되는 주소는 앞에 :이 붙음
    // 숫자 입력 시 값을 가져오는 방법
    //console.log(req.params.userId);
    const user = users.find((user) => user.id === parseInt(req.params.userId));
    
    if (!user) {
      res.status(404).send('요청한 userId를 찾을 수 없습니다')
    }

    //상태코드 보내기
    res.status(200).json(user);
}) 
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// users에서 user들을 하나씩 접근 하면서 req.params.userId와 일치하는 걸 찾는거라서 find를 사용해서 찾을거임


app.post("/users", (req, res) => {
  const newUser = req.body

  // [예외처리] 객체일때 key들만 뽑아서 배열로 만드는 메소드
  if (Object.keys(newUser).length === 0) {
    res.status(400).send('user에 관한 정보를 입력해주세요')
  } else if (Object.keys(newUser).length < 4) {
    res.status(400).send('user를 추가하기 위해 필요한 정보를 모두 입력해주세요')
  } else {
    users.push({
      id : users[users.length-1].id + 1,
      ...newUser //안에있는 내용물을 하나씩 복사해서 새로운 객체 안에 집어 넣는것.
    })
  }

  res.json(users); //원래는 추가한 유저만 보여주는 게 맞음. 다 보여주면 개인정보 유출이니까
})


app.put('/users/:userId', (req, res) => {
  /*
  const id = users.findIndex(user => user.Id === parseInt(req.params.userId));
  
  // 배열의 index라서 실제 id보다 1 작음
  console.log(id, req.params.userId);
  // findIndex에서 맞는 값이 없으면 -1을 반환함

  if (id === -1) {
    res.status(404).send('요청한 id를 찾을 수 없습니다.');
  }

  users[id] = {
    ...users[id],
    ...req.body
  }

  res.status(200).json(users);
  */
	const id = users.findIndex(user => user.id === parseInt(req.params.userId));
	console.log(id)
	if (id === -1) {
		return res.status(404).send('요청한 id를 찾을 수 없습니다.');
	}

	users[id] = {
		...users[id],
		...req.body
	}

	res.status(200).json(users);
})

app.delete("/users/:userId", (req, res) => { //지워야 하니까 이것도 id 필요
  //const id = users.findIndex(user => users.id === parseInt(req.params.userId)); //users.id라고 해서 안된건가봄!
	const id = users.findIndex(user => user.id === parseInt(req.params.userId));

  if (id === -1) {
    res.status(404).send('요청한 id를 찾을 수 없습니다.');
  }

  users.splice(id, 1) //(index값, 삭제하고 싶은 원소 개수, 추가하고 싶은 원소)

  res.status(200).json(users)
})


app.listen(port, () => {
  console.log(`서버 실행중...`)
})


// 기본 라우팅 https://expressjs.com/ko/starter/basic-routing.html
// CRUD
// C = Create(Post) , R = Read(Get) , U = Update(Put) , D = Delete(Delete)

// nodemon - 매번 코드를 변경할 때마다 서버를 다시 재실행 할 필요가 없어짐
// npm install -g nodemon (-g는 global 약자로 이 프로젝트 말고 다른 곳에서도 쓸 수 있음)
// global로 설치해서 package.json에 dependencies에 아무런 변화가 없음!
// 사용) nodemon app.js

