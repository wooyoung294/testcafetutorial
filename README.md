# TESTCAFE로 TODO 페이지를 테스트해보자!
+ 배포 주소 : tsetcafe.wooyu.world
+ 테스트 페이지 주소 : todo.wooyu.world
<br/>

### 프로젝트 소개
TestCafe를 활용하여 Todo 페이지를 자동으로 테스트하고, 이를 testcafe-reporter-cucumber-json을 사용하여 결과를 JSON 형식으로 저장합니다.

#### TESTCAFE란?
TestCafe는 웹 페이지를 테스트하는 데 사용되는 오픈 소스 자동화 테스트 프레임워크이며 크로스 브라우징을 간단한 명령어의 추가로 지원합니다.

PORT의 경우 1337번을 사용하며 실시간 브라우저 테스트는 GUI가 지원되는 OS에서 구동시 지원합니다.

그리고 multiple-cucumber-html-reporter를 UI 보고서를 생성합니다. 

해당 프로젝트의 경우 Linux를 사용해서 테스트를 하는 화면은 표시되지 않고 리포트 페이지와 테스트 종료시 해당 결과를 상세히 볼 수 있습니다.

#### 주관적인 TESTCAFE 장/단점
장점으로는 러닝커브가 낮아 쉽게 습득할 수 있으며 테스트 코드와 프로젝트 코드의 분리 또한 사용자가 이용하는 실제 페이지를 대상으로 테스트를 진행할 수 있어서 좋은거 같습니다.

단점으로는 초기의 로딩이 오래 걸려서 테스트 하는데 시간이 길다고 느껴지는 편입니다.


<br/>


### Requirement
+ Node : 20.11.1
+ NPM : 10.2.4


## STACK
### Environment
![intellijidea](https://img.shields.io/badge/intellijidea-000000?style=for-the-badge&logo=intellijidea)
<img src="https://camo.githubusercontent.com/8d433710b84192cd318b602aadcf296eed6c443fea42c2f06fba2ce65a49a412/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769742d4630353033323f7374796c653d666f722d7468652d6261646765266c6f676f3d476974266c6f676f436f6c6f723d7768697465" alt="Git" data-canonical-src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&amp;logo=Git&amp;logoColor=white" style="max-width: 100%;">  <img src="https://camo.githubusercontent.com/dc4e9f7ea9597ea5a27629a36afb9ef8697569c621ccb42369070012b4092ae1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769744875622d3138313731373f7374796c653d666f722d7468652d6261646765266c6f676f3d476974487562266c6f676f436f6c6f723d7768697465" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&amp;logo=GitHub&amp;logoColor=white" style="max-width: 100%;">


### Config
![npm](https://img.shields.io/badge/npm-C71A36?style=for-the-badge&logo=npm)

### Devleopment
![Javascript](https://img.shields.io/badge/javascript-444444?style=for-the-badge&logo=javascript)

<br/>

## 화면구성
|보고서|테스트 상세|테스트 실패시 화면|
|------|---|---|
|![main](https://github.com/wooyoung294/testcafetutorial/assets/160103260/0eb3923a-df84-461a-8bf0-81babaf68f22)|![list](https://github.com/wooyoung294/testcafetutorial/assets/160103260/7528b799-6b12-444c-b878-ff2bfa7861ed)|![error](https://github.com/wooyoung294/testcafetutorial/assets/160103260/729b89f1-8575-4e34-9b78-a6d910ae94fe)|

