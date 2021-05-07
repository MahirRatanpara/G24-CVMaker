// $("#ans1").keyup(function (event) {
//   validateInputs();
// });

// function validateInputs() {
//   var disableButton = false;

//   var val1 = $("#ans1").val();

//   if (val1.length == 0) disableButton = true;

//   $("#contact").attr("disabled", disableButton);
// }

const alertDivfun = (error)=>{
  const alertDiv = document.getElementById("alert-message");
  alertDiv.innerHTML = "";
  alertDiv.style.display = "flex";
  const newDiv = document.createElement("div");
  newDiv.style.width = "fit-content";

  // alertDiv.setAttribute("justify-content","center");
  // alertDiv.setAttribute("align-items","center");
  const str = "alert alert-warning alert-dismissible fade show container-md";
  str.split(" ").forEach((c)=>newDiv.classList.add(c));
    newDiv.innerHTML = error;

  const newBtn = document.createElement("button");
  newBtn.classList.add("btn-close");
  newBtn.setAttribute("data-bs-dismiss","alert");
  newBtn.setAttribute("aria-label","Close");


  newDiv.append(newBtn);
  alertDiv.append(newDiv);
}

const b = document.querySelector(".username button");
const un = document.querySelector(".username");
const que = document.querySelector(".que"); 
const que_b = document.querySelector(".que button");
const repass = document.querySelector(".repass");

let username; 

b.addEventListener("click", (e)=> {

  username = document.getElementById("ans2").value;

  fetch("/api/username",{method:"POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username : document.getElementById("ans2").value
  })
}).then(response => response.json())
.then(jsonRes => {
  console.log('Success:', jsonRes);
  
  if(!jsonRes.success){
    throw Error("Invalid Username")
  }else{

    un.classList.add("fadeout");
    que.classList.add("fadein");

    document.getElementById("sec-que").innerHTML = jsonRes.data.securityQuestion;


  }
})
.catch((error) => {
  console.error('Error:', error);
  alertDivfun(error);
});
});


que_b.addEventListener("click", ()=> {

  fetch(`/api/securityCheck/${username}`,{method:"POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    securityAnswer : document.getElementById("ans1").value
  })
}).then(response => response.json())
.then(jsonRes => {
  console.log('Success:', jsonRes);
  
  if(!jsonRes.success){
    throw Error("Invalid Answer")
  }else{
    
    que.classList.remove("fadein");
    repass.classList.add("fadein");

  }
})
.catch((error) => {
  console.error('Error:', error);
  alertDivfun(error);
});

});

document.getElementById("contact").addEventListener("click",fun);

function fun(e) {

  e.preventDefault();
  //to see password is same or not
  const temp1 = document.getElementById("reset_password");
  const temp2 = document.getElementById("confirm_password");

  if (temp1.value != temp2.value) {
    // not matched
    alert("password does not match");
  } // matched
  else {

    fetch(`/api/password/${username}`,{method:"POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password : document.getElementById("confirm_password").value
    })
  }).then(response => response.json())
  .then(jsonRes => {
    console.log('Success:', jsonRes);
    
    if(!jsonRes.success){
      throw Error("Invalid Password")
    }else{
      
      window.location.href = "login.html";
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    alertDivfun(error);
  });

  }
}

$(".reveal1").on('click',function() {
  var $pwd = $(".pwd1");
  if ($pwd.attr('type') === 'password') {
      $pwd.attr('type', 'text');
  } else {
      $pwd.attr('type', 'password');
  }
});

$(".reveal2").on('click',function() {
  var $pwd = $(".pwd2");
  if ($pwd.attr('type') === 'password') {
      $pwd.attr('type', 'text');
  } else {
      $pwd.attr('type', 'password');
  }
});


// function myfun() {
//   window.location.href = "reset-password.html";
// }



