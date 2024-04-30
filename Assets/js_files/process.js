$("#navHome").on('click',()=>{
    $("#Home").css({display:"block"})
    $("#Customer").css({display:"none"})
    $("#Item").css({display:"none"})
    $("#Order").css({display:"none"})
    $("#help").css({display:"none"})
})

$("#navCus").on('click',()=>{
    $("#Home").css({display:"none"})
    $("#Customer").css({display:"block"})
    $("#Item").css({display:"none"})
    $("#Order").css({display:"none"})
    $("#help").css({display:"none"})
})

$("#navItem").on('click',()=>{
    $("#Home").css({display:"none"})
    $("#Customer").css({display:"none"})
    $("#Item").css({display:"block"})
    $("#Order").css({display:"none"})
    $("#help").css({display:"none"})
})

$("#navOrders").on('click',()=>{
    $("#Home").css({display:"none"})
    $("#Customer").css({display:"none"})
    $("#Item").css({display:"none"})
    $("#Order").css({display:"block"})
    $("#help").css({display:"none"})
})

$("#navHelp").on('click',()=>{
    $("#Home").css({display:"none"})
    $("#Customer").css({display:"none"})
    $("#Item").css({display:"none"})
    $("#Order").css({display:"none"})
    $("#help").css({display:"block"})
})
