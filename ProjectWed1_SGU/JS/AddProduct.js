let btnAddOutModal = document.querySelector('.JS-btnAdd-OutModal');
let modal = document.querySelector('.JS-modal');
let btnClose = document.querySelector('.JS-close-icon');
let formContainer = document.querySelector('.modal__container-content');
let formInput = formContainer.querySelectorAll('.JS-formInput');
let icon = document.querySelector('.icon')
let ValueInputNameProduct = document.querySelector('.JS-InputNameProduct');
let ValueInputAmountProduct = document.querySelector('.JS-InputAmountProduct');
let ValueInputPriceProduct = document.querySelector('.JS-InputPriceProduct');
let ValueInputLinkImageProduct = document.querySelector('.JS-InputLinkImageProduct');
let select = document.querySelector('select[name="type"]')
let valueTypeProducts = select.querySelectorAll('option')
let boxContainProductsInfo = document.querySelector('.content__Boxes');
let btnAddInModal = document.querySelector('.JS-btnAdd-InModal')
let btnUpdateInModal = document.querySelector('.JS-btnUpdate-InModal')


function ShowModal() {
    modal.classList.add('open');
} 

function ShowModalAdd() {
    ShowModal();
    btnUpdateInModal.classList.add('close-Update');
    btnAddInModal.classList.remove('close-add');

}

function ShowModalUpdate() {
    ShowModal();
    btnAddInModal.classList.add('close-add');
    btnUpdateInModal.classList.remove('close-Update');
}

function restartModalAdd(){
    for (let index = 0; index < formInput.length; index++) {
        formInput[index].parentElement.querySelector('.message-Error').innerText="" 
        formInput[index].value="";
     }
}

function CloseModal(){
    modal.classList.remove('open');
    restartModalAdd();
}

btnAddOutModal.addEventListener('click',ShowModalAdd);
btnClose.addEventListener('click',CloseModal);


function availed(){
    
    for (let index = 0; index < formInput.length; index++) {
        if(formInput[index].value === "")
        {
            formInput[index].parentElement.querySelector('.message-Error').innerHTML=`<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Xin vui lòng nhập ${formInput[index].name}.`
        }
        else 
        {
            formInput[index].parentElement.querySelector('.message-Error').innerText=""
        }
    }    
}

//let id = 0
function AddValuesToFrameProductInfo(){
    let arrProducts = localStorage.getItem("Info-Products") ? JSON.parse( localStorage.getItem("Info-Products")): [];
    // if(arrProducts === null){
    //     arrProducts = new Array();
    //     localStorage.setItem('Info-Products',JSON.stringify(arrProducts));
    // }
    let typeProducts = '';
    //id++;
    let itemsProduct = 
    {
        ID_product: (new Date()).getTime(),
        Name_Product: ValueInputNameProduct.value,
        Amount_Product:ValueInputAmountProduct.value,
        Type_Product:select.value,
        attribute: "Oyster, 41 mm, Oystersteel and white gold",
        Price_Product: ValueInputPriceProduct.value,
        image_Product:ValueInputLinkImageProduct.value
    }
    if(ValueInputNameProduct.value !== ''&&ValueInputAmountProduct.value !== '' && ValueInputPriceProduct.value !== ''&& ValueInputLinkImageProduct.value !== ''){
        arrProducts.push(itemsProduct)
        localStorage.setItem("Info-Products",JSON.stringify(arrProducts));
        CloseModal()
        renderProducts()
    }else availed();
    // let list_product = JSON.parse(localStorage.getItem('Info-Products'));
    show_product('Info-Products');
}

function renderProducts() {
    let arrProducts = localStorage.getItem("Info-Products") ? JSON.parse( localStorage.getItem("Info-Products")): [];
    let product=``;
    let index=0
    for( ; index<arrProducts.length;index++)
    {
        product+=
            `
            <div class="content__Boxes-products">
            <div class="img-left">
            <img src="${arrProducts[index].image_Product}" alt="" class="image-product">
            </div>
            <span class="font-span">${arrProducts[index].Name_Product}</span>
            <span class="font-span">$${arrProducts[index].Price_Product}</span>
            <div class="btn-right">
            <button class="btn-right__Edit btn" onclick="UpdateProduct(${index})">Edit</button>
            <button class="btn-right__Delete btn" onclick="DeleteProduct(${index})">Delete</button>
            </div>
            </div>
            `
    }
    boxContainProductsInfo.innerHTML= product;
}

