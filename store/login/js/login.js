;;(function(){
    // 选项卡
    class Tabs{
        constructor(){
            this.aa = document.querySelectorAll(".center-r-t a");
            this.change = document.querySelectorAll(".change");

            this.addEvent();
        }

        addEvent(){
            for(let i=0;i<this.aa.length;i++){
                this.aa[i].index = i;
                this.aa[i].addEventListener("click",()=>{
                    for(let j=0;j<this.change.length;j++){
                        this.aa[j].style.color = "#000";
                        this.change[j].style.display = "none";
                    }
                    this.aa[i].style.color = "#ff0000";
                    this.change[this.aa[i].index].style.display = "block";

                })
            }



        }
    }

    new Tabs;




























})()