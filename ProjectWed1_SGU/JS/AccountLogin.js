
let Modal_login = document.querySelector('.modal-overlay');
let valueLoginAll = document.querySelectorAll('.JS-ValueLogin');
let MessageErrorLogins = document.querySelectorAll('.js-messageErrorLogin');
let ValueLoginUserName = document.querySelector('.JS-Name-Login');
let ValueLoginPass = document.querySelector('.JS-Password-Login');
let btnLogin = document.querySelector('.btn-login');
let ContainerErrorAccountFail = document.querySelector('.div-Error');
let formLoginSuccess = document.querySelector('.JS-formLoginSuccess');
let formLoginAndRegister = document.querySelector('.frame-LoginAndRegister');
let frameLoginAndRegister = document.querySelector('.header-LoginAndRegister');
function OpenModalLogin() {
    Modal_login.classList.add('open-Login');
}

function CloseModalLogin() {
    Modal_login.classList.remove('open-Login');
    for (let index = 0; index < valueLoginAll.length; index++) {
        valueLoginAll[index].value = ''
        MessageErrorLogins[index].innerHTML = ''
    }
    ContainerErrorAccountFail.innerText = ""
}

function errorLogin() {
    let listUser = localStorage.getItem("List-User") ? JSON.parse(localStorage.getItem("List-User")) : [];
    for (let index = 0; index < valueLoginAll.length; index++) {
        if (valueLoginAll[index].value === '') {
            MessageErrorLogins[index].innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i>Bạn chưa nhập ${valueLoginAll[index].name}`
        } else MessageErrorLogins[index].innerHTML = ''
    }
}


//document.getElementById('login').style.display = "inline-block";
function ValidateAccount() {
    let listUser = localStorage.getItem("List-User") ? JSON.parse(localStorage.getItem("List-User")) : [];
    let checkLifeAccount;
    let str = ''
    errorLogin();
    if (ValueLoginUserName.value !== '' && ValueLoginPass.value !== "") {

        for (let index = 0; index < listUser.length; index++) {
            if (ValueLoginUserName.value === listUser[index].UserName && ValueLoginPass.value === listUser[index].PassWord && listUser[index].Type === 'User') {
                checkLifeAccount = 1//có tồn tại account
                //console.log(listUser[index].Type);
                let user_using = JSON.parse(localStorage.getItem('user_using'));
                if (user_using === null) {
                    user_using = new Array();
                }
                user_using.push(listUser[index])
                localStorage.setItem('user_using', JSON.stringify(user_using));
                break;
            } else checkLifeAccount = 0 // ko tồn tại account
        }
        if (checkLifeAccount === 1) {
            alert('Bạn đã đăng nhập thành công');
            CloseModalLogin();
            // frameLoginSuccess();
            hienthinguoidangsudung()
            show_product_in_shopping_cart();

        } else if (checkLifeAccount === 0 && ValueLoginUserName.value !== '' && ValueLoginPass.value !== '') {
            document.getElementById('login').style.display = "inline-block";
            ContainerErrorAccountFail.innerHTML =
                `
            <p class="error-login">
                <i class="fa-sharp fa-solid fa-circle-exclamation"></i>Tài khoản hoặc mật khẩu của bạn sai
            </p>
            `
            ValueLoginUserName.value = '';
            ValueLoginPass.value = ""
        }
    }
}


function hienthinguoidangsudung() {
    // console.log("hihihiasdhasjdjas");
    let user_using = JSON.parse(localStorage.getItem('user_using'));
    if (user_using === null) {
        console.log("1111")
        user_using = new Array();
    }
    else {
        console.log("11112")
        document.getElementById('login').style.display = "none";
        document.getElementById('user').style.display = "block";
        document.getElementById('username').innerHTML = user_using[0].UserName;
        document.getElementById('display-option').innerHTML = user_using[0].UserName + `<ul class="account">
        <li><button onclick="xemdonhang()">Đơn hàng của bạn</button></li>
        <li><button onclick="dangxuat()">Đăng xuất</button></li>
    </ul>`;
        // document.getElementById('account').style.display = "none";
    }
}




function InputValidateAccount() {
    errorLogin();
    if (ValueLoginUserName.value === '' && ValueLoginPass.value === "") {
        ContainerErrorAccountFail.innerText = ""
    }

}

function frameLoginSuccess() {
    formLoginSuccess.innerHTML =
        ` 
                <div class="container-Div">
                    <div class="success-Login">
                    <p class="Welcome-user"><i class="fa-regular fa-user icon-user"></i>linhcr</p>
                    <p class="Welcome-user logOut"><a href="#" class="logOut__name" onclick="frame_LoginAndRegister()">Đăng xuất</a></p>
                    </div>
                </div>
            `
}
function frame_LoginAndRegister() {
    console.log(formLoginAndRegister);
}



















let s = ''
function click1() {
    s = 'đã click btn trong form đăng nhập'
    console.log(s);
}
function click2() {
    s = 'đã click btn ngoài form đăng nhập'
    console.log(s);
}