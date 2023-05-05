let datacontent = JSON.parse(localStorage.getItem("content"));
let datause = JSON.parse(localStorage.getItem("datause"));
let imagenes = document.getElementById("imagenes");
let imagenes_tuongtu = document.getElementById("imagenes_tuongtu");
let dangxuat = document.getElementById("dangxuat");
let btn_chinhhoso = document.getElementById("btn_chinhhoso");
let thongbao = document.getElementById("thongbao");
let theodoi = document.getElementById("theodoi");
let name_use = document.getElementById("name_use");
let img_avatar = document.getElementById("img_avatar");
//=======kiểm tra trạng thái đăng nhập lấy vị trí của use đang đang nhập trong data use
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
 */
// chức năng xem người theo dõi
name_use.innerHTML = datause[checktrangthai].ten;
img_avatar.setAttribute("src", datause[checktrangthai].avatar);
theodoi.innerHTML = "";
if (datause[checktrangthai].tacgia.theodoi.length == 0) {
  theodoi.innerHTML = "Follower";
} else {
  theodoi.innerHTML =
    `Follower: ${datause[checktrangthai].tacgia.theodoi.length}` +
    `
    <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
          Danh sách những người theo dõi bạn
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="full_theodoi" class="modal-body full_theodoi">
       

   
      
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Thoát</button>
        </div>
      </div>
    </div>
  </div>`;
  //cập nhật lại avatar use theo dõi,fix lỗi use theo dõi đổi avatar
  for (let i = 0; i < datause[checktrangthai].tacgia.avatar.length; i++) {
    for (let j = 0; j < datause.length; j++) {
      if (
        datause[checktrangthai].tacgia.avatar[i].use_theo_doi == datause[j].ten
      ) {
        datause[checktrangthai].tacgia.avatar[i].avatar = datause[j].avatar;
      }
    }
  }
  let full_theodoi = document.getElementById("full_theodoi");

  full_theodoi.innerHTML = "";
  console.log(datause[checktrangthai].tacgia.avatar.length);
  for (let i = 0; i < datause[checktrangthai].tacgia.avatar.length; i++) {
    full_theodoi.innerHTML =
      full_theodoi.innerHTML +
      `  <div> <img 
class="img_avatar"
src="${datause[checktrangthai].tacgia.avatar[i].avatar}"
alt=""
/> <span>${datause[checktrangthai].tacgia.avatar[i].use_theo_doi}</span> </div>`;
  }
}
//================kết thúc chức năng người theo dõi
/**
 *
 *
 *
 */
//=======hiện thị bộ sưu tập
function renderimg() {
  if (datause[checktrangthai].bosuutap.length == 0) {
    imagenes.innerHTML = "";
    swal("bộ sưu tập của bạn đang rỗng, dưới đây là 1 số gợi ý cho bạn");
    thongbao.style.display = "none";
  } else {
    imagenes.innerHTML = "";
    thongbao.style.display = "block";
    for (let i = 0; i < datause[checktrangthai].bosuutap.length; i++) {
      let id = datause[checktrangthai].bosuutap[i];
      for (let j = 0; j < datacontent.length; j++) {
        if (id == datacontent[j].id) {
          imagenes.innerHTML =
            imagenes.innerHTML +
            ` <div class="card-image" id="${datacontent[j].id}" >
      <a  target="_self" href="http://127.0.0.1:5500/view/view.html"> <img id="${datacontent[j].id}" src="${datacontent[j].link}" alt="" class="img"  /><button
         class="button"
       >
         <a href="#" class="btn_xoa" >Xóa</a></button
       ><span class="material-symbols-outlined upload">upload</span
       ><span class="material-symbols-outlined menu_btn_img"
         >more_horiz</span
       >
     </a> `;
        }
      }
    }
  }
}
renderimg();
//===========hoàn thành hiện thị bộ sưu tập
/**
 */
//==========hiện thị các bài viết tương tự
imagenes_tuongtu.innerHTML = "";

for (let i = datacontent.length - 1; i >= 0; i--) {
  imagenes_tuongtu.innerHTML =
    imagenes_tuongtu.innerHTML +
    ` <div class="card-image" id="${datacontent[i].id}" >
        <a  target="_self" href="http://127.0.0.1:5500/view/view.html"> <img id="${datacontent[i].id}" src="${datacontent[i].link}" alt="" class="img"  /><button
           class="button btn_luu"
         >
           <a href="#" class="btn_luu" >Lưu</a></button
         ><span class="material-symbols-outlined upload">upload</span
         ><span class="material-symbols-outlined menu_btn_img"
           >more_horiz</span
         >
       </a> `;
}
//hoàn thành hiện thị các bài viết tương tự
/**
 */
