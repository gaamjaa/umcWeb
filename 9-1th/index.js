const result = [];
let result2 = [];

// [promise 사용]
fetch("https://jsonplaceholder.typicode.com/users")
.then(response => response.json())
//.then(data => result.push(data))
.then(data => data.map(item => result.push(item.name)))
.catch(error => console.log(error))

console.log(result);


    // [async,await 사용] 다시하자
    // const dataFetch = async() => {
    //     const response = await fetch("https://jsonplaceholder.typicode.com/users");
    //     //console.log(response); promise가 아닌 response 형태
    //     const data = await response.json();

    //     console.log(data);
    //     return data;
    // }

    // dataFetch();

    // https://chanhuiseok.github.io/posts/js-6/
    // function getName(){
    //     const response = fetch("https://jsonplaceholder.typicode.com/users");
    //     return response.then(res => res.json());
    // }

    // async function exec() {
    //     var text;
    //     try {
    //         text = await getName();
    //         console.log(text[0].Name);
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    // exec();


axios.get("https://jsonplaceholder.typicode.com/users")
.then(data => console.log(data.data))
//.then(data => data.map(item => result2.push(item)))

console.log(result2);


//.then(data => console.log(data.data))