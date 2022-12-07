
// ----------------------------------------hien thi san chi tiet san pham---------------------------




function show_detail_product(id) {
    //B1:lay danh sach san pham tu local len
    let list_item = JSON.parse(localStorage.getItem('Info-Products'));
    let image_Product, Name_Product, Type_Product, attribute, Price_Product;
    // console.log(list_item);
    //B2:duyet danh sach san pham de lay ra san pham co id trung view_shopping_cartoi id truyen vao
    for (let i = 0; i < list_item.length; i++) {
        if (id == list_item[i].ID_product) {
            image_Product = list_item[i].image_Product;
            Name_Product = list_item[i].Name_Product;
            Type_Product = list_item[i].Type_Product;
            attribute = list_item[i].attribute;
            Price_Product = list_item[i].Price_Product;
            break;
        }
    }
    let html = "";
    html += `<div id="detail_product">
    <div class="detail">
        <div class="top">
            <div class="left1">
                <img src="${image_Product}">
            </div>
            <div class="right1">
                <div class="go-back">
                    <button onclick="back_index()"><i class="ti-close"></i></button>
                </div>
                <h3 style="margin-top:50px;">${Type_Product}</h3>
                <h1>${Name_Product}</h1><br>
                <p>${attribute}</p><br>
                <h2>$${Price_Product}</h2><br><br>
                <h3>So luong</h3>
                <!-- ================ -->
                <div id="product-qty">
                    <div id="sub">
                        <button onclick="decre_product(${id})"><i class="ti-minus"></i></button>
                    </div>
                    <div id="count"></div>
                    <div id="add">
                        <button onclick="incre_product(${id})"><i class="ti-plus"></i></button>
                    </i></div>
                </div>
                <!-- ==================== -->
            </div>
        </div>
        <div class="buttom" id="buttom">
            <button onclick="add_product_to_shopping_cart(${id}),spawnTemp()">Chọn mua</button>
        </div>
    </div>
    <div id="thaotac"></div>
</div> `
    // console.log(html);
    document.getElementById('show_detail_item').innerHTML = html;
    document.getElementById('count').innerHTML = '1';
}




//cac thao tac trong chi tiet san pham 


//1:them so luong  san pham muon mua
function incre_product(id) {
    let product = get_Infor_by_id(id);
    let count = document.getElementById('count');
    soluong = parseInt(count.textContent);
    if (soluong >= product.Amount_Product) {
        window.alert("khong du san pham trong kho ");
    }
    else {
        soluong++;
    }
    document.getElementById('count').innerHTML = soluong;
    // document.getElementById('count-on-icon-shopping').innerHTML = list_product_in_shopping_cart.length;
}

//2:giam so luong san pham muon mua 
function decre_product(id) {
    let count = document.getElementById('count');
    soluong = parseInt(count.textContent);
    if (soluong == 1) {
        return;
    }
    else {
        soluong--;
    }
    document.getElementById('count').innerHTML = soluong;
    // document.getElementById('count-on-icon-shopping').innerHTML = list_product_in_shopping_cart.length;
}




//3:quay lai trang chu sau khi xem chi tiet
function back_index() {
    document.getElementById("detail_product").style.display = "none";
}



// ------------------------------------hien thi chi tiet san pham(end)----------------------------


















//  -------------------------------------------index-SLIDER ----------------------------------------------------------------

const imgPosition = document.querySelectorAll(" .aspect-ratio-169 img")
const imgContainer = document.querySelector('.aspect-ratio-169')
const dotItem = document.querySelectorAll(".dot")
let imgNumber = imgPosition.length
let idx = 0
// console.log(imgPosition)
imgPosition.forEach(function (image, idx) {

    image.style.left = idx * 100 + "%"
    dotItem[idx].addEventListener("click", function () {
        slider(idx)
    })
})
function imgSlide() {
    idx++;
    if (idx >= imgNumber) { idx = 0 }
    slider(idx)
}
function slider(idx) {
    imgContainer.style.left = "-" + idx * 100 + "%"
    const dotActive = document.querySelector('.active')
    dotActive.classList.remove("active")
    dotItem[idx].classList.add("active")
}
setInterval(imgSlide, 5000)


// ---------------------------------slider end-----------------------------









//  ---------------------------------search product --------------------------------------


function search_product() {
    document.getElementById('right').style.minHeight = '400px';
    let product_search = document.getElementById('search').value.toLowerCase();
    let list_item = JSON.parse(localStorage.getItem('Info-Products'));
    document.getElementById('index-slider').style.display = "none";
    let list_cart_product_search = '', list_product_search = new Array();
    // console.log(product_search);
    for (let i = 0; i < list_item.length; i++) {
        // console.log((list_item[i].Name_Product.toLowerCase()).includes(product_search));
        if ((list_item[i].Name_Product.toLowerCase()).includes(product_search) && product_search != '' && list_product_search.length < 6) {
            list_product_search.push(list_item[i]);
            list_cart_product_search += `<div class ="product">
                <button onclick="show_detail_product(${list_item[i].ID_product})">
                    <img src="${list_item[i].image_Product}">
                    <h2>$${list_item[i].Price_Product}</h2>
                    <h3>${list_item[i].Type_Product}</h3>
                    <h2>${list_item[i].Name_Product}</h2>
                </button>
            </div>`
        }
        else if ((list_item[i].Name_Product.toLowerCase()).includes(product_search) && product_search != '' && list_product_search.length >= 6) {
            list_product_search.push(list_item[i]);
        }
        // if ((list_item[i].Name_Product.toLowerCase()).includes(product_search) && product_search != '' && list_product_search.length < 6) {
        //     list_product_search.push(list_item[i]);
        //     list_cart_product_search += `<div id="product">
        //     <button onclick="show_detail_product(${list_item[i].ID_product})">
        //         <img src="${list_item[i].image_Product}">
        //         <h2>$${list_item[i].Price_Product}</h2>
        //         <h3>${list_item[i].Type_Product}</h3>
        //         <h2>${list_item[i].Name_Product}</h2>
        //     </button>
        // </div>`
        // }
        // else if((list_item[i].Type_Product.toLowerCase()).includes(product_search) && product_search != '' && list_product_search.length >= 6){
        //     list_product_search.push(list_item[i]);
        // }
    }
    if (list_product_search.length == 0) {
        localStorage.setItem('product_search', JSON.stringify(list_product_search));
        if (product_search == '') {
            document.getElementById('index-slider').style.display = "block";
            show_product('Info-Products');
            show_page('Info-Products');
        }
        else {
            //     //     // localStorage.setItem('list_product',JSON.stringify(list_product_search));
            show_page('product_search');
            document.getElementById('right').innerHTML = "❌ Không có sản phẩm phù hợp!";
        }
    }
    else {
        localStorage.setItem('product_search', JSON.stringify(list_product_search));
        // document.getElementById('right').innerHTML = list_cart_product_search;
        show_product('product_search');
        show_page('product_search');
    }
}



