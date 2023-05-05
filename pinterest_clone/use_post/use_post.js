let datacontent = JSON.parse(localStorage.getItem("content"));
let datause = JSON.parse(localStorage.getItem("datause"));
let input = document.getElementById("file-input");
let image = document.getElementById("img-preview");
let save = document.getElementById("save");
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
input.onchange = function () {
  let reader = new FileReader();
  reader.readAsDataURL(input.files[0]);

  console.log(reader);
  reader.onloadend = function () {
    console.log(reader.result);
    image.setAttribute("src", reader.result);
    save.onclick = function () {
      let id = Math.floor(Math.random() * 100) + 30;
      datacontent.push({
        id: id,
        link: reader.result,
        tacgia: {
          tacgia: datause[checktrangthai].ten,
          theodoi: [],
          avatar: [],
        },
        nhanxet: [],
      });
      console.log(id);
      datause[checktrangthai].bosuutap.unshift(id);
      localStorage.setItem("content", JSON.stringify(datacontent));
      localStorage.setItem("datause", JSON.stringify(datause));

      console.log(datacontent);
      swal("Tạo thành công", "Cảm ơn bạn", "success");
      setTimeout(
        " window.location.href = '  http://127.0.0.1:5500/save/save.html';",
        500
      );
    };
  };
};
