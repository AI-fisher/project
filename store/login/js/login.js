;(function(){
    //登录时验证身份
    class Login{
        constructor(){
            this.user = document.querySelector("#username");
            this.pass = document.querySelector("#password");
            this.btn = document.querySelector("#login");
            this.msg = document.querySelector("#msg");

            this.init()
        }
        init(){
            this.btn.onclick = ()=>{
                // 点击时先获取localStorage
                console.log(1)
                this.getUserMsg()
            }
        }
        getUserMsg(){
            // 获取的同时直接转换，方便实用
            this.usermsg = localStorage.getItem("usermsg") ? JSON.parse(localStorage.getItem("usermsg")) : [];
            // 开始验证
            this.check()
        }
        check(){
            // 遍历所有的用户名
            for(let i=0;i<this.usermsg.length;i++){
                // 用户和密码是否匹配
                if(this.usermsg[i].user == this.user.value && this.usermsg[i].pass1 == this.pass.value){
                    // 登录成功的账号状态
                    this.usermsg[i].onoff = 1;
                    localStorage.setItem("usermsg",JSON.stringify(this.usermsg));
                    this.msg.innerHTML = "登录成功，三秒后跳转到首页";
                    // 三秒后跳转
                    setTimeout(() => {
                        location.href = "http://localhost/store/index/index.html";
                    }, 3000);
                    // 结束
                    return;
                }
            }
            // 登录失败
            this.msg.innerHTML = "账号密码不符，请重新登录或去注册";
            setTimeout(() => {
                this.msg.style.cssText = "display:none";
            },2000)
        }
    }

    // 取消默认信息
    class Cancel{
        constructor(){
            this.minBC = document.querySelector(".center-r-c");
            this.input = document.querySelectorAll(".center-r-c .cancel");
            this.addEvent();
        }

        addEvent(){
            this.minBC.addEventListener("click",function(e){
                if(e.target.className == "cancel"){
                    e.target.value = "";
                }
            });

            for(let i=0;i<this.input.length;i++){
                this.input[i].addEventListener("blur",()=>{
                    switch(i){
                        case 0:this.input[i].value = "手机号/邮件地址/华为号";break;
                        case 1:this.input[i].value = "密码";break;
                    }
                })
            }


        }
    }





    new Cancel;
    new Login;


























})();