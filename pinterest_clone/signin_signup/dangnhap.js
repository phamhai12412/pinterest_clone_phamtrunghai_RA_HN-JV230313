let datause = JSON.parse(localStorage.getItem("datause"));
let admin = JSON.parse(localStorage.getItem("admin"));

let dangnhap = document.getElementById("dangnhap");

console.log(datause);
// console.log(datause[0].ten);
dangnhap.onsubmit = function (event) {
  event.preventDefault();
  let name = dangnhap.name.value;
  // console.log(name);
  //   console.log(ngaysinh);
  let matkhau = dangnhap.matkhau.value;
  //   console.log(matkhau);
  if (name == admin.name && matkhau == admin.matkhau) {
    swal("Đăng nhập thành công", "xin chào admin", "success");
    setTimeout(
      " window.location.href = '  http://127.0.0.1:5500/admin/admin.html';",
      500
    );
  } else {
    let check = -1;

    for (let i = 0; i < datause.length; i++) {
      if (name == datause[i].ten && matkhau == datause[i].matkhau) {
        check = i;
        // console.log(name);
      } else {
        datause[i].trangthai = "dangxuat";
      }
    }
    if (check == -1) {
      // console.log("dsfhkdsdf");
      swal(
        "Oops!",
        "Kiểm tra lại đăng nhập, nếu bạn chưa có tài khoản nhớ đăng kí",
        "error"
      );
    } else if (datause[check].trangthai == "khoa") {
      swal("Oops!", "Tài khoản đã bị khóa, hãy liên hệ admin", "error");
    } else {
      datause[check].trangthai = "dangnhap";
      console.log(name);
      localStorage.setItem("datause", JSON.stringify(datause));
      swal("Đăng nhập thành công", "Cảm ơn bạn", "success");
      setTimeout(
        " window.location.href = '  http://127.0.0.1:5500/main_page/index.html';",
        500
      );

      console.log(datause);
    }
  }
};
