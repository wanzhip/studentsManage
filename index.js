//左侧导航栏切换

var oDl = document.getElementsByClassName('menu')[0];
var content = document.getElementsByClassName('con');
// console.log(content[1].classList);
var oDD = oDl.getElementsByTagName('dd'); //获取整条数据<dd data-id="add-student">新增学生</dd>
// console.log(oDD[1].classList);
var content = document.getElementsByClassName('con');
var sTable = document.getElementById('student-table');
var tableData = [];
var jump = document.getElementsByClassName('list')[0];
var modal = document.getElementsByClassName('modal')[0];
var nowPage = 1;
var pageSize = 10;
var prevBtn = document.getElementsByClassName('prev')[0];
var nextBtn = document.getElementsByClassName('next')[0];
var search = document.getElementById('search');
var goBtn = document.getElementById('add-student-btn');
var editStuBtn = document.getElementById('edit-stu-btn');


function init() {
    bindEvent();
    getTableData();
}

function bindEvent() {
    oDl.addEventListener('click', function(e) {
        console.log(e.target);
        var tagN = e.target.tagName;
        // console.log(tagN)
        if (tagN != 'DD') {
            return false;
        }
        changeNav(e.target);
        //自定义属性建立左右侧联系
        var id = e.target.getAttribute('data-id');
        // if (id == 'student-list') {
        //     getTableData();
        // }
        // console.log(id);
        changeCon(id);
    })

    goBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // var studentData = getFormData('add-student-form');
        var studentData = getFormData('add-student-form');
        // var form = document.getElementById('add-student-form');
        if (studentData) {
            interfaceApply('/api/student/addStudent', studentData, function(data) {
                    var isCon = confirm('提交成功');
                    if (isCon) {
                        jump.click();
                        getTableData();
                    }
                })
                // Object.assign对象拼接
                // var resault = saveData('http://api.duyiedu.com/api/student/addStudent',
                //     Object.assign({ appkey: '18903865737_1564204059032' }, studentData));
                // console.log(resault);
                // if (resault.status == 'success') {
                //     var isCon = confirm('提交成功');
                //     if (isCon) {
                //         var jump = document.getElementsByClassName('list')[0];
                //         jump.click();
                //         getTableData();
                //     }
                // } else if (resault.status == 'fail') {
                //     alert(resault.msg);
                // }
        }
    })

    // 事件委托，直接获取父元素
    sTable.addEventListener('click', function(e) {
            // console.log(e.target.tagName);
            if (e.target.tagName != 'BUTTON') {
                return false;
            }
            // 类数组转化为数组，调用[].slice.call(类数组，索引)
            // 数组调用indexOf()方法判断是否存在
            var index = e.target.getAttribute('data-index');
            var btnClassName = [].slice.call(e.target.classList, 0);
            var isEdit = btnClassName.indexOf('edit') > -1;
            if (isEdit) {
                modal.style.display = 'block';

                console.log(tableData);
                renderFormData(tableData[index]);

            }

            var isDel = btnClassName.indexOf('del') > -1;
            if (isDel && confirm('确定删除学号' + tableData[index].sNo + tableData[index].name + '同学的信息吗?')) {
                interfaceApply('/api/student/delBySno', { sNo: tableData[index].sNo }, function(data) {
                    // alert('删除成功');
                    jump.click();
                    getTableData();

                })
            }
        })
        //编辑表单数据调用接口修改，更新数据
    editStuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var studentData = getFormData('edit-student-form');
        if (studentData) {
            interfaceApply('/api/student/updateStudent', studentData, function(data) {
                alert('数据更新成功');
                modal.style.display = 'none';
                jump.click();
                getTableData();
            })
        }
    })
    var mask = document.getElementsByClassName('mask')[0];
    mask.onclick = function() {
        modal.style.display = 'none';
    }

    prevBtn.onclick = function() {
        if (nowPage > 1) {
            nowPage--;
        }
        getTableData();
    }
    nextBtn.onclick = function() {
        if (nowPage < allPage) {
            nowPage++;
        }
        getTableData();
    }
}

init();
//类数组没有forEach方法
// 把数据放进form表单   数据回填
function renderFormData(data) {
    var form = document.getElementById('edit-student-form');
    // 获取表单名称，回填进去
    // console.log(data[address])
    for (var key in data) {
        if (form[key]) {
            form[key].value = data[key];
            // console.log(form[key].value)
        }
    }
}
//控制类名改变左侧导航栏
function changeNav(dom) {
    for (var i = 0; i < oDD.length; i++) {
        //classList获取class名的类数组
        oDD[i].classList.remove('active');
        // console.log(111)
    }
    dom.classList.add('active');
}
//改变右侧内容区
function changeCon(id) {
    var showC = document.getElementById(id);
    for (var i = 0; i < content.length; i++) {
        //classList获取class名的类数组
        content[i].classList.remove('content-active');
    }
    showC.classList.add('content-active');
}
// classList获取class组成的类数组
// 两边对应切换
// 1、添加事件委托（通过自定义属性建立两侧联系）
// 2、注册左侧切换函数（通过改变类名）
// 3、注册右侧对应切换（通过自定义属性建立连接，获取类名变化实现切换）


