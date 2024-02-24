import {Selector} from 'testcafe';

fixture('Todo Init Test')
    .page('http://34.64.140.229:8181/')
//npm run InitTest


test('TC00000000 Logo is visible', async t => {
    const logo = Selector('html');
    await t.expect(logo.textContent).contains('To do list')
        .wait(5000);
});

test('TC00000001 Searchbar is visible', async t => {
    const SearchBar = Selector('.searchBar')
    const SearchTitle = SearchBar.find('#searchTitle')
    //await t.expect(SearchBar.find('#searchTitle').exists).ok(); 변수 선언 없이 이렇게 해도 가능
    const SearchDate = SearchBar.find('#searchDate')
    const SearchIcon = SearchBar.find('.searchIcon')

    await t.expect(SearchTitle.exists).ok();
    await t.expect(SearchDate.exists).ok();
    await t.expect(SearchIcon.exists).ok();
});

test('TC00000002 SearchBar Text is visible', async t => {
    const SearchBarText = Selector('#searchTitle')
    await t.expect(SearchBarText.getAttribute('placeholder')).eql('내용을 입력하세요.')
        .wait(5000);
});

test('TC00000003 SearchDate is visible', async t => {
    const SearchDate = Selector('#searchDate')
    await t.expect(SearchDate.value).eql('')
        .wait(5000);
});

test('TC00000004 Search Button is visible', async t => {
    const SearchButton = Selector('.searchIcon')
    await t.click(SearchButton).wait(5000);
});


test('TC00000005 Write Button is visible', async t => {
    const WriteButton = Selector('.searchBar > [data-bs-target="#addModal"]')
    await t.click(WriteButton).wait(5000);
});

//리스트가 존재하지 않는지 확인
test('TC00000006 List is empty', async t => {
    const ScrollDiv = Selector('#scrollDiv')
    await t.expect(ScrollDiv.innerText).notOk();
    // const a = Selector('#scrollDiv', {timeout:500}).innerText
    // console.log('>>>>',a)
});

// 리스트를 생성해서 리스트가 존재하는지 확인
test('TC00000007 create Todo', async t => {
    const CreateTodo = {
        title: 'Test title',
        content: 'Test content',
        date: '2024-02-08',
        status: '대기중'
    } //투두 생성하라고 요청보냄

    //요청한거 응답하는지 확인
    const CheckReq = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo,

    })
    await t.expect(CheckReq.status).eql(200)


    const {num, ...others} = CheckReq.body[CheckReq.body.length - 1];
    await t.expect(others).eql(CreateTodo);
    await t.eval(() => location.reload(true)); //새로고침
    await t.wait(2000);


    const ExistList = Selector('#scrollDiv')
    await t.expect(ExistList.hasChildElements).ok()
        .expect(ExistList.textContent).contains('Test title') // 자식요소에 이글자가 있나오
        .wait(2000);


    //테스트 다 했으면 삭제 요청하기
    const DelReq = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num, //requestparam과 requestbody 읽어보기
        method: 'Delete',
        headers: {"charset": "utf-8"},

    })
    await t.expect(DelReq.status).eql(200); //삭제요청 잘됐나
    await t.eval(() => location.reload(true)); //새로고침
    await t.expect(ExistList.hasChildElements).notOk(); //자식요소에 아무것도 없는지


    await t.eval(() => location.reload(true));  //새로고침
    await t.wait(2000);
});


test('TC00000008 status test', async t => {
    const CreateTodo = {
        title: 'Test title',
        content: 'Test content',
        date: '2024-02-19',
        status: '대기중'
    }
    const CheckReq = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo,
    })
    await t.expect(CheckReq.status).eql(200)

    const {num, ...others} = CheckReq.body[CheckReq.body.length - 1];
    // await t.expect(others).eql(CreateTodo);
    await t.eval(() => location.reload(true)); //새로고침
    await t.wait(2000);


    const StatusBtn = Selector('#statusBtn' + num);
    // const StatusBtn = Selector(`#statusBtn${num}`);

    await t.expect(StatusBtn.textContent).contains('대기중');


    const ExistList = Selector('#scrollDiv')
    //테스트 다 했으면 삭제 요청하기
    const DelReq = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num, //requestparam과 requestbody 읽어보기
        method: 'Delete',
        headers: {"charset": "utf-8"},
    })
    await t.expect(DelReq.status).eql(200); //삭제요청 잘됐나
    await t.eval(() => location.reload(true)); //새로고침
    await t.expect(ExistList.hasChildElements).notOk(); //자식요소에 아무것도 없는지

    await t.eval(() => location.reload(true));  //새로고침
    await t.wait(2000);
});

