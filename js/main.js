document.addEventListener('DOMContentLoaded', function () {
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
    });
  }

  // 각 페이지 별로 식별자 가져오기
  function getMovieIdFromURL() {
    const url = window.location.href;
    const params = new URLSearchParams(url.split('?')[1]);
    return params.get('movieId');
  }

  const movieId = getMovieIdFromURL();

  // 댓글 처리
  const commentForms = document.querySelectorAll('.commentFrm');
  commentForms.forEach(form => {
    const movieId = form.id.split('_')[1];
    const commentListElement = document.querySelector(`#comment-list_${movieId}`);
    let list = JSON.parse(localStorage.getItem(`comments_${movieId}`)) || [];
    let today = new Date();

    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    let comment_time = year + '-' + month + '-' + day;

    // 페이지가 로드될 때 기존 댓글 불러오기
    drawing(commentListElement, list);

    // 아이디
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
      const deleteBtn = document.createElement('button');

      ul.append(li1);
      ul.append(li2);
      ul.append(li3);
      ul.append(deleteBtn);

      ul.setAttribute('class', 'comment-row');
      li1.setAttribute('class', 'comment-id');
      li2.setAttribute('class', 'comment-content');
      li3.setAttribute('class', 'comment-date');
      deleteBtn.setAttribute('class', 'delete-btn');

      li1.innerHTML = userid;
      li2.innerHTML = content;
      li3.innerHTML = date;
      deleteBtn.innerHTML = 'X';

      // 댓글 삭제

      deleteBtn.addEventListener('click', function () {
        list = list.filter(comment => comment.userid !== userid);
        saveComments(movieId, list);
        drawing(commentListElement, list);
      });

      return ul;
    }

    function drawing(commentListElement, list) {
      commentListElement.innerHTML = '';
      for (let i = list.length - 1; i >= 0; i--) {
        const row = createRow(list[i].userid, list[i].content, list[i].date);
        commentListElement.append(row);
      }
    }

    // 로컬스토리지 댓글 저장
    function saveComments(movieId, list) {
      localStorage.setItem(`comments_${movieId}`, JSON.stringify(list));
    }

    // 댓글 작성 

    function commentBtnHandler(e) {
      e.preventDefault();
      const input = form.content;
      if (input.value === "") {
        alert("리뷰를 작성해주세요.");
        return;
      }
      const commentObj = new Comment(input.value);
      list.push(commentObj);
      saveComments(movieId, list);
      drawing(commentListElement, list);
      form.reset();
    }

    form.addEventListener('submit', commentBtnHandler);

    // 댓글 엔터 

    form.content.addEventListener('keyPress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        commentBtnHandler(e);
      }
    });
  });
});