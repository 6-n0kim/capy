// 네비게이션 요소 객체 작성
const navContents = {
    title: ["collection",
        "store location",
        "online store",
        "contact",
        "corporate"
    ]
    ,
    img: [
        "img/thumb1.jpg",
        "img/thumb2.jpg",
        "img/thumb3.jpg",
        "img/thumb4.jpg",
        "img/thumb5.jpg",
        "img/thumb6.jpg",
    ],
    subMenu: 'menu item',
};

// 요소 삽입을 위한 DOM 변수
const nav = document.querySelector('nav ul');

// 삽입될 요소 초기화 변수
let navList = "";

navContents.title.map((content, index) => {
    navList = `<li>
                            <a href="#">${content}</a>
                            <div>
                                <h2>${content}</h2>
                                <p><img src="${navContents.img[index]}" alt="Thumb Image"></p>
                                <!--<p><img src="img/thumb${index + 1}.jpg" alt="Thumb Image"></p>-->
                                <ul>
                                    <li><a href="#">${navContents.subMenu}</a></li>
                                    <li><a href="#">${navContents.subMenu}</a></li>
                                    <li><a href="#">${navContents.subMenu}</a></li>
                                    <li><a href="#">${navContents.subMenu}</a></li>
                                </ul>
                            </div>
                        </li>`;
    nav.insertAdjacentHTML("beforeend", navList);
});

// 200장 이미지가 삽입될 요소
const images = document.querySelector('.main-img');

// 이미지 요소 초기화
let imgList = '';

// 200장 이미지 반복문으로 추가
for (let i = 0; i < 200; i++) {
    imgList += `<img src="img/pic${i}.jpg" alt="Image Frames">`;
}

images.insertAdjacentHTML('afterbegin', imgList);

// 마우스 이동 시 이미지 전환
// 1. 좌표 계산
// 2. 계산된 자표를 200으로비율 분할
// 3. 마우스 이동 시 전체 이미지 가림
// 4. 분할된 자표 위지치의 이미지를 보여준다.

const x = document.querySelector(".x");


window.addEventListener("mousemove", function (e) {

    // 1. 좌표 계산
    const clx = e.clientX; // 커서 위치 좌표
    const screenW = this.document.body.offsetWidth; // 화면 사이즈

    // Math.floor() -- 소수점 날림
    const percent = Math.floor((clx / screenW) * 200); // 200 비율로 분할된 커서 위치
    x.textContent = percent;

    //2. 마우스 이동 시 전체 이미지 가림
    const imgElements = document.querySelectorAll(".main-img > img");
    imgElements.forEach((element) => {
        element.style.display = 'none';
    });

    imgElements[percent].style.display = 'block';
});