test('TC00000009 status test', async t => {
    const CreateTodo = {
        title: 'Test title',
        content: 'Test content',
        date: '2024-02-19',
        status: '진행중'
    }
    const CheckReq = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo,
    })
    await t.expect(CheckReq.status).eql(200)

    const {num, ...others} = CheckReq.body[CheckReq.body.length - 1];
    // await t.expect(others).eql(CreateTodo);
    await t.eval(() => location.reload(true)); //새로고침
    await t.wait(2000);


    const StatusBtn = Selector('#statusBtn' + num);
    // const StatusBtn = Selector(`#statusBtn${num}`);

    await t.expect(StatusBtn.textContent).contains('진행중');


    const ExistList = Selector('#scrollDiv')
    //테스트 다 했으면 삭제 요청하기
    const DelReq = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num, //requestparam과 requestbody 읽어보기
        method: 'Delete',
        headers: {"charset": "utf-8"},
    })
    await t.expect(DelReq.status).eql(200); //삭제요청 잘됐나
    await t.eval(() => location.reload(true)); //새로고침
    await t.expect(ExistList.hasChildElements).notOk(); //자식요소에 아무것도 없는지

    await t.eval(() => location.reload(true));  //새로고침
    await t.wait(2000);
});

test('TC00000010 status test', async t => {
    const CreateTodo = {
        title: 'Test title',
        content: 'Test content',
        date: '2024-02-19',
        status: '완료'
    }
    const CheckReq = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo,
    })
    await t.expect(CheckReq.status).eql(200)

    const {num, ...others} = CheckReq.body[CheckReq.body.length - 1];
    // await t.expect(others).eql(CreateTodo);
    await t.eval(() => location.reload(true)); //새로고침
    await t.wait(2000);


    const StatusBtn = Selector('#statusBtn' + num);
    // const StatusBtn = Selector(`#statusBtn${num}`);

    await t.expect(StatusBtn.textContent).contains('완료');


    const ExistList = Selector('#scrollDiv')
    //테스트 다 했으면 삭제 요청하기
    const DelReq = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num, //requestparam과 requestbody 읽어보기
        method: 'Delete',
        headers: {"charset": "utf-8"},
    })
    await t.expect(DelReq.status).eql(200); //삭제요청 잘됐나
    await t.eval(() => location.reload(true)); //새로고침
    await t.expect(ExistList.hasChildElements).notOk(); //자식요소에 아무것도 없는지

    await t.eval(() => location.reload(true));  //새로고침
    await t.wait(2000);
});


test('TC00000011 create Todo', async t => {
    const CreateTodo = {
        title: 'Test title',
        content: 'Test content',
        date: '2024-02-08',
        status: '대기중'
    } //투두 생성하라고 요청보냄

    //요청한거 응답하는지 확인
    const CheckReq = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo,

    })
    await t.expect(CheckReq.status).eql(200)


    const {num, ...others} = CheckReq.body[CheckReq.body.length - 1];
    await t.expect(others).eql(CreateTodo);
    await t.eval(() => location.reload(true)); //새로고침
    await t.wait(2000);


    const ExistList = Selector('#scrollDiv')
    await t.expect(ExistList.hasChildElements).ok()
        .expect(ExistList.textContent).contains('Test title') // 자식요소에 이글자가 있나오
        .wait(2000);


    //테스트 다 했으면 삭제 요청하기
    const DelReq = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num, //requestparam과 requestbody 읽어보기
        method: 'Delete',
        headers: {"charset": "utf-8"},

    })
    await t.expect(DelReq.status).eql(200); //삭제요청 잘됐나
    await t.eval(() => location.reload(true)); //새로고침
    await t.expect(ExistList.hasChildElements).notOk(); //자식요소에 아무것도 없는지


    await t.eval(() => location.reload(true));  //새로고침
    await t.wait(2000);
});