//==================mở chức năng view trong bộ sưu tập
imagenes.onclick = function (event) {
  localStorage.setItem("viewid", event.target.id);
  //=================kết thúc chức năng view trong bộ sưu tập
  /**
   */
  // thêm chức năng xóa trong bộ sưu tập
  if (event.target.classList.contains("btn_xoa")) {
    id = event.target.parentElement.parentElement.id;
    //check xem đã có trong bộ sưu tập chưa
    let suutapxoacheck = -1;
    for (i = 0; i < datause[checktrangthai].bosuutap.length; i++) {
      if (datause[checktrangthai].bosuutap[i] == id) {
        suutapxoacheck = i;
        break;
      }
    }
    if (suutapxoacheck != -1) {
      datause[checktrangthai].bosuutap.splice(suutapxoacheck, 1);
      localStorage.setItem("datause", JSON.stringify(datause));
      swal("Đã xóa khỏi bộ sưu tập của bạn", "Cảm ơn bạn", "success");
    }
    renderimg();
  }
};
////=======================kết thúc xóa
/**
 */
//==================mở chức năng view bài viết tương tự
imagenes_tuongtu.onclick = function (event) {
  localStorage.setItem("viewid", event.target.id);
  //=================kết thúc chức năng view bài viết tương tự
  /**
   */
  //mở chức năng lưu bài viết tương tự
  if (event.target.classList.contains("btn_luu")) {
    id = event.target.parentElement.parentElement.id;

    let suutapcheck = -1;
    for (i = 0; i < datause[checktrangthai].bosuutap.length; i++) {
      if (datause[checktrangthai].bosuutap[i] == id) {
        suutapcheck = i;
        swal("Đã có trong bộ sưu tập của bạn");
        renderimg();
      }
    }
    if (suutapcheck == -1) {
      datause[checktrangthai].bosuutap.push(id);
      localStorage.setItem("datause", JSON.stringify(datause));
      swal("Đã thêm vào bộ sưu tập của bạn", "Cảm ơn bạn", "success");
    }
    renderimg();
  }
};
//=================kết thúc chức năng lưu bài viết tương tự
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
/**
 */
// chức năng  chỉnh sửa hồ sơ
btn_chinhhoso.onclick = function (event) {
  name_use.innerHTML = `   <form  id="edit_form" class="form">
  <span class="title">Chỉnh sửa hồ sơ</span>
  <label class="label">Email</label>
  <input type="email"  name="email" value="${datause[checktrangthai].email}" class="input">
  <label class="label">Mật khẩu</label>
  <input type="password" name="password" value="${datause[checktrangthai].matkhau}" class="input">
  <label class="label">Ngày sinh</label>
  <input type="text" name="ngaysinh" value="${datause[checktrangthai].ngaysinh}" class="input">
  <button type="submit" class="submit">Thay đổi</button>
</form>`;

  let edit_form = document.getElementById("edit_form");

  edit_form.onsubmit = function (event) {
    event.preventDefault();
    let email_edit = edit_form.email.value;
    let password_edit = edit_form.password.value;
    let ngaysinh_edit = edit_form.ngaysinh.value;
    datause[checktrangthai].email = email_edit;
    datause[checktrangthai].matkhau = password_edit;
    datause[checktrangthai].ngaysinh = ngaysinh_edit;

    localStorage.setItem("datause", JSON.stringify(datause));
    location.reload();
  };
};
//chức năng thay avatar
img_avatar.onclick = function () {
  name_use.innerHTML = `

  <label for="file-input">Upload Image</label>
  <input accept="image/*" type="file" id="file-input" />
  <button id="thoat">Thoát</button>`;
  let thoat = document.getElementById("thoat");
  thoat.onclick = function () {
    location.reload();
  };
  const input = document.getElementById("file-input");
  input.onchange = function () {
    let reader = new FileReader();
    reader.readAsDataURL(input.files[0]);

    console.log(reader);
    reader.onloadend = function () {
      console.log(reader.result);
      datause[checktrangthai].avatar = reader.result;
      localStorage.setItem("datause", JSON.stringify(datause));
      location.reload();
    };
  };
};
