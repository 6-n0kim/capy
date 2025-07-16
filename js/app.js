const projectContents = {
    title: ["맵 기반 sns 서비스 (on spot)",
        "헬스 케어 서비스 (body manager)",
        "(주)아던트 프로젝트 내부감사 시스템 (IBK기업은행 연계)",
        "(주)아던트 프로젝트 구인구직 웹 서비스 (ORP연구소 연계)",
        "식단 및 인바디 관리 서비스 (fitharmony)"
    ],
    teamSize: [1, 4, 14, 8, 4],  // 각 프로젝트별 팀 인원수
    description: [
        "지역 기반 SNS 서비스로 사용자들이 특정 장소에서의 경험을 공유하고 소통할 수 있는 플랫폼",
        "개인 맞춤형 건강 관리 서비스로 운동, 식단, 인바디 등 건강 데이터를 통합 관리",
        "기업 내부 감사 프로세스를 디지털화하여 효율성을 높이는 시스템",
        "취업자와 구직자를 연결하는 웹 기반 플랫폼",
        "식단 및 인바디 관리 서비스"
    ],
    pnl: [
        ["java, javascript, jsp, spring, oracle"],
        ["java, javascript, react, springboot, mariadb, s3"],
        ["java, nexacro, 전자정부프레임워크, tibero"],
        ["java, javascript, JSP, spring, mariadb"],
        ["react, node.js, express, aws, nginx"]
    ],
    period: [
        "2022.07 - 2022.09",
        "2022.09 - 2022.12",
        "2023.01 - 2023.06",
        "2023.07 - 2023.10",
        "2025.05 - 2025.07" 
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
            role: "BE, FE",
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
            role: "BE, FE",
            tasks: [
                "게시판 기능(CRUD) 및 페이징 처리",
                "공통 코드 관리",
                "단위 테스트 및 통합 테스트 구현",
                "디자인(css) 구성"
            ],
            results: "실무 프로젝트 관리 및 팀원 업무 분배 경험"
        },
        {
            role: "BE",
            tasks: [
                "데이터 최적화 : DB 마이그레이션 및 불필요한 쿼리 제거",
                "기존 코드 분석 및 리팩토링, 테스트 진행",
                "파일 첨부 기능 개발: 파일 업로드 지원 및 성능 개선"
            ],
            results: "기존 코드 분석 및 테스트 진행 오류 80% 이상 해결"
        },
        {
            role: "BE, FE, DBA",
            tasks: [
                "기획, 설계, 개발, 배포 전체 과정 참여",
                "인바디 데이터 수집 및 OCR + GPT-model 연동으로 텍스트 추출 및 파싱 처리",
                "마이페이지, 인트로 페이지 구현",
                "DB 설계 및 관리"
            ],
            results: "공모전 그룹에 참여할 수 있게 된 프로젝트"
        }
    ],
    link: [
        ["https://github.com/6-n0kim/on_spot"],
        ["https://github.com/6-n0kim/bodymanager_server"],
        ["https://github.com/6-n0kim/IBK-internal-audit"],
        ["https://github.com/6-n0kim/ORP-job-board"],
        ["https://github.com/AICC6FitHarmony/FIT_HARMONY_BACK", "https://github.com/AICC6FitHarmony/FIT_HARMONY_FRONT"],
    ]
}

// project section population
const projectGrid = document.getElementById('projectGrid');
console.log('project Grid Element:', projectGrid);

let projectHTML = '';

console.log('project Contents:', projectContents);

projectContents.title.forEach((title, index) => {
    console.log('Processing project:', title);
    projectHTML += `
        <div class="project-item">
            <h3>${title}</h3>
            <p>${projectContents.description[index]}</p>
            <div class="project-details">
                <p><strong>기간:</strong> ${projectContents.period[index]}</p>
                <p><strong>팀 규모:</strong> ${projectContents.teamSize[index]}명</p>
                <p><strong>사용 기술:</strong> ${projectContents.pnl[index].join(', ')}</p>
                <p><strong>역할:</strong> ${projectContents.achievements[index].role}</p>
                <p><strong>주요 업무:</strong></p>
                <ul class = "no-dot">
                    ${projectContents.achievements[index].tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
                <p><strong>성과:</strong> ${projectContents.achievements[index].results}</p>
                ${projectContents.link[index] && !title.includes('아던트') ? 
                    `<p><strong><i class="ri-github-fill"></i>:</strong> 
                        ${Array.isArray(projectContents.link[index]) ? 
                            projectContents.link[index].length === 1 ? 
                                `<a href="${projectContents.link[index][0]}" target="_blank">LINK</a>` :
                                projectContents.link[index].map((link, linkIndex) => 
                                    `<a href="${link}" target="_blank">${linkIndex === 0 ? 'Frontend' : 'Backend'}</a>${linkIndex < projectContents.link[index].length - 1 ? ' | ' : ''}`
                                ).join('')
                            : 
                            `<a href="${projectContents.link[index]}" target="_blank">LINK</a>`
                        }
                    </p>` : ''
                }
            </div>
        </div>
    `;
});

console.log('Generated HTML:', projectHTML);
projectGrid.innerHTML = projectHTML;