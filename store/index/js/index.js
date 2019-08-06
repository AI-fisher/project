;(function(){
    "use strict";
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

    // 顶部轮播图
    class BannerTop{
        constructor(){
            this.box = document.querySelector(".menu-c");
            this.index_all = document.querySelectorAll(".menu-c img");      // 所有图片
            this.li = document.querySelectorAll("#menu .list li");                // 小圆点
            this.moveTime = 300;        // 滚动一张持续时间
            this.delayTime = 2000;

            this.index = 0;
            this.listAction();
            this.btnActive();
            this.autoAction();
        }

        // 小圆点
        listAction(){
            let that = this;
            for(let i=0;i<this.li.length;i++){
                this.li[i].addEventListener("click",function(){
                    console.log($(this).index())
                    console.log(that.index)
                    if($(this).index() > that.index){
                        that.listMove(1,$(this).index())
                    }
                    if($(this).index() < that.index){
                        that.listMove(-1,$(this).index())
                    }

                    // 点击之后，点击的就变成了当前
                    that.index = $(this).index();

                    for(let i=0;i<that.li.length;i++){
                        that.li[i].style.backgroundColor = "";
                        that.li[i].style.color = "";
                    }

                    that.li[i].style.backgroundColor = "red";
                    that.li[i].style.color = "#fff";
                })
            }

        }
        // 根据计算好的索引，移动对应的图片
        listMove(type,iNow){
            let $img = $("#menu").find("img");
            $img.eq(this.index).css({
                left:0
            }).stop().animate({
                left:-$img.eq(0).width() * type
            },this.moveTime).end().eq(iNow).css({
                left:$img.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime)
        }

        // 绑定左右按钮的点击事件
        btnActive(){
            // console.log(options.left)
            let $right = $("#menu").find(".right");
            let $left = $("#menu").find(".left");

            if(!($left != undefined && $left.length > 0 && $right != undefined && $right.length > 0)) return;

            let that = this;

            $left.on("click",function(){
                let $img = $("#menu").find("img");
                // 计算索引
                if(that.index == 0){
                    that.index = $img.length-1;
                    that.iPrev = 0;
                }else{
                    that.index--;
                    that.iPrev = that.index+1;
                }
                that.btnMove(-1);
            });
            $right.on("click",function(){
                let $img = $("#menu").find("img");
                // 计算索引
                if(that.index == $img.length-1){
                    that.index = 0;
                    that.iPrev = $img.length-1;
                }else{
                    that.index++;
                    that.iPrev = that.index - 1;
                }
                that.btnMove(1);
            })
        }
        // 右按钮效果
        rightClick(){
            let $img = $("#menu").find("img");
            // B2-2.计算索引
            if(this.index == $img.length-1){
                this.index = 0;
                this.iPrev = $img.length-1;
            }else{
                this.index++;
                this.iPrev = this.index - 1;
            }
            this.btnMove(1);
        }
        // 移动对应的图片
        btnMove(type){
            let $img = $("#menu").find("img");
            // 要走的：this.iPrev
            // 要进来：this.index
            $img.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:-$img.eq(0).width() * type
            },this.moveTime).end().eq(this.index).css({
                left:$img.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime);

            for(let i=0;i<this.li.length;i++){
                this.li[i].style.backgroundColor = "";
                this.li[i].style.color = "";
            }

            this.li[this.index].style.backgroundColor = "red";
            this.li[this.index].style.color = "#fff";
        }

        // 自动播放
        autoAction(){
            var that = this;
            this.t = setInterval(() => {
                this.rightClick()
            }, this.delayTime);

            this.box.addEventListener("mouseenter",function(){
                clearInterval(that.t);
            });
            this.box.addEventListener("mouseleave",function(){
                that.t = setInterval(() => {
                    that.rightClick()
                }, that.delayTime);
            })
        }
}

    class Menu{
        constructor(){
            this.amenuLi = document.querySelectorAll(".menu-l ul li");
            this.adiv = document.querySelectorAll(".menu-l-hidden div");

            this.addEvent();
        }

        addEvent(){
            for(let i=0;i<this.amenuLi.length;i++){
                this.amenuLi[i].index = i;
                this.amenuLi[i].addEventListener("mouseenter",()=>{
                    for(let j=0;j<this.amenuLi.length;j++){
                       this.amenuLi[j].style.backgroundColor = "#fdfcfb";
                       this.adiv[j].style.display = "none";

                    }
                    this.amenuLi[i].style.backgroundColor = "#fff";
                    this.adiv[this.amenuLi[i].index].style.display = "block";
                })

                this.amenuLi[i].addEventListener("mouseleave",()=>{
                    for(let j=0;j<this.amenuLi.length;j++){
                        this.amenuLi[j].style.backgroundColor = "#fdfcfb";
                        this.adiv[j].style.display = "none";
                    }
                })
            }
        }
    }

    new Top;
    new BannerTop;
    new Menu;










})();
