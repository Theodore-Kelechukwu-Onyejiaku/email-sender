var emailBox = document.getElementById("emailBox")
var checkButton = document.getElementById("check");
var emails = document.getElementById("emails");
var errorMessage = document.querySelector(".error");
var emailBody = document.getElementById("trumbowyg-demo");
var myForm = document.getElementById("form");
var numberOfCorrect = document.getElementById("enteredEmails");
var numberOfEmails = document.getElementById("allEmails");
var content = document.getElementById("content");



var close_modal_btn = document.getElementById("close_modal");
var modalBox = document.getElementById("modal_box");



myForm.addEventListener("submit", (e)=>{
    emails.textContent = trimEmailBox()
    if(!checkEmailEntered(emails) || emailBox.value == ""){
        console.log("should return false")
        e.preventDefault();
    }
    
})

emailBox.addEventListener("focus", ()=>{
    errorMessage.style.display = "none"; 
})

emailBox.addEventListener("input", (e)=>{
    emails.textContent = trimEmailBox()
    var allEmailsArr = emails.textContent.split(" ");
    var rightEmails = [];
    allEmailsArr.forEach((eachEmail, index, arr) =>{
        if(((/.*?@\w+.com/i).test(eachEmail))){
            rightEmails.push(eachEmail)
        }
    })
    numberOfCorrect.textContent = rightEmails.length;
    numberOfEmails.textContent = allEmailsArr.length;
})


function trimEmailBox(){
    return emailBox.value.replace(/[, ]+/g, " ");
}

function checkEmailEntered(allEmails){
    var allEmailsArr = allEmails.textContent.split(" ");
    var wrongEmails = []
    allEmailsArr.forEach((eachEmail, index, arr) =>{
        if(!((/.*?@\w+.com/i).test(eachEmail))){
            wrongEmails.push(eachEmail)
        }
    })  
    
    if(allEmailsArr.length > 100){
        errorMessage.style.display = "block"
        errorMessage.textContent = "Emails entered exceed 100";
        return false 
    }else if(wrongEmails.length > 0){
        errorMessage.style.display = "block"
        errorMessage.innerHTML = "&#X26D4; Wrong Email(s): "+ wrongEmails;
        return false
    }else{
        emailBox.value = emailBox.value.replace(/[ ]+/g, "").trim();
        content.value = String(emailBody.innerHTML);
        console.log(content.value)
        return true
    }
}