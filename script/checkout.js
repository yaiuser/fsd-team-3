let showCheckoutStatus = false;

document.getElementById("showCheckout").addEventListener("click", (event) => {
    
    const subTotalCheckout = document.getElementById("subTotalCheckout");   
    if(!showCheckoutStatus){
        subTotalCheckout.classList.add("d-block");
        subTotalCheckout.classList.remove("d-none");
        showCheckoutStatus = true;
    }else{
        subTotalCheckout.classList.add("d-none");
        subTotalCheckout.classList.remove("d-block");
        showCheckoutStatus = false;
    }
})

document.getElementById("btnCheckout").addEventListener("click", () => {
  
    window.location = "confirmorder.html";

})