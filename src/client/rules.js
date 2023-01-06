/// Gestion de l'affichage des règles d'une partie de bowling (scoring)


var modal = document.getElementById("rulesModal");
var btn = document.getElementById("rulesBtn");
// <span> element of the rules modal containing the (x) to close it
var span = document.getElementsByClassName("close")[0];

// Show the rules modal
function show() {
    modal.style.display = "block";
}

// Hide the rules modal
function hide() {
    let modal = document.getElementById("rulesModal");
    modal.style.display = "none";
}

btn.onclick = function() {
    show();
}

span.onclick = function() {
    hide();
}

// If click outside of rules, close modal
window.onclick = function(event) {
  if (event.target == modal) {
    hide();
  }
}