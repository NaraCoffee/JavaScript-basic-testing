// Grid 26의 스크롤 동작을 담당하는 파일이다.
// HTML은 내용, CSS는 모양을 담당하고, 이 파일은 이벤트에 맞춰 CSS용 클래스를 바꾸거나 화면을 이동한다.
// 선수 자세히보기는 HTML의 링크이며, 이 파일에서 펼치기·접기 동작을 연결하지 않는다.

// document.querySelector는 CSS 선택자로 첫 번째 HTML 요소를 찾는다.
// body를 page라는 상수에 담아, 페이지 전체 상태를 나타내는 클래스를 붙이거나 뺀다.
const page = document.querySelector('body');
// header에도 top 클래스가 있으므로 footer 안의 .top만 골라 TOP 버튼을 찾는다.
const topButton = document.querySelector('footer .top');

// 모바일 메뉴 버튼을 누를 때마다 헤더의 open 클래스를 켜거나 끈다.
const menuToggle = document.querySelector('.menu-toggle');
const topBar = document.querySelector('.top-bar');
const menuLinks = document.querySelectorAll('.menu a');
menuToggle.addEventListener('click', function () {
    topBar.classList.toggle('open');
});
// 메뉴 링크를 누르면 기본 순간이동을 막고, 헤더 높이를 제외한 위치로 부드럽게 스크롤 이동한다.
menuLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        // a 태그 클릭 시 기본으로 일어나는 깜빡임·순간이동을 방지한다.
        e.preventDefault();

        // 클릭한 링크의 href 속성값('#champion' 등)을 가져온다.
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // 섹션의 세로 시작 위치(offsetTop)에서 상단 고정 헤더 높이(약 100px)를 빼서 가려짐을 방지한다.
            const targetTop = targetSection.offsetTop - 100;

            // 수업 3번 실습(TOP 버튼)과 동일하게 부드러운 스크롤 옵션을 전달한다.
            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        }

        // 모바일 화면에서 메뉴를 선택한 뒤 펼쳐진 메뉴창을 자동으로 닫는다.
        if (topBar) {
            topBar.classList.remove('open');
        }
    });
});

// 메인 배너의 '순위 보기' 버튼도 동일하게 부드럽게 스크롤 이동한다.
const heroBtn = document.querySelector('.hero-text .btn');
if (heroBtn) {
    heroBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector('#champion');
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
}

// 같은 스크롤 확인 작업을 반복해서 쓸 수 있도록 함수로 묶는다.
// 함수 정의만으로는 실행되지 않는다. 아래의 이벤트 연결과 updateScroll() 호출이 이 함수를 실행한다.
function updateScroll() {
    // scrollY는 맨 위에서 아래로 얼마나 스크롤했는지 나타내는 px 값이다.
    // 정확히 100px에서는 else, 100px를 넘으면 if 안의 코드가 실행된다.
    if (window.scrollY > 100) {
        // body에 클래스를 추가한다. CSS가 이를 보고 헤더 배경을 진하게 하고 TOP 버튼을 보여준다.
        page.classList.add('page-scrolled');
    } else {
        // 다시 맨 위 근처로 올라오면 클래스를 빼서 기본 배경과 숨겨진 TOP 버튼 상태로 되돌린다.
        page.classList.remove('page-scrolled');
    }
}

// JS가 실행됐다는 표시다. CSS의 .js-enabled footer .top 규칙이 기본 숨김 상태를 적용한다.
page.classList.add('js-enabled');
// 사용자가 스크롤할 때마다 updateScroll 함수를 실행하도록 등록한다.
// 여기서는 updateScroll 뒤에 괄호를 붙이지 않아, 함수를 지금 실행하는 대신 이벤트에 전달한다.
window.addEventListener('scroll', updateScroll);
// 페이지를 처음 열거나 이전 스크롤 위치로 돌아왔을 때도 현재 위치에 맞는 상태를 한 번 적용한다.
updateScroll();

// TOP 버튼을 클릭했을 때 실행할 코드를 연결한다. function 안의 내용은 클릭할 때마다 실행된다.
topButton.addEventListener('click', function () {
    // window.scrollTo는 문서의 스크롤 위치를 이동시킨다. 중괄호 안에 이동 옵션을 넣는다.
    window.scrollTo({
        // 세로 목표 위치 0px은 페이지 맨 위다.
        top: 0,
        // smooth는 즉시 점프하지 않고 부드럽게 올라가도록 하는 옵션이다.
        behavior: 'smooth'
    });
});

// 5번 수업 예제와 같이 탭과 카드를 순서대로 연결한다.
const tabs = document.querySelectorAll('.guide-tabs li');
const contents = document.querySelectorAll('.guide-content li');
init(0);
// num번째 버튼과 카드만 선택 상태로 만든다.
function init(num) {
    tabs[num].classList.add('on');
    contents[num].classList.add('on');
}
// 선택하기 전에 모든 항목의 on 클래스를 지운다.
function reset() {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('on');
        contents[i].classList.remove('on');
    }
}
tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
        reset();
        init(i);
    });
});
// 카드도 탭과 같은 순서로 연결해, 카드 안의 글자나 이모지를 눌러도 함께 선택한다.
contents.forEach(function (content, i) {
    content.addEventListener('click', function () {
        reset();
        init(i);
    });
});