test('TC00000012 init test', async t => {
    const CreateTodo = {
        title: 'Test title',
        content: 'Test content',
        date: '2024-02-19',
        status: '대기중'
    }
    const CheckReq = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo,
    })
    await t.expect(CheckReq.status).eql(200)

    const {num, ...others} = CheckReq.body[CheckReq.body.length - 1];
    // await t.expect(others).eql(CreateTodo);
    await t.eval(() => location.reload(true)); //새로고침
    await t.wait(2000);

    //const EditTodo = Selector('#scrollDiv > [data-bs-target="#addModal"]');
    const ScrollDiv = Selector('#scrollDiv')
    await t.expect(ScrollDiv.find('.card [data-bs-target="#addModal"]').exists).ok();//수정버튼 존재하는지


    const DelScrollDiv = Selector('#scrollDiv')
    //테스트 다 했으면 삭제 요청하기
    const DelReq = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num, //requestparam과 requestbody 읽어보기
        method: 'Delete',
        headers: {"charset": "utf-8"},

    })
    await t.expect(DelReq.status).eql(200); //삭제요청 잘됐나
    await t.eval(() => location.reload(true)); //새로고침
    await t.expect(DelScrollDiv.hasChildElements).notOk(); //자식요소에 아무것도 없는지

    await t.eval(() => location.reload(true));  //새로고침
    await t.wait(2000);
});

test('TC00000013 init test', async t => {
    const CreateTodo = {
        title: 'Test title',
        content: 'Test content',
        date: '2024-02-19',
        status: '대기중'
    }
    const CheckReq = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo,
    })
    await t.expect(CheckReq.status).eql(200)

    const {num, ...others} = CheckReq.body[CheckReq.body.length - 1];
    // await t.expect(others).eql(CreateTodo);
    await t.eval(() => location.reload(true)); //새로고침
    await t.wait(2000);

    //const EditTodo = Selector('#scrollDiv > [data-bs-target="#addModal"]');
    const ScrollDiv = Selector('#scrollDiv')
    await t.expect(ScrollDiv.find('.card .deleteBtn').exists).ok();//삭제 버튼 존재하는지


    const DelScrollDiv = Selector('#scrollDiv')
    //테스트 다 했으면 삭제 요청하기
    const DelReq = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num, //requestparam과 requestbody 읽어보기
        method: 'Delete',
        headers: {"charset": "utf-8"},

    })
    await t.expect(DelReq.status).eql(200); //삭제요청 잘됐나
    await t.eval(() => location.reload(true)); //새로고침
    await t.expect(DelScrollDiv.hasChildElements).notOk(); //자식요소에 아무것도 없는지

    await t.eval(() => location.reload(true));  //새로고침
    await t.wait(2000);
});

