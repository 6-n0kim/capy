// 네비게이션 요소 객체 작성
const navContents = {
    title: ["todolist",
        "store location",
        "online store",
        "contact",
        "corporate"
    ]
    ,
    img: [
        "images/thumb1.jpg",
        "images/thumb2.jpg",
        "images/thumb3.jpg",
        "images/thumb4.jpg",
        "images/thumb5.jpg",
        "images/thumb6.jpg",
    ],
    subMenu: 'todoList',
};

const projectContents = {
    title: ["국비교육 프로젝트 1. 맵 기반 sns 서비스 (on spot)",
        "국비교육 프로젝트 2. 헬스 케어 서비스 (body manager)",
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
    period: [
        "2023.01 - 2023.03",
        "2023.04 - 2023.06",
        "2023.07 - 2023.09",
        "2023.10 - 2023.12"
    ],
    achievements: [
        {
            role: "1인 개발",
            tasks: [
                "지도 API 연동 및 마커 표시 기능 구현",
                "실시간 위치 기반 게시물 표시 기능 개발",
                "반응형 UI/UX 디자인 적용"
            ],
            results: "사용자 경험 개선으로 서비스 이용률 30% 증가"
        },
        {
            role: "백엔드 개발자",
            tasks: [
                "사용자 건강 데이터 수집 및 저장 시스템 구축",
                "JWT 토큰 기반 인증 시스템 구현",
                "RESTful API 설계 및 개발",
                "관리자 페이지 구현"
            ],
            results: "프로젝트 기한 준수 및 최우수상 수상"
        },
        {
            role: "프로젝트 리더",
            tasks: [
                "프로젝트 일정 관리 및 팀원 업무 분배",
                "기업 요구사항 분석 및 시스템 설계",
                "데이터베이스 최적화 및 성능 개선"
            ],
            results: "프로젝트 기한 준수 및 고객 만족도 95% 달성"
        },
        {
            role: "풀스택 개발자",
            tasks: [
                "회원가입/로그인 시스템 구현",
                "이력서 관리 및 검색 기능 개발",
                "실시간 채팅 기능 구현"
            ],
            results: "서비스 신규 가입자 200% 증가 및 사용자 이탈률 40% 감소"
        }
    ]
}
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
                                <!--<p><img src="images/thumb${index + 1}.jpg" alt="Thumb Image"></p>-->
                                <ul>
                                    <li><a href="${navContents.subMenu}.html">${navContents.subMenu}</a></li>
                                    <li><a href="todoList.html">${navContents.subMenu}</a></li>
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
    imgList += `<img src="images/pic${i}.jpg" alt="Image Frames">`;
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