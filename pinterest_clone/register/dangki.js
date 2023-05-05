let datause = JSON.parse(localStorage.getItem("datause"));
let dangki = document.getElementById("dangki");
dangki.onsubmit = function (event) {
  event.preventDefault();
  let name = dangki.name.value;
  let ngaysinh = dangki.ngaysinh.value;
  let matkhau = dangki.matkhau.value;
  let check = -1;

  for (let i = 0; i < datause.length; i++) {
    if (name == datause[i].ten) {
      check = i;
    }
  }
  if (check != -1) {
    swal("Oops!", "Tài khoản đã tồn tại, hãy đăng nhập", "error");
  } else if (name.length > 5 && matkhau > 5) {
    datause.push({
      id: Math.floor(Math.random() * 1000),
      ten: name,
      matkhau: matkhau,
      bosuutap: [],
      dangtheodoi: [],
      ngaysinh: ngaysinh,
      gioitinh: "",
      email: "",
      trangthai: "dangxuat",
      tacgia: {
        tacgia: name,
        theodoi: [],
        avatar: [],
      },
      avatar: "/img_avarta_use/avatar_an_danh.png",
      tinnhan: [],
    });
    localStorage.setItem("datause", JSON.stringify(datause));
    swal("Đăng ký thành công", "Cảm ơn bạn", "success");
    setTimeout(
      " window.location.href = 'http://127.0.0.1:5500/signin_signup/dang%20nhap.html';",
      500
    );
  } else {
    swal("Oops!", "tên đăng nhập hoặc mật khẩu của bạn quá ngắn", "error");
  }
};
