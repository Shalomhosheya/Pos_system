 import {CustomerModel} from "../Models/CustomerModel.js";
 import {Savearr} from "../Db/db.js";
var recordIndex;
import {addOptionToDropdown} from "./order_controller.js";

$("#addBtn").on('click', () => {
 var id1 = $("#inputCusID").val();
 var name1 = $("#NameCus").val();
 var address1 = $("#inputAddressCus").val();
 var number1 = $("#inputAddress2Cus").val();

 var Cusmodel = new CustomerModel(id1, name1, address1, number1);

 if (!(id1 === '' || name1 === '' || address1 === '' || number1 === '')) {
  var valid = validation(id1,name1,address1,number1)
  if (valid==true) {

$.ajax({
 url:"http://localhost:8085/JNDI/customer",
 method:"POST",
 contentType:"application/json",
 "data":JSON.stringify({
  id:id1,
  name:name1,
  address:address1,
  number:number1
}),
 success:function(results){
  console.log(results);

 },
 error:function(error){
  console.log(error);

 }
});
  // addOptionToDropdown(Cusmodel.id);
 // loadTable();
   $("#reset").click()
  }
 }else {
  alert("Fill in the empty Blanks");
 }

});
 function validation(id, name, address, number) {
  var idRegex = /^C\d{3}$/;
  var numberRegex = /^07\d{8}$/;

  if (idRegex.test(id) && numberRegex.test(number)) {
   return true;
  } else {
   alert("Not in correct format, please check the credentials again");
   return false;
  }
 }
  function loadTable() {
   //console.log(Savearr);
   $.ajax({
    url: "http://localhost:8085/JNDI/customer",
    method: "GET",
    success: function(results) {
     // Log the entire response as a formatted JSON string
     console.log("Response Data:", JSON.stringify(results, null, 2));

     // Clear the table body before appending new data
     $("#cusTablebody").empty();

     // Check if the result is an array
     if (Array.isArray(results)) {
      results.forEach(function(customer, index) {
       // Create a table row for each customer
       var record = `
                    <tr>
                        <th scope="row" class="r1">${customer.id}</th>
                        <td class="r2">${customer.name}</td>
                        <td class="r3">${customer.address}</td>
                        <td class="r4">${customer.number}</td>
                    </tr>`;
       // Append the row to the table body
       $("#cusTablebody").append(record);
      });
     } else {
      // If it's a single object (not an array), create a single row
      var record = `
                <tr>
                    <th scope="row" class="r1">${results.id}</th>
                    <td class="r2">${results.name}</td>
                    <td class="r3">${results.address}</td>
                    <td class="r4">${results.number}</td>
                </tr>`;
      $("#cusTablebody").append(record);
     }
    },
    error: function(error) {
     console.log("Error:", error);
    }
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
  var cusid = $("#inputCusID").val();
  $.ajax({
   url:"http://localhost:8085/JNDI/customer",
   method:"DELETE",
   contentType:"application/json",
   "data":JSON.stringify({
    id:cusid,
   }),
   success:function(results){
    console.log(results);

   },
   error:function(error){
    console.log(error);

   }
  });

//  loadTable()
  $("#reset").click()
 })

 $('#updatebtn').on('click',()=>{
  var cusid = $("#inputCusID").val();
  var cusname = $("#NameCus").val();
  var cusaddress = $("#inputAddressCus").val();
  var cusnumber = $("#inputAddress2Cus").val();

  $.ajax({
   url:"http://localhost:8085/JNDI/customer",
   method:"PATCH",
   contentType:"application/json",
   "data":JSON.stringify({
    id:cusid,
    name:cusname,
    address:cusaddress,
    number:cusnumber
   }),
   success:function(results){
    console.log(results);

   },
   error:function(error){
    console.log(error);

   }
  });
 // loadTable()
  $("#reset").click()
 })
