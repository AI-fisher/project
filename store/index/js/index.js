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
            this.index_all = document.querySelectorAll(".menu-c img");      // 所有图片
            this.li = document.querySelectorAll("#menu .list li");                // 小圆点

            this.index = 0;
            this.listAction();
            this.btnActive();
        }

        // 4.小圆点的点击切换对应图片的功能
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
                    // 设置list的li当前项，取消所有，给点击的设置
                    for(let i=0;i<that.li.length;i++){
                        that.li[i].style.backgroundColor = "";
                        that.li[i].style.color = "";
                    }

                    that.li[i].style.backgroundColor = "red";
                    that.li[i].style.color = "#fff";
                })
            }

        }
        listMove(type,iNow){
            // 谁走：this.index
            // 谁进来：iNow
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
            // 上一步：end()
            // 父级：parent()
        }


        btnActive(){
            // console.log(options.left)
            let $right = $("#menu").find(".right");
            let $left = $("#menu").find(".left");

            if(!($left != undefined && $left.length > 0 && $right != undefined && $right.length > 0)) return;

            let that = this;

            // 绑定点击事件
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

            // 设置list的li当前项，取消所有，给点击的设置
            for(let i=0;i<this.li.length;i++){
                this.li[i].style.backgroundColor = "";
                this.li[i].style.color = "";
            }

            this.li[this.index].style.backgroundColor = "red";
            this.li[this.index].style.color = "#fff";
        }
}

    new Top;
    new BannerTop;











})();
