// 이벤트 추가하기 / 이벤트 들어갈 엘레멘트 선택
const $div = document.querySelector('.container'); //dom 선택 표시용 $
const $form = document.querySelector('form'); //태그가 하나라서 그냥 form 그대로
const $input = document.querySelector('input'); 
const $button = document.querySelector('button');

// event 추가 방법
// 1. 이벤트 핸들러
// (원하는 타겟).(이벤트 이름) = (콜백함수... 이벤트 핸들러/유지보수를 위해 분류해서 쓰는게 좋음)

/*
$div.onclick = handleClick; //콜백이라 호출()이 없음. 클릭이 이뤄질때마다 함수를 자동적으로 호출. 만약 ()을 해놓으면 계속 호출이 되는거라 이벤트에 적절치 않음! ()가 들어가면 안됨에 유의!!

function handleClick () {
    console.log('clicked');
}
*/

// 이벤트 핸들러 단점? 동일한 이벤트에 서로다른 콜백을 지정하면 뒤에 이벤트 핸들러가 앞의 이벤트 핸들러를 덮어 씌움
// 지금은 별도의 함수로 해줬는데, 일반 콜백으로 바꾸면?

/*
$div.onclick = () => console.log("clicked");
$div.onclick = () => alert("clicked");
*/
// alert창만 나타나고 콘솔에는 안찍히게 됨. 동일한 대상에 동일한 이벤트가 두개 있으면 첫번째 이벤트가 마지막 이벤트에 의해 덮어씌워짐.


// 2. addEventListener (권장)

// $div.addEventListener('click', handleClick); // () => console.log('clicked'));
// $div.addEventListener('click', () => alert('clicked'));

// function handleClick () {
//     console.log('clicked');
// }
// 동일 이벤트가 다 적용이 됨.


// 3. removeEventListener (이벤트 삭제)
// $div.removeEventListener('click', handleClick); //삭제하고 싶은 이벤트 이름, 이벤트 함수 이름(익명함수 사용하면 안되는 이유)
// 이벤트를 삭제해서 콘솔에는 안뜸.



// 이벤트 인자 - 이벤트 함수들은 기본적으로 이벤트에 대한 정보를 인자로 받을 수 있음.
$div.addEventListener('click', handleClick); 

function handleClick (event) { //이벤트 함수면 무조건 첫번째 인자로 현재 일어난 이벤트에 대한 정보를 확인할 수 있음.(매개변수 이름은 아무거나 가능. 보통 event, e로 사용)
    console.log(event);
    console.log(event.target); // 이벤트가 일어난 대상
    console.log(event.target.innerText);
}
// PointerEvent라는 객체가 나옴. 현재 이벤트 정보를 보여줌. (target을 가장 많이 씀 - 이벤트가 일어난 대상($div))

// 입력->값을 가져와서 변수에 저장하는 경우가 많음.
$input.addEventListener('change', handleChange);

function handleChange (event) {
    console.log(event.target);
    console.dir(event.target);
    //console.log(event.target.value);
}

// form은 form이 제출되면서 새로고침돼서 input 값이 날라감 -> 이를 막기 위해 prevent default 사용
$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); // 새로고침 안되고 유지 = 제출이 안됨. (이벤트가 가진 기본적인 동작들을 막아줌)
    const inputValue = $input.value;
    console.log(inputValue);
    $input.value = ''; // form 기본 형태랑 비슷하지만 입력값도 들어가고 저장도 가능함.
    // 배열 추가와 같이 이걸 활용할 일이 생김!!
}