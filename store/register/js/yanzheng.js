//注册时判断存储
class Register{
    constructor(){
        this.user = document.querySelector("#phone .phone input");
        this.pass1 = document.querySelector("#phone .password input");
        this.pass2 = document.querySelector("#phone .repassword input");
        this.btns = document.querySelector("#zhuce");
        this.msg = document.querySelector("#msg");

        this.addEvent()
    }
    addEvent(){
        this.btns.onclick = ()=>{
            // 判断是否为首次注册
            this.getUserMsg()
        }
    }
    getUserMsg(){
        this.usermsg = localStorage.getItem("usermsg");
        // 开始判断是否是第一次
        this.setUserMsg()
    }
    setUserMsg(){
        // [{user:"admin",pass:admin,onoff:0},{user:"root",pass:root,onoff:0}]
        // 首次直接获取
        if(this.usermsg == null){
            // 首次
            this.usermsg = [{
                user:this.user.value,
                pass1:this.pass1.value,
                pass2:this.pass2.value,
                onoff:0
            }];
            this.msg.innerHTML = "注册成功，三秒后跳转到登录页面";
            setTimeout(() => {
                location.href = "http://localhost/store/login/login.html";
            },3000)

        }else{
            // 非首次判断重名
            this.usermsg = JSON.parse(localStorage.getItem("usermsg"));
            for(var i=0;i<this.usermsg.length;i++){
                if(this.usermsg[i].user == this.user.value){
                    this.msg.innerHTML = "重名";
                    return;
                }
            }
            this.usermsg.push({
                user:this.user.value,
                pass1:this.pass1.value,
                pass2:this.pass2.value,
                onoff:0
            })
            this.msg.innerHTML = "注册成功，三秒后跳转到登录页面";
            setTimeout(() => {
                location.href = "http://localhost/store/login/login.html";
            }, 3000);
        }

        localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
    }
}

new Register;