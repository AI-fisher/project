;(function(){

    class shopList{
        constructor(){
            this.box = document.querySelector("#box");          // 最外框
            this.url = "http://localhost/huawei/phone_list/data/phone_more.json";      // 商品数据接口
            this.row = document.querySelector(".row");
            this.load();
            this.addEvent();
        }

        // 无商品时的信息
        none(){
            // 无商品时的展示信息
            this.em = document.createElement("em");
            this.em.className = "goods_show";
            this.em.innerText = "目前暂无商品出售！";
            box.appendChild(this.em);
        }

        //绑定事件
        addEvent(){
            // 加入购物车按钮
            // 因为页面上初始没有按钮元素，所以利用委托给将来出现的按钮绑定事件
            this.row = document.querySelector(".row");
            this.row.addEventListener("click",(eve)=>{
                if(eve.target.nodeName == "BUTTON"){
                    this.id = eve.target.parentNode.getAttribute("sc");
                    this.setCookie();
                }
            })
        }

        // 设置Cookie
        setCookie(){
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            if(this.goods.length == 0){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }else{
                var i = 0;
                var onoff = this.goods.some((val,index)=>{
                    i = index;
                    return val.id == this.id;
                })
                if(onoff){
                    // 老商品:
                    // 修改对应对象的num属性
                    this.goods[i].num++
                }else{
                    // 新商品:
                    // 增加对象
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            }
            // 再设置
            setCookie("goods",JSON.stringify(this.goods),{
                path:"/huawei"
            });
        }

        // 加载商品信息
        load(){
            ajaxGet(this.url,(res)=>{
                this.res = JSON.parse(res);
                this.display();

            })
        }

        // 渲染数据
        display(){
            let str = "";
            for(let i=0;i<this.res.length;i++){
                str += `<div class="col-3 text-center" sc="${this.res[i].goodsId}">
                            <img src="${this.res[i].url}" class="w-75"/>
                            <h6>${this.res[i].name}</h6>
                            <span class="btn-block">${this.res[i].price}</span>
                            <button type="button" class="btn btn-sm btn-info">添加购物车</button>
                        </div>`
            }
            this.row.innerHTML = str;
        }
    }

    new shopList;


























})();