test('TC00000014 init test', async t => {
    const CreateTodo1 = {
        title: 'Test title1',
        content: 'Test content',
        date: '2024-02-19',
        status: '대기중'
    }
    const CreateTodo2 = {
        title: 'Test title2',
        content: 'Test content',
        date: '2024-02-19',
        status: '대기중'
    }
    const CreateTodo3 = {
        title: 'Test title3',
        content: 'Test content',
        date: '2024-02-19',
        status: '대기중'
    }
    const CreateTodo4 = {
        title: 'Test title4',
        content: 'Test content',
        date: '2024-02-19',
        status: '대기중'
    }
    const CreateTodo5 = {
        title: 'Test title5',
        content: 'Test content',
        date: '2024-02-19',
        status: '대기중'
    }
    const CreateTodo6 = {
        title: 'Test title6',
        content: 'Test content',
        date: '2024-02-19',
        status: '대기중'
    }
    const CreateTodo7 = {
        title: 'Test title7',
        content: 'Test content',
        date: '2024-02-19',
        status: '대기중'
    }
    const CreateTodo8 = {
        title: 'Test title8',
        content: 'Test content',
        date: '2024-02-19',
        status: '대기중'
    }
    const CheckReq1 = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo1,
    })
    const CheckReq2 = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo2,
    })
    const CheckReq3 = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo3,
    })
    const CheckReq4 = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo4,
    })
    const CheckReq5 = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo5,
    })
    const CheckReq6 = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo6,
    })
    const CheckReq7 = await t.request({
        url: 'http://34.64.140.229:8181/createTodo',
        method: 'Post',
        headers: {
            "content-type": "application/json",
            "charset": "utf-8"
        },
        body: CreateTodo7,
    })

    await t.expect(CheckReq1.status).eql(200);
    await t.expect(CheckReq2.status).eql(200);
    await t.expect(CheckReq3.status).eql(200);
    await t.expect(CheckReq4.status).eql(200);
    await t.expect(CheckReq5.status).eql(200);
    await t.expect(CheckReq6.status).eql(200);
    await t.expect(CheckReq7.status).eql(200);

    const {num: num1} = CheckReq1.body[CheckReq1.body.length - 1];
    const {num: num2} = CheckReq2.body[CheckReq2.body.length - 1];
    const {num: num3} = CheckReq3.body[CheckReq3.body.length - 1];
    const {num: num4} = CheckReq4.body[CheckReq4.body.length - 1];
    const {num: num5} = CheckReq5.body[CheckReq5.body.length - 1];
    const {num: num6} = CheckReq6.body[CheckReq6.body.length - 1];
    const {num: num7} = CheckReq7.body[CheckReq7.body.length - 1];

    await t.eval(() => location.reload(true)); //새로고침
    await t.wait(2000); //전제조건 완료


    const ScrollDiv = Selector('#scrollDiv');
// 스크롤이 가능한 엘리먼트인지 확인
    const ScrollBar = await ScrollDiv.clientHeight > ScrollDiv.scrollHeight;
    //const ScrollBar = await ScrollDiv.scrollWidth > ScrollDiv.clientWidth || ScrollDiv.scrollHeight > ScrollDiv.clientHeight;


    //await t.expect(a).gt(b); a가 b보다 크면 테스트를 통과
    //scrollWidth, scrollHeight = 총 길이 //clientWidth, clientHeight = 보이는 부분 길이
    //보이는 부분(c)보다 총길이(s)가 크면 스크롤이 필요함
// 스크롤바가 미존재하는지 확인
    await t.expect(ScrollBar).notOk();


    //테스트 다 했으면 삭제 요청하기
    const DelScrollDiv = Selector('#scrollDiv')
    const DelReq1 = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num1, //requestparam과 requestbody 읽어보기
        method: 'Delete',
        headers: {"charset": "utf-8"},
    })
    const DelReq2 = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num2,
        method: 'Delete',
        headers: {"charset": "utf-8"},
    })
    const DelReq3 = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num3,
        method: 'Delete',
        headers: {"charset": "utf-8"},
    })
    const DelReq4 = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num4,
        method: 'Delete',
        headers: {"charset": "utf-8"},
    })
    const DelReq5 = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num5,
        method: 'Delete',
        headers: {"charset": "utf-8"},
    })
    const DelReq6 = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num6,
        method: 'Delete',
        headers: {"charset": "utf-8"},
    })
    const DelReq7 = await t.request({
        url: 'http://34.64.140.229:8181/deleteTodo?num=' + num7,
        method: 'Delete',
        headers: {"charset": "utf-8"},
    })
    await t.expect(DelReq1.status).eql(200); //삭제요청 잘됐나
    await t.expect(DelReq2.status).eql(200)
        .expect(DelReq3.status).eql(200)
        .expect(DelReq4.status).eql(200)
        .expect(DelReq5.status).eql(200)
        .expect(DelReq6.status).eql(200)
        .expect(DelReq7.status).eql(200)
    await t.eval(() => location.reload(true)); //새로고침
    await t.expect(DelScrollDiv.hasChildElements).notOk(); //자식요소에 아무것도 없는지

    await t.eval(() => location.reload(true));  //새로고침
    await t.wait(2000);
});

