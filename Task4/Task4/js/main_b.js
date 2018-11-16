'use strict'

// HTML contains element 'message'. This is used to show the server's response
// Select it and save it as a variable/object

// make function 'upload' which
// - prevents the form from sending
// - writes 'Upload in progress...' into 'message' element
// - selects the file input field
// - makes FormData -object and adds the file selected byt the user into the object
// - send the file to the same url as in task a by using fetch -method
// - when file upload is complete, writes server response to 'message' element
// function ends

const input = document.querySelector('#pic');
const msg = document.querySelector('#message');

console.log(input);
const form =document.querySelector('form');

const upload =(x)=>{
  x.preventDefault();
  msg.innerHTML ="Upload in progress....";
  const data = new FormData();
  data.append('fileToUpload', input.files [0]);
  const settings = {
    method: 'POST',
    body: data
  };
// initiate fetch. In this example the server responds with text.
// Response could also be json. Then you would use response.json()
  fetch('/node/upload', settings).then((response) => {
    console.log(response);
    msg.innerHTML ='upload complete';
  })
};
form.addEventListener('submit',upload);


