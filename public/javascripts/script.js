<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

function addToCart(proId){
    $.ajax({
        url:'/add-to-cart/'+proId,
        method:'get',
        success:(response)=>{
            if (response.status) {
                let count = $('#cart-count').html()
                count = parseInt(count)+1
                $('#cart-count').html(count)
            }
        }
    })
}

function changeQuantity(cartId,proId,userId,count){
    let quantity = parseInt(document.getElementById(proId).innerHTML)
    count = parseInt(count)
    $.ajax({
        url: "/change-product-quantity",
        data: {
            user : userId,
            cart : cartId,
            product : proId,
            count : count,
            quantity: quantity
        },
        method: "post",
        success:(response)=>{
            if (response.removeProduct) {
                alert("Product removed from cart")                
                location.reload()
            }else{
                document.getElementById(proId).innerHTML = quantity + count
                document.getElementById("total").innerHTML = response.total
            }
        }
    })
}

$("#checkout-form").submit((e) => {
    e.preventDefault()
    $.ajax({
        url: '/place-order',
        method: 'post',
        data: $('#checkout-form').serialize(),
        success: (response)=>{
            alert(response)
            if (response.paymentSuccess) {
                location.href = '/order-success'
            }else{
                razorpayPayment(response)
            }
        }
    })
})