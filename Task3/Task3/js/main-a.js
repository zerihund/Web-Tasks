// Create function 'showImages' which
// adds the loaded HTML content to <ul> element
'use strict'

/*document.querySelector('ul').addEventListener('click',showImages());
function showImages() {
  let xhttp = new XMLHttpRequest();
  xhttp.open('GET','images.html',true);
  xhttp.onload = function() {
    if(this.status===200){
      //console.log(this.responseText);
      document.querySelector('ul').innerHTML =this.responseText;
    }
  }
  xhttp.send();
}*/
//const mylist = document.querySelector('ul')

const showImages=(html) =>{
  document.querySelector('ul').innerHTML=html;

}

fetch('images.html').then((response)=> {
  return response.text();
}).then((text)=>{
  showImages(text);
});

