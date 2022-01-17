document.addEventListener('DOMContentLoaded', function () {
    let customerUsername;
    const submitForm = document.forms['submit-form'];
    let btnBlockCustomer = document.getElementById("btn-block-user");
    let btnUnBlockCustomer = document.getElementById("btn-unblock-user");

    $('#blockConfirm').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        //customerUsername = button.data('id')
        customerUsername = button.attr('data-id')
    });

    btnBlockCustomer.onclick = function () {
        submitForm.action = '/customer/block/' + customerUsername;
        submitForm.submit();
    }

    btnUnBlockCustomer.onclick = function () {
        submitForm.action = '/customer/unblock/' + customerUsername;
        submitForm.submit();
    }
});