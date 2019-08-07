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

                    that.id = eve.target.parentNode.getAttribute("index");
                    eve.target.parentNode.remove();
                    that.changeCookie(function(i){

                        if(that.goods.length == 0){
                            removeCookie("goods");
                        }else{
                            that.goods.splice(i,1);
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

    // 顶部效果
    class Top{
        constructor(){
            this.showA = document.querySelectorAll("#top .show>li:not(.more) a");  // 顶部所有显示项
            this.hiddenA = document.querySelectorAll("#top .show .more");          // 顶部所有隐藏项
            this.color();
            this.hiddenShow();
        }
        // 字体颜色
        color(){
            for(let i=0;i<this.showA.length;i++){
                this.showA[i].addEventListener("mouseenter",()=>{
                    this.showA[i].style.color = "#ca151d";
                });
                this.showA[i].addEventListener("mouseleave",()=>{
                    this.showA[i].style.color = "";
                });

            }
        }
        // 显示隐藏
        hiddenShow(){
            for(let i=0;i<this.hiddenA.length;i++){
                this.hiddenA[i].previousElementSibling.addEventListener("mouseenter",()=>{
                    this.hiddenA[i].style.display = "block";
                });
                this.hiddenA[i].previousElementSibling.addEventListener("mouseleave",()=>{
                    this.hiddenA[i].style.display = "none";
                });
            }
        }
    }

    new Top;
    new Car;
})();