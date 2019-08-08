define(function(){
    function yanzheng(){
        /*提示框*/
        let oTishi = document.getElementById("tishi");

        /*密码验证*/
        let oPassWord = document.querySelector("#phone .password input");
        oPassWord.onblur = function(){
            /*密码规则验证*/
            let passValue1 = oPassWord.value;
            if(passValue1.length<6 || passValue1.length>16){
                oTishi.innerHTML = "* 密码有误，请重新输入！";
                oTishi.style.display = "block";
                state = 1;
            }else{
                oTishi.style.display = "none";
                state = 0;
            }
        };

        // 重复密码验证
        let oSamePass = document.querySelector("#phone .repassword input");
        oSamePass.onblur = function(){
            let passValue2 = oPassWord.value;
            let sameValue = oSamePass.value;
            if(passValue2 !=  sameValue){
                oTishi.innerHTML = "* 两次输入密码不一致，请重新输入！";
                oTishi.style.display = "block";
                state = 1;
            }else{
                oTishi.style.display = "none";
                state = 0;
            }
        };
    // 手机号验证
        let oPhone = document.querySelector("#phone .phone input");
        oPhone.onblur = function(){
            let phoneValue = oPhone.value;
            // 假设@前数字为6~18位，后字母或数字为2~3位,后缀为com或cn
            let reg = /^[\d]{11}$/;
            if(!reg.test(phoneValue)){
                oTishi.innerHTML = "* 手机号不合法，请重新输入！";
                oTishi.style.display = "block";
                state = 1;
            }else{
                oTishi.style.display = "none";
                state = 0;
            }
        };
    }

    function Tabs(){
        let aform = document.querySelectorAll("form");
        let aa = document.querySelectorAll(".change");
        let mainBC = document.querySelector(".main-b-c");           //大框
        let input = document.querySelectorAll(".cancel");           // 所有输入框
        // console.log(input);

        for(let i=0;i<aa.length;i++){
            aa[i].index = i;
            aa[i].addEventListener("click",()=>{
                for(let j=0;j<aform.length;j++){
                    aa[j].style.backgroundColor = "#b7b7b7";
                    aform[j].style.display = "none";
                }
                aa[i].style.backgroundColor = "#ff0000";
                aform[aa[i].index].style.display = "block";

            });
            mainBC.addEventListener("click",function(e){
                // this.value = e.target.value;
                if(e.target.nodeName == "INPUT"){
                    e.target.value = "";
                }
            });

        }

        for(let i=0;i<input.length;i++){
            input[i].addEventListener("blur",()=>{
                switch(i){
                    case 0:input[i].value = "请输入手机号";break;
                    case 1:input[i].value = "请输入短信验证码";break;
                    case 2:input[i].value = "请输入密码";break;
                    case 3:input[i].value = "请再次输入密码";break;
                }
            })
        }
    }

    return {
        show:yanzheng,
        tab:Tabs
    }

});



