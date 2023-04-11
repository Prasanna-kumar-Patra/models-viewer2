// const topmenuDiv = document.getElementById("topmenu");

// topmenuDiv.innerText = topmenuDiv.innerText + "\nTech team is yet developing, this is for internal review"






function addWatermark() {


var div = document.createElement("div");
div.appendChild(document.createTextNode('The man who mistook his wife for a hat'));
div.innerHTML = "Tech team is yet developing, this is for internal review";
div.className = "watermark";
document.body.appendChild(div);
    
}
    
    addWatermark()