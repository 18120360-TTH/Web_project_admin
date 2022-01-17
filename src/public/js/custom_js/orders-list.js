document.addEventListener('DOMContentLoaded', function () {
    let order_id;
    const submitForm = document.forms['submit-form'];
    let btnUpdateOrderStatus = document.getElementById("btn-update-order-status");
    //let btnUnBlockCustomer = document.getElementById("btn-unblock-user");

    $('#updateConfirm').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        //customerUsername = button.data('id')
        order_id = button.attr('data-id')
    });

    btnUpdateOrderStatus.onclick = function () {
        submitForm.action = '/orders/update-status/' + order_id;
        submitForm.submit();
    }

    /* btnUnBlockCustomer.onclick = function () {
        submitForm.action = '/customer/unblock/' + customerUsername;
        submitForm.submit();
    } */
});