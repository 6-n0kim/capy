const PortfolioContents = {
    title: ["1. 맵 기반 sns 서비스 (on spot)",
        "2. 헬스 케어 서비스 (body manager)",
        "(주)아던트 프로젝트 1. 내부감사 시스템 (IBK기업은행 연계)",
        "(주)아던트 프로젝트 2. 구인구직 웹 서비스 (ORP연구소 연계)"
    ],
    teamSize: [1, 4, 14, 8],  // 각 프로젝트별 팀 인원수
    description: [
        "지역 기반 SNS 서비스로 사용자들이 특정 장소에서의 경험을 공유하고 소통할 수 있는 플랫폼",
        "개인 맞춤형 건강 관리 서비스로 운동, 식단, 인바디 등 건강 데이터를 통합 관리",
        "기업 내부 감사 프로세스를 디지털화하여 효율성을 높이는 시스템",
        "취업자와 구직자를 연결하는 웹 기반 플랫폼"
    ],
    pnl: [
        ["java, javascript, jsp, spring, oracle"],
        ["java, javascript, react, springboot, mariadb, s3"],
        ["java, nexacro, 전자정부프레임워크, tibero"],
        ["java, javascript, JSP, spring, mariadb"]
    ],
    period: [
        "2022.07 - 2022.09",
        "2022.09 - 2022.12",
        "2023.01 - 2023.06",
        "2023.07 - 2023.10"
    ],
    achievements: [
        {
            role: "1인 개발",
            tasks: [
                "게시판 기능(CRUD)",
                "카카오 맵 API 연동 및 마커 표시 기능 구현",
                "DB 설계",
                "웹 페이지 디자인 구성",
            ],
            results: "첫 솔로 프로젝트로 프로젝트 흐름 및 개발 방식 이해"
        },
        {
            role: "풀스택(back90%, front10%)",
            tasks: [
                "사용자 건강 데이터 수집 및 s3를 통한 이미지 저장 시스템 구축",
                "smtp 및 메일 발송 시스템 구축",
                "JWT 토큰 기반 인증 시스템 구현",
                "RESTful API 설계 및 개발",
                "카카오 및 구글 소셜 로그인 기능 구현",
                "관리자 페이지(react) 구현"
            ],
            results: "개별 스터디를 통한 새로운 기술 학습 및 최우수상 수상"
        },
        {
            role: "풀스택(back50%, front50%)",
            tasks: [
                "게시판 기능(CRUD) 및 페이징 처리",
                "공통 코드 관리",
                "단위 테스트 및 통합 테스트 구현",
                "디자인(css) 구성"
            ],
            results: "실무 프로젝트 관리 및 팀원 업무 분배 경험"
        },
        {
            role: "백엔드",
            tasks: [
                "데이터 최적화 : DB 마이그레이션 및 불필요한 쿼리 제거",
                "기존 코드 분석 및 리팩토링, 테스트 진행",
                "파일 첨부 기능 개발: 파일 업로드 지원 및 성능 개선"
            ],
            results: "기존 코드 분석 및 테스트 진행 오류 80% 이상 해결"
        }
    ]
}
// // 요소 삽입을 위한 DOM 변수
// const nav = document.querySelector('nav ul');

// // 삽입될 요소 초기화 변수
// let navList = "";

// navContents.title.map((content, index) => {
//     navList = `<li>
//                             <a href="#">${content}</a>
//                             <div>
//                                 <h2>${content}</h2>
//                                 <p><img src="${navContents.img[index]}" alt="Thumb Image"></p>
//                                 <!--<p><img src="images/thumb${index + 1}.jpg" alt="Thumb Image"></p>-->
//                                 <ul>
//                                     <li><a href="${navContents.subMenu}.html">${navContents.subMenu}</a></li>
//                                     <li><a href="todoList.html">${navContents.subMenu}</a></li>
//                                     <li><a href="#">${navContents.subMenu}</a></li>
//                                     <li><a href="#">${navContents.subMenu}</a></li>
//                                 </ul>
//                             </div>
//                         </li>`;
//     nav.insertAdjacentHTML("beforeend", navList);
// });

// // 200장 이미지가 삽입될 요소
// const images = document.querySelector('.main-img');

// // 이미지 요소 초기화
// let imgList = '';

// // 200장 이미지 반복문으로 추가
// for (let i = 0; i < 200; i++) {
//     imgList += `<img src="images/pic${i}.jpg" alt="Image Frames">`;
// }

// images.insertAdjacentHTML('afterbegin', imgList);

// // 마우스 이동 시 이미지 전환
// // 1. 좌표 계산
// // 2. 계산된 자표를 200으로비율 분할
// // 3. 마우스 이동 시 전체 이미지 가림
// // 4. 분할된 자표 위지치의 이미지를 보여준다.

// const x = document.querySelector(".x");


// window.addEventListener("mousemove", function (e) {

//     // 1. 좌표 계산
//     const clx = e.clientX; // 커서 위치 좌표
//     const screenW = this.document.body.offsetWidth; // 화면 사이즈

//     // Math.floor() -- 소수점 날림
//     const percent = Math.floor((clx / screenW) * 200); // 200 비율로 분할된 커서 위치
//     x.textContent = percent;

//     //2. 마우스 이동 시 전체 이미지 가림
//     const imgElements = document.querySelectorAll(".main-img > img");
//     imgElements.forEach((element) => {
//         element.style.display = 'none';
//     });

//     imgElements[percent].style.display = 'block';
// });

// // 네비게이션 요소 객체 작성
// const navContents = {
//     title: ["todolist",
//         "store location",
//         "online store",
//         "contact",
//         "corporate"
//     ]
//     ,
//     img: [
//         "images/thumb1.jpg",
//         "images/thumb2.jpg",
//         "images/thumb3.jpg",
//         "images/thumb4.jpg",
//         "images/thumb5.jpg",
//         "images/thumb6.jpg",
//     ],
//     subMenu: 'todoList',
// };


// Portfolio section population
const portfolioGrid = document.getElementById('portfolioGrid');
console.log('Portfolio Grid Element:', portfolioGrid);

let portfolioHTML = '';

console.log('Portfolio Contents:', PortfolioContents);

PortfolioContents.title.forEach((title, index) => {
    console.log('Processing project:', title);
    portfolioHTML += `
        <div class="portfolio-item">
            <h3>${title}</h3>
            <p>${PortfolioContents.description[index]}</p>
            <div class="portfolio-details">
                <p><strong>기간:</strong> ${PortfolioContents.period[index]}</p>
                <p><strong>팀 규모:</strong> ${PortfolioContents.teamSize[index]}명</p>
                <p><strong>사용 기술:</strong> ${PortfolioContents.pnl[index].join(', ')}</p>
                <p><strong>역할:</strong> ${PortfolioContents.achievements[index].role}</p>
                <p><strong>주요 업무:</strong></p>
                <ul class = "no-dot">
                    ${PortfolioContents.achievements[index].tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
                <p><strong>성과:</strong> ${PortfolioContents.achievements[index].results}</p>
            </div>
        </div>
    `;
});

console.log('Generated HTML:', portfolioHTML);
portfolioGrid.innerHTML = portfolioHTML;