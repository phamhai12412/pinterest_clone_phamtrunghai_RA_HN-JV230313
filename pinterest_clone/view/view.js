let datacontent = JSON.parse(localStorage.getItem("content"));
let idview = localStorage.getItem("viewid");
let imagenes = document.getElementById("imagenes");
let container_card = document.getElementById("container_card");
let datause = JSON.parse(localStorage.getItem("datause"));
let dangxuat = document.getElementById("dangxuat");

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
        <b id="theodoi">Theo dõi</b>
     
   
   
   
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
/**
 *
 */
//thêm chức năng check trạng thái đăng nhập
let checktrangthai = -1;
for (i = 0; i < datause.length; i++) {
  if (datause[i].trangthai == "dangnhap") {
    checktrangthai = i;
  }
}
if (checktrangthai == -1) {
  window.location.href =
    "    http://127.0.0.1:5500/signin_signup/dang%20nhap.html";
}
/**
 *
 *
 */

//===========phần hiện thị comment
let name_sua_xoa = "";
let tongnhanxet = document.getElementById("tongnhanxet");
function hienthi_cmt() {
  box_nhanxet.innerHTML = "";
  tongnhanxet.innerHTML = 0;
  // console.log(datacontent[checkview].nhanxet);
  if (datacontent[checkview].nhanxet.length == 0) {
    box_nhanxet.innerHTML = `<p>  Chưa có nhận xét nào! Thêm nhận xét để bắt đầu cuộc trò chuyện.</p>`;
  } else {
    for (let i = 0; i < datacontent[checkview].nhanxet.length; i++) {
      let a = [];
      name_sua_xoa = datacontent[checkview].nhanxet[i].use;
      a = name_sua_xoa.split(" ");
      name_sua_xoa = a.join("");
      // console.log(name_sua_xoa);
      box_nhanxet.innerHTML =
        box_nhanxet.innerHTML +
        ` <p>
  <b class="use_nhanxet"><b>${datacontent[checkview].nhanxet[i].use}: </b></b>
<span class=" text_nhanxet">${datacontent[checkview].nhanxet[i].nhanxet} 
<a id="${datacontent[checkview].nhanxet[i].id}" class="suaxoa sua ${name_sua_xoa} ">sửa</a> <a id="${datacontent[checkview].nhanxet[i].id}" class="suaxoa ${name_sua_xoa} xoa ">xóa</a></span>

 </p>

`;
    }
  }
  if (datacontent[checkview].nhanxet.length == 0) {
    tongnhanxet.innerHTML = "";
  } else {
    tongnhanxet.innerHTML = `(${datacontent[checkview].nhanxet.length})`;
  }
}

hienthi_cmt();
// ============ kết thúc phần hiện thị coment
/**
 *
 *
 *
 */
//=============hiện thị phần sửa xóa comment của chủ use đã coment

let use_comment = datause[checktrangthai].ten;
let use_comment_tach = [];
use_comment_tach = use_comment.split(" ");
use_comment = use_comment_tach.join("");
let class_sua_xoa = document.getElementsByClassName(`${use_comment}`);
// console.log(class_sua_xoa);
// console.log(use_comment);
// console.log(name_sua_xoa);
for (let i = 0; i < class_sua_xoa.length; i++) {
  class_sua_xoa[i].style.display = "inline";
}

// //=================== kết thúc hiện thị phần sửa xóa comment của chủ use đã coment
/**
 *
 *
 *
 */
// =========thêm chức năng coment

let form_nhanxet = document.getElementById("form_nhanxet");
form_nhanxet.onsubmit = function (event) {
  event.preventDefault();
  let comment = form_nhanxet.input_comment.value;
  if (comment == "") {
    swal("Bạn chưa nhập nội dung");
  } else {
    datacontent[checkview].nhanxet.push({
      id: Math.floor(Math.random() * 1000),
      use: use_comment,
      nhanxet: comment,
    });
    localStorage.setItem("content", JSON.stringify(datacontent));

    form_nhanxet.input_comment.value = "";
  }

  hienthi_cmt();
  /**
   *
   */
  //các cmt của người dung hiện tại sẽ hiện phan sua xoa
  use_comment = datause[checktrangthai].ten;
  use_comment_tach = [];
  use_comment_tach = use_comment.split(" ");
  use_comment = use_comment_tach.join("");
  class_sua_xoa = document.getElementsByClassName(`${use_comment}`);
  // console.log(class_sua_xoa);
  // console.log(use_comment);
  // console.log(name_sua_xoa);
  for (let i = 0; i < class_sua_xoa.length; i++) {
    class_sua_xoa[i].style.display = "inline";
  }
};
/**
 *
 *
 */
