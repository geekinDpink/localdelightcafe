//Add and Minus Button
jQuery(document).ready(function () {

    //Using AJAX, get data in JSon to populate price of the items in the menu
    // Create an instance of the HTTP request object
    var xhttp = new XMLHttpRequest();
    // Specify HTTP GET by default and supply the relative url
    xhttp.open("GET", "./json/price.json");
    // Start a synchronous AJAX request and wait for the response
    xhttp.send();

    //Call function when readyState changes [4 - request finished and response is ready, 200 - Ok]
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var food = JSON.parse(this.responseText);
            console.log(food);

            //Add Price to the items of the menu
            var foodPrice = $(".price");
            for (i = 0; i < foodPrice.length; i++) {
                foodPrice[i].innerHTML = food[i].price;
            }
        }
    };


    // Add Button
    $('.addQty').click(function (e) {
        e.preventDefault();
        //Based on button field name, locate text (share the same name) and get its value
        var fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If is not undefined, add one
        if (!isNaN(currentVal)) {
            $('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
            $('input[name=' + fieldName + ']').val(0);
        }
    });

    // Minus button
    $(".minusQty").click(function (e) {
        e.preventDefault();
        //Based on button field name, locate text (share the same name) and get its value
        var fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If it is not undefined/>0, substract one
        if (!isNaN(currentVal) && currentVal > 0) {
            $('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
            $('input[name=' + fieldName + ']').val(0);
        }
    });

    // Add to Cart button
    $(".addToCart").click(function (e) {
        //Based on button field name, locate text (share the same name) and get its value
        var fieldName = $(this).attr('field');
        var qty = parseInt($('input[name=' + fieldName + ']').val());
        var remark = $('textarea[name=' + fieldName + ']').val();
        var food = checkFoodName(fieldName);
        //console.log(food);
        saveToLocal(fieldName, food, qty, remark);
        //var itemDetails = JSON.parse(localStorage.getItem(fieldName));
        //console.log(itemDetails.iQty);
    });

    // Show Cart button
    $(".showCart").click(function (e) {

        getFromLocal();
        //test code before putting in getFromLocal()
        /*
        var section = document.getElementById('myCart');

        let divCard = document.createElement('div');
        divCard.setAttribute("class","card mt-3");

        let divCardBody = document.createElement('div');
        divCardBody.setAttribute("class","card-body");
        
        let h5Title = document.createElement('h5');
        let h5TitleNode = document.createTextNode('Milo');
        h5Title.appendChild(h5TitleNode);


        let divQtyTitle = document.createElement('div');
        let divQtyTitleNode = document.createTextNode('Quantity:');
        divQtyTitle.setAttribute("class","mt-1");
        divQtyTitle.appendChild(divQtyTitleNode);

        let inputQty = document.createElement('input');
        inputQty.setAttribute("type","text");
        inputQty.setAttribute("name","tbc item1");
        inputQty.setAttribute("id","tbc item1");
        inputQty.setAttribute("value","5");
        inputQty.setAttribute("class","cartInput");

        let divRemarkTitle = document.createElement('div');
        let divRemarkTitleNode = document.createTextNode('Remarks:');
        divRemarkTitle.setAttribute("class","mt-1");
        divRemarkTitle.appendChild(divRemarkTitleNode);

        let remarkText = document.createElement('textarea');
        remarkText.setAttribute("name","tbc item1");
        remarkText.setAttribute("id","tbc item1");
        remarkText.setAttribute("row","2");
        remarkText.setAttribute("class","cartInput");


        let removeBtn = document.createElement('button');
        let removeBtnNode = document.createTextNode('Remove');
        removeBtn.setAttribute("class","removeBtn mt-1");
        removeBtn.appendChild(removeBtnNode);


        divCardBody.appendChild(h5Title);
        divCardBody.appendChild(divQtyTitle);
        divCardBody.appendChild(inputQty);
        divCardBody.appendChild(divRemarkTitle);
        divCardBody.appendChild(remarkText);
        divCardBody.appendChild(removeBtn);

        divCard.appendChild(divCardBody);
        section.appendChild(divCard);
        */
    });

    // Clear Cart button
    $(".clearCart").click(function (e) {
        localStorage.clear();
        window.location.reload;
        $("#myCart div").html("");
        //<h4 class="d-md-none mt-3">My Cart</h4>

    });

    // Remove Item button
    $(".removeBtn").click(function (e) {
        var fieldName = $(this).attr('field');
        localStorage.removeItem(fieldName);
        //console.log("hello");
    });

});

