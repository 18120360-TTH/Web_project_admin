// const ProductServices = require("../../../app/controllers/ProductServices")
// const authors = require("../../../app/models/authors")

// Upload images preview
formFileSm1.onchange = evt => {
    const [file] = formFileSm1.files
    if (file) {
        img_01.src = URL.createObjectURL(file)
    }
}
formFileSm2.onchange = evt => {
    const [file] = formFileSm2.files
    if (file) {
        img_02.src = URL.createObjectURL(file)
    }
}
formFileSm3.onchange = evt => {
    const [file] = formFileSm3.files
    if (file) {
        img_03.src = URL.createObjectURL(file)
    }
}
formFileSm4.onchange = evt => {
    const [file] = formFileSm4.files
    if (file) {
        img_04.src = URL.createObjectURL(file)
    }
}
/*  $(document).ready(function () {
    Title.oninput = evt => {
        console.log("onInputTitle !!!!")
    }
});  */
/* $(document).ready( function() {
    $('#Author').on('input',function(event) {
        console.log("onInputTitle !!!!")
    });
}); */

//document.addEventListener('DOMContentLoaded', function () {
    //let bookID;
    //const deleteForm = document.forms['delete-product-form'];
    //let btnDeleteProduct = document.getElementById("btn-delete-product");

  //  $('#Author').on('input',function(event){
    //    console.log("onAuthorInputTitle !!!!")
     // });
/* btnDeleteProduct.onclick = function () {
    deleteForm.action = '/products/delete/' + bookID;
    deleteForm.submit();
} */
//});
//Basic info validation
/* $('#Title').on('input',function(){
    console.log("onInputTitle !!!!")
  }); */
/* document.addEventListener('DOMContentLoaded', function () {
    $('#Title').on('input',function(){
        console.log("onInputTitle !!!!")
      });
}); */
/* Title.onchange = evt => {
   console.log("onchange ACTIVE")
   if (document.getElementById('Title').value === ""){
       document.getElementById('TitleValidation').innerHTML = "Please enter title of book"
   }
   else{
       document.getElementById('TitleValidation').innerHTML = "Okay"
   }
}  */

/* document.addEventListener('DOMContentLoaded', function () {
    let bookID;
    let TitleObject = document.getElementById("Title");

    TitleObject.onchange = function () {
        console.log("onchange ACTIVE")
        if (document.getElementById('Title').value === ""){
            document.getElementById('TitleValidation').innerHTML = "Please enter title of book 2"
        }
        else{
            document.getElementById('TitleValidation').innerHTML = "Okay"
        }
    }
}); */
/* $('#Title').click(function(){
    console.log("CLICK !!!!!")
} */
/* function TitleCheck(){
    console.log("PRINTFADSADASDsdasd!!!!!!!!!!!!!!!!!!!!")
    if (document.getElementById('Title').value  === ""){
        document.getElementById('TitleValidation').innerHTML = "Please enter title of book 2"
    }
} */
/* Author.onchange
isbn.onchange
price.onchange
language.onchange */