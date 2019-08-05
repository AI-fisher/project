;(function(){
    class Car{
        constructor(){
            this.tbody = document.querySelector("tbody");
            this.zhan = document.getElementById("zhanwei");
            this.url = "http://localhost/store/car/data/phone_more.json";
            this.gouwuche = document.getElementById("gouwuche");
            this.guang = document.getElementById("guang");

            this.load();
            this.addEvent()

        }
        addEvent(){
            var that = this;
            this.tbody.addEventListener("click",function(eve){
                if(eve.target.className == "del"){
                    console.log(1);
                    that.id = eve.target.parentNode.getAttribute("index");
                    eve.target.parentNode.remove();
                    that.changeCookie(function(i){
                        that.goods.splice(i,1);
                        if(that.goods == []){
                            removeCookie("goods")
                        }
                    });

                }
            });
            this.tbody.addEventListener("input",function(eve){
                if(eve.target.className == "num"){
                    that.id = eve.target.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function(i){
                        that.goods[i].num = eve.target.value;
                    });
                }
            })

            // this.gouwuche.addEventListener("click",function(){
            //     removeCookie("goods",{
            //         path:"store/car"
            //     });
            // })
            // this.guang.addEventListener("click",function(){
            //     removeCookie("goods",{
            //         path:"store/car"
            //     });
            // })
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
            this.display();
        }
        display(){
            var str = "";
            if(this.goods != [] && this.goods != "" && this.goods != null){
                this.zhan.style.display = "none";
            }
            this.res.forEach((resVal)=>{
                this.goods.forEach((goodsVal)=>{
                    if(resVal.goodsId == goodsVal.id){
                        str += `<tr index="${resVal.goodsId}">
                                    <td class="w-25"><img src="${resVal.url}" class="w-50"></td>
                                    <td><h4>${resVal.name}</h4></td>
                                    <td><span>${resVal.price}</span></td>
                                    <td><input class="num" type="number" value="${goodsVal.num}" min=1></td>
                                    <td class="del"><input type="button">删除</input></td>
                                </tr>`;
                    }
                })
            });
            this.tbody.innerHTML = str;
        }
    }

    new Car;
})();