;(function(){
    /**
     * 放大镜效果
     * 1.放大鼠标所在指定区域滑过的图片区域
     * 2.边界限定
     */
    class Zoom{
        constructor(){
            this.sBox = document.querySelector(".detail-l-s");
            this.sImg = this.sBox.children[0];
            this.bBox = document.querySelector(".detail-l-b");
            this.bImg = this.bBox.children[0];

            this.addEvent()
        }
        //添加事件
        addEvent(){
            let that = this;
            this.sBox.onmouseenter = function(){
                that.show()
            };
            this.sBox.onmouseleave = function(){
                that.hide()
            };
            this.sBox.onmousemove = function(e) {
                that.move(e);
            }
         }
        // 蒙版效果
        show(){
            this.bBox.style.display = "block";

            if(!this.span){
                //	蒙版
                this.span = document.createElement("span");
                let w = this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth;
                let h = this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight;

                this.span.style.cssText = `width:${w}px;height:${h}px;background:url(images/phone9.jpg);background-size:430px 450px;position:absolute;left:0;top:0;border:1px solid #9b9b9b`;
                this.sBox.appendChild(this.span);
            }

            this.span.style.display = "block";
            this.sImg.style.opacity = "0.6"
            }

        // 隐藏效果
        hide(){
            this.span.style.display = "none";
            this.bBox.style.display = "none";

            this.sImg.style.opacity = "1"
        }
        // 移动和显示的比例计算
        move(e){
            let l = e.clientX - this.sBox.offsetLeft - this.span.offsetWidth/2;
            let t = e.clientY - this.sBox.offsetTop - this.span.offsetHeight/2;
            if(l < 0) l=0;
            if(t < 0) t=0;
            if(l > this.sBox.offsetWidth - this.span.offsetWidth){
                l = this.sBox.offsetWidth - this.span.offsetWidth
            }
            if(t > this.sBox.offsetHeight - this.span.offsetHeight){
                t = this.sBox.offsetHeight - this.span.offsetHeight
            }
            //	方框的位置
            this.span.style.left = l + "px";
            this.span.style.top = t + "px";

            //	方框移动的比例
            let x = l / (this.sBox.offsetWidth - this.span.offsetWidth);
            let y = t / (this.sBox.offsetHeight - this.span.offsetHeight);

            //	大图移动的距离
            this.bImg.style.left = -x * (this.bImg.offsetWidth - this.bBox.offsetWidth) + "px";
            this.bImg.style.top = -y * (this.bImg.offsetHeight - this.bBox.offsetHeight) + "px";

            this.span.style.backgroundPosition = -l + "px " + -t +"px";
        }
    }


    // class detail{
    //     constructor(){
    //         this.detail = document.querySelector("#detail");
    //         this.url = "http://localhost/store/detail/data/phone_more.json";
    //
    //         this.init();
    //
    //     }
    //
    //
    //     init(){
    //         var that = this;
    //         ajaxPost(this.url,function(res){
    //             that.res = JSON.parse(res)
    //             that.getData();
    //         })
    //     }
    //     setData(callback){
    //         for(let i=0;i<this.goods.length;i++){
    //             if(this.goods[i].id == this.id){
    //                 callback(i);
    //             }
    //         }
    //         localStorage.setItem("goods",JSON.stringify(this.goods));
    //     }
    //
    //     getData(){
    //         this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];
    //         this.display();
    //     }
    //     display(){
    //         var str = "";
    //         console.log(this.res);
    //         console.log(this.goods);
    //         for(var i=0;i<this.res.length;i++){
    //             for(let j=0;j<this.goods.length;j++){
    //                 if(this.res[i].goodsId == this.goods[j].id){
    //                     str += `<div class="detail-l-s"><img src="${this.res.url}"/></div>
    //                             <div class="detail-l-b"><img src="${this.res.url}"/></div>
    //                             <div class="detail-r">
    //                                 <div class="detail-r-t">
    //                                     <p>${this.res[i].name}</p>
    //                                     <p><span>① 直降500元（原价5488元，现价4988元）② 享6期分期免息</span> 华为P30 Pro尊享金卡专属服务权益包含：①保修期内（不含延保）可享2次免费保养②1小时快修服务③金卡专属热线服务</p>
    //                                 </div>
    //                                 <div class="detail-r-c">
    //                                     <div class="price">
    //                                         <b>价格</b>
    //                                         <span>${this.res[i].price}</span>
    //                                     </div>
    //                                     <div class="sale">
    //                                         <b>促销</b>
    //                                         <div class="quan">
    //                                             <div class="quan-t">
    //                                                 <div class="left">商品赠券</div>
    //                                                 <div class="right">购机赠配件优惠券</div>
    //                                             </div>
    //                                             <div class="quan-c">
    //                                                 <div class="left">分期免息</div>
    //                                                 <div class="right">掌上生活、花呗、工行分期支付可享免息</div>
    //                                             </div>
    //                                             <div class="quan-b">
    //                                                 <div class="left">赠送积分</div>
    //                                                 <div class="right">购买即赠商城积分，积分可抵现~</div>
    //                                             </div>
    //
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 <div class="detail-r-b">
    //                                     <div class="left">
    //                                         <b>服务说明</b>
    //                                         <p>已满48元已免运费 由华为商城负责发货，并提供售后服务</p>
    //                                     </div>
    //                                     <div class="left">
    //                                         <b>商品编码</b>
    //                                         <p>2601010102603</p>
    //                                     </div>
    //
    //                                     <div class="left">
    //                                         <b>选择颜色</b>
    //                                         <div class="service">
    //                                             <ul>
    //                                                 <li>亮黑色</li>
    //                                                 <li>极光色</li>
    //                                                 <li>天空之境</li>
    //                                                 <li>赤茶菊</li>
    //                                                 <li>珠光贝母</li>
    //                                             </ul>
    //                                         </div>
    //                                     </div>
    //                                     <div class="left">
    //                                         <b>选择版本</b>
    //                                         <div>
    //                                             <ul>
    //                                                 <li>全网通8GB+128GB</li>
    //                                                 <li>全网通8GB+256GB</li>
    //                                                 <li>全网通8GB+512GB</li>
    //                                             </ul>
    //                                         </div>
    //                                     </div>
    //                                     <div class="left">
    //                                         <b>选择套餐</b>
    //                                         <div>
    //                                             <ul>
    //                                                 <li>官方标配</li>
    //                                                 <li>限量套装</li>
    //                                             </ul>
    //                                         </div>
    //                                     </div>
    //                                     <div class="left">
    //                                         <b>增值业务</b>
    //                                         <div>
    //                                             <ul>
    //                                                 <li>无增值服务</li>
    //                                                 <li>包装服务</li>
    //                                             </ul>
    //                                         </div>
    //                                     </div>
    //                                     <div class="left">
    //                                         <b>保障服务</b>
    //                                         <div>
    //                                             <ul>
    //                                                 <li>华为无忧服务 ￥969</li>
    //                                                 <li>碎屏（含后盖）服务宝1年 ￥269.1</li>
    //                                                 <li>延长服务宝半年 ￥198</li>
    //                                             </ul>
    //                                         </div>
    //                                     </div>
    //                                     <div class="left">
    //                                         <b>分期免息</b>
    //                                         <div>
    //                                             <ul>
    //                                                 <li>掌上生活分期</li>
    //                                                 <li>花呗分期</li>
    //                                             </ul>
    //                                         </div>
    //                                     </div>
    //                                     <div class="left">
    //                                         <b>推荐</b>
    //                                         <div class="last">
    //                                             <ul>
    //                                                 <li>HUAWEI P30</li>
    //                                                 <li>HUAWEI P30 Pro潜水保护壳</li>
    //                                                 <li>华为NM存储卡</li>
    //                                                 <li>华为40W超级快充移动电源</li>
    //                                             </ul>
    //                                         </div>
    //                                     </div>
    //                                     <div class="button">
    //                                         <input type="submit" value="加入购物车"/>
    //                                         <input type="submit" value="立即下单"/>
    //                                     </div>
    //
    //                                 </div>
    //                             </div>`
    //                 }
    //             }
    //         }
    //         // console.log(str)
    //         this.detail.innerHTML = str;
    //     }
    // }
    // new detail;
    new Zoom;

})();