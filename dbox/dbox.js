/*
触屏版弹窗底层组件
dbox

传入type来决定模式：
	alert：dom。主要是文字
	confirm： 确认跟取消按钮
	modbox:自定义dom

弹窗居中
	<div class="dbox-wrap dbox-default">
		<span class="dclose-position dclose">×</span>
		<p class="dtext"></p>
		<div class="dbuttons">
			<button class="db-no">取消</button>
			<button class="db-yes">确定</button>
		</div>
	</div>

弹窗遮罩
	做一个固定id的dom，display or not
	<div class="dbox-cover"></div>

关闭弹窗
   清空弹窗dom，以及display none 遮罩层


传参：
	dom
	width:可选
	suffix:可选
	showClose:可选
	outClose:可选
	timeOut:可选
	showCover:可选
      isRadius:可选 默认false

	yFn:可选，确定按钮的回调，return false不会触发关闭
	nFn:可选，取消按钮的回调，return false不会触发关闭
*/

 var DBox = (function(){

     var PopObj = function(cfg){
     	cfg['type'] = cfg['type'] || 'alert';//confirm   modbox
       	cfg["dom"] = cfg["dom"] || '';
		cfg["width"] = cfg["width"] || '50%';
		cfg["suffix"] = cfg["suffix"] || 'default';
        
        this.init(cfg);
      };

        PopObj.prototype = {
            construtor:PopObj,
            //初始化并启动弹窗
            init:function(cfg){
             	this.args = cfg;
                  //创建弹窗主题
             	this.creatBox();
                  //显示遮罩层
             	this.showCover();
                  //绑定事件
             	this.bindEvent();
            },
            creatBox:function(){
           
            	var wrap = document.createElement('div'),
            		btnTmpl = '',
            		innerTmpl = '';

            	wrap.className = 'dbox-wrap dbox-'+ this.args.suffix;

            	wrap.className += ' dbox-'+this.args.type;

                  //通过dbox-radius来设定弹窗带圆角
                  if(this.args.isRadius){
                        wrap.className += ' dbox-radius';
                  }

                  //带上关闭按钮
            	if(this.args.showClose){
            		innerTmpl += '<span class="dclose-position dclose">×</span>';
            	}

                  //根据type类型不同构造不同的窗体内容
            	if(this.args.type==='alert'){
            		innerTmpl += '<p class="dtext">'
            		+ this.args.dom 
            		+'</p><div class="dbuttons"><button class="db-yes">确定</button></div>';
            	}

            	if(this.args.type==='confirm'){
            		innerTmpl += '<p class="dtext">'
            		+ this.args.dom 
            		+'</p><div class="dbuttons"><button class="db-no">取消</button><button class="db-yes">确定</button></div>';
            	}

            	if(this.args.type==='modbox'){
            		innerTmpl += this.args.dom;
            	}

            	if(this.args.width){
            		wrap.style.width = this.args.width;
            	}

            	wrap.innerHTML = innerTmpl;

            	document.body.appendChild(wrap);

            	//调整位置:动态居中
            	var x = Math.abs(Math.floor(((window.innerWidth||document.documentElement.offsetWidth) - wrap.offsetWidth)/2));
				var y = Math.abs(Math.floor(((window.innerHeight||document.documentElement.offsetHeight) - wrap.offsetHeight)/2));

				wrap.style.top = y +'px';
				wrap.style.left = x + 'px';


				this.box = wrap;
            },
            bindEvent:function(){
            	var self = this,
                        domsYes = document.getElementsByClassName('db-yes'),
                        domsNo = document.getElementsByClassName('db-no'),
                        domsClose = document.getElementsByClassName('dclose');
            	//是否延迟自动关闭
            	if(self.args.timeOut&&self.args.timeOut>0){
            		setTimeout(function(){
            			self.remove();	
            		}, self.args.timeOut);
            	}
            	//点击确定btn事件
            	domsYes.length&&(domsYes[0].onclick = function(){
            		if(self.args.yFn&&self.args.yFn()===false){
            			return;
            		}
            		self.remove();
            	});
            	//点击取消btn事件
            	domsNo.length&&(domsNo[0].onclick = function(){
            		if(self.args.nFn&&self.args.nFn()===false){
            			return;
            		}
            		self.remove();
            	});
            	//点击关闭按钮事件
            	domsClose.length&&(domsClose[0].onclick = function(){
            		self.remove();
            	});
            },
            showCover:function(){
            	var self = this;
            	var cover = document.getElementsByClassName('dbox-cover');
                  //当页面已经有cover存在，复用
            	if(cover&&cover.length){
            		[].forEach.call(cover,function(e,i){
            			//显示，并绑定点击事件
                              e.style.display = 'block';
                  		if(self.args.outClose){
                                    e.onclick = function(ev){
                                          self.remove();
                                    };
                              }
            		});
            		return;
            	}
            	cover = document.createElement('div');
            	cover.className = 'dbox-cover';

            	//是否点击遮罩关闭
            	if(self.args.outClose){
                  	cover.onclick = function(e){
                  		self.remove();
                  	};
                  }

            	document.body.insertBefore(cover,document.body.childNodes[0]);
            },
            hideCover:function(){
            	var cover = document.getElementsByClassName('dbox-cover');
            	if(cover&&cover.length){
            		[].forEach.call(cover,function(e,i){
            			e.style.display = 'none';
                              //关闭遮罩，取消点击事件
                              e.onclick = null;
            		});
            		return;
            	}
            },
            //关闭弹窗
            remove: function(){
            	if(this.box){
            		this.box.parentNode.removeChild(this.box);
            	}
            	this.hideCover();
                  //this = null;
            }
          };

     //return PopObj;
      var result = function(cfg){
            return new PopObj(cfg);
      };
      return result;
})();

//module.exports = DBox;