// 新增学生页面设置,添加学生信息
function getFormData(id) {
    var form = document.getElementById(id);
    var name = form.name.value;
    var sex = form.sex.value;
    var birth = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    var sNo = form.sNo.value;
    var email = form.email.value;
    // console.log(name);
    if (!name || !sex || !birth || !phone || !address || !sNo || !email) {
        return false;
    } else if (1900 > form.birth.value || form.birth.value > new Date().getFullYear()) {
        alert('请输入1900年到当前年份的数据');
        return false;


    }
    var obj = {
        name: name,
        sex: sex,
        birth: birth,
        phone: phone,
        address: address,
        sNo: sNo,
        email: email
    };
    return obj;
}
//获取所有学生数据

var allPage = 1;

function getTableData() {
    interfaceApply('/api/student/findByPage', {
        page: nowPage,
        size: pageSize
    }, function(data) {

        tableData = data.findByPage;
        allPage = Math.ceil(data.cont / pageSize);
        renderData(data.findByPage);


    })

    // var resault = saveData('http://api.duyiedu.com/api/student/findAll', {
    //     appkey: '18903865737_1564204059032'
    // });
    // if (resault.status == 'success') {
    //     // console.log('获取成功');
    //     renderData(resault.data);
    // } else if (resault.status == 'fail') {
    //     alert(resault.msg);
    // }

}
// 渲染数据
function renderData(data) {
    var str = '';
    data.forEach(function(item, index) {
        str += '<tr>\
        <td>' + item.sNo + '</td>\
        <td>' + item.name + '</td>\
        <td>' + (new Date().getFullYear() - item.birth) + '</td>\
        <td>' + (item.sex ? '女' : '男') + '</td>\
        <td>' + item.email + '</td>\
        <td>' + item.phone + '</td>\
        <td>' + item.address + '</td>\
        <td>\
            <button class="btn edit" data-index = ' + index + '>编辑</button><button class="btn del" data-index = ' + index + '>删除</button>\
        </td>\
    </tr>';

        sTable.innerHTML = str;

        // console.log(data.length)
        if (nowPage == 1) {
            prevBtn.style.display = 'none';
        } else if (nowPage == allPage) {

            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
            nextBtn.style.display = 'inline-block';
        }
    })
}

function saveData(url, param) {
    var result = null;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (typeof param == 'string') {
        xhr.open('GET', url + '?' + param, false);
    } else if (typeof param == 'object') {
        var str = "";
        for (var prop in param) {
            str += prop + '=' + param[prop] + '&';
        }
        xhr.open('GET', url + '?' + str, false);
    } else {
        xhr.open('GET', url + '?' + param.toString(), false);
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                result = JSON.parse(xhr.responseText);
            } else {
                result = {
                    status: xhr.status,
                    msg: xhr.status + '服务器错误'
                }
            }
        }
    }
    xhr.send();
    return result;
}

function interfaceApply(api, data, cb) {
    var resault = saveData('http://api.duyiedu.com' + api, Object.assign({
        appkey: '18903865737_1564204059032'
    }, data));
    if (resault.status == 'success') {
        cb(resault.data);
    } else if (resault.status == 'fail') {
        alert(resault.msg);
    }
}

search.addEventListener('keydown', function(e) {
    var keyEnter = event.keyCode;
    if (keyEnter == 13) {
        ajax();
    }
})

function ajax() {
    console.log(typeof(search.value));
    var num = Number(search.value);
    if (num != 1 || num != 0) {
        num = -1;
    }
    interfaceApply('/api/student/searchStudent', {
        sex: num,
        search: search.value,
        page: 1,
        size: 100
    }, function(data) {

        renderData(data.searchList);
        nextBtn.style.display = 'none';
        prevBtn.style.display = 'none';

        // prevBtn.onclick = function() {
        //     if (nowPage > 1) {
        //         nowPage--;
        //         if (nowPage == 1) {
        //             prevBtn.style.display = 'none';
        //             nextBtn.style.display = 'inline-block';
        //         }

        //     }
        //     interfaceApply('/api/student/searchStudent', {
        //         sex: num,
        //         search: search.value,
        //         page: nowPage - 1,
        //         size: pageSize
        //     }, function(data) {
        //         renderData(data.searchList);
        //     });
        // }
        // nextBtn.onclick = function() {
        //     if (nowPage < allPage) {
        //         nowPage++;
        //         console.log(nowPage)
        //         if (nowPage == currentAllPage) {

        //             nextBtn.style.display = 'none';
        //             prevBtn.style.display = 'inline-block';

        //         }
        //     }
        //     interfaceApply('/api/student/searchStudent', {
        //         sex: num,
        //         search: search.value,
        //         page: nowPage + 1,
        //         size: pageSize
        //     }, function(data) {
        //         renderData(data.searchList);
        //     })
        // }
    });

}