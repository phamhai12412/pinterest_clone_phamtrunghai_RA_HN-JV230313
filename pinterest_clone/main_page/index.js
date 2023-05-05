let datacontent = JSON.parse(localStorage.getItem("content"));
let datause = JSON.parse(localStorage.getItem("datause"));
let input_luu = document.getElementById("input_luu");
let dangxuat = document.getElementById("dangxuat");
let imagenes = document.getElementById("imagenes");
let input_seach = document.getElementById("input");
///==========mở chức năng load dữ liệu từ data
function renderimg(datacontent) {
  imagenes.innerHTML = "";

  for (let i = 0; i < datacontent.length; i++) {
    imagenes.innerHTML += ` <div class="card-image" id="${datacontent[i].id}" >
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
renderimg(datacontent);
//==================hoàn thành load dữ liệu từ data ra trang chủ
/**
 */
// ============mở chưc năng tìm kiếm
input_seach.onkeyup = function (event) {
  if (event.key === "Enter") {
    let key = event.target.value;

    let a = [];
    for (let i = 0; i < datacontent.length; i++) {
      if (key == datacontent[i].tacgia.tacgia) {
        a.push(datacontent[i]);
      } else {
        continue;
      }
    }

    localStorage.setItem("seach", JSON.stringify(a));
    window.location.href = "http://127.0.0.1:5500/seach/seach.html";
  }
};

// ===================kết thúc chức năng tìm kiếm
/**
 */
//kiểm tra đăng nhập
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
//=====================kết thúc kiểm tra đăng nhập
/**
 */
//==================mở chức năng view
imagenes.onclick = function (event) {
  localStorage.setItem("viewid", event.target.id);
  ////============== kết thúc chức năng view
  /**
   */
  //============== mở chức năng lưu
  if (event.target.classList.contains("btn_luu")) {
    id = event.target.parentElement.parentElement.id;
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
/**
 */
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
