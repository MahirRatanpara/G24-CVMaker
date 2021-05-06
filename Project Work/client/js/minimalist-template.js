var isPreviewClicked = true;
const submitBtn = document.getElementById("save-cv");

function printResume() {
  //document represent respective resume template
  console.log("print");
  var printdocument = document.getElementById("resume").innerHTML;
  var originalDocument = document.body.innerHTML;

  //order matter here
  document.getElementById("resume").classList.remove("my-resume-page");
  document.body.style.background = "white";
  document.body.innerHTML = printdocument;
  var addbtns = document.getElementsByClassName("addButton");
  var rmbtns = document.getElementsByClassName("removeButton");
  var inputs = document.getElementsByTagName("input");

  var i;
  for (i = 0; i < addbtns.length; i++) addbtns[i].style.display = "none";
  for (i = 0; i < rmbtns.length; i++) rmbtns[i].style.display = "none";

  for (i = 0; i < inputs.length; i++) {
    inputs[i].style.display = "none";
  }
  if (document.getElementById("photocaption") != null) {
    document.getElementById("photocaption").style.display = "none";
  }
  //
  //$(document).ready();
  //img isn't ready and its printing already
  //so set timeout and wait for image to load
  //.5s would be sufficient
  setTimeout(function () {
    window.print();
    document.body.innerHTML = originalDocument;
  }, 500);
  return "print successful";
}

function previewResume() {
  isPreviewClicked != isPreviewClicked;
  var addbtns = document.getElementsByClassName("addButton");
  var rmbtns = document.getElementsByClassName("removeButton");
  var inputs = document.getElementsByTagName("input");
  var i;
  if (isPreviewClicked) {
    for (i = 0; i < addbtns.length; i++) {
      addbtns[i].style.display = "none";
    }
    for (i = 0; i < rmbtns.length; i++) {
      rmbtns[i].style.display = "none";
    }
    for (i = 0; i < inputs.length; i++) {
      inputs[i].style.display = "none";
    }

    document.getElementById("preview-doc").innerHTML = "Edit";
    isPreviewClicked = false; //now edit option should be available
  } else {
    for (i = 0; i < addbtns.length; i++) {
      addbtns[i].style.display = "inline";
    }
    for (i = 0; i < rmbtns.length; i++) {
      rmbtns[i].style.display = "inline";
    }
    for (i = 0; i < inputs.length; i++) {
      inputs[i].style.display = "inline-block";
    }

    if (document.getElementById("photocaption") != null) {
      document.getElementById("photocaption").style.display = "inline-block";
    }
    document.getElementById("preview-doc").innerHTML = "Preview";
    isPreviewClicked = true; //now Preview option should be available
  }

  return "preview successful";
}

/* -------------------- Add/Remove Functionality ----------------------- */
var newCellPlaceholder = "Click to select";

function removeButtonHTML(tableid) {
  return (
    '<button class="removeButton small-btn" onclick="removeRow(\'' +
    tableid +
    "',this)\">Remove</button>"
  );
}

function selectAll() {
  document.execCommand("selectAll", true, "replace this");
  //firefox doesn't allow keyboard operations with scripts
}

function applyBorder(element) {
  element.style.border = "1px solid rgb(150,150,150)";
  element.style.borderRadius = "30px";
}

function replaceDotwithSpace(s) {
  str = new String(s);
  return str.replace(".", " ");
}

function checkFields() {
  var fields = document.getElementsByClassName("input-field");
  var i;
  for (i = 0; i < fields.length; i++) {
    if (fields[i].innerText == "") return false;
  }
  return true;
}

function addEducation() {
  var newrow = document
    .getElementById("education-table")
    .tBodies[0].insertRow(-1);
  var cell = newrow.insertCell(0);
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.innerHTML = "<b>" + newCellPlaceholder + "</b>";

  cell = newrow.insertCell(-1);
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.innerHTML = newCellPlaceholder;

  cell = newrow.insertCell(-1);
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.innerHTML = newCellPlaceholder;

  cell = newrow.insertCell(-1);
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.setAttribute("class", "text-center");
  cell.innerHTML = newCellPlaceholder;

  /*cell = newrow.insertCell(-1);
    cell.innerHTML = removeButtonHTML('education-table');*/
  // -1 is for appending at last
  //console.log('added education');
}

// function addSkills() {
//   var skilltable = document.getElementById("skills-table").tBodies[0];
//   var lastrowindex = skilltable.rows.length;
//   var newrow = skilltable.insertRow(lastrowindex);
//   var cell = newrow.insertCell(0);
//   cell.innerHTML = "<b>Technical Electives</b>";

//   cell = newrow.insertCell(-1);
//   cell.setAttribute("contenteditable", "true");
//   cell.setAttribute("spellcheck", "true");
//   cell.setAttribute("onclick", "selectAll()");
//   cell.innerHTML = newCellPlaceholder;
//   console.log("added Skill");

//   document.getElementById("add-skill").classList.add("invisible");
//   document.getElementById("remove-skill").classList.remove("invisible");
// }

