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