// -----------------------------------chuyen trang------------------------------------------
let key_local;
function show_page(key) {
    key_local = arguments;
    let list_item = JSON.parse(localStorage.getItem(key));
    if (list_item === null) {
        list_item = new Array();
        localStorage.setItem(key, JSON.stringify(list_item));
    }
    // console.log(list_item);
    let so_luong_trang = Math.ceil(list_item.length / 6);
    let html = '';
    for (let i = 1; i <= so_luong_trang; i++) {
        html += `<button onclick="show_product_depend_on_page(${i})"><div class="page">${i}</div></button>`
    }
    document.getElementById('show-page').innerHTML = html;
}


function show_product_depend_on_page(page_current) {
    list_item = JSON.parse(localStorage.getItem(key_local[0]));
    console.log(list_item);
    let html = '';
    let product_start = (page_current - 1) * 6;
    // console.log(product_start);
    for (let i = product_start; i < product_start + 6; i++) {
        if (i >= list_item.length) {
            break;
        }
        // console.log(i);
        html += `<div class="product">
        <button onclick="show_detail_product(${list_item[i].ID_product})">
            <img src="${list_item[i].image_Product}">
            <h2>$${list_item[i].Price_Product}</h2>
            <h3>${list_item[i].Type_Product}</h3>
            <h2>${list_item[i].Name_Product}</h2>
        </button>
    </div>`
    }
    //console.log(html);
    document.getElementById('right').innerHTML = html;
    document.getElementById("index-content").scrollIntoView({ behavior: 'smooth' });
}










// --------------------------------------------


function create_product_in_shopping_cart(id) {
    let product = new Object();
    product.ID_product = id;
    product.count = 1;
    return product;
}



// let list_product_in_shopping_cart = JSON.parse(localStorage.getItem('product_in_shopping_cart'));
// if(list_product_in_shopping_cart == null){
//     list_product_in_shopping_cart = new Array();
// }

// function add_product_to_shopping_cart(id) {
//     // window.alert("them vao gio hang thanh cong ");
//     let list_product_in_shopping_cart = JSON.parse(localStorage.getItem('product_in_shopping_cart'));
//     if (list_product_in_shopping_cart === null) {
//         list_product_in_shopping_cart = new Array();
//         localStorage.setItem('product_in_shopping_cart', JSON.stringify(list_product_in_shopping_cart));
//     }
//     // let list_item = JSON.parse(localStorage.getItem('list_product'));
//     let exist = false;

//     for (let i = 0; i < list_product_in_shopping_cart.length; i++) {
//         if (list_product_in_shopping_cart[i].ID_product == id) {
//             let quantity = parseInt(document.getElementById('count').textContent);
//             list_product_in_shopping_cart[i].count = parseInt(list_product_in_shopping_cart[i].count) + quantity;
//             exist = true;
//         }

//     }

//     if (exist == false) {
//         let new_product = create_product_in_shopping_cart(id);
//         new_product.count = parseInt(document.getElementById('count').textContent);
//         list_product_in_shopping_cart.push(new_product);
//     }

//     let json_list_product_in_shopping_cart = JSON.stringify(list_product_in_shopping_cart);
//     localStorage.setItem('product_in_shopping_cart', json_list_product_in_shopping_cart);
//     //dua so luong san pham quay lai = 1
//     // document.getElementById('count').innerHTML = "1";
//     document.getElementById('count-on-icon-shopping').innerHTML = list_product_in_shopping_cart.length;
//     document.getElementById('detail_product').style.display = "none";
//     document.getElementById("index-header").scrollIntoView({ behavior: 'smooth' });
// }




