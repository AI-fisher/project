;(function(){
    class Car{
        constructor(){
            this.tbody = document.querySelector("tbody");
            this.url = "http://localhost/huawei/car/data/phone_more.json";

            this.load();
            this.addEvent()

        }
        addEvent(){
            var that = this;
            this.tbody.addEventListener("click",function(eve){
                if(eve.target.className == "del"){
                    that.id = eve.target.parentNode.getAttribute("index");
                    eve.target.parentNode.remove();
                    that.changeCookie(function(i){
                        that.goods.splice(i,1)
                    });
                }
            })
            this.tbody.addEventListener("input",function(eve){
                if(eve.target.className == "num"){
                    that.id = eve.target.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function(i){
                        that.goods[i].num = eve.target.value;
                    });
                }
            })
        }
        changeCookie(callback){
            var i = 0;
            this.goods.some((val,index)=>{
                i = index;
                return val.id == this.id;
            })
            callback(i);
            setCookie("goods",JSON.stringify(this.goods));
        }
        load(){
            var that = this;
            ajaxGet(this.url,function(res){
                that.res = JSON.parse(res);
                that.carGetCookie()
            })
        }
        carGetCookie(){
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            console.log(getCookie("goods"));
            this.display();
        }
        display(){
            var str = "";
            this.res.forEach((resVal)=>{
                this.goods.forEach((goodsVal)=>{
                    if(resVal.goodsId == goodsVal.id){
                        str += `<tr index="${resVal.goodsId}">
                                    <td class="w-25"><img src="${resVal.url}" class="w-75"></td>
                                    <td>${resVal.name}</td>
                                    <td>${resVal.price}</td>
                                    <td><input class="num" type="number" value="${goodsVal.num}" min=1></td>
                                    <td class="del">删除</td>
                                </tr>`;
                    }
                })
            })
            this.tbody.innerHTML = str;
        }
    }

    new Car;
})();