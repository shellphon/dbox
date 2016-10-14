### dbox.js

用于触屏版弹窗，之前用的触屏版弹窗，都是封装自 http://dhtmlx.github.com/message/ 的。

不好用在于，其内部居然用span标签包裹，如果传自定义内容，就出现`<span><div></div></span>`

于是想着基于里面的一些逻辑，再抽取一下做一下改造。

使用方式：

1. 引入css，js
2. js调用

~~~
DBox({
	dom:'ha',
	type:'confirm',
	yFn:function(){
		alert('yes');
		return false;
	},
	nFn:function(){
		alert('no');
	},
	isRadius:true
});
~~~

其中dom为弹窗的文本内容，也可以是标签（自定义时用）

type默认alert，可以传 alert、confirm、modbox（自定义）

简要的参数描述：

dom: 弹窗文本或者标签内容

width:可选

suffix:可选  默认default，可以传入自定义的字符串，以 dbox-suffix 来为样式进行自定义

showClose:可选  是否显示关闭按钮

outClose:可选 点击遮罩层是否关闭弹窗

timeOut:可选  延时自动关闭弹窗，传入毫秒数

showCover:可选  是否显示遮罩层

isRadius:可选 默认false  是否带圆角，自定义弹窗得自行做样式处理

yFn:可选，确定按钮的回调，return false不会触发关闭

nFn:可选，取消按钮的回调，return false不会触发关闭