//==========chức năng xóa cmt cho từng use
let click_box_nhanxet = document.getElementById("box_nhanxet");
click_box_nhanxet.onclick = function (event) {
  // console.log(event.target.id);
  // console.log(event.target.classList.contains("xoa"));
  if (event.target.classList.contains("xoa")) {
    let idxoa = event.target.id;
    let xoacommentuse = -1;
    for (i = 0; i < datacontent[checkview].nhanxet.length; i++) {
      if (datacontent[checkview].nhanxet[i].id == idxoa) {
        xoacommentuse = i;
        // console.log(xoacommentuse);
        break;
      }
    }

    if (xoacommentuse != -1) {
      // console.log(datacontent[checkview].nhanxet);
      datacontent[checkview].nhanxet.splice(xoacommentuse, 1);

      hienthi_cmt();
      //các cmt của người dung hiện tại sẽ hiện phan sua xoa
      use_comment = datause[checktrangthai].ten;
      use_comment_tach = [];
      use_comment_tach = use_comment.split(" ");
      use_comment = use_comment_tach.join("");
      class_sua_xoa = document.getElementsByClassName(`${use_comment}`);
      // console.log(class_sua_xoa);
      // console.log(use_comment);
      // console.log(name_sua_xoa);
      for (let i = 0; i < class_sua_xoa.length; i++) {
        class_sua_xoa[i].style.display = "inline";
      }
      localStorage.setItem("content", JSON.stringify(datacontent));

      swal("Đã xóa bình luận của bạn", "Cảm ơn bạn", "success");
    }
  }
  /**
   *
   *
   */
  //========chức năng sua cmt cho từng use

  if (event.target.classList.contains("sua")) {
    let idsua = event.target.id;
    let suacomentuse = -1;
    for (i = 0; i < datacontent[checkview].nhanxet.length; i++) {
      if (datacontent[checkview].nhanxet[i].id == idsua) {
        suacomentuse = i;
        // console.log(suacomentuse);
        break;
      }
    }

    if (suacomentuse != -1) {
      // console.log(datacontent[checkview].nhanxet[suacomentuse]);
      // console.log(event.target.parentElement.parentElement.innerHTML);
      event.target.parentElement.parentElement.innerHTML = ` <form id="form_sua" action="">
      <input class="sua_coment" name="sua_coment" placeholder="nhập vào thay đổi của bạn" type="text" />
      <button class="xacnhan">xác nhân</button>
      </form>
     `;
      let form_sua = document.getElementById("form_sua");

      form_sua.onsubmit = function (event) {
        event.preventDefault();

        let input_sua = form_sua.sua_coment.value;
        if (input_sua == "") {
          swal("Bạn chưa nhập nội dung", "Hãy nhập nội dung", "success");
        } else {
          datacontent[checkview].nhanxet[suacomentuse].nhanxet = input_sua;

          localStorage.setItem("content", JSON.stringify(datacontent));
          console.log(input_sua);
          console.log(datacontent[checkview].nhanxet);
          hienthi_cmt();
          // các cmt của người dung hiện tại sẽ hiện phan sua xoa
          use_comment = datause[checktrangthai].ten;
          use_comment_tach = [];
          use_comment_tach = use_comment.split(" ");
          use_comment = use_comment_tach.join("");
          class_sua_xoa = document.getElementsByClassName(`${use_comment}`);
          console.log(class_sua_xoa);
          console.log(use_comment);
          console.log(name_sua_xoa);
          for (let i = 0; i < class_sua_xoa.length; i++) {
            class_sua_xoa[i].style.display = "inline";
          }

          swal("Đã sửa bình luận của bạn", "Cảm ơn bạn", "success");
        }
      };
    }
  }
};
/**
 *
 *
 */
//==========chức năng lưu của view
let luu_view = document.getElementById("luu_view");
luu_view.onclick = function () {
  //check xem đã có trong bộ sưu tập chưa
  let suutapcheck = -1;
  for (i = 0; i < datause[checktrangthai].bosuutap.length; i++) {
    if (datause[checktrangthai].bosuutap[i] == idview) {
      swal("Đã có trong bộ sưu tập của bạn");
      suutapcheck = i;
      break;
    }
  }
  if (suutapcheck == -1) {
    datause[checktrangthai].bosuutap.push(idview);
    localStorage.setItem("datause", JSON.stringify(datause));
    swal("Đã thêm vào bộ sưu tập của bạn", "Cảm ơn bạn", "success");
  }
};
//===============kết thúc lưu view
/**
 *
 *
 */
//chức năng theo dõi

checktheodoi = -1;
let tong_theo_doi = document.getElementById("tong_theo_doi");
let theodoi_btn = document.getElementById("theodoi");
// console.log(datacontent[checkview].tacgia.theodoi); //ra đc mảng ds những người đã theo dõi
for (let i = 0; i < datacontent[checkview].tacgia.theodoi.length; i++) {
  // console.log(datacontent[checkview].tacgia.theodoi[i]);
  // console.log(datause[checktrangthai]);

  if (datacontent[checkview].tacgia.theodoi[i] == datause[checktrangthai].ten) {
    checktheodoi = i;
    break;
  }
}
if (checktheodoi != -1) {
  theodoi_btn.innerHTML = "Đã theo dõi";
  usetheodoi = true;
} else {
  usetheodoi = false;
}