function add_product_to_shopping_cart(id) {
    // window.alert("them vao gio hang thanh cong ");
    let user_using = JSON.parse(localStorage.getItem('user_using'));
    if (user_using === null) {
        alert("ban chua dang nhap");
        document.getElementById('detail_product').style.display = "none";
        document.getElementById("index-header").scrollIntoView({ behavior: 'smooth' });
        return;
    }

    let list_shopping_cart_of_user = JSON.parse(localStorage.getItem('list_shopping_cart_of_user'));
    if (list_shopping_cart_of_user === null) {
        list_shopping_cart_of_user = new Array();
        localStorage.setItem('list_shopping_cart_of_user', JSON.stringify(list_shopping_cart_of_user));
    }

    let list_product = JSON.parse(localStorage.getItem("Info-Products"));
    if(list_product === null){
        list_product = new Array();
        localStorage.setItem(key,JSON.stringify(list_product));
    }
    // let list_item = JSON.parse(localStorage.getItem('list_product'));
    let exist_product = false;
    let exist_cart_shopping = false;
    for (let i = 0; i < list_shopping_cart_of_user.length; i++) {
        if (list_shopping_cart_of_user[i].id_nguoi_dung === document.getElementById('username').textContent) {
            //nguoi nay da tuong mua hang
            for (let j = 0; j < list_shopping_cart_of_user[i].list_san_pham.length; j++) {
                if (list_shopping_cart_of_user[i].list_san_pham[j].ID_product == id) {
                    let quantity = parseInt(document.getElementById('count').textContent);
                    list_shopping_cart_of_user[i].list_san_pham[j].count = parseInt(list_shopping_cart_of_user[i].list_san_pham[j].count) + quantity;
                    //tru so luong san pham do trong shop bot lai
                    let product = get_Infor_by_id(id)
                    console.log(product);
                    product.Amount_Product = product.Amount_Product - quantity;
                    console.log(product.Amount_Product);
                    exist_product = true;
                }
                // console.log(list_shopping_cart_of_user[i].list_san_pham[j].ID_product);
            }
            if (exist_product == false) {
                let new_product = create_product_in_shopping_cart(id);
                new_product.count = parseInt(document.getElementById('count').textContent);
                list_shopping_cart_of_user[i].list_san_pham.push(new_product);
                //giam bot so luong san pham trong shop
                let product = get_Infor_by_id(id)
                console.log(product);
                product.Amount_Product = product.Amount_Product -  new_product.count;
                console.log(product.Amount_Product);
            }
            exist_cart_shopping = true;
            document.getElementById('count-on-icon-shopping').innerHTML = list_shopping_cart_of_user[i].list_san_pham.length;
        }
    }
    if (exist_cart_shopping == false) {
        //nguoi nay chua tung mua hang
        let nguoidung = taogiohangtuongnguoidung();
        nguoidung.id_nguoi_dung = document.getElementById('username').textContent;
        for (let j = 0; j < nguoidung.list_san_pham.length; j++) {
            if (nguoidung.list_san_pham[j].ID_product == id) {
                let quantity = parseInt(document.getElementById('count').textContent);
                nguoidung.list_san_pham[j].count = parseInt(nguoidung.list_san_pham[j].count) + quantity;
                //giam bot so luong san pham trong shop
                let product = get_Infor_by_id(id)
                console.log(product);
                product.Amount_Product = product.Amount_Product - quantity;
                console.log(product.Amount_Product);
                exist_product = true;
            }
        }

        if (exist_product == false) {
            let new_product = create_product_in_shopping_cart(id);
            new_product.count = parseInt(document.getElementById('count').textContent);
            nguoidung.list_san_pham.push(new_product);
            //giam bot so luong san pham trong shop
            let product = get_Infor_by_id(id)
            console.log(product);
            product.Amount_Product = product.Amount_Product -  new_product.count;
            console.log(product.Amount_Product);
        }
        list_shopping_cart_of_user.push(nguoidung);
        document.getElementById('count-on-icon-shopping').innerHTML = nguoidung.list_san_pham.length;

    }

    let json_list_shopping_cart_of_user = JSON.stringify(list_shopping_cart_of_user);
    localStorage.setItem('list_shopping_cart_of_user', json_list_shopping_cart_of_user);
    //dua so luong san pham quay lai = 1
    // document.getElementById('count').innerHTML = "1";
    let json_Info_Products = JSON.stringify(list_product);
    localStorage.setItem('Info-Products',json_Info_Products);
    document.getElementById('detail_product').style.display = "none";
    document.getElementById("index-header").scrollIntoView({ behavior: 'smooth' });
}




// for (let i = 0; i < list_product_in_shopping_cart.length; i++) {
//     if (list_product_in_shopping_cart[i].ID_product == id) {
//         let quantity = parseInt(document.getElementById('count').textContent);
//         list_product_in_shopping_cart[i].count = parseInt(list_product_in_shopping_cart[i].count) + quantity;
//         exist = true;
//     }

// }

// if (exist == false) {
//     let new_product = create_product_in_shopping_cart(id);
//     new_product.count = parseInt(document.getElementById('count').textContent);
//     list_product_in_shopping_cart.push(new_product);
// }

// let json_list_product_in_shopping_cart = JSON.stringify(list_product_in_shopping_cart);
// localStorage.setItem('product_in_shopping_cart', json_list_product_in_shopping_cart);
// //dua so luong san pham quay lai = 1
// document.getElementById('count').innerHTML = "1";
// document.getElementById('count-on-icon-shopping').innerHTML = list_product_in_shopping_cart.length;
// document.getElementById('detail_product').style.display = "none";
// document.getElementById("index-header").scrollIntoView({ behavior: 'smooth' });
// }


function taogiohangtuongnguoidung() {
    let giohangcuanguoidung = new Object();
    giohangcuanguoidung.id_nguoi_dung = document.getElementById('username').textContent;
    giohangcuanguoidung.list_san_pham = new Array();
    return giohangcuanguoidung;
}











// //hien thi danh sach san pham duoc chon mua len gio hnag
// function show_product_in_shopping_cart() {
//     let list_product_in_shopping_cart = JSON.parse(localStorage.getItem('product_in_shopping_cart'));
//     // let list_item = JSON.parse(localStorage.getItem('list_product'))
//     // console.log(list_product_in_shopping_cart);
//     let html = '';
//     let totalprice = 0;
//     for (let i = 0; i < list_product_in_shopping_cart.length; i++) {
//         let product = get_Infor_by_id(list_product_in_shopping_cart[i].ID_product);
//         // console.log(product);
//         product.count = list_product_in_shopping_cart[i].count;
//         product.totalprice = function () {
//             return parseInt(product.Price_Product) * parseInt(product.count);
//         }
//         totalprice += product.totalprice();
//         html += `<div id="${product.ID_product + product.Name_Product + product.ID_product}">
//         <div class="div_product">
//             <div id="div_img" class="grip2">
//                 <img src="${product.image_Product}">
//             </div>
//             <div id="div_name" class="grip5">
//                 <h2>${product.Name_Product}</h2>
//             </div>
//             <div id="div_price" class="grip3">
//                 <h2>$${product.Price_Product}</h2>
//             </div>
//             <div id="div_count" class="grip2">
//                 <div id="sub-product-in-shopping-cart">

//                         <button onclick="sub_product(${product.ID_product})"><i class="ti-minus"></i></button>

//                 </div>
//                 <div id="count-product-in-shopping-cart">
//                 <span id="${product.ID_product}">${product.count}</span>
//                 </div>
//                 <div id="add-product-in-shopping-cart">

//                         <button onclick="add_product(${product.ID_product})"><i class="ti-plus"></i></button>

//                 </div>
//             </div>
//             <div id="div_totalprice" class="grip3">
//                 <h2 id="${product.ID_product + product.Name_Product}">$${product.totalprice()}</h2>
//             </div>
//             <div id="div_delete" class="grip1">

//             <button id='delete_btn' onclick="delete_product(${product.ID_product})"><i class="ti-trash"></i></button>

