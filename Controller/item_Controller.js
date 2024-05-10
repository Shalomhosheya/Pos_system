import {ItemModel} from "../Models/itemModel.js";

var itemSavearr=[]

var recodindex
$("#item_Add").on('click',()=>{
    var id = $("#inputIDItem").val()
    var type = $("#NameItem").val()
    var title = $("#inputAddressItem").val()
    var quantity = $("#inputAddress2").val()
    var amount = $("#inputAddress3").val()

    console.log(id)
    var itemModel = new ItemModel(id,type,title,quantity,amount)
    itemSavearr.push(itemModel)
    loadTable()
    $("#item_Clear").click()
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
    itemSavearr.splice(recodindex,1)
    loadTable()
    $("#item_Clear").click()
})
$("#item_Update").on('click',()=>{
    var id = $("#inputIDItem").val()
    var type = $("#NameItem").val()
    var title = $("#inputAddressItem").val()
    var quantity = $("#inputAddress2").val()
    var amount = $("#inputAddress3").val()

    var obj2 = itemSavearr[recodindex]

    obj2.id=id
    obj2.type=type
    obj2.title=title
    obj2.quantity=quantity
    obj2.amount=amount

    loadTable()
    $("#item_Clear").click()
})