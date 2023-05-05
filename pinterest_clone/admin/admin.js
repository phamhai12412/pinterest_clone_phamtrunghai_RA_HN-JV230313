let datause = JSON.parse(localStorage.getItem("datause"));
let admin = JSON.parse(localStorage.getItem("admin"));
let table = document.getElementById("table");

//=======lấy dữ liệu từ data sử lý in ra màn hình thông tin của các use
table.innerHTML = "";

table.innerHTML = `

<tr>
<th scope="col">#</th>
<th scope="col">username</th>
<th scope="col">password</th>
<th scope="col">follower</th>
<th scope="col">status</th>
<th></th>
</tr>`;
// console.log(table.innerHTML);
for (let i = 0; i < datause.length; i++) {
  table.innerHTML =
    table.innerHTML +
    ` <tr id="${datause[i].id}">
    <th scope="row">${i + 1}</th>
    <td>${datause[i].ten}</td>
    <td>${datause[i].matkhau}</td>
    <td>${datause[i].tacgia.theodoi.length}</td>
    <td>${datause[i].trangthai}</td>
    <td>
      <button class="btn btn-success btn-update">Update</button>
      <button class="btn btn-danger btn-delete">Delete</button>
    </td>
  </tr>`;
}
//=======kết thúc phần xử lý data cơ bản
//=======phần delete use
table.onclick = function (event) {
  //   console.log(event.target.parentElement.parentElement.id);
  if (event.target.classList.contains("btn-delete")) {
    let id = event.target.parentElement.parentElement.id; // id
    for (i = 0; i < datause.length; i++) {
      // console.log(datause[i].id);
      // console.log( event.target.id);
      if (datause[i].id == id) {
        datause.splice(i, 1);
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
    let check = -1;
    for (let i = 0; i < datause.length; i = i + 1) {
      if (datause[i].id === Number(id)) {
        check = i;
      }
    }
    if (check > -1) {
      let update = datause[check];
      console.log(update);
      td.innerHTML = `<tr id="${update.id}">
                            <th scope="row"></th>
                            <td>${update.ten}</td>
                            <td><input id="input" type="text" value="${update.matkhau}"/></td>
                            <td>${update.tacgia.theodoi.length}</td>
                            <td><input id="input_trangthai" type="text" value="${update.trangthai}"/></td>

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
      let input_trangthai = document.getElementById("input_trangthai");
      btn_confirm.onclick = function () {
        let update_matkhau = input.value;
        let update_trangthai = input_trangthai.value;
        datause[check].matkhau = update_matkhau;
        datause[check].trangthai = update_trangthai;

        localStorage.setItem("datause", JSON.stringify(datause));
        location.reload();
      };
    }
  }
};
let btn_exit = document.getElementById("btn_exit");
btn_exit.onclick = function () {
  window.location.href = "http://127.0.0.1:5500/signin_signup/dang%20nhap.html";
};
let btn_admin = document.getElementById("btn_admin");
let edit = document.getElementById("edit");
btn_admin.onclick = function () {
  edit.innerHTML = `   <form  id="edit_form" class="form">
    <span class="title">Chỉnh sửa tài khoản admin</span>
    <label class="label">name</label>
    <input type="text"  name="name" value="${admin.name}" class="input">
    <label class="label">password</label>
    <input type="password" name="password" value="${admin.matkhau}" class="input">
    <label class="label">Enter password</label>
    <input type="password" name="password_check" value="${admin.matkhau}" class="input">
    <button type="submit" class="submit">Thay đổi</button>
  </form>`;
  let edit_form = document.getElementById("edit_form");

  edit_form.onsubmit = function (event) {
    event.preventDefault();
    let name = edit_form.name.value;
    let password_edit = edit_form.password.value;
    let password_check = edit_form.password_check.value;
    if (password_check == password_edit) {
      admin.name = name;
      admin.matkhau = password_edit;
      localStorage.setItem("admin", JSON.stringify(admin));
      swal("Thay đổi đã được cập nhật", "Cảm ơn bạn", "success");
      setTimeout(
        " window.location.href = 'http://127.0.0.1:5500/admin/admin.html';",
        500
      );
    } else {
      swal("Vui lòng kiểm tra lại, xin kiểm tra lại");
      setTimeout(
        " window.location.href = 'http://127.0.0.1:5500/admin/admin.html';",
        1300
      );
    }
  };
};
