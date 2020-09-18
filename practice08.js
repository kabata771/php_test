function regiBtn(){
    target=document.getElementById("JS01");
    if (target.className == null || target.className=="") {
        target.className = "active";
     } else {
        target.className = "";
     }
}