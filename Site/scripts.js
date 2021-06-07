//alert('here');

const checkpoint = 300;
 
window.addEventListener("scroll", () => {
  var opacity = 0;
  const currentScroll = window.pageYOffset;
  /*
  if (currentScroll <= checkpoint) {
    opacity = 0;
  } else {
	opacity = 1 - (currentScroll / checkpoint);
  }
  */
  
  if(currentScroll <= checkpoint){
	  opacity = (currentScroll / checkpoint);
  }
  else{
	  opacity = 1
  }
  
  /*
  if(currentScroll > 200){
	  opacity = 1;
  }
  */
  
  if(opacity < 0.3){
	  opacity = 0.3;
  }
  
  document.querySelector("#programming-section").style.opacity = opacity;
  document.querySelector("#test").innerHTML = currentScroll;
});