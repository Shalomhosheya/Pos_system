import {ItemModel} from "../Models/itemModel.js";
import {itemSavearr} from "../Db/db.js";
import {addOptionToDropdown, addOptionToDropdownitem} from "./order_controller.js";
var recodindex

function validation(amount) {
   var regex = /^\d*$/;
   if (regex.test(amount)){
           return true;
   }else {
     return false;
   }

}

function validationID(id) {
    var idRegex = /^I\d{3}$/;
    if (idRegex.test(id)){
        return true;
    }else {
        return false;
    }
}

$("#item_Add").on('click',()=>{
    var id = $("#inputIDItem").val()
    var type = $("#NameItem").val()
    var title = $("#inputAddressItem").val()
    var quantity = $("#inputAddress2").val()
    var amount = $("#inputAddress3").val()

    if (!(id === '' || type === '' || title === '' || quantity === ''|| amount==='')) {
       var valid = validation(amount);
        if (valid==true){
            var valid2 = validationID(id);
            if (valid2==true){
                console.log(id)
               /* var itemModel = new ItemModel(id,type,title,quantity,amount)
                itemSavearr.push(itemModel)
                addOptionToDropdownitem(itemModel.id)*/
                $.ajax({
                    url: "http://localhost:8085/JNDI/item",
                    method: "POST",
                    contentType: "application/json",
                    "data": JSON.stringify({
                        id: id,
                        type: type,
                        title: title,
                        quantity: quantity,
                        amount: amount
                    }),
                })
              //  loadTable()
                $("#item_Clear").click()
            }else {
                alert("Please insert ID format as I0XX im the relevant Field")
            }
        }else {
            alert("Please insert a amount in the Field")
        }
    }else {
        alert("Fill all the Blanks")
    }

})

function loadTable(){
    $("#item_table_body").empty()
    itemSavearr.forEach(item=>{
        var record= `
            <tr>
                <th scope="row" class="i1">${item.id}</th>
                <td class="i6">${item.type}</td>
                <td class="i3">${item.title}</td>
                <td class="i4">${item.quantity}</td>
                <td class="i5" >${item.amount}</td>
            </tr>;
        `
        $("#item_table_body").append(record)
    });
}
$("#item_Clear").on('click',()=>{
    $("#inputIDItem").val("")
    $("#NameItem").val("")
    $("#inputAddressItem").val("")
    $("#inputAddress2").val("")
    $("#inputAddress3").val("")
})

$("#item_table_body").on('click','tr',function (){
    var index =$(this).index()
    recodindex = index
     let itemid = $(this).find(".i1").text()
     let itemtype = $(this).find(".i6").text()
     let itemtitle = $(this).find(".i3").text()
     let itemquantity = $(this).find(".i4").text()
     let itemamount = $(this).find(".i5").text()
    console.log(itemid)

    $("#inputIDItem").val(itemid)
    $("#NameItem").val(itemtype)
    $("#inputAddressItem").val(itemtitle)
    $("#inputAddress2").val(itemquantity)
    $("#inputAddress3").val(itemamount)

})

$("#item_Delete").on('click',()=>{
    var id = $("#inputIDItem").val()

    /*itemSavearr.splice(recodindex,1)
    loadTable()*/
    $.ajax({
        url:"http://localhost:8085/JNDI/item",
        method:"DELETE",
        contentType:"application/json",
        "data":JSON.stringify({
            id2:id,
        }),
        success:function(results){
            console.log(results);

        },
        error:function(error){
            console.log(error);

        }
    });
    $("#item_Clear").click()
})
$("#item_Update").on('click',()=>{
    var id = $("#inputIDItem").val()
    var type = $("#NameItem").val()
    var title = $("#inputAddressItem").val()
    var quantity = $("#inputAddress2").val()
    var amount = $("#inputAddress3").val()

    $.ajax({
        url:"http://localhost:8085/JNDI/item",
        method:"PATCH",
        contentType:"application/json",
        "data":JSON.stringify({
            id2:id,
            type2:type,
            title2:title,
            quantity2:quantity,
            amount2:amount
        }),
        success:function(results){
            console.log(results);

        },
        error:function(error){
            console.log(error);

        }
    });
   // loadTable()
  //  $("#item_Clear").click()
})