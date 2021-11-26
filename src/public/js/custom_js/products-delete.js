document.addEventListener('DOMContentLoaded', function () {
    let bookID;
    const deleteForm = document.forms['delete-product-form'];
    let btnDeleteProduct = document.getElementById("btn-delete-product");

    $('#Delete-Modal-Center').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        bookID = button.data('id')
        console.log(bookID);
    });

    btnDeleteProduct.onclick = function () {
        deleteForm.action = '/products/delete/' + bookID;
        deleteForm.submit();
    }
});