//             </div>
//     </div>
//     </div>
//         `
//     }
//     document.getElementById('show_product_in_shopping_cart').innerHTML = html;
//     document.getElementById('totalprice').innerHTML = "Tổng tiền: $" + totalprice;
// }



function show_product_in_shopping_cart(){
    console.log(document.getElementById('username').textContent);
    let list_shopping_cart_of_user = JSON.parse(localStorage.getItem('list_shopping_cart_of_user'));
    if (list_shopping_cart_of_user === null) {
        list_shopping_cart_of_user = new Array();
        localStorage.setItem('list_shopping_cart_of_user', JSON.stringify(list_shopping_cart_of_user));
    }
    let html = '';
    let totalprice = 0;
    for (let i = 0; i < list_shopping_cart_of_user.length; i++) {
        // console.log("hihi");
        // console.log(document.getElementById('username').textContent);\
        // console.log(list_shopping_cart_of_user[i].id_nguoi_dung);
        if (list_shopping_cart_of_user[i].id_nguoi_dung === document.getElementById('username').textContent){
            for (let j = 0; j < list_shopping_cart_of_user[i].list_san_pham.length; j++) {
                let product = get_Infor_by_id(list_shopping_cart_of_user[i].list_san_pham[j].ID_product);
                // console.log(product);
                product.count = list_shopping_cart_of_user[i].list_san_pham[j].count;
                product.totalprice = function () {
                    return parseInt(product.Price_Product) * parseInt(product.count);
                }
                totalprice += product.totalprice();
                html += `<div id="${product.ID_product + product.Name_Product + product.ID_product}">
                <div class="div_product">
                    <div id="div_img" class="grip2">
                        <img src="${product.image_Product}">
                    </div>
                    <div id="div_name" class="grip5">
                        <h2>${product.Name_Product}</h2>
                    </div>
                    <div id="div_price" class="grip3">
                        <h2>$${product.Price_Product}</h2>
                    </div>
                    <div id="div_count" class="grip2">
                        <div id="sub-product-in-shopping-cart">
                           
                                <button onclick="sub_product(${product.ID_product})"><i class="ti-minus"></i></button>
                            
                        </div>
                        <div id="count-product-in-shopping-cart">
                        <span id="${product.ID_product}">${product.count}</span>
                        </div>
                        <div id="add-product-in-shopping-cart">
                           
                                <button onclick="add_product(${product.ID_product})"><i class="ti-plus"></i></button>
                            
                        </div>
                    </div>
                    <div id="div_totalprice" class="grip3">
                        <h2 id="${product.ID_product + product.Name_Product}">$${product.totalprice()}</h2>
                    </div>
                    <div id="div_delete" class="grip1">
                    
                    <button id='delete_btn' onclick="delete_product(${product.ID_product})"><i class="ti-trash"></i></button>
                    
                    </div>
            </div>
            </div>
                `
            }
            document.getElementById('show_product_in_shopping_cart').innerHTML = html;
            document.getElementById('totalprice').innerHTML = "Tổng tiền: $" + totalprice;
            document.getElementById('count-on-icon-shopping').innerHTML = list_shopping_cart_of_user[i].list_san_pham.length;
            break;
        }
    }
}



function get_Infor_by_id(id) {
    let product = new Object();
    let list_item = JSON.parse(localStorage.getItem('Info-Products'));
    for (let i = 0; i < list_item.length; i++) {
        if (id == list_item[i].ID_product) {
            product = list_item[i];
            break;
        }
    }
    return product;
}






//xoa san pham moi khi nhan vao thung rac


let id_product_of_confirm_delete;
function delete_product(id) {
    // confirm_delete.apply(null, arguments);
    id_product_of_confirm_delete = arguments;
    document.getElementById('notification-body').style.display = "flex";
    // announce_when_delete_product(id);
    // let delete_clicked = document.getElementById('button-confirm-delete');
    // let cancle_clicked = document.getElementById('button-confirm-cancel');
    // console.log("1");

    // delete_clicked.addEventListener('click', function confirm_delete_product(){
    //     let list_product_in_shopping_cart = JSON.parse(localStorage.getItem('product_in_shopping_cart'))
    //     // product = get_Infor_by_id(id);
    //     // document.getElementById(id+product.name_product+id).style.display = "none";
    //     for (let i = 0; i < list_product_in_shopping_cart.length; i++) {
    //         if (id == list_product_in_shopping_cart[i].id) {
    //             list_product_in_shopping_cart.splice(i, list_product_in_shopping_cart[i].count);
    //             let json_list_product_in_shopping_cart = JSON.stringify(list_product_in_shopping_cart);
    //             localStorage.setItem('product_in_shopping_cart', json_list_product_in_shopping_cart);
    //         }
    //     }

    //     document.getElementById('notification-body').style.display = "none";
    //     show_product_in_shopping_cart();
    //     document.getElementById('count-on-icon-shopping').innerHTML = list_product_in_shopping_cart.length;
    //   });

    // delete_clicked.addEventListener('click', function go_back_shopping_cart(){
    //     document.getElementById('notification-body').style.display = "none";
    // });
}




// ----------------------------thong bao khi xoa san pham----------------------------
// function announce_when_delete_product(id){
//     // confirm_delete.apply(null, arguments);
//     document.getElementById('notification-body').style.display = "flex";
// }

function confirm_delete() {
    let list_shopping_cart_of_user = JSON.parse(localStorage.getItem('list_shopping_cart_of_user'));
    // if (list_shopping_cart_of_user === null) {
    //     list_shopping_cart_of_user = new Array();
    //     localStorage.setItem('list_shopping_cart_of_user', JSON.stringify(list_shopping_cart_of_user));
    // }
    for (let i = 0; i < list_shopping_cart_of_user.length; i++) {
        if (list_shopping_cart_of_user[i].id_nguoi_dung === document.getElementById('username').textContent){
            for (let j = 0; j < list_shopping_cart_of_user[i].list_san_pham.length;j++) {
                if (id_product_of_confirm_delete[0] == list_shopping_cart_of_user[i].list_san_pham[j].ID_product){
                    // console.log(list_shopping_cart_of_user[i].list_san_pham[j].ID_product);
                    list_shopping_cart_of_user[i].list_san_pham.splice(j, list_shopping_cart_of_user[i].list_san_pham[j].count);
                    // console.log(list_shopping_cart_of_user[i].list_san_pham.length);
                    let json_list_shopping_cart_of_user = JSON.stringify(list_shopping_cart_of_user);
                    localStorage.setItem('list_shopping_cart_of_user', json_list_shopping_cart_of_user);
                    break;
                }
            }

            document.getElementById('notification-body').style.display = "none";
            show_product_in_shopping_cart();
            document.getElementById('count-on-icon-shopping').innerHTML = list_shopping_cart_of_user[i].list_san_pham.length;
        }
    }
}


