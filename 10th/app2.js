const express = require('express') 
const app = express() 
const port = 5600 

app.use(express.json());

const users = [
    {
        id : 1,
        name : "haeyeon",
        username : "umi",
        phonenumber : "123-456-7890"
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
    res.send('안녕하세요!')
})

app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:userId', (req, res) => {
    console.log(req.params.userId)
    const user = users.find((user) => user.id === parseInt(req.params.userId));

    if (!user) {
        res.status(404).send('요청한 userId를 찾을 수 없습니다.')
    }

    res.status(200).json(user);
})

app.get('/users/:userId/pnum', (req, res) => {
    const user = users.find((user) => user.id === parseInt(req.params.userId));

    if (!user) {
        res.status(404).send('요청한 userId를 찾을 수 없습니다.')
    }
    res.status(200).send(user.phonenumber)
})

// 하나씩 보기 - 필수 키 찾기 (username, name, phonenumber라고 가정)
app.post('/users', (req, res) => {
    const newUser = req.body
    object = Object(newUser)
    
    if (Object.keys(newUser).length === 0) {
        res.status(400).send('user에 관한 정보를 입력해주세요.')
    }
    else {
        if (('username' in object) && ('name' in object) && ('phonenumber' in object)){
            console.log('필수키 있음')
            if (newUser['username'] && newUser['name'] && newUser['phonenumber']){
                console.log(newUser['username'], newUser['name'], newUser['phonenumber'])
                users.push({
                    id : users[users.length-1].id + 1,
                    ...newUser
                })
            }
            else{
                res.status(400).send('user에 관한 필수 정보를 입력해주세요.\n * 필수정보 : username, name, phonenumber')
                console.log('필수정보를 입력해주세요')
            }
        }
        else{
            res.status(400).send('user에 관한 필수 정보를 입력해주세요!\n * 필수정보 : username, name, phonenumber')
            console.log('필수키 없음')
        }
    }
    res.json(users)

    
//    if ('name' in object) {
//        console.log('name 있음')
//        console.log(object['name'])
//    }

    for (const property in newUser) {
        console.log(`${property}: ${newUser[property]}`)
    }

    console.log(object)
    console.log(newUser)
    res.status(200).send('test중 ...')

})

app.put('/users/:userId', (req, res) => {
    res.status(200).send('test중 ...')
})

app.listen(port, () => {
    console.log(`서버 실행중...`)
  })