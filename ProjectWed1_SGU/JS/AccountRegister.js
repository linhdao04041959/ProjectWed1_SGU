let formContentFormInput = document.querySelector('.Modal-overlay__content');
let ValueOfFormInputs = formContentFormInput.querySelectorAll('.JS-Input-Register')
let Modal_Register = document.querySelector('.Modal-overlay');
let message_Errors = formContentFormInput.querySelectorAll('.message-Error');
let ValueInputName = document.querySelector('.JS-InputName');
let ValueInputPass = document.querySelector('.JS-InputPass');
let ValueInputpassRepeat = document.querySelector('.JS-InputpassRepeat');
let ValueInputphone = document.querySelector('.JS-Inputphone');
let messageErrorNotSame = document.querySelector('.js-messageErrorNotSame')

function OpenModalRegister(){
    Modal_Register.classList.add('open-Register');
}

function CloseModalRegister(){
    Modal_Register.classList.remove('open-Register');
    for (let index = 0; index < ValueOfFormInputs.length; index++) {
        ValueOfFormInputs[index].value ="" 
        message_Errors[index].innerHTML=""   
    }
    
}

    function assignValueToArray(listUser,itemUser){
        listUser.push(itemUser);
        localStorage.setItem("List-User",JSON.stringify(listUser))
    }

// đăng ký Account
let id = 0;
function submitAccount(){
    let listUser = localStorage.getItem("List-User") ? JSON.parse(localStorage.getItem("List-User")) : []
    // console.log(listUser.length);
    let notSame ;
    let AdminAccount = {
        ID :"admin1",
        UserName: "AdminSystem",
        PassWord: "Admin1234",
        Type:"Admin",
        PhoneNumber:"0961278847" 
    }
    id++;
    let itemUser = {
        ID:"user" +id ,
        UserName: ValueInputName.value,
        PassWord: ValueInputPass.value,
        Type:"User",
        PhoneNumber:ValueInputphone.value 
    }
    console.log(id);
    // console.log(id);
    // kiểm tra số điện thoại:BEGIN
    // life:đời sống,sự tồn tại
    let checkLifeOfUserAndPass;
    let checkPhoneNumber;
    let FirstTwoCharacterOfPhone=''
    let messageError_Phone = formContentFormInput.parentElement.querySelector('.js-messageError-Phone')
    
    for (let index = 0; index < 2; index++) {
        FirstTwoCharacterOfPhone+=(ValueInputphone.value[index]); 
    }

    if((( parseInt(FirstTwoCharacterOfPhone) >= 2 && parseInt(FirstTwoCharacterOfPhone) <= 9 ) && ValueInputphone.value.length === 10 )
        || (FirstTwoCharacterOfPhone == '01' && ValueInputphone.value.length === 11)){
            checkPhoneNumber = 1
        }else {
            checkPhoneNumber = 0 
        }

    if(listUser.length > 0)//kt arr > 0 mãng != rỗng 
    {
        for (let index = 0; index < listUser.length; index++) {
            if(listUser[index].UserName === ValueInputName.value || listUser[index].PassWord === ValueInputPass.value)
            {
                // đã tồn tại tài khoản hoặc mật khẩu
                checkLifeOfUserAndPass = 0;
                break;
            }else checkLifeOfUserAndPass = 1; //chưa tồn tại tài khoản hoặc mật khẩu
        }
    }else if(checkPhoneNumber === 1 && listUser.length === 0)
    {//nếu arr rỗng thì thực hiện đk account thành công
        listUser.push(AdminAccount);
        assignValueToArray(listUser,itemUser)
        messageError_Phone.innerText =''
        alert('Bạn đã đăng ký thành công')
        CloseModalRegister();
    }
    
    // console.log(checkLifeOfUserAndPass);

    
   
        // condition KT điều kiện của Phone
    if ((ValueInputName.value !==''||ValueInputName.value ==='') && (ValueInputPass.value !==''|| ValueInputPass.value ==='') 
        && (ValueInputpassRepeat.value !==''  || ValueInputpassRepeat.value ==='') && ValueInputphone.value !==''
        &&(ValueInputPass.value ===  ValueInputpassRepeat.value || ValueInputPass.value !==  ValueInputpassRepeat.value)
        && checkPhoneNumber === 0){
            messageError_Phone.innerHTML =`<i class="fa-sharp fa-solid fa-circle-exclamation"></i>Số điện thoại không hợp lệ`
    }
    // kiểm tra số điện thoại:End

    else if ((ValueInputName.value !=='' && ValueInputPass.value !=='' && ValueInputpassRepeat.value !=='' && ValueInputphone.value !=='' && checkPhoneNumber === 1)
                &&(ValueInputPass.value ===  ValueInputpassRepeat.value)) {

                    if (checkLifeOfUserAndPass === 1)
                    {
                        assignValueToArray(listUser,itemUser)
                        messageError_Phone.innerText =''
                        alert('Bạn đã đăng ký thành công')
                        CloseModalRegister();
                    }else if (checkLifeOfUserAndPass === 0) {
                        alert('Tài khoản hoặc mật khẩu đã tồn tại!');
                    }
    }else availedFrameRegister()

         
}

// xử lý lỗi khi khong nhập input
function availedFrameRegister(){
    for(let i = 0 ; i<ValueOfFormInputs.length ; i++)
    {
        if (ValueOfFormInputs[i].value === '') {
            message_Errors[i].innerHTML =`<i class="fa-sharp fa-solid fa-circle-exclamation"></i>Bạn chưa nhập ${ValueOfFormInputs[i].name}`
        }else  if(ValueOfFormInputs[i].value.length < 6 && ValueOfFormInputs[i].value !== '' && i !==3){
            message_Errors[i].innerHTML =`<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Tối thiểu 6 ký tự`
        } else message_Errors[i].innerText =''
        if(i === 2 && ValueOfFormInputs[i].value !== "" && ValueOfFormInputs[i].value !== ValueOfFormInputs[i-1].value && ValueOfFormInputs[i].value.length >=6)
        {
            message_Errors[i].innerHTML =`<i class="fa-sharp fa-solid fa-circle-exclamation"></i>Mật khẩu không trùng nhau`
        }
    }
    
}

