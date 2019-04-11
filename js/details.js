class Details{
	constructor(){
		this.main = $("#main");
		this.num = 0;
//		获取数据,渲染页面
		this.init();
	}
	init(){
		var that = this;
		$.ajax({
			type:"GET",
			url:"../data/products.json",
			dataType:"json",
			success:function(res){ 
                    that.Display(res); 
                    that.main = $("#main");
			}
		});
	}
//	渲染页面
	Display(res){
		this.res = res;
		var str = "";
		for(var i= 0;i<this.res.length;i++){
			if(this.res[i].productId == $.cookie("goods")){
//				console.log(this.res[i].productId)
				str +=`<div class="main-t" index="${this.res[i].productId}">
                                <div class="main-t-t">
                                    <a href="index.html">首页</a>
                                    <span>&gt;&nbsp;&gt;</span>
                                    <a href="#">保健品</a>
                                    <span>&gt;</span>
                                    <a href="#">保健食品</a>
                                    <span>&gt;</span>
                                    <span>${this.res[i].productName}</span>
                                </div>
                                <div class="main-t-b">
                                    <div class="main-t-b-l">
                                        <div class="s-box">
                                            <img src="${this.res[i].smallImage}" alt=""/>
                                            <span></span>
                                            <p></p>
                                        </div>
                                        <ul>
                                            <li><img src="${this.res[i].smallImage}" alt="" aa="${this.res[i].smallImage}"/></li>
                                            <li><img src="${this.res[i].image3}" alt="" aa="${this.res[i].image3}"/></li>
                                        </ul>
                                        <div class="b-box">
                                            <img src="${this.res[i].smallImage}" alt="" />
                                        </div>
                                    </div>
                                    <div class="main-t-b-r">
                                        <div class="main-t-b-r-t">
                                            <ul>
                                                <li>
                                                    <h3>${this.res[i].productName}</h3>
                                                </li>
                                                <li>
                                                    产品编号：
                                                    <span>${this.res[i].brandId}</span>
                                                </li>
                                                <li>
                                                    会员价：
                                                    <span>¥<em>${this.res[i].vipshopPrice}</em></span>
                                                </li>
                                                <li>
                                                    税费：
                                                    <span>￥<em>${this.res[i].shuifei}</em></span>
                                                </li>
                                                <li>
                                                    商品评价：
                                                    <a href="#">已有<em>${this.res[i].pingjia}</em>人评价</a>
                                                </li>
                                                <li>
                                                    购买方式：
                                                    <span>保税进口</span>
                                                </li>
                                                <li>
                                                    全场包邮
                                                </li>
                                                <li>
                                                    已 销 售：
                                                    <span>${this.res[i].xiaoshou}</span>
                                                     件
                                                </li>
                                                <li>
                                                    跨境商品视为海外购买，暂不支持开发票
                                                </li>
                                                <li class="aa">
                                                    <i>购买数量:</i>
                                                    <a href="#" class="a">-</a>
                                                    <input type="text" value="2"/>
                                                    <a href="#" class="b">+</a>
                                                </li>
                                            </ul>
                                            
                                        </div>
                                        <div class="main-t-b-r-b" data-id="${this.res[i].productId}">
                                            <a href="car.html" class ="addcar"><img src="../images/car2.png" alt=""/>加入购物车</a>
                                            <a href="#">加关注</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="main-b clear">
                            <div class="main-b-l">
                                <div class="main-b-l-t">
                                    保健品
                                </div>
                                <div class="main-b-l-b">
                                    <a href="#">${this.res[i].a1}</a>
                                    <a href="#">${this.res[i].a2}</a>
                                    <a href="#">${this.res[i].a3}</a>
                                    <a href="#">${this.res[i].a4}</a>
                                    <a href="#">${this.res[i].a5}</a>
                                </div>
                            </div>
                            <div class="main-b-r clear">
                                <ul>
                                    <li class="active">商品详情</li>
                                    <li>规格参数</li>
                                    <li>包装清单</li>
                                    <li>售后服务</li>
                                    <li>客户评价</li>
                                </ul>
                                <div class="cont margin clear">
                                    <div class="active clear">
                                        <ul class="clear">
                                            <li>
                                                <img src="../images/xiangqing.png" alt=""/>
                                            </li>
                                            <li>
                                                <img src="../images/xiangqing.png" alt=""/>
                                            </li>
                                            <li>
                                                <img src="../images/xiangqing.png" alt=""/>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p>规格参数</p>
                                    </div>
                                    <div>
                                        <p>暂时没有包装清单
                                                注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</p>
                                    </div>
                                    <div>
                                        <p>售后服务</p>
                                    </div>
                                    <div>
                                        <p>客户评价</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
			}
		}
//		console.log(str)
		$("#main").html(str);
		this.tab();
		this.Magnifier();
		
//		存cookie加入购物车
		this.addgoods();
	}
//	tab切换
	tab(){
		$(".main-t-b-l").children("ul").children("li").on("click",function(){
			$(".s-box").children("img").attr("src",$(this).children("img").attr("src"));
			$(".b-box").children("img").attr("src",($(".s-box").children("img").attr("src")))
		})
		
	}
	Magnifier(){
			this.obox=document.querySelector(".s-box");
			this.op=this.obox.children[1];
			this.bbox=document.querySelector(".b-box");
			this.oimg=this.bbox.children[0];
			this.addEvent();
		}
		addEvent(){
			var that= this;
			this.obox.addEventListener("mouseover",function(){
				that.over();
			})
			this.obox.addEventListener("mousemove",function(eve){
				var e=eve||window.event;
				that.move(e);
			})
			this.obox.addEventListener("mouseout",function(){
				that.out();
			})
		}
		over(){
			this.op.style.display="block";
			this.bbox.style.display="block";
		}
		move(e){
			var l=e.offsetX-this.op.offsetWidth/2;
			var t=e.offsetY-this.op.offsetHeight/2;
			if(l<0){
				l=0;
			}
			if(t<0){
				t=0;
			}
			if(l>this.obox.offsetWidth-this.op.offsetWidth){
				l=this.obox.offsetWidth-this.op.offsetWidth;
			}
			if(t>this.obox.offsetHeight-this.op.offsetHeight){
				t=this.obox.offsetHeight-this.op.offsetHeight;
			}
			this.op.style.left=l+"px";
			this.op.style.top=t+"px";
			var x = l / (this.obox.offsetWidth-this.op.offsetWidth);
			var y = t / (this.obox.offsetHeight-this.op.offsetHeight);
			
			this.oimg.style.left = -(this.oimg.offsetWidth - this.bbox.offsetWidth) * x + "px";
			this.oimg.style.top = -(this.oimg.offsetHeight - this.bbox.offsetHeight) * y + "px";
		}
		out(){
			this.op.style.display="none";
			this.bbox.style.display="none";
		}	
		addgoods(){
			var that = this;
			$(".main-t-b-r-b").children(".addcar").on("click",function(){
				this.id = $(".main-t").attr("index");
				that.setCookies();
			})
		}
		setCookies(){
//			console.log(1);
			this.id = $(".main-t").attr("index");
//			console.log(this.id);
////				因为要使用一条cookie存商品,所以数据选择数组里面放对象[{},{}]
////				情况1:第一次添加
				if($.cookie("goods1") == null){
					this.goods = [{
						id:this.id,
						num:1
					}];
				}
				else{
//					情况2:不是第一次添加
					this.goods = JSON.parse($.cookie("goods1"));
//					新情况1：这次点击的是老数据
					var onoff = true;
					this.goods.forEach((v)=>{
						if(v.id == this.id){
							v.num++
							onoff = false;
						}
					})
//					新情况2：这次点击的是新数据
					if(onoff){
						this.goods.push({
							id:this.id,
							num:1
						})
					}
				}
//				所有关于数组的操作结束之后,将数组转成字符再设置到cookie中
				$.cookie("goods1",JSON.stringify(this.goods))
		}
}



		










new Details();
