/*
    to make sortable table rows
 
    ==> add following scripts into HTML
        <script src="https://code.jquery.com/jquery-2.1.0.min.js"></script>
        <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
        <script src="sortabletable.js"></script>
    last one is this file.
 
    ==> maintain following table structure
        <table>
            <thead></thead>
            <tbody>
                <tr><tr>
                ....
                <tr></tr>
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                </tr>
            </tfoot>
        <table>
    ==> add following button tag inside td of footer (tfoot)
        <button class="addButton" onclick="arrange(this)">Arrange</button>
    hurray! your rows inside tbody are arrangable now.
    with JQueryUI Plugin - sortable.
*/

function EnableDragArrange(tablebody) {
  $("table tbody").sortable({
    animation: 150,
    placeholder: "rowbackground" /*name of the CSS class*/,
  });
}

function DestroyDragArrange() {
  $("table tbody").sortable("destroy");
}

function arrange(element) {
  var tablebody =
    element.parentNode.parentNode.parentNode.parentNode.tBodies[0]; //td //tr //tfoot //table
  var tablerows = tablebody.rows;

  if (element.innerText == "Arrange") {
    for (var i = 0; i < tablerows.length; i++) {
      tablerows[i].cells[0].style.paddingLeft = "4px";

      tablerows[i].cells[0].style.paddingRight = "10px";

      tablerows[i].style.background = "#f8f8ff";

      tablerows[i].style.cursor = "hand";

      tablerows[i].style.boxShadow = "0px 1px 20px #bababa66";

      tablerows[i].style.color = "black";

      tablerows[i].style.borderRadius = "0.2rem";

      /*
            this effect is given to rows when arrange button is clicked
            */
    }
    element.innerText = "Done";
    EnableDragArrange(tablebody);
  } else if (element.innerText == "Done") {
    for (var i = 0; i < tablerows.length; i++) {
      tablerows[i].cells[0].style.paddingLeft = "0px";
      tablerows[i].style.background = "inherit";
      tablerows[i].style.borderTop = "none";
      tablerows[i].style.boxShadow = "none";
      tablerows[i].style.color = "black";
      /*
            this effect is given to rows when Edit button is clicked
            */
    }
    element.innerText = "Arrange";
    DestroyDragArrange();
  }
}
