const report = require('multiple-cucumber-html-reporter');
const path = require('path');
const projectName = path.basename(__dirname);
const projectVersion = process.env.npm_package_version;
const reportGenerationTime = new Date().toISOString();
report.generate({
    reportName: 'TestCafe Report',
    jsonDir: 'cucumber-json-reports',
    reportPath: 'reports',
    openReportInBrowser: false,
    disableLog: true,
    displayDuration: true,
    displayReportTime: true,
    durationInMS: true,
    pageFooter:
        '<link href="assets/css/style.css" rel="stylesheet">' +
        '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n' +
        '        <div class="modal-dialog" role="document">' +
        '            <div class="modal-content">' +
        '                <div class="modal-header">' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '                    <h4 class="modal-title" id="myModalLabel">SET TEST OPTION</h4>' +
        '                </div>' +
        '                <div class="modal-body">' +
        '                    <label>' +
        '                        Test Script를 선택해주세요.' +
        '                    </label>' +
        '                    <select class="form-control" id="testScript">' +
        '                        <option value="InitTest">InitTest</option>' +
        '                    </select>' +
        '                    <label>' +
        '                        Test 할 브라우져를 선택해주세요. (해당 브라우져가 설치되어 있어야 합니다.' +
        '                    </label>' +
        '                   <select class="form-control" id="browser">' +
        '                        <option value="Chrome">chrome</option>' +
        '                       <option value="Edge">edge</option>' +
        '                       <option value="Firefox">InitTest</option>' +
        '                   </select>' +
        '                </div>' +
        '                <div class="modal-footer">' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
        '                    <button type="button" class="btn btn-primary" onclick="f()">RUN</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '<script>' +
        'window.onload=function(){document.querySelector("body > nav > div > p:nth-child(4)").textContent="";document.querySelector("body > nav > div > p:nth-child(4)").insertAdjacentHTML("beforeend",`<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Open Modal</button>`)}' +
        '</script>'+
        '<script>' +
            'function f() {' +
            'document.querySelector("#myModal").insertAdjacentHTML("beforeend",`<div class="spinner-container"><div class="spinner"></div><p>테스트 중</p></div>`);' +
            'fetch(`http://localhost:3000/test?testScript=${document.querySelector("#testScript").value}&browser=${document.querySelector("#browser").value}`)' +
            '    .then(res => res.text())' +
            '    .then(data => data === "SUCCESS" &&location.reload(true))' +
            '    .catch(error => console.error("Error:", error));' +
            '}' +
        '</script>',
// <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Open Modal</button>
    customData: {
        title: 'Run info',
        data: [
            { label: 'Project', value: `${projectName}` },
            { label: 'Release', value: `${projectVersion}` },
            { label: 'Report Generation Time', value: `${reportGenerationTime}` },
        ],
    },
});