// function confirm_delete() {
//     let list_product_in_shopping_cart = JSON.parse(localStorage.getItem('product_in_shopping_cart'))
//     for (let i = 0; i < list_product_in_shopping_cart.length; i++) {
//         if (id_product_of_confirm_delete[0] == list_product_in_shopping_cart[i].ID_product) {
//             // console.log("hahaha");
//             list_product_in_shopping_cart.splice(i, list_product_in_shopping_cart[i].count);
//             let json_list_product_in_shopping_cart = JSON.stringify(list_product_in_shopping_cart);
//             localStorage.setItem('product_in_shopping_cart', json_list_product_in_shopping_cart);
//         }
//     }

//     document.getElementById('notification-body').style.display = "none";
//     show_product_in_shopping_cart();
//     document.getElementById('count-on-icon-shopping').innerHTML = list_product_in_shopping_cart.length;
// }


function go_back_shopping_cart() {
    document.getElementById('notification-body').style.display = "none";
}


// ----------------------------thong bao khi xoa san pham (end)----------------------------



// function add_product(id) {
//     let list_product_in_shopping_cart = JSON.parse(localStorage.getItem('product_in_shopping_cart'));
//     for (let i = 0; i < list_product_in_shopping_cart.length; i++) {
//         if (list_product_in_shopping_cart[i].ID_product == id) {
//             let product = get_Infor_by_id(id);
//             if (list_product_in_shopping_cart[i].count >= product.Amount_Product) {
//                 alert("het hang");
//             }
//             else {
//                 list_product_in_shopping_cart[i].count = parseInt(list_product_in_shopping_cart[i].count) + 1;
//             }
//             let json_list_product_in_shopping_cart = JSON.stringify(list_product_in_shopping_cart);
//             localStorage.setItem('product_in_shopping_cart', json_list_product_in_shopping_cart);
//             console.log(list_product_in_shopping_cart[i].count);
//             document.getElementById(id).innerHTML = list_product_in_shopping_cart[i].count;
//             product.totalprice = function () {
//                 return parseInt(list_product_in_shopping_cart[i].count) * parseInt(product.Price_Product);
//             }
//             console.log(product.totalprice());
//             document.getElementById(id + product.Name_Product).innerHTML = "$" + product.totalprice();
//             console.log(id + product.Name_Product);
//         }
//     }
//     console.log(list_product_in_shopping_cart);
//     document.getElementById('count-on-icon-shopping').innerHTML = list_product_in_shopping_cart.length;
// }


function add_product(id) {
    let list_shopping_cart_of_user = JSON.parse(localStorage.getItem('list_shopping_cart_of_user'));
    if (list_shopping_cart_of_user === null) {
        list_shopping_cart_of_user = new Array();
        localStorage.setItem('list_shopping_cart_of_user', JSON.stringify(list_shopping_cart_of_user));
    }
    for (let i = 0; i < list_shopping_cart_of_user.length; i++) {
        // let list_product_in_shopping_cart = JSON.parse(localStorage.getItem('product_in_shopping_cart'));
        if (list_shopping_cart_of_user[i].id_nguoi_dung === document.getElementById('username').textContent) {
            for (let j = 0; j < list_shopping_cart_of_user[i].list_san_pham.length; j++) {
                if (list_shopping_cart_of_user[i].list_san_pham[j].ID_product == id) {
                    let product = get_Infor_by_id(id);
                    if (list_shopping_cart_of_user[i].list_san_pham[j].count >= product.Amount_Product) {
                        alert("het hang");
                    }
                    else {
                        list_shopping_cart_of_user[i].list_san_pham[j].count = parseInt(list_shopping_cart_of_user[i].list_san_pham[j].count) + 1;
                    }
                    let json_list_shopping_cart_of_user = JSON.stringify(list_shopping_cart_of_user);
                    localStorage.setItem('list_shopping_cart_of_user', json_list_shopping_cart_of_user);
                    // console.log(list_product_in_shopping_cart[i].count);
                    document.getElementById(id).innerHTML = list_shopping_cart_of_user[i].list_san_pham[j].count;
                    product.totalprice = function () {
                        return parseInt(list_shopping_cart_of_user[i].list_san_pham[j].count) * parseInt(product.Price_Product);
                    }
                    console.log(product.totalprice());
                    document.getElementById(id + product.Name_Product).innerHTML = "$" + product.totalprice();
                    console.log(id + product.Name_Product);
                }
            }
            console.log(list_product_in_shopping_cart);
            document.getElementById('count-on-icon-shopping').innerHTML = list_shopping_cart_of_user[i].list_san_pham.length;
        }
    }
}



// function sub_product(id) {
//     // window.alert("ban dang giam so luong san pham " + id);
//     let list_product_in_shopping_cart = JSON.parse(localStorage.getItem('product_in_shopping_cart'));
//     for (let i = 0; i < list_product_in_shopping_cart.length; i++) {
//         if (list_product_in_shopping_cart[i].ID_product == id) {
//             if (list_product_in_shopping_cart[i].count == 1) {
//                 delete_product(id);
//             }
//             else {
//                 let product = get_Infor_by_id(id);
//                 list_product_in_shopping_cart[i].count = parseInt(list_product_in_shopping_cart[i].count) - 1;
//                 let json_list_product_in_shopping_cart = JSON.stringify(list_product_in_shopping_cart);
//                 localStorage.setItem('product_in_shopping_cart', json_list_product_in_shopping_cart);
//                 document.getElementById(id).innerHTML = list_product_in_shopping_cart[i].count;
//                 product.totalprice = function () {
//                     return parseInt(list_product_in_shopping_cart[i].count) * parseInt(product.Price_Product);
//                 }
//                 console.log(product.totalprice());
//                 document.getElementById(id + product.Name_Product).innerHTML = "$" + product.totalprice();
//                 console.log(id + product.Name_Product);
//             }
//         }
//     }
//     console.log(list_product_in_shopping_cart);
//     document.getElementById('count-on-icon-shopping').innerHTML = list_product_in_shopping_cart.length;

