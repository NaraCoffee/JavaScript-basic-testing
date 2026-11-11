const page = document.querySelector('body');
const topButton = document.querySelector('footer .top');

// DOM 제어 3번: 스크롤 위치에 따라 클래스를 붙이거나 뺀다.
function updateScroll() {
    if (window.scrollY > 100) {
        page.classList.add('page-scrolled');
    } else {
        page.classList.remove('page-scrolled');
    }
}

page.classList.add('js-enabled');
window.addEventListener('scroll', updateScroll);
updateScroll();

topButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 배열과 반복문으로 선수별 버튼에 같은 클릭 동작을 연결한다.
const drivers = [
    document.querySelector('#driver-kimi'),
    document.querySelector('#driver-max'),
    document.querySelector('#driver-lewis')
];
const detailOpen = [false, false, false];

for (let i = 0; i < drivers.length; i++) {
    const moreButton = drivers[i].querySelector('.more');

    moreButton.addEventListener('click', function () {
        drivers[i].classList.toggle('detail-open');
        detailOpen[i] = !detailOpen[i];

        if (detailOpen[i]) {
            moreButton.textContent = '접기 ↑';
        } else {
            moreButton.textContent = '자세히보기 →';
        }
    });
}
