;(function(){
    class Tabs{
        constructor(){
            this.aform = document.querySelectorAll("form");
            this.aa = document.querySelectorAll(".change");
            this.ainput = document.querySelectorAll("input");
            this.mainBC = document.querySelector(".main-b-c");
            this.addEvent();
        }

        addEvent(){
            for(let i=0;i<this.aa.length;i++){
                this.aa[i].index = i;
                this.aa[i].addEventListener("click",()=>{
                    for(let j=0;j<this.aform.length;j++){
                        this.aa[j].style.backgroundColor = "#b7b7b7";
                        this.aform[j].style.display = "none";
                    }
                    this.aa[i].style.backgroundColor = "#ff0000";
                    this.aform[this.aa[i].index].style.display = "block";

                })
            }
            this.mainBC.addEventListener("click",function(e){
                // this.value = e.target.value;
                if(e.target.nodeName == "INPUT"){
                    e.target.value = "";
                }
            })
            // this.mainBC.addEventListener("blur",function(e){
            //
            //     if(e.target.nodeName == "INPUT"){
            //         e.target.value = this.value;
            //     }
            // })


        }
    }
    new Tabs;

})();