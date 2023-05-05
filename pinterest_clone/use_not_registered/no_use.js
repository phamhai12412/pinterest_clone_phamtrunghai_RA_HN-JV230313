let datacontent = JSON.parse(localStorage.getItem("content"));
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
  console.log(event.target.id);

  localStorage.setItem("viewid", event.target.id);

  // console.log(event.target);
  if (event.target.classList.contains("btn_luu")) {
    console.log("ds");
    swal("Bạn hãy đăng nhập để sử dụng chức năng");
  }
};
