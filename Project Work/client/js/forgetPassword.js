$("#ans1").keyup(function (event) {
  validateInputs();
});

function validateInputs() {
  var disableButton = false;

  var val1 = $("#ans1").val();

  if (val1.length == 0) disableButton = true;

  $("#contact").attr("disabled", disableButton);
}

function myfun() {
  window.location.href = "reset-password.html";
}

// document.getElementById('form').addEventListener('submit',postans);

// function postans(e){
//     e.preventDefault();

//     let ans1 = document.getElementById('ans1').value;
//     let ans2 = document.getElementById('ans2').value;

//     fatch('https://jsonplaceholder.typicode.com/todos',{
//         method:'POST',
//         body: JSON.stringify({
//             ans1:ans1,
//             ans2:ans2
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8'
//         }

//     })
//     .then(function(res){
//         return res.json();
//     })
//     .then(function(data){
//         console.log(data);

//     })
// }
