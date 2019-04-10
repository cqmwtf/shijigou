  
class Index{
	constructor(){
//		轮播图
		this.init();
//		关键字搜索
		this.Search();
//		楼层
		this.floor();

//		数据获取和渲染
		this.Goods();
//		三级菜单
		this.threeMenu();
	}
	init(){
		  $(".banner").banner({
					items:$(".banner .b-t a"),		//必传项，表示要移动的图片
					isList:true,						//可选，是否需要自动生成list
					autoPlay:true,						//可选，是否需要自动轮播
					delayTime:3000,						//可选，自动轮播时，没两张图片的间隔时间
					moveTime:300						//可选，每张图片运动的时间
				})
			}
	Goods(){
		var that = this;
			$.ajax({
				url:"../data/products.json",
				type:"GET",
				dataType:"json",
				success:function(res){
//					console.log(res)
					that.GoodsDisplay(res);
				}
			})		
	}
	GoodsDisplay(res){
		var str = "";
		var str1 = "";
		for(var i=0;i<10;i++){
			str +=`<li index="${res[i].productId}">
							<div>
								<a target="_blank">
								<img src="${res[i].smallImage}"> 
								<p class="over">${res[i].productName}</p> 
								<p><span class="price"> ¥${res[i].vipshopPrice}</span></p> 
								<p><span class="you">包邮</span></p>
								</a>
							</div>
						</li>`
		}
		for(var i=11;i<21;i++){
			str1 +=`<li index="${res[i].productId}">
							<div>
								<a target="_blank">
								<img src="${res[i].smallImage}"> 
								<p class="over">${res[i].productName}</p> 
								<p><span class="price"> ¥${res[i].vipshopPrice}</span></p> 
								<p><span class="you">包邮</span></p>
								</a>
							</div>
						</li>`
		}
		$(".l1").html(str);
//		选项卡tab切换
		$(".tab").find("dd").click(function(){
//			console.log(str1)
//			console.log(str)
				$(this).addClass("active").siblings().removeClass("active");
				$(".box").children("ul").eq(0).html(str);
				$(".box").children("ul").eq(1).html(str1);
				$(".box").children("ul").eq(2).html(str);
				$(".box").children("ul").eq(3).html(str1);
				$(".box").children("ul").eq(4).html(str);
				$(".box").children("ul").eq(5).html(str1);
				$(".box").children("ul").removeClass("l1").eq($(this).index()).addClass("l1");
			})
		$(".l1").children("li").on("click",function(){				
//			console.log($(this).attr("index"))
				$.cookie("goods",$(this).attr("index"))
				 $(location).attr('href', './details.html')
		})
	}
	

//		关键字搜索
	Search(){
//			1.选元素,设置url
			this.txt = document.querySelector(".txt");
			this.ul = document.querySelector(".search");
			this.url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
			
//			2.绑定事件
			this.addEvent();
		}
		addEvent(){
			var that = this;
			this.txt.onkeyup = function(){
//				console.log(1)
//				3.保存输入框的内容
				that.val = this.value;
//				4.准备请求数据
				that.load()
			}
		}
		load(){
			var that = this;
			jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",function(res){
//				5.将数据保存到将来的实例对象
				that.res = res;
//				6.请求成功之后,才能够去渲染页面
				that.display();
			},{
				_name:"cb",
				cb:"aaaa",
				wd:this.val
			})
		}
		display(){
//			7.渲染页面
			var str= ""
			this.res.s.forEach(function(v){
				str += `<li>${v}</li>`;
			})
			this.ul.innerHTML = str;
			this.myclick();
		}
		myclick(){
			$(".search").children("li").on("click",function(){
//				console.log($(this).html())
			$(".txt").val($(this).html())
			$(".search").children("li").hide()
			})
		}
		
//		楼层
		floor(){
			$(".aa").children("a").click(function(){
				var index = $(this).index()+1;
			
//			根据选择器选择到标签,获取距离顶部的位置
			var t = $(".a"+index).offset().top;
			
//			设置动画
			$("html").animate({
				scrollTop:t
			})
		})
	}
//	三级菜单	
	threeMenu(){
		$(".u1").children("li").hover(function(){
				$(this).children("dl").show();
		},function(){
			$(this).children("dl").hide()
		})
	}
}
new Index();
  
//关键字搜索
	
		
//		new Search()













