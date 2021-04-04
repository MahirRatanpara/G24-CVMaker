$("#reset_password").keyup(function (event) {
  // you have to input both ans
  validateInputs();
});

$("#confirm_password").keyup(function (event) {
  validateInputs();
});

function validateInputs() {
  var disableButton = false;

  var val1 = $("#reset_password").val();
  var val2 = $("#confirm_password").val();

  if (val1.length == 0 || val2.length == 0) disableButton = true;

  $("#contact").attr("disabled", disableButton);
}

function fun() {
  //to see password is same or not
  const temp1 = document.getElementById("reset_password");
  const temp2 = document.getElementById("confirm_password");

  if (temp1.value != temp2.value) {
    // not matched
    alert("password does not match");
  } // matched
  else {
    const password = document.getElementById("reset_password").value;
    fatch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
      });

    window.location.href = "#";
  }
}
