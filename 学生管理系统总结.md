学生管理系统总结

init();初始化;

bindEvent(){

获取dom直接父元素，通过e.target的各种属性【tagname     getAttrbute(){获取自定义属性实现双向绑定，自定义属性和id对应，获取id后，通过classList.add()加上类名}

比如两个按钮切换，相应右侧切换。右侧加上相同的class类名，一次性获取然后循环变化类名。

】

执行函数（）；比如切换，可以通过获取tagname的类数组循环移除classList.remove()再加上classList.add()控制类名

}



提交按钮的事件绑定

bindEvent(){

e.preventDefault();//阻止默认提交事件

获取数据函数（）；

前后端数据交互函数（url,pamas）//根据接口传递数据

数据传递到服务台获取数据，根据接口地址得到数据后，执行渲染函数（）

}

获取数据的函数（）{

var obj = [];

获取form表单相应id的value,添加到obj中

return obj;

}

渲染数据的函数（）{

//通过字符串拼接的方式

var str = '';

forEach循环function（当前数据，索引，原数组）{

str += '里面是需要渲染的数据'}

渲染完毕后添加到数据表中innerHTML = str;

}





编辑、删除按钮功能实现

获取直接父元素tbody ，添加事件监听判断e.target.tagName是否是BUTTON按钮，不是retutn false

获取e.target.classList类数组变成数组  //[].slice.call(e.target.classList,0)

indexOf方法判断是否含有相应的edit和del属性

存在  设置遮罩层的display属性

数据回填for ..in..

修改//绑定编辑表单的提交按钮，监听事件，调用接口之后更新数据

获取自定义属性//自定义属性中传入实际的Index索引下标（data-index = ' + index +' ）