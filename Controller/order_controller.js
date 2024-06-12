import { CustomerModel } from "../Models/CustomerModel.js";
import { Savearr } from "../Db/db.js";
import {itemSavearr} from "../Db/db.js";
import {OrderArray1} from "../Db/db.js";
import {OrderArray2} from "../Db/db.js";
var Cusmodel1 = new CustomerModel(Savearr[0])
var temp=[Cusmodel1.id]


export function addOptionToDropdown(id) {
 var listItem = `<option value="${id}" class="opt">${id}</option>`;
 var list = $('#selectCus').append(listItem);
}

document.getElementById("selectCus").addEventListener("change", function(event) {
 var selectElement = event.target;
 var customerId = selectElement.value;

 console.log("Selected customer ID:", customerId);

  var customer = findMatchingCusId(customerId);
  console.log(customer.id);

  if (customer !== undefined && customer !== null) {
   //clearCusFields();
   populateCusFields(customer);
  } else {
   console.error("Customer not found with ID:", customerId);
  }

});

function populateCusFields(customer) {

 $("#validationCustom02").val(customer.name);
 $("#validationCustom03").val(customer.address);
 $("#validationCustom04").val(customer.number);
}
 function findMatchingCusId(customerId){
  var customer = null;

  for (var i = 0; i < Savearr.length; i++) {
   if (Savearr[i].id === customerId) {
    customer = Savearr[i];
    break;
   }
  }

  return customer;

 }
export function addOptionToDropdownitem(id) {
 var listItem1 = `<option value="${id}"class="selectItem">${id}</option>`;
 $('#selectItem').append(listItem1);
}


document.getElementById("selectItem").addEventListener("change", function(event) {
 var selectElement = event.target;
 var itemId = selectElement.value;

 console.log("Selected Item ID:", itemId);

 var itemId = findMatchingitemId(itemId);
 console.log(itemId.id);


 if (itemId !== undefined && itemId !== null) {
  populateCusFieldsId(itemId);
 } else {
  console.error("Customer not found with ID:", itemId);
 }

});
function populateCusFieldsId(itemId) {

 $("#validationItem1").val(itemId.title);

 $("#validationItem3").val(itemId.amount);
}

function findMatchingitemId(itemId) {
 var item = null;

 for (var i = 0; i < itemSavearr.length; i++) {
  if (itemSavearr[i].id === itemId) {
   item = itemSavearr[i];
   break;
  }
 }
 return item;

}

$('#btn2').on('click',()=>{
 console.log("clcik")
})


function loadTable(orderArray) {
 $("#order_table_body").empty(); // Clear the table body before appending new rows
 orderArray.forEach((item, index) => {
  var record = `
                    <tr>
                        <td class="name">${item[0]}</td>
                        <td class="item">${item[1]}</td>
                        <td class="quantity">${item[2]}</td>
                        <td class="unitPrice">${item[3]}</td>
                    </tr>`;
  $("#order_table_body").append(record);
 });
}

$('#addBtn2').on('click', () => {
 var CusName = $('#validationCustom02').val();
 var itemName = $('#validationItem1').val();
 var quantity = parseFloat($('#validationItem2').val());
 var unitPrice = parseFloat($('#validationItem3').val());
 var priceTotal = $('#validationconfirmation3');
 var selectItem = $('#selectItem').val()
 var selectCus = $('#selectCus').val()

 if (!CusName || !itemName || isNaN(quantity) || isNaN(unitPrice) || !selectItem || !selectCus) {
  alert('Please fill in all fields correctly.');
  return;
 }

 var total = quantity * unitPrice;
 priceTotal.val(total);

 var newItem = [CusName, itemName, quantity, unitPrice];
 OrderArray1.push(newItem);

 loadTable(OrderArray1);
});
$('#disBtn').on('click', () => {
 var quantity = parseFloat($('#validationconfirmation3').val());
 var disprice = parseFloat($('#validationconfirmation2').val());
 var totalDis;

 totalDis = quantity - disprice; // Assuming you want to calculate the total discounted price
 $('#validationconfirmation3').val(totalDis); // Updating the quantity input with the result
});

function empty() {
 $('#validationconfirmation3').val("");
 $('#validationItem2').val("")
 $('#validationconfirmation1').val("")
 $('#validationconfirmation2').val("")
 $('#validationconfirmation4').val("")


}

function cashBack() {
 var tp = parseFloat($('#validationconfirmation3').val());
 var cash = parseFloat($('#validationconfirmation4').val());


 return tp<cash;
}

function validation1(orderId) {
 var regex = /^O\d{3}$/;
 if (regex.test(orderId)){
  return true;
 }else {
  return false;
 }

 return undefined;
}

function validation2(cash, disprice) {
 var regex = /^\d*$/;
 if (regex.test(cash) && regex.test(disprice)) {
  return true;
 } else {
  return false;
 }
}


$('#confirmBtn').on('click',()=>{

  let check = cashBack();
  var  orderId = $('#validationconfirmation1').val();
  var cash =($('#validationconfirmation4').val());
 var disPrice = ($('#validationconfirmation2').val());

  let valid = validation1(orderId);
  let valid2 = validation2(cash,disPrice);
  if (valid==true){
   if (valid==true){
    if (check==true){
     myFunction();
     empty();
    }else {
     alert("Insufficient Cash")
    }
   }else {
    alert("Please enter in OrderId correct format As Oxxx")
   }
  }else {
   alert("Please recheck the cash and Discount are entered in Number Units")
  }

})

function loadTable2(orderArray) {
 $("#order_table_body2").empty();
 orderArray.forEach((item, index) => {
  var record = `
            <tr>
                <td>${item[0]}</td>
                <td>${item[2]}</td>
                <td>${item[1]}</td>
                <td>Confirm</td>
            </tr>`;
  $("#order_table_body2").append(record);
 });
}

function myFunction() {
 if (confirm("Add the order")) {
  var orderId = $('#validationconfirmation1').val();
  var total = parseFloat($('#validationconfirmation3').val());
  var disPrice = parseFloat($('#validationconfirmation2').val());
  var cash = parseFloat($('#validationconfirmation4').val());
  var balanceField = $('#validationconfirmation6');

  // Log the values to verify
  console.log(orderId);
  console.log(total);
  console.log(disPrice);
  console.log(cash);

  // Push the order details as an array to OrderArray2
  OrderArray2.push([orderId, total, disPrice]);

  loadTable2(OrderArray2);

  // Calculate and set the balance
  var balance = cash - total;
  balanceField.val(balance);
 } else {
  console.log('Order was not confirmed.');
 }
}