// }



function sub_product(id) {
    // window.alert("ban dang giam so luong san pham " + id);
    let list_shopping_cart_of_user = JSON.parse(localStorage.getItem('list_shopping_cart_of_user'));
    if (list_shopping_cart_of_user === null) {
        list_shopping_cart_of_user = new Array();
        localStorage.setItem('list_shopping_cart_of_user', JSON.stringify(list_shopping_cart_of_user));
    }
    for (let i = 0; i < list_shopping_cart_of_user.length; i++) {
        if (list_shopping_cart_of_user[i].id_nguoi_dung === document.getElementById('username').textContent) {
            let list_product_in_shopping_cart = JSON.parse(localStorage.getItem('product_in_shopping_cart'));
            for (let j = 0; j < list_shopping_cart_of_user[i].list_san_pham.length; j++) {
                if (list_shopping_cart_of_user[i].list_san_pham[j].ID_product == id) {
                    if (list_shopping_cart_of_user[i].list_san_pham[j].count == 1) {
                        delete_product(id);
                    }
                    else {
                        let product = get_Infor_by_id(id);
                        list_shopping_cart_of_user[i].list_san_pham[j].count = parseInt(list_shopping_cart_of_user[i].list_san_pham[j].count) - 1;
                        let json_list_shopping_cart_of_user = JSON.stringify(list_shopping_cart_of_user);
                        localStorage.setItem('list_shopping_cart_of_user', json_list_shopping_cart_of_user);
                        document.getElementById(id).innerHTML = list_shopping_cart_of_user[i].list_san_pham[j].count;
                        product.totalprice = function () {
                            return parseInt(list_shopping_cart_of_user[i].list_san_pham[j].count) * parseInt(product.Price_Product);
                        }
                        console.log(product.totalprice());
                        document.getElementById(id + product.Name_Product).innerHTML = "$" + product.totalprice();
                        console.log(id + product.Name_Product);
                    }
                }
            }
            console.log(list_product_in_shopping_cart);
            document.getElementById('count-on-icon-shopping').innerHTML = list_shopping_cart_of_user[i].list_san_pham.length;
        }
    }
}



//xem gio hang
function view_shopping_cart() {
    show_product_in_shopping_cart();
    document.getElementById('show_product').style.display = "flex";
}


//quay lai sau khi xem gio hang
function back_to_page() {
    document.getElementById('show_product').style.display = "none";
}


function quay_lai_trang(){
    document.getElementById('hienthidonhang').style.display = "none";
}






// ------------------------------delete all product from shooping cart-------------------------
// function delete_all_product() {
//     // document.getElementById('notification-body').style.display ="flex";
//     // confirm("xac nhan xoa ");
//     let list_product_in_shopping_cart = JSON.parse(localStorage.getItem("product_in_shopping_cart"));
//     for (let i = 0; i < list_product_in_shopping_cart.length;) {
//         if (list_product_in_shopping_cart.length == 0) {
//             break;
//         }
//         product = get_Infor_by_id(list_product_in_shopping_cart[i].ID_product);
//         document.getElementById(product.ID_product + product.Name_Product + product.ID_product).style.display = "none";
//         list_product_in_shopping_cart.splice(i, 1);
//     }
//     localStorage.setItem('product_in_shopping_cart', JSON.stringify(list_product_in_shopping_cart));
//     document.getElementById('count-on-icon-shopping').innerHTML = list_product_in_shopping_cart.length;

// }


function delete_all_product() {
    // document.getElementById('notification-body').style.display ="flex";
    // confirm("xac nhan xoa ");
    let list_shopping_cart_of_user = JSON.parse(localStorage.getItem('list_shopping_cart_of_user'));
    for (let i = 0; i < list_shopping_cart_of_user.length; i++) {
        if (list_shopping_cart_of_user[i].id_nguoi_dung === document.getElementById('username').textContent) {
            for (let j = 0; j < list_shopping_cart_of_user[i].list_san_pham.length;) {
                if (list_shopping_cart_of_user[i].list_san_pham.length == 0) {
                    break;
                }
                product = get_Infor_by_id(list_shopping_cart_of_user[i].list_san_pham[j].ID_product);
                document.getElementById(product.ID_product + product.Name_Product + product.ID_product).style.display = "none";
                list_shopping_cart_of_user[i].list_san_pham.splice(j, list_shopping_cart_of_user[i].list_san_pham[j].count);
            }
            localStorage.setItem('list_shopping_cart_of_user', JSON.stringify(list_shopping_cart_of_user));
            document.getElementById('count-on-icon-shopping').innerHTML = list_shopping_cart_of_user[i].list_san_pham.length;
            // break;
        }
    }
    // let list_product_in_shopping_cart = JSON.parse(localStorage.getItem("product_in_shopping_cart"));
    // for (let i = 0; i < list_product_in_shopping_cart.length;) {
    //     if (list_product_in_shopping_cart.length == 0) {
    //         break;
    //     }
    //     product = get_Infor_by_id(list_product_in_shopping_cart[i].ID_product);
    //     document.getElementById(product.ID_product + product.Name_Product + product.ID_product).style.display = "none";
    //     list_product_in_shopping_cart.splice(i, 1);
    // }
    // localStorage.setItem('product_in_shopping_cart', JSON.stringify(list_product_in_shopping_cart));
    // document.getElementById('count-on-icon-shopping').innerHTML = list_product_in_shopping_cart.length;

}









// --------------------------------thanh toan don hang------------------------------
// function pay() {
//     document.getElementById('bill-content').style.display = "flex";
//     document.getElementById('index-nav').style.display = "none";
//     document.getElementById('index-slider').style.display = "none";
//     document.getElementById('index-content').style.display = "none";

