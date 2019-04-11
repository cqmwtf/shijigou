class car{
	constructor(){
		this.tbody = document.querySelector("#tbody")
		this.load();
		this.addEvent();
		this.choose();
	}
	load(){
		var that = this;
		$.ajax({
			type:"get",
			url:"../data/products.json",
			dataType:"json",
			success:function(res){
//				console.log(res)
				that.res = res;
				that.gcookie();
			}
		});
	}
	gcookie(){
//		console.log($.cookie("goods1"));
		this.goods = JSON.parse($.cookie("goods1"));
//		console.log(this.goods)
		this.display();
	}
	display(){
//		console.log(this.res)
//		console.log(this.goods)
		var str = "";
		for(var i = 0;i<this.res.length;i++){
			for(var j = 0;j<this.goods.length;j++){
				if(this.res[i].productId == this.goods[j].id){
//					console.log(1)
					str += `
					<tr>
					<td><input type="checkbox" name="" id="" value=""  /></td>
					<td><img src="${this.res[i].smallImage}"/></td>
					<td>名字${this.res[i].productName}</td>
					<td>${this.res[i].vipshopPrice}</td>
					<td><input class="in" type="number" value="${this.goods[j].num}"></td>
										<td><em data-index="${this.res[i].productId}">删除</em></td>
					</tr>`;
				}
			}
		}
//		console.log(str)
		$("#tbody").html(str);
	}
		addEvent(){
				var that = this;

				this.tbody.addEventListener("click",function(eve){
					if(eve.target.nodeName == "EM"){
//						找到点击商品的货号
						that.id = eve.target.getAttribute("data-index");
//						删除DOM元素
						eve.target.parentNode.parentNode.remove();
//						6.遍历cookie,找到符合条件的数据,做删除
						that.changeCookie(function(index){
//							8.删除并再次设置回去
							that.goods.splice(index,1);
						})
					}
				})
				this.tbody.addEventListener("input",function(eve){
					if(eve.target.type == "number"){
//						10.先获取修改之后的数量,再获取当前商品的id
						that.value = eve.target.value;
						that.id = eve.target.parentNode.nextElementSibling.children[0].getAttribute("data-index");
//						11.遍历cookie,找到符合条件的数据,做修改
						that.changeCookie(function(index){
							that.goods[index].num = that.value;
						});
					}
				})
			}
			changeCookie(callback){
				for(var i=0;i<this.goods.length;i++){
					if(this.goods[i].id == this.id){
//						console.log(this.goods[i])
						break;
					}
				}
				
				callback(i);
				
				$.cookie("goods1",JSON.stringify(this.goods));
			}
		choose(){
			this.tbody.addEventListener("input",function(){})
		}

}



new car();
