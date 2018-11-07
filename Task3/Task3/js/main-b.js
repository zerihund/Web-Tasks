// Create function 'showImages' which
// loads images.json which has links to images as an array.

// create a loop which builds the following HTML from every image in the array: 
/*
<li>
    <figure>
        <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
        <figcaption>
            <h3>Title</h3>
        </figcaption>
    </figure>
</li>
*/
// After the loop print the HTML into <ul> element using innerHTML.
const showImages=(images) =>{
  images.forEach((images)=>{
    document.querySelector('ul').innerHTML+=` <li><figure>
        <a href="img/original/${images.mediaUrl}"><img src="img/thumbs/${images.mediaThumb}"></a>
        <figcaption>
            <h3>${images.mediaTitle}</h3>
        </figcaption>
    </figure></li>`;
  })
  /*for (let i=0;i<images.length;i++){
    console.log(images[i]);
  } */
 /* document.querySelector('ul').innerHTML = images.map((image)=>{

  })*/
}

fetch('images.json').then((response)=> {
  return response.json();
}).then((json)=>{
  showImages(json);
});