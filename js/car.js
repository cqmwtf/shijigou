class car{
	constructor(){
		this.tbody = document.querySelector("#tbody");
		this.totalPrice=document.querySelector("#totalPrice"),
		this.totalNum=document.querySelector("#totalNum"),
		this.selectAll=document.querySelector("#selectAll")
		this.totalPriceV = 0
		this.totalNumV = 0;
		this.load();
		
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
					<tr index = ${this.res[j].productId}>
					<td><input type="checkbox" name="" id="checkbox" value=""  /></td>
					<td><img src="${this.res[i].smallImage}"/></td>
					<td>名字${this.res[i].productName}</td>
					<td>${this.res[i].vipshopPrice}</td>
					<td><input class="in" type="number" value="${this.goods[j].num}" id = "num"></td>
										<td><em data-index="${this.res[i].productId}">删除</em></td>
					</tr>`;
				}
			}
		}
		$("#tbody").html(str);
		this.addEvent();
	}
		addEvent(){
				var that = this;
				this.tbody.addEventListener("click",function(eve){
					if(eve.target.nodeName == "EM"){
						that.id = eve.target.getAttribute("data-index");
						eve.target.parentNode.parentNode.remove();
						that.changeCookie(function(index){
							that.goods.splice(index,1);
						})
					}
				})
				this.tbody.addEventListener("input",function(eve){
					if(eve.target.type == "number"){
						that.value = eve.target.value;
						that.id = eve.target.parentNode.nextElementSibling.children[0].getAttribute("data-index");
//						if($("tbody tr td #num").checked == true){
//							that.totalNumV += 1;
//						that.totalPriceV+=target.parentNode.parentNode.children[3].innerHTML;
//						}
						that.changeCookie(function(index){
							that.goods[index].num = that.value;
						});
						console.log(1)
					}
				})
				this.choose();
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
			var that= this;
			this.tbody.addEventListener("change",function(eve){
				console.log()
				var e = eve || window.event;
				var target = e.target || e.srcElement;
				if(target.id == "checkbox"){
					if(target.checked == true){
						console.log(target.parentNode.parentNode.children[4].children[0].value);
						that.totalNumV += parseInt(target.parentNode.parentNode.children[4].children[0].value);
						that.totalPriceV +=(target.parentNode.parentNode.children[4].children[0].value)*target.parentNode.parentNode.children[3].innerHTML;
					}
					if(target.checked == false){
						that.totalNumV -=  parseInt(target.parentNode.parentNode.children[4].children[0].value);
						that.totalPriceV -= (target.parentNode.parentNode.children[4].children[0].value) * target.parentNode.parentNode.children[3].innerHTML;
						that.selectAll.checked == false;
					}
					that.totalNum.innerHTML = "总数量为：" + that.totalNumV;
					that.totalPrice.innerHTML = that.totalPriceV;
				}
			})
			this.selectAll.addEventListener("change",function(eve){
				that.totalNumV = 0;
				that.totalPriceV = 0;
				that.tr = document.querySelectorAll("tbody tr");
				if(this.checked == true){

					for(var i = 0;i<that.tr.length;i++){
						that.tr[i].children[0].children[0].checked = true;
						that.totalNumV += parseInt(that.tr[i].children[4].children[0].value);
						that.totalPriceV += parseInt(that.tr[i].children[4].children[0].value)*that.tr[i].children[3].innerHTML;
					}
					
				}else{
					console.log(this.checked)
					for(var i = 0;i<that.tr.length;i++){
						that.tr[i].children[0].children[0].checked = false;
						that.totalNumV = 0;
						that.totalPriceV = 0;
					}
				}
				that.totalNum.innerHTML = "总数量为：" + that.totalNumV;
				that.totalPrice.innerHTML = that.totalPriceV;
			})
		}

}



new car();
