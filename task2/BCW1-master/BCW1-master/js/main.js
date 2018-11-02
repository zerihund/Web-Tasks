'use strict'
const validation = ()=>{
  let fName =document.getElementById('firstName').value;
  let lName =document.getElementById('lastName').value;
  let email =document.getElementById('email').value;
  let pNumber =document.getElementById('phoneNumber').value;
  let address =document.getElementById('address').value;
  let pCode =document.getElementById('postalCode').value;
  let pass =document.getElementById('password').value;

  if(fName===""||(fName.length<3||fName.length>20)){
    document.getElementById('userFirstName').innerHTML="* please fill your first name/use the correct format*";
    return false;
  }
  if(lName===""||(fName.length<3||fName.length>20) ){
    document.getElementById('userLastName').innerHTML="* please fill your last name /user the correct format*";
    return false;
  }if(email==="" || (email.length<5||!email.includes('@') || (!email.includes('.')))){
    document.getElementById('userEmail').innerHTML="* please fill your correct email address*";
    return false;
  }
  if(pNumber.length!==13||!pNumber.includes('+358') ){
    document.getElementById('userPhoneNumber').innerHTML ="please fill the correct phone number(e.g +358449667460)";
  }
  if(pCode.NaN || pCode!==5){
    document.getElementById('userPostalCode').innerHTML =" please fill the correct postal code";
  }
  if(pass==="" || (pass.length<5 || pass.length>20)){
    document.getElementById('userPassword').innerHTML="* please fill your password*";
    return false;
  }
  /*if((!pNumber.startsWith("+")) && (pNumber.length!==13)){
    document.getElementById('userFirstName').innerHTML="* please fill your first name /use the corrects format*";
    return false;
  }*/

}