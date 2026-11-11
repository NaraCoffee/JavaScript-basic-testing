// Grid 26의 스크롤 동작을 담당하는 파일이다.
// HTML은 내용, CSS는 모양을 담당하고, 이 파일은 이벤트에 맞춰 CSS용 클래스를 바꾸거나 화면을 이동한다.
// 선수 자세히보기는 HTML의 링크이며, 이 파일에서 펼치기·접기 동작을 연결하지 않는다.

// document.querySelector는 CSS 선택자로 첫 번째 HTML 요소를 찾는다.
// body를 page라는 상수에 담아, 페이지 전체 상태를 나타내는 클래스를 붙이거나 뺀다.
const page = document.querySelector('body');
// header에도 top 클래스가 있으므로 footer 안의 .top만 골라 TOP 버튼을 찾는다.
const topButton = document.querySelector('footer .top');

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
