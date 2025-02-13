// header.js
// window.addEventListener('DOMContentLoaded', (event) => {
//     fetch('common/header.html')
//         .then(response => response.text())
//         .then(data => {
//             const headerElement = document.getElementById('header');
//             if (headerElement) {
//                 headerElement.innerHTML = data;
//             }
//         });
// });

//btn
const availablePages = ["test_01.html", "test_02.html", "example_02.html", "demo_03.html"]; //사용가능한 파일 목록

function navigateToPage(buttonId) {
    let match = buttonId.match(/_(\d+)$/);
    if (match) {
        let pageNumber = match[1]; // 숫자 부분 (예: "01")
        // 파일 목록에서 `_숫자.html`이 포함된 파일 찾기
        let targetPage = availablePages.find(page => page.endsWith(`_${pageNumber}.html`));
        if (targetPage) {
            if (window.location.pathname.indexOf('/_posts/') === -1) {
                window.location.href = "/_posts/" + targetPage; // index.html에서 이동할 때
            } else {
                window.location.href = targetPage; // 이미 _posts/ 안에 있을 때
            }
        } else {
            console.error("해당하는 HTML 파일을 찾을 수 없습니다.");
        }
    } else {
        console.error("버튼 ID에서 숫자를 찾을 수 없습니다.");
    }
}
