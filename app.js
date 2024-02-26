const addBtn = document.querySelectorAll(".add");
const pr = document.querySelector("#clickedbtn");

var currFrame;

addBtn.forEach((btn) => {
  /// loop through all the add buttons
  btn.addEventListener("click", () => {
    /// btn clicked
    pr.textContent = btn.parentNode.id; /// useless
    currFrame = btn.parentNode.id; /// useless
    addObj(btn.parentNode.querySelector("ul"), "task" + Math.random() * 30);
  });
});

function addObj(ls, title) {
  var fr = document.createElement("div");
  fr.id = "obj_frame";

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = false;
  checkbox.id = "done";
  fr.appendChild(checkbox);

  var objTitle = document.createElement("span");
  objTitle.id = "obj_title";
  objTitle.textContent = title;
  fr.appendChild(objTitle);

  ls.appendChild(fr);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      fr.remove();
    }
  });
}
