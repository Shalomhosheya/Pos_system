 // import  Savearr  from "../Db/db.js";
 import {CustomerModel} from "../Models/CustomerModel.js";
var Savearr=[]

var recordIndex;

$("#addBtn").on('click', () => {
 var id = $("#inputCusID").val();
 var name = $("#NameCus").val();
 var address = $("#inputAddressCus").val();
 var number = $("#inputAddress2Cus").val();

 var Cusmodel = new CustomerModel(id, name, address, number);
 Savearr.push(Cusmodel);
 loadTable();
 $("#reset").click()

});

function loadTable() {
 console.log(Savearr);
 $("#cusTablebody").empty();

 Savearr.forEach(Item => {
  var record = `
            <tr>
                <th scope="row" class="r1">${Item.id}</th>
                <td class="r2">${Item.name}</td>
                <td class="r3">${Item.address}</td>
                <td class="r4">${Item.number}</td>
            </tr>`;
  $("#cusTablebody").append(record);
 });
}
 $("#reset").on('click', () => {
  $("#inputCusID").val('');
  $("#NameCus").val('');
  $("#inputAddressCus").val('');
  $("#inputAddress2Cus").val('');
 });
$("#cusTablebody").on('click','tr',function (){
var index =$(this).index();
recordIndex = index

 let cusIdvalue = $(this).find(".r1").text();
 let cusName = $(this).find(".r2").text();
 let cusAddress = $(this).find(".r3").text();
 let cusPhonenum = $(this).find(".r4").text();

 console.log(cusIdvalue)

 $("#inputCusID").val(cusIdvalue);
 $("#NameCus").val(cusName);
 $("#inputAddressCus").val(cusAddress);
 $("#inputAddress2Cus").val(cusPhonenum);

})

 $('#delete').on('click',()=>{
Savearr.splice(recordIndex,1)
  loadTable()
  $("#reset").click()
 })

 $('#updatebtn').on('click',()=>{
  var cusid = $("#inputCusID").val();
  var cusname = $("#NameCus").val();
  var cusaddress = $("#inputAddressCus").val();
  var cusnumber = $("#inputAddress2Cus").val();

  var cusObj = Savearr[recordIndex]

  cusObj.id = cusid
  cusObj.name=cusname
  cusObj.address=cusaddress
  cusObj.number=cusnumber

  loadTable()
  $("#reset").click()
 })