// 모달
let target = document.querySelectorAll('.btn_open');
let btnPopClose = document.querySelectorAll('.pop_wrap .btn_close');
let targetID;


// 모달 열기
for (let i = 0; i < target.length; i++) {
  target[i].addEventListener('click', function () {
    targetID = this.getAttribute('href');
    document.querySelector(targetID).style.display = 'block';
  });
}

// 모달 닫기
for (let j = 0; j < target.length; j++) {
  btnPopClose[j].addEventListener('click', function () {
    this.parentNode.parentNode.style.display = 'none';
  })
}


// 댓글
const commentBtn = document.querySelector('#commentFrm');
const commentList = document.querySelector('#comment-list');
const total = document.querySelector('h4 > span');
const list = [];
let today = new Date();

let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);

let hours = ('0' + today.getHours()).slice(-2);
let minutes = ('0' + today.getMinutes()).slice(-2);
let seconds = ('0' + today.getSeconds()).slice(-2);

let comment_time = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

function closeTabClick() {
  window.close();
}

function numberId() {
  let number = Math.floor(Math.random() * 1e12).toString();
  while (number.length < 12) {
    number = '0' + number;
  }
  return number;
}

function Comment(content) {
  this.userid = numberId();
  this.content = content;
  this.date = comment_time;
}

function createRow(userid, content, date) {
  const ul = document.createElement('ul');
  const li1 = document.createElement('li');
  const li2 = document.createElement('li');
  const li3 = document.createElement('li');

  ul.append(li1);
  ul.append(li2);
  ul.append(li3);

  ul.setAttribute('class', 'comment-row');
  li1.setAttribute('class', 'comment-id');
  li2.setAttribute('class', 'comment-content');
  li3.setAttribute('class', 'comment-date');

  li1.innerHTML = userid;
  li2.innerHTML = content;
  li3.innerHTML = date;

  return ul;
}

function drawing() {
  commentList.innerHTML = '';
  for (let i = list.length - 1; i >= 0; i--) {
    const row = createRow(list[i].userid, list[i].content, list[i].date)
    commentList.append(row);
  }
}

function totalRecord() {
  // total.innerHTML = `${list.length}`;
}

function commentBtnHandler(e) {
  e.preventDefault();
  const input = e.target.content;
  if (input.value === "") {
    alert("리뷰를 작성해주세요.");
    return;
  }
  const commentObj = new Comment(input.value)
  list.push(commentObj);
  totalRecord();

  drawing();
  e.target.reset();
}


totalRecord();
commentBtn.addEventListener("submit", commentBtnHandler);