function DeleteProduct(index) {
    let arrProducts = localStorage.getItem("Info-Products") ? JSON.parse( localStorage.getItem("Info-Products")): [];
    if(confirm("are you sure?")){
        arrProducts.splice(index,1);
    }
    localStorage.setItem("Info-Products",JSON.stringify(arrProducts))
    renderProducts();
    show_product('Info-Products');
}

let i = 0;

function UpdateProduct(index){
    ShowModalUpdate();
    let arrProducts = localStorage.getItem("Info-Products") ? JSON.parse( localStorage.getItem("Info-Products")): [];
    ValueInputNameProduct.value =arrProducts[index].Name_Product
    ValueInputAmountProduct.value =arrProducts[index].Amount_Product
    ValueInputPriceProduct.value =arrProducts[index].Price_Product
    ValueInputLinkImageProduct.value =arrProducts[index].image_Product
    i = index;
    show_product('Info-Products');
}

function ChangeProduct() {
    let arrProducts = localStorage.getItem("Info-Products") ? JSON.parse( localStorage.getItem("Info-Products")): [];
    if(ValueInputNameProduct.value !== ''&&ValueInputAmountProduct.value !== '' && ValueInputPriceProduct.value !== ''&& ValueInputLinkImageProduct.value !== ''){
        // id =  arrProducts[i].ID_Product,
        // console.log(id);
        // arrProducts[i] = {
        //     ID_Product : id,
        //     Name_Product: ValueInputNameProduct.value,
        //     Amount_Product:ValueInputAmountProduct.value,
        //     Type_Product:select.value,
        //     attribute: "Oyster, 41 mm, Oystersteel and white gold",
        //     Price_Product: ValueInputPriceProduct.value,
        //     image_Product:ValueInputLinkImageProduct.value
        // }
        arrProducts[i].Name_Product = ValueInputNameProduct.value;
        // console.log(i);
        arrProducts[i].Amount_Product = ValueInputAmountProduct.value;
        // console.log(i);
        arrProducts[i].Type_Product = select.value;
        arrProducts[i].attribute = "Oyster, 41 mm, Oystersteel and white gold";
        arrProducts[i].Price_Product = ValueInputPriceProduct.value;
        arrProducts[i].image_Product = ValueInputLinkImageProduct.value;
        console.log(arrProducts[i].ID_Product);
        localStorage.setItem("Info-Products",JSON.stringify(arrProducts))
        renderProducts();
        CloseModal()
    }else availed();
}







function show_product(key){
    let list_product = JSON.parse(localStorage.getItem(key));
    if(list_product === null){
        list_product = new Array();
        localStorage.setItem(key,JSON.stringify(list_product));
    }
        let list_item = '';
        let ID_product, image_Product, Type_Product, Name_Product, attribute, Price_Product;
        for (let i = 0; i < 6; i++){
            if(i >= list_product.length){
                break;
            }
            ID_product = list_product[i].ID_product;
            image_Product = list_product[i].image_Product;
            Type_Product = list_product[i].Type_Product;
            Name_Product = list_product[i].Name_Product;
            attribute = list_product[i].attribute;
            Price_Product = list_product[i].Price_Product;
            list_item += `<div class="product">
            <button onclick="show_detail_product(${ID_product})">
                <img src="${image_Product}">
                <h2>$${Price_Product}</h2>
                <h3>${Type_Product}</h3>
                <h2>${Name_Product}</h2>
            </button>
        </div>`
        }
        document.getElementById('right').innerHTML = list_item;
        let list_product_in_shopping_cart = JSON.parse(localStorage.getItem('product_in_shopping_cart'));
        document.getElementById('count-on-icon-shopping').innerHTML = list_product_in_shopping_cart.length;
    
    }
    










    