//     let list_product_in_shopping_cart = JSON.parse(localStorage.getItem('product_in_shopping_cart'));

//     let html = '', money_to_pay = 0;
//     for (let i = 0; i < list_product_in_shopping_cart.length; i++) {
//         let product = get_Infor_by_id(list_product_in_shopping_cart[i].ID_product);
//         product.count = list_product_in_shopping_cart[i].count;
//         product.totalprice = function () {
//             return parseInt(product.Price_Product) * parseInt(product.count);
//         }

//         money_to_pay += product.totalprice();

//         html += `<div id="product-in-bill">
//         <img src="${product.image_Product}" alt="">
//         <h3>${product.Name_Product}</h3>
//         <p>số lượng: ${product.count}</p>
//         <p>tổng tiền: $${product.totalprice()}</p>
//     </div>`
//     }
//     document.getElementById('money-to-be-pay').innerHTML = "Tổng tiền cần thanh toán: $" + money_to_pay;
//     document.getElementById('show-product-in-bill').innerHTML = html;

// }


function pay() {
    document.getElementById('bill-content').style.display = "flex";
    document.getElementById('index-nav').style.display = "none";
    document.getElementById('index-slider').style.display = "none";
    document.getElementById('index-content').style.display = "none";

    let list_shopping_cart_of_user = JSON.parse(localStorage.getItem('list_shopping_cart_of_user'));
    if (list_shopping_cart_of_user === null) {
        list_shopping_cart_of_user = new Array();
        localStorage.setItem('list_shopping_cart_of_user', JSON.stringify(list_shopping_cart_of_user));
    }

    for (let i = 0; i < list_shopping_cart_of_user.length; i++) {
        if (list_shopping_cart_of_user[i].id_nguoi_dung === document.getElementById('username').textContent) {
            let html = '', money_to_pay = 0;
            for (let j = 0; j < list_shopping_cart_of_user[i].list_san_pham.length; j++) {
                let product = get_Infor_by_id(list_shopping_cart_of_user[i].list_san_pham[j].ID_product);
                product.count = list_shopping_cart_of_user[i].list_san_pham[j].count;
                product.totalprice = function () {
                    return parseInt(product.Price_Product) * parseInt(product.count);
                }

                money_to_pay += product.totalprice();

                html += `<div id="product-in-bill">
            <img src="${product.image_Product}" alt="">
            <h3>${product.Name_Product}</h3>
            <p>số lượng: ${product.count}</p>
            <p>tổng tiền: $${product.totalprice()}</p>
            </div>`
            }
            document.getElementById('money-to-be-pay').innerHTML = "Tổng tiền cần thanh toán: $" + money_to_pay;
            document.getElementById('show-product-in-bill').innerHTML = html;
            break;
        }
    }
}



// -------------------------------------DatMuaHang-------------------------------------------
console.log(list_order);



function datmua() {
    let list_order = JSON.parse(localStorage.getItem('danhsachdonhang'));
    if (list_order === null) {
        list_order = new Array();
        localStorage.setItem('danhsachdonhang', JSON.stringify(list_order));
    }

    let list_shopping_cart_of_user = JSON.parse(localStorage.getItem('list_shopping_cart_of_user'));
    if (list_shopping_cart_of_user === null){
        list_shopping_cart_of_user = new Array();
        localStorage.setItem('list_shopping_cart_of_user', JSON.stringify(list_shopping_cart_of_user));
    }
    // let list_sanpham = JSON.parse(localStorage.getItem('product_in_shopping_cart'));
    let a = new Object();
    let phuongthucgiaohang = document.getElementsByName('order');
    for (let i = 0; i < phuongthucgiaohang.length; i++) {
        if (phuongthucgiaohang[i].checked == true) {
            a.giaohang = phuongthucgiaohang[i].value;
        }
    }
    a.tongtienphaitra = 0;
    a.diachi = document.getElementById('address').value;
    a.tenkhachhang = document.getElementById('name').value;
    a.dienthoai = document.getElementById('phone').value;
    a.maKH = document.getElementById('username').textContent;
    a.ngaydathang = new Date();
    a.tinhTrangDonHang = "đang chờ xử lý";
    for (let i = 0; i < list_shopping_cart_of_user.length; i++) {
        if (list_shopping_cart_of_user[i].id_nguoi_dung === document.getElementById('username').textContent) {
            a.sanpham = list_shopping_cart_of_user[i].list_san_pham;
            for (let j = 0; j < list_shopping_cart_of_user[i].list_san_pham.length; j++) {
                let product = get_Infor_by_id(list_shopping_cart_of_user[i].list_san_pham[j].ID_product);
                product.count = list_shopping_cart_of_user[i].list_san_pham[j].count;
                a.tongtienphaitra += parseInt(product.Price_Product) * parseInt(product.count)
            }
            break;
        }
    }
    if (a.sanpham == "") {
        alert("Chưa có sản phẩm nào trong giỏ hàng ");
    }
    else if (a.giaohang == "" || a.diachi == "" || a.dienthoai == "" || a.tenkhachhang == "" || a.sanpham == undefined) {
        console.log(a.giaohang);
        console.log(a.dienthoai);
        console.log(a.tenkhachhang);
        console.log(a.sanpham);
        if (a.giaohang == undefined) {
            document.getElementById("error_order").style.display = "block";
        }
        if (a.diachi == "") {
            document.getElementById("error_address").style.display = "block";
        }
        if (a.dienthoai == "") {
            document.getElementById("error_phone").style.display = "block";
        }
        if (a.tenkhachhang == "") {
            document.getElementById("error_name").style.display = "block";
        }
    }
    else {
        list_order.push(a);
        let json_list_order = JSON.stringify(list_order);
        localStorage.setItem("danhsachdonhang", json_list_order);
        delete_all_product();
        alert("dat hang thanh cong");
        document.getElementById('show-product-in-bill').innerHTML = "";
        document.getElementById("count-bill").style.display = "block";
        document.getElementById("index-header").scrollIntoView({ behavior: 'smooth' });
    }
}





