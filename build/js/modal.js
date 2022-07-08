var modalScreen = document.getElementById("theModal");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modalScreen.style.display = "none";
}

window.onload = function() {
    modalScreen.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modalScreen) {
        modalScreen.style.display = "none";
    }
}