function addInternships() {
  var internshipstable = document.getElementById("internships-table")
    .tBodies[0];
  var lastrowindex = internshipstable.rows.length;
  var newrow = internshipstable.insertRow(lastrowindex);

  var cell = newrow.insertCell(0);
  cell.setAttribute("valign", "top");
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.setAttribute("class", "w-20 input-field");
  cell.innerHTML = "<b>" + newCellPlaceholder + "</b>";

  cell = newrow.insertCell(-1);
  cell.setAttribute("valign", "top");
  cell.setAttribute("class", "w-60");
  cell.innerHTML =
    '<div><p contenteditable="true" spellcheck="true" class="input-field" onclick="selectAll()">' +
    newCellPlaceholder +
    "</p></div>";

  cell = newrow.insertCell(-1);
  cell.setAttribute("valign", "top");
  cell.setAttribute("class", "w-20 text-right");
  cell.innerHTML =
    '<div><p contenteditable="true" spellcheck="true" class="input-field" onclick="selectAll()">' +
    newCellPlaceholder +
    "</p></div>";
}

function addProjects() {
  var projectstable = document.getElementById("projects-table").tBodies[0];
  var lastrowindex = projectstable.rows.length;
  var newrow = projectstable.insertRow(lastrowindex);
  var cell = newrow.insertCell(0);
  cell.setAttribute("valign", "top");
  cell.setAttribute("class", "w-20");
  cell.innerHTML =
    '<div><p contenteditable="true" spellcheck="true" class="input-field" onclick="selectAll()"><b>' +
    newCellPlaceholder +
    "</b></p></div><div><p><i>" +
    "Guide: " +
    '<span contenteditable="true" spellcheck="true" class="input-field head-field" onclick="selectAll()">' +
    newCellPlaceholder +
    "</span>" +
    "</i></p><div>";

  cell = newrow.insertCell(-1);
  cell.setAttribute("valign", "top");
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("onclick", "selectAll()");
  cell.setAttribute("class", "w-60 input-field");
  cell.innerHTML = newCellPlaceholder;

  cell = newrow.insertCell(-1);
  cell.setAttribute("valign", "top");
  cell.setAttribute("class", "w-20 text-right");
  cell.innerHTML =
    '<div><p contenteditable="true" spellcheck="true" class="input-field" onclick="selectAll()">' +
    newCellPlaceholder +
    '</p></div><div><p contenteditable="true" spellcheck="true" class="input-field" onclick="selectAll()">' +
    newCellPlaceholder +
    "</p></div>";
}
function addSpace(element) {
  element.parentNode.innerHTML =
    '<br style="padding-top:2rem;">' + element.parentNode.innerHTML;
}
function removeSpace(element) {
  element.parentNode.innerHTML =
    '<button class="addButton" onclick="addSpace(this)">Add Space</button> <button class="removeButton" onclick="removeSpace(this)">Remove Space</button>';
}

function addtoList(list_id) {
  var list = document.getElementById(list_id);
  var cell = document.createElement("li");
  cell.setAttribute("contenteditable", "true");
  cell.setAttribute("style", "font-family: Georgia");
  cell.setAttribute("spellcheck", "true");
  cell.setAttribute("class", "input-field");
  cell.setAttribute("onclick", "selectAll()");
  cell.innerHTML = newCellPlaceholder;
  list.appendChild(cell);
}

function addAchievements() {
  document.getElementById("awards-table").style.display = "inline";
  setTimeout(function () {
    document.getElementById("awards-table").style.opacity = 1;
    if (document.getElementById("awards-hr"))
      document.getElementById("awards-hr").style.opacity = 1;
  }, 1);
  if (document.getElementById("awards-hr"))
    document.getElementById("awards-hr").style.display = "block";
  document.getElementById("ach-btn").style.opacity = 0;
}

//resume removeButtons utility
function removeRow(tableid, element = null) {
  var list;
  var lastrowindex;

  if (tableid == "skills-table") {
    // document.getElementById("remove-skill").classList.add("invisible");
    // document.getElementById("add-skill").classList.remove("invisible");
    lastrowindex = document.getElementById(tableid).rows.length - 1;
    document.getElementById(tableid).deleteRow(lastrowindex - 1);
    lastrowindex = document.getElementById(tableid).rows.length - 1;
    document.getElementById(tableid).deleteRow(lastrowindex - 1);
    return;
  } else if (tableid == "hobbies-list") {
    list = document.getElementById("hobbies-list");
    list.removeChild(list.lastChild);
    //printf('removed');printf(list);
    return;
  } else if (tableid == "positions-list") {
    list = document.getElementById("positions-list");
    list.removeChild(list.lastChild);
    return;
  }
  /*
    var rowindex = element.parentNode.parentNode.rowIndex;
    document.getElementById(tableid).deleteRow(rowindex);
    */
  lastrowindex = document.getElementById(tableid).rows.length - 1;
  if (tableid != "education-table" && lastrowindex > 1)
    document.getElementById(tableid).deleteRow(lastrowindex - 1);

  if (tableid == "education-table" && lastrowindex > 2) {
    document.getElementById(tableid).deleteRow(lastrowindex - 1);
    document.getElementById(tableid).deleteRow(lastrowindex - 2);
  }
}

function removeAchievements() {
  document.getElementById("awards-table").style.opacity = 0;
  if (document.getElementById("awards-hr") != null)
    document.getElementById("awards-hr").style.opacity = 0;

  setTimeout(function () {
    document.getElementById("ach-btn").style.opacity = 1;
    document.getElementById("awards-table").style.display = "none";
    if (document.getElementById("awards-hr") != null)
      document.getElementById("awards-hr").style.display = "none";
  }, 400);
}
