class List{
	constructor(){
		this.load();
	}
	load(){
		var that = this;
		$.ajax({
			type:"get",
			url:"../data/products.json",
			dataType:"json",
			success:function(res){
				that.display(res);
//				console.log(res);
			}
		});
	}
	display(res){
		this.res = res;
		var str = "";
		for(var i = 0;i<this.res.length;i++){
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
		$(".float").children("ul").html(str);
		$("ul").children("li").on("click",function(){				
//			console.log($(this).attr("index"))
				$.cookie("goods",$(this).attr("index"))
				 $(location).attr('href', './details.html')
		})
	}
}


new List(); 

