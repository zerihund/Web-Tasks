'use strict'
const firstElement =document.querySelector('#test');
firstElement.innerHTML ='I added <Strong>this</Strong> text with JS';
firstElement.setAttribute('style', 'color: red');
firstElement.addEventListener('click',(evt)=>{
  console.log(evt.currentTarget);
  evt.currentTarget.setAttribute('style','background:purple')
});
const  exampleElements = document.querySelectorAll('.example');
console.log(exampleElements);
const changeColor=(evt)=>{
  console.log(evt.currentTarget);
  evt.currentTarget.setAttribute('style','background:yellow')
};
for(let i=0;i<exampleElements.length;i++){
  console.log(exampleElements[i]);
  exampleElements[i].setAttribute('style','color:green');
  exampleElements[i].addEventListener('click',changeColor);
}
for(const element of exampleElements){
  element.innerHTML="Modified"
}
exampleElements.forEach(element=>{
  element.innerHTML="Modified again";
});