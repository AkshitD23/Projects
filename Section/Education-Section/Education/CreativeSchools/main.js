$(document).ready(function() { 
    $('.poster').hover(function(){
      var src = $(".poster img").attr('src');
  
      if(src=="./images/frnt.jpg")
        $(".poster img").attr('src',"./images/bck.jpg");
      else
        $(".poster img").attr('src',"./images/frnt.jpg");
    });
  });


  function addlike(){
    var foo=document.getElementById("likes").innerHTML;
    foo++;
    document.getElementById("likes").innerHTML=foo;
  }
  function adddislike(){
    var fo=document.getElementById("dislikes").innerHTML;
    fo++;
    document.getElementById("dislikes").innerHTML=fo;
  }
 
  