//AddToCart Function: Save to Local Storage
function saveToLocal(fieldName, food, qty, remark) {
    if (typeof (Storage) !== "undefined") {
        var foodDetails = {
            iName: food,
            iQty: qty,
            iRemark: remark,
        }
        localStorage.setItem(fieldName, JSON.stringify(foodDetails));
    }
    else {
        console.log("Browser does not support local storage")
    }
}

//Get from Local Storage
function getFromLocal() {
    if (typeof (Storage) !== "undefined") {


        for (i = 0; i <= localStorage.length - 1; i++) {
            var key = localStorage.key(i);
            var itemDetails = JSON.parse(localStorage.getItem(key));
            //var fieldName = localStorage.getItem('key');
            var food = itemDetails.iName;
            var qty = itemDetails.iQty;
            var remark = itemDetails.iRemark;

            console.log(itemDetails);


            var section = document.getElementById('myCart');

            let divCard = document.createElement('div');
            divCard.setAttribute("class", "card mt-3");

            let divCardBody = document.createElement('div');
            divCardBody.setAttribute("class", "card-body");

            let h5Title = document.createElement('h5');
            //insert localstorage variable
            let h5TitleNode = document.createTextNode(food);
            h5Title.appendChild(h5TitleNode);


            let divQtyTitle = document.createElement('div');
            let divQtyTitleNode = document.createTextNode('Quantity:');
            divQtyTitle.setAttribute("class", "mt-1");
            divQtyTitle.appendChild(divQtyTitleNode);

            let inputQty = document.createElement('input');
            inputQty.setAttribute("type", "text");
            //insert localstorage variable
            inputQty.setAttribute("name", key);
            inputQty.setAttribute("id", key);
            inputQty.setAttribute("value", qty);
            inputQty.setAttribute("class", "cartInput");

            let divRemarkTitle = document.createElement('div');
            let divRemarkTitleNode = document.createTextNode('Remarks:');
            divRemarkTitle.setAttribute("class", "mt-1");
            divRemarkTitle.appendChild(divRemarkTitleNode);

            let remarkText = document.createElement('textarea');
            let remarkTextNode = document.createTextNode(remark);
            //insert localstorage variable
            remarkText.setAttribute("name", key);
            remarkText.setAttribute("id", key);
            remarkText.setAttribute("row", "2");
            remarkText.setAttribute("class", "cartInput");
            remarkText.appendChild(remarkTextNode);


            let removeBtn = document.createElement('button');
            let removeBtnNode = document.createTextNode('Remove');
            removeBtn.setAttribute("class", "removeBtn mt-1");
            removeBtn.setAttribute("field", key);
            removeBtn.appendChild(removeBtnNode);


            divCardBody.appendChild(h5Title);
            divCardBody.appendChild(divQtyTitle);
            divCardBody.appendChild(inputQty);
            divCardBody.appendChild(divRemarkTitle);
            divCardBody.appendChild(remarkText);
            divCardBody.appendChild(removeBtn);

            divCard.appendChild(divCardBody);
            section.appendChild(divCard);

        }
    }
    else {
        console.log("Browser does not support local storage")
    }
}

//convert identifier for item (field:item[no.]) to food name
function checkFoodName(fieldName) {
    var itemName;

    switch (fieldName) {
        case "item1":
            itemName = "Milo";
            break;

        case "item2":
            itemName = "Carrot Cake";
            break;

        case "item3":
            itemName = "Fried Gyoza";
            break;

        case "item4":
            itemName = "Fried Bee Hoon";
            break;

        case "item5":
            itemName = "Japanese Udon";
            break;

        case "item6":
            itemName = "Mee Goreng";
            break;

        case "item7":
            itemName = "Fish and Chip";
            break;

        case "item8":
            itemName = "Sesame Paste";
            break;

        case "item9":
            itemName = "Ginko Barley";
            break;
    }
    return (itemName);
}