theodoi_btn.onclick = function () {
  if (
    datause[checktrangthai].tacgia.tacgia !=
    datacontent[checkview].tacgia.tacgia
  ) {
    if (usetheodoi == false) {
      theodoi_btn.innerHTML = "Đã theo dõi";
      datacontent[checkview].tacgia.theodoi.push(datause[checktrangthai].ten);
      datacontent[checkview].tacgia.avatar.push({
        use_theo_doi: datause[checktrangthai].ten,
        avatar: datause[checktrangthai].avatar,
      });
      usetheodoi = true;
      localStorage.setItem("content", JSON.stringify(datacontent));
      //update lại dữ liệu của tác giả (fix bug tác giả), check lấy thông tin của tác giả
      //trong danh sách use tìm ra use của tác giả để cập nhật
      console.log("datatacgia", datacontent[checkview].tacgia);
      datause[vitriusetacgia].tacgia = datacontent[checkview].tacgia;
      localStorage.setItem("datause", JSON.stringify(datause));
      tong_theo_doi.innerHTML = `người theo dõi: ${datacontent[checkview].tacgia.theodoi.length}`;
    } else {
      theodoi_btn.innerHTML = "theo dõi";
      for (let i = 0; i < datacontent[checkview].tacgia.theodoi.length; i++) {
        // console.log(datacontent[checkview].tacgia.theodoi[i]);
        // console.log(datause[checktrangthai]);

        if (
          datacontent[checkview].tacgia.theodoi[i] ==
          datause[checktrangthai].ten
        ) {
          datacontent[checkview].tacgia.theodoi.splice(i, 1);
          datacontent[checkview].tacgia.avatar.splice(i, 1);
          usetheodoi = false;
          localStorage.setItem("content", JSON.stringify(datacontent));
          //update lại dữ liệu của tác giả (fix bug tác giả), check lấy thông tin của tác giả
          //trong danh sách use tìm ra use của tác giả để cập nhật
          datause[vitriusetacgia].tacgia = datacontent[checkview].tacgia; //fix xong bug 1 tác giả đăng nhiều bài lượt theo dõi ko đc cập nhật
          localStorage.setItem("datause", JSON.stringify(datause));
          tong_theo_doi.innerHTML = `người theo dõi: ${datacontent[checkview].tacgia.theodoi.length}`;
        }
      }
    }
  } else {
    swal("Bạn không thể theo dõi chính mình");
  }
};
///phần hiện thị nội dung bai viết tương tự bên dưới
function renderimg() {
  imagenes.innerHTML = "";

  for (i = 0; i < datacontent.length; i++) {
    imagenes.innerHTML =
      imagenes.innerHTML +
      ` <div class="card-image" id="${datacontent[i].id}" >
      <a  target="_self" href="http://127.0.0.1:5500/view/view.html"> <img id="${datacontent[i].id}" src="${datacontent[i].link}" alt="" class="img"  /><button
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
//============== mở chức năng lưu
imagenes.onclick = function (event) {
  // console.log(event.target.id);
  localStorage.setItem("viewid", event.target.id);
  // console.log(event.target.classList.contains("btn_luu"));
  if (event.target.classList.contains("btn_luu")) {
    // console.log(event.target.parentElement.parentElement.id);

    id = event.target.parentElement.parentElement.id;
    //check xem đã có trong bộ sưu tập chưa
    let suutapcheck = -1;
    for (i = 0; i < datause[checktrangthai].bosuutap.length; i++) {
      if (datause[checktrangthai].bosuutap[i] == id) {
        swal("Đã có trong bộ sưu tập của bạn");
        suutapcheck = i;
        break;
      }
    }
    if (suutapcheck == -1) {
      datause[checktrangthai].bosuutap.push(id);
      localStorage.setItem("datause", JSON.stringify(datause));
      swal("Đã thêm vào bộ sưu tập của bạn", "Cảm ơn bạn", "success");
    }
  }
};
////=======================kết thúc lưu,
////===============mở chức năng đăng xuất
dangxuat.onclick = function () {
  datause[checktrangthai].trangthai = "dangxuat";

  localStorage.setItem("datause", JSON.stringify(datause));
  swal("Đăng xuất thành công", "Cảm ơn bạn", "success");
  setTimeout(
    " window.location.href = '  http://127.0.0.1:5500/signin_signup/dang%20nhap.html';",
    2000
  );
};
//=====================kết thúc chức năng đăng xuất
