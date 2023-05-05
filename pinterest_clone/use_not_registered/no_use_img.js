let datacontent = JSON.parse(localStorage.getItem("content"));
let idview = localStorage.getItem("viewid");
let imagenes = document.getElementById("imagenes");
let container_card = document.getElementById("container_card");
let datause = JSON.parse(localStorage.getItem("datause"));

//tim kiếm lấy data từ id nhận về để sử lý view
// console.log(idview);
function hienthiview() {
  container_card.innerHTML = `<div class="img_card">
      <img
        class="img_card"
        src="${datacontent[checkview].link}"
        alt=""
      />
    </div>
    <div class="content_card"> 
      <img
        class="avatart_card"
        src="${datause[vitriusetacgia].avatar}"
        alt=""
      />
      <span
        >${datacontent[checkview].tacgia.tacgia} <br /> 

        <small id="tong_theo_doi">người theo dõi: ${datacontent[checkview].tacgia.theodoi.length}</small>
      </span>
      <br>
     <br>
      <div class="comment"><b>Nhận xét</b><span id="tongnhanxet" ></span></div>
      <div id="box_nhanxet" class="box_nhanxet"> 
        </div>
     
        <form id="form_nhanxet" action="">
      <input name="input_comment" class="input_coment" type="text" />
      
      <button class="btn_comment">
        <b>Nhận xét</b> 
        </button>
        </form>
        <button id="luu_view" class="btn_seve1">
          <b>Lưu</b>
      </button>
     <button class="btn_save">
        <b id="btn_save">Theo dõi</b>
     
   
   
   
  </div>
`;
}
// xác định vị trí dữ liệu bài viết trong mảng dữ liệu data
let checkview = -1;
for (let i = 0; i < datacontent.length; i++) {
  if (Number(idview) == datacontent[i].id) {
    checkview = i;
  }
}
//============
//update lại dữ liệu của tác giả (fix bug tác giả), check lấy thông tin của tác giả
//trong danh sách use tìm ra use của tác giả để cập nhật
let vitriusetacgia = -1;
for (let i = 0; i < datause.length; i++) {
  if (datause[i].ten == datacontent[checkview].tacgia.tacgia) {
    vitriusetacgia = i;
    break;
  }
}
if (vitriusetacgia != -1) {
  datacontent[checkview].tacgia = datause[vitriusetacgia].tacgia;
}
console.log(datacontent[checkview].tacgia);
//==============
hienthiview();
//==========xong phần xử lý cơ bản data
///================
let btn_save = document.getElementById("btn_save");
let luu_view = document.getElementById("luu_view");
let form_nhanxet = document.getElementById("form_nhanxet");
form_nhanxet.onsubmit = function (event) {
  event.preventDefault();
  swal("Bạn hãy đăng nhập để sử dụng chức năng");
  form_nhanxet.input_comment.value = "";
};
luu_view.onclick = function () {
  swal("Bạn hãy đăng nhập để sử dụng chức năng");
};
btn_save.onclick = function () {
  swal("Bạn hãy đăng nhập để sử dụng chức năng");
};
///==============
function renderimg() {
  imagenes.innerHTML = "";

  for (let i = 0; i < datacontent.length; i++) {
    imagenes.innerHTML =
      imagenes.innerHTML +
      ` <div  class="card-image" id="${datacontent[i].id}" >
        <a  target="_self" href="http://127.0.0.1:5500/use_not_registered/no_use_img.html#"> <img id="${datacontent[i].id}" src="${datacontent[i].link}" alt="" class="img"  /><button
           class="button"
         >
           <a href="#" class="btn_luu" >Lưu</a></button
         ><span class="material-symbols-outlined upload">upload</span  
         ><span class="material-symbols-outlined menu_btn_img"
           >more_horiz</span
         >
       </a> `;
  }
}
renderimg();
//====================
let card_image = document.getElementById("imagenes");

card_image.onclick = function (event) {
  // console.log(event.target.id);

  localStorage.setItem("viewid", event.target.id);

  // console.log(event.target);
  if (event.target.classList.contains("btn_luu")) {
    console.log("ds");
    swal("Bạn hãy đăng nhập để sử dụng chức năng");
  } else {
    location.reload();
  }
};
