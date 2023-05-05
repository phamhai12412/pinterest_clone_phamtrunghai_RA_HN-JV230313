let datause = JSON.parse(localStorage.getItem("datause"));
let table = document.getElementById("table");
let ten_use = document.getElementById("ten_use");
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
ten_use.innerHTML = `xin chào:${datause[checktrangthai].ten}`;
//in ra tin nhắn
table.innerHTML = "";

table.innerHTML = `

<tr>
<th scope="col">#</th>
<th scope="col">username</th>
<th scope="col">messenger</th>
<th></th>
</tr>`;
// console.log(table.innerHTML);
for (let i = 0; i < datause[checktrangthai].tinnhan.length; i++) {
  table.innerHTML =
    table.innerHTML +
    ` <tr id="${datause[checktrangthai].tinnhan[i].id}">
    <th scope="row">${i + 1}</th>
    <td>${datause[checktrangthai].tinnhan[i].use_gui}</td>
    <td>${datause[checktrangthai].tinnhan[i].noidung}</td>
    <td>
      <button class="btn btn-success btn-update">Trả lời</button>
      <button class="btn btn-danger btn-delete">Delete</button>
    </td>
  </tr>`;
}
//=======kết thúc phần xử lý data cơ bản
//=======phần delete tin nhắn
table.onclick = function (event) {
  console.log(event.target.parentElement.parentElement.id);

  if (event.target.classList.contains("btn-delete")) {
    let id = event.target.parentElement.parentElement.id; // id
    for (i = 0; i < datause[checktrangthai].tinnhan.length; i++) {
      if (datause[checktrangthai].tinnhan[i].id == id) {
        datause[checktrangthai].tinnhan.splice(i, 1);
        console.log(datause);
        localStorage.setItem("datause", JSON.stringify(datause));
        location.reload();
      }
    }
  }

  if (event.target.classList.contains("btn-update")) {
    console.log(event.target.parentElement.parentElement.id);
    let id = event.target.parentElement.parentElement.id; // id
    let td = event.target.parentElement.parentElement;
    //xác định vị trí tin nhắn trong khối dữ liệu chứa tn của use đang đăng nhập
    let check_tn = -1;
    for (let i = 0; i < datause[checktrangthai].tinnhan.length; i = i + 1) {
      if (datause[checktrangthai].tinnhan[i].id === Number(id)) {
        check_tn = i;
      }
    }
    if (check_tn != -1) {
      let traloi = datause[checktrangthai].tinnhan[check_tn];

      td.innerHTML = `<tr >
                            <th scope="row"></th>
                            <td>${traloi.use_gui}</td>
                            <td><input id="input" type="text" placeholder="nhập nội dung"/></td>
                            <td>
                                <button id="btn-confirm" class="btn btn-info btn-confirm">Confirm</button>
                                <button id="btn-cancel" class="btn btn-danger btn-cancel">Cancel</button>
                            </td>
                        </tr>`;
      let btn_confirm = document.getElementById("btn-confirm");
      let btn_cancel = document.getElementById("btn-cancel");
      btn_cancel.onclick = function () {
        location.reload();
      };
      let input = document.getElementById("input");
      btn_confirm.onclick = function () {
        let noidung_tn = input.value;
        //tìm vị trí use muốn trả lời tn để gửi tn
        let check_gui_tn = -1;
        for (let i = 0; i < datause.length; i++) {
          if (traloi.use_gui == datause[i].ten) {
            check_gui_tn = i;
          }
        }
        datause[check_gui_tn].tinnhan.push({
          id: Math.floor(Math.random() * 1000),
          use_gui: datause[checktrangthai].ten,
          noidung: noidung_tn,
        });
        localStorage.setItem("datause", JSON.stringify(datause));
        location.reload();
      };
    }
  }
};

let btn_exit = document.getElementById("btn_exit");
btn_exit.onclick = function () {
  window.location.href = "http://127.0.0.1:5500/main_page/index.html";
};
let btn_tao_tn = document.getElementById("btn_tao_tn");
let edit = document.getElementById("edit");
btn_tao_tn.onclick = function () {
  edit.innerHTML = `   <form  id="edit_form" class="form">
    <span class="title">Soạn tin nhắn</span>
    <label class="label">name</label>
    <input type="text"  name="name" class="input">
    <label class="label">nội dung</label>
    <input type="text" name="noidung" class="input">
    <button type="submit" class="submit">Gửi</button>
  </form>`;
  let edit_form = document.getElementById("edit_form");

  edit_form.onsubmit = function (event) {
    event.preventDefault();
    let name = edit_form.name.value;
    let noidung = edit_form.noidung.value;
    //check xem nhập tên người gửi có trong danh sách use ko
    let check = -1;
    for (let i = 0; i < datause.length; i++) {
      if (name == datause[i].ten) {
        check = i;
      }
    }
    if (check == -1) {
      swal("Tài khoản bạn muốn gửi tin nhắn ko tồn tại, xin kiểm tra lại");
    } else {
      datause[check].tinnhan.push({
        id: Math.floor(Math.random() * 1000),
        use_gui: datause[checktrangthai].ten,
        noidung: noidung,
      });
      localStorage.setItem("datause", JSON.stringify(datause));
      location.reload();
    }
  };
};