// function datmua() {
//     let list_sanpham = JSON.parse(localStorage.getItem('product_in_shopping_cart'));
//     let a = new Object();
//     let phuongthucgiaohang = document.getElementsByName('order');
//     for (let i = 0; i < phuongthucgiaohang.length; i++) {
//         if (phuongthucgiaohang[i].checked == true) {
//             a.giaohang = phuongthucgiaohang[i].value;
//         }
//     }
//     a.tongtienphaitra = 0;
//     for (let i = 0; i < list_sanpham.length; i++) {
//         let product = get_Infor_by_id(list_sanpham[i].ID_product);
//         product.count = list_sanpham[i].count;
//         a.tongtienphaitra += parseInt(product.Price_Product) * parseInt(product.count)
//     }
//     a.sanpham = list_sanpham;
//     a.diachi = document.getElementById('address').value;
//     a.tenkhachhang = document.getElementById('name').value;
//     a.dienthoai = document.getElementById('phone').value;
//     a.maKH = document.getElementById('username').textContent;
//     a.tinhTrangDonHang = "chưa xử lý";
//     if (a.sanpham == "") {
//         alert("Chưa có sản phẩm nào trong giỏ hàng ");
//     }
//     else if (a.giaohang == "" || a.diachi == "" || a.dienthoai == "" || a.tenkhachhang == "" || a.sanpham == undefined) {
//         if (a.giaohang == undefined) {
//             document.getElementById("error_order").style.display = "block";
//         }
//         if (a.diachi == "") {
//             document.getElementById("error_address").style.display = "block";
//         }
//         if (a.dienthoai == "") {
//             document.getElementById("error_phone").style.display = "block";
//         }
//         if (a.tenkhachhang == "") {
//             document.getElementById("error_name").style.display = "block";
//         }
//     }
//     else {
//         list_order.push(a);
//         let json_list_order = JSON.stringify(list_order);
//         localStorage.setItem("danhsachdonhang", json_list_order);
//         delete_all_product();
//     }
//     // console.log(document.getElementById('money-to-be-pay').value);
// }




// let luachon
function locsanpham(key) {
    document.getElementById('right').style.minHeight = '400px';
    document.getElementById('index-slider').style.display = "none";
    let sanphamloc = new Array();
    let list_item = JSON.parse(localStorage.getItem('Info-Products'));
    for (let i = 0; i < list_item.length; i++) {
        if (list_item[i].Type_Product === key) {
            sanphamloc.push(list_item[i]);
        }
    }
    let json_sanphamloc = JSON.stringify(sanphamloc);
    localStorage.setItem('sanphamloc', json_sanphamloc);
    console.log(sanphamloc.length);
    if(sanphamloc.length == 0){
        document.getElementById("right").innerHTML = "❌ Không có sản phẩm loại " + key + " !";
        show_page('sanphamloc');
    }
    else{
        show_product('sanphamloc');
    show_page('sanphamloc');
    }
}


function header() {
    document.getElementById("index-footer").scrollIntoView({ behavior: 'smooth' });
}




// function logout(){
//     document.getElementById('account').style.display = "block";
// }

function xemdonhang(){
    document.getElementById('account').style.display = "none";
}

function dangxuat(){
    localStorage.removeItem('user_using')
    let list_shopping_cart_of_user = JSON.parse(localStorage.getItem("list_shopping_cart_of_user"));
    let a = taogiohangtuongnguoidung();
    a.id_nguoi_dung = "none";
    a.list_san_pham = new Array();
    let exist = false;
    for(let i = 0; i < list_shopping_cart_of_user.length;i++){
        if(list_shopping_cart_of_user[i].id_nguoi_dung === "none"){
            exist = true;
            break;
        }
    }
    console.log(exist);
    if(exist == false){
        list_shopping_cart_of_user.push(a);
        localStorage.setItem("list_shopping_cart_of_user",JSON.stringify(list_shopping_cart_of_user));
    }
    document.getElementById("username").innerHTML = "none";
    show_product_in_shopping_cart();
    document.getElementById('user').style.display = "none";
    document.getElementById('login').style.display = "block";
}




function xemdonhang(){
    let danhsachdonhang = JSON.parse(localStorage.getItem("danhsachdonhang"));
    let html = "";
    for(let i = 0; i < danhsachdonhang.length;i++){
        if(danhsachdonhang[i].maKH === document.getElementById('username').textContent){
            html+=`<div class="DonMua">    
            <div class="header">
                <p>Đơn Mua</p>
            </div>
            <div class="content">
            <ul class="content_text">
                <li>Tên Sản Phẩm</li>
                <li>Số Lượng</li>
                <li>Giá</li>
            </ul>
            `
            let html2 = "";
            for(let j = 0; j < danhsachdonhang[i].sanpham.length;j++){
                let product = get_Infor_by_id(danhsachdonhang[i].sanpham[j].ID_product);
                html2+=`
                <ul class="content_text">
                    <li>${product.Name_Product}</li>
                    <li>${danhsachdonhang[i].sanpham[j].count}</li>
                    <li>$${product.Price_Product}</li>
                </ul>`
            }
            html+=html2;
            html+=
            `
            </div>
            <div class="content_default">
                <p>Thời Gian Đặt Hàng:     ${new Date()}</p>
                <p>Tình Trạng Đơn Hàng:        ${danhsachdonhang[i].tinhTrangDonHang}</p>
                <p>Thành Tiền:             $${danhsachdonhang[i].tongtienphaitra}</p>
            </div>
            <div class="footer">
    
            </div>
        </div>  `
        }
    }
    console.log(html);
    document.getElementById('xemdonhang').innerHTML = html;
    document.getElementById('hienthidonhang').style.display= "flex"
}

function spawnTemp() {
    let user_using = JSON.parse(localStorage.getItem('user_using'));
    if (user_using === null) {

        document.getElementById('detail_product').style.display = "none";
        document.getElementById("index-header").scrollIntoView({ behavior: 'smooth' });
        return;
    }
    else {
        let deleteMe = $("<div style='background-color:red;width:250px;height:50px;position:absolute;z-index:1;right:20px;font-size:16px;display:flex;justify-content:center;align-items:center;border-radius:6px'>✅ Thêm sản phẩm thành công</div>").appendTo("#anounce");
        setTimeout(function () {
            deleteMe.remove();
        }, 2000);
    }
}