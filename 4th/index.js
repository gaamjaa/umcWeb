// 6강 추가 내용
const $commentForm = document.querySelector('#commentInputContainer');
const $commentInput = document.querySelector('#commentInput');
//

const $commentList = document.querySelector('#commentsList');//dom 조작 변수를 구별하기 위한 $

const $recommendedVideoList = document.querySelector('#recommendedVideoList');
const API_KEY = "AIzaSyBe84dvyh96DnH08s66qoBTipX0K9rctQs";

const commentItemTemplate = (newComment) => {
    return `
    <li class="commentItem">
        <img src = "https://yt3.ggpht.com/ytc/AKedOLT7VfdqH64zOyw9buQOaCUxZgO9szc1kM7SW8dHGm9Q2dUBgPitvLXTFwSi4SNm=s48-c-k-c0x00ffffff-no-rj" class="profileImg" /> 
        <div>
            <p id="commentName">Mary Shen</p>
            <p>${newComment}</p>
            <div class="flex">
                <button class="commentBtn">
                    <span class="commentIcon">
                        <svg viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M12.42,14A1.54,1.54,0,0,0,14,12.87l1-4.24C15.12,7.76,15,7,14,7H10l1.48-3.54A1.17,1.17,0,0,0,10.24,2a1.49,1.49,0,0,0-1.08.46L5,7H1v7ZM9.89,3.14A.48.48,0,0,1,10.24,3a.29.29,0,0,1,.23.09S9,6.61,9,6.61L8.46,8H14c0,.08-1,4.65-1,4.65a.58.58,0,0,1-.58.35H6V7.39ZM2,8H5v5H2Z" class="style-scope yt-icon"></path></g></svg>
                    </span>
                </button>
                <button class="commentBtn">
                    <span class="commentIcon">
                        <svg viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M3.54,2A1.55,1.55,0,0,0,2,3.13L1,7.37C.83,8.24,1,9,2,9H6L4.52,12.54A1.17,1.17,0,0,0,5.71,14a1.49,1.49,0,0,0,1.09-.46L11,9h4V2ZM6.07,12.86a.51.51,0,0,1-.36.14.28.28,0,0,1-.22-.09l0-.05L6.92,9.39,7.5,8H2a1.5,1.5,0,0,1,0-.41L3,3.35A.58.58,0,0,1,3.54,3H10V8.61ZM14,8H11l0-5h3Z" class="style-scope yt-icon"></path></g></svg>
                    </span>
                </button>
                <button class="commentBtn">
                    댓글
                </button>
            </div>
        </div>
    </li>
    `;
}
// 댓글 형식이 계속 반복되니까, 계속 반복해서 사용할 거라서 src에서도 id 아닌 class 이용
// 이 방법이 어려우면 그냥 html 파일을 열어서 하는 방법도 있음.
// 버튼은 svg일테니까 컨트롤하기 위해서 span으로 묶어줄거임.
// comment가 하드 코딩 되어있으면 모든 코멘트가 이렇게 나옴.(Hello. Nice to meet you.) -> 동적으로 받아와야 하므로 인자를 받는 함수로 바꿀거임.(ArrowFunction / 그래서 ``으로 string 표현했음)


// const newComment = commentItemTemplate('안녕하세요. 반갑습니다');

// $commentList.insertAdjacentHTML("afterbegin", newComment); 
// appendChild는 자식 중 맨 아래에 추가되는데, 댓글은 가장 최신 댓글이 맨 위에 올라오니까 appendChild 대신에 이거 사용.


/*
    실습 내용
    1. 댓글 탬플릿 작성
    2. 탬플릿을 통한 댓글 생성
    3. 새롭게 생성한 댓글을 리스트에 넣기

    다음 시간
    이벤트를 통해 사용자의 입력을 엔터/코멘트로 추가되는 댓글창 구현
*/


$commentForm.addEventListener('submit', handleSubmit);

// 로컬 스토리지에 한번에 저장하기 위해 배열 선언
const comments = [];

function saveItem(){
//1번 상황. localStorage.setItem('comments', comments); //key, value
    localStorage.setItem("comments", JSON.stringify(comments));
}

function displayHistory () {
    const savedComments = JSON.parse(localStorage.getItem('comments'));

    // savedComments를 하나하나 돌아서 commentItemTemplete으로 넣어줘야함
    savedComments.map(comment => {
        // 하나하나의 comment가 commentItemTemplete에 들어가서 html 코드가 newCommentItem에 담기게 됨
        // 이걸 다시 comments 배열에 넣어줘야함. 새로고침하면 comments도 빈 배열로 초기화 되니까
        const newCommentItem = commentItemTemplate(comment);
        comments.push(comment);
        $commentList.insertAdjacentHTML('afterbegin', newCommentItem);
        // handleSubmit에 있는 newCommentItem과 이름은 같지만 다른 변수라 인식되니까 신경 ㄴ
    })
}

displayHistory();

//1번 상황. const savedComments = localStorage.getItem('comments'); //savedComments[0]하면 string의 첫번째 글자만 나옴
const savedComments = JSON.parse(localStorage.getItem('comments')); //javascript에서 읽을 수 있는 형태로 가져오기

console.log(typeof savedComments); 


function handleSubmit (event) {
    event.preventDefault(); //새로고침 form 특성 막기
    const newComment = $commentInput.value;
    //console.log($commentInput.value);
    
    //아무것도 입력 안하고 엔터 했을 때 입력되는 경우에 대한 예외처리
    if (!newComment) { // 빈 string도 fault.
        return; //아래 코드 실행 안한채로 handleSubmit 종료. 
    }
    const newCommentItem = commentItemTemplate(newComment);
    //console.log(newCommentItem); //<p>가 들어간 채로 콘솔창에 출력
    $commentList.insertAdjacentHTML('afterbegin', newCommentItem);
    $commentInput.value = "";

    // comments에 새로운 댓글이 추가될 때마다 추가
    comments.push(newComment);
    console.log(comments);
    saveItem();
}

/*
    다음 시간
    새로고침 될 때, 코멘트가 사라지는 걸 localStorage로 해결하기
*/

function fetchVideo (){
    fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=kr&key=${API_KEY}`
    )
    .then(response => response.json())
    .then(data => data.items.map(video => videoCardTemplete(video)))
    .catch(error => console.log(error));
}

fetchVideo();

function videoCardTemplete (video){
    console.log(video);
    const videoItem = `
        <li class="videoItemContainer">
            <a href=${`https://www.youtube.com/watch?v=${video.id}`}>
                <div class="videoThumbnailContainer">
                    <img class="thumbnailImg" src=${video.snippet.thumbnails?.high.url} />
                </div>
            </a>
            <div class="videoDetailsContainer">
                <a href=${`https://www.youtube.com/watch?v=${video.id}`}>
                    <div class="videoMetaDetails">
                        <div class="videoTitle">
                            <h3>${video.snippet.title}</h3>
                        </div>
                        <div class="videoMetaData">
                            <p class="metaText">${video.snippet.chennelTitle}</p>
                            <p class="extraMeta">
                                <span class="metaText viewCount">${Number(video.statistics.viewCount) > 1000 ? (Number(video.statistics.viewCount)/1000).toFixed(0) + 'K' : Number(video.statistics.viewCount)}</span>
                                <span class="metaText">${luxon.DateTime.fromISO(
                                    video.snippet.publishedAt
                                  ).toRelative()}</span>
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </li>
    `;

    $recommendedVideoList.insertAdjacentHTML('beforeend', videoItem);
}