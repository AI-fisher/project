;(function(){
    // 放大镜
    class Zoom{
        constructor(){
            this.sBox = document.querySelector(".detail-l-s");
            this.sImg = this.sBox.children[0];
            this.bBox = document.querySelector(".detail-l-b");
            this.bImg = this.bBox.children[0];

            this.addEvent()
        }
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

        //	隐藏
        hide(){
            this.span.style.display = "none";
            this.bBox.style.display = "none";

            this.sImg.style.opacity = "1"
        }
        move(e){
            let l = e.clientX - this.sBox.offsetLeft - this.span.offsetWidth;
            let t = e.clientY - this.sBox.offsetTop - this.span.offsetHeight;
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



    new Zoom;



})();