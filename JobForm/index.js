$(document).ready(()=>{
  
  numOfClicks = 1;
  

  $("#add-goal").click( () => {

    const duplicator = $("#duplicator-1").child;
    console.log(duplicator);
    
    numOfClicks++;
    // if (numOfClicks <= 2) {
  
    //   let clone = original.cloneNode(true);
    //   clone.childNodes[9].childNodes[1].value = "";
    //   clone.childNodes[3].childNodes[1].name = "ex_" + (numOfClicks + 1) + "_name";
    //   clone.childNodes[5].childNodes[1].name = "ex_" + (numOfClicks + 1) + "_sets";
    //   clone.childNodes[7].childNodes[1].name = "ex_" + (numOfClicks + 1) + "_reps";
    //   clone.childNodes[9].childNodes[1].name = "ex_" + (numOfClicks + 1) + "_desc";
    //   clone.id = "duplicator" + ((numOfClicks++)+1);
    //   var txt = '<h6>Ex' + (numOfClicks ) +  '</h6>';
    //   clone.childNodes[1].innerHTML = txt;
    //   clones.push(clone);
    //   original.parentNode.appendChild(clone);
    // }
  })


  $("#delete-goal").click(() =>{

  })
})




