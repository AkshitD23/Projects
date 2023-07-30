
  //CREATING AN ARRAY TO STORE LOCAL STORAGE TASKS SET
let tasks=[];
let responses=[];
//let fetchTasks=[];
//DIV WHERE WE HAVE TO PUT THE TITLE AND QUESTION
let div=document.getElementById("putHere");

let id=0;
if(JSON.parse(localStorage.getItem("ID"))){
  id=JSON.parse(localStorage.getItem("ID"))+1;
}
else{
  localStorage.setItem("ID",id);
}

        // ADDING ELEMENTS FROM RIGHT SIDE TO LEFT SIDE
let button=document.getElementById("questionSubmitButton");

button.addEventListener("click",function(){
  //GETTING TITLE AND QUESTION
   let title=document.getElementById("getSubject");
   let question=document.getElementById("getQuestion");


   //CREATING AN OBJECT OF TASK ONLY IF INPUT HAS A VALUE
   if(title.value && question.value){
      let task={};

      task.title=title.value;
      task.question=question.value; 
      task.id=id;
      localStorage.setItem("ID",task.id);
      tasks.push(task);
      localStorage.setItem("task",JSON.stringify(tasks));
      addToDOM(task);
      
      id++;
      title.value="";
      question.value="";
     
      
   }

    //ELSE GIVING AN ALERT THAT INPUT IS EMPTY
    else{
      alert("Provide values Input cannot be empty");
    }

  

//REMOVE THIS AFTER CHECK
});

// ADD TO DOM FUNCTION IT ADDS THE TITLE AND QUESTION TO LEFT SIDE


function addToDOM(task){


  let Outerdiv=document.createElement("div");
  Outerdiv.setAttribute("class","leftValues");
  Outerdiv.setAttribute("id",task.id);
  
  let Innerdiv1=document.createElement("div");
  Innerdiv1.setAttribute("class","fs-2 ms-2 mt-2 fontchange");
  Innerdiv1.innerHTML=task.title;
  Outerdiv.appendChild(Innerdiv1);

  let Innerdiv2=document.createElement("div");
  Innerdiv2.setAttribute("class","fs-6 ms-2 fontchange");
  Innerdiv2.innerHTML=task.question;
  Outerdiv.appendChild(Innerdiv2);

  let horizontalLine=document.createElement("hr");
  Outerdiv.appendChild(horizontalLine);


  // THIS WILL BE CALLED WHEN WE CLICK ON THE TITLE/QUESTION ON RIGHT SIDE
  Outerdiv.addEventListener('click',(event)=>{
          let responseDiv=document.querySelector("#responseAns");
          responseDiv.innerHTML="";
          //THIS WILL FETCH THE ID OF THE DIV ON WHICH WE WILL CLICK
          let outerDivID=Outerdiv.getAttribute("id");
          let temp={};

          temp=getTitleAndQuestionById(outerDivID);
          let clearDiv=document.querySelector('#beforeClick');

                 if(clearDiv.style.display!="none"){
                    clearDiv.style.display = "none";
                 }
                    let divAfterClick=document.querySelector("#titleAndQuestion");
                    let superOuterDiv=document.createElement("div");
                    let outerDiv=document.createElement("div");
                    outerDiv.setAttribute("id",temp.id);
                    let innerspan1=document.createElement("span");
                    innerspan1.setAttribute("class","afterTitle fontchange");
                    innerspan1.innerHTML=temp.title;
                    outerDiv.appendChild(innerspan1);
                    let brk=document.createElement("br");
                    outerDiv.appendChild(brk);
                    let innerspan2=document.createElement("span");
                    innerspan2.setAttribute("class","afterQuestion fontchange");
                    innerspan2.innerHTML=temp.question;
                      
                    outerDiv.appendChild(innerspan2);
                    superOuterDiv.appendChild(outerDiv);
                    divAfterClick.innerHTML=superOuterDiv.innerHTML;

                    let tempResponses=getNameAndResponseById(outerDivID);
                    console.log(tempResponses);
                    if(tempResponses!=0){
                      for(let i=0;i<tempResponses.length;i++){
                        addToDomResponse(tempResponses[i]);
                      }
                    }
                    let showDiv=document.querySelector("#afterClick");
                    showDiv.style.display = "block";
                    
                  
      });
  div.appendChild(Outerdiv);

}



// FUNCTION WHICH GETS THE TITLE AND QUESTION BASED ON THEIR ID'S;

function getTitleAndQuestionById(id){

  let tempObject=[];
  if(localStorage.getItem("task")){
    tempObject=JSON.parse(localStorage.getItem("task"))
    for(let i=0;i<tempObject.length;i++){
      if(tempObject[i].id==id){
        return tempObject[i];
      }
    }
  }
 
}
//FUCNTION ENDS




function getNameAndResponseById(id){
  let temp=[];
  let tempObject=[];
  if(localStorage.getItem("response")){
    tempObject=JSON.parse(localStorage.getItem("response"))
    for(let i=0;i<tempObject.length;i++){
      if(tempObject[i].id==id){
        temp.push(tempObject[i]);
      }
    }
    return temp;
  }
  return temp;
 
}



//FUNCTION TO FETCH DATA FROM LOCAL STORAGE AND PUT IT INTO ITS POSITION

fetchTitleAndQuestion();

function fetchTitleAndQuestion(){
  //IF LOCAL STORAGE IS NOT EMPTY THEN GETTING DATA
  if(localStorage.getItem("task")){
    tasks=JSON.parse(localStorage.getItem("task"));
  }

//ITERATING OVER THE DATA AND PUTTIN THEN INTO THE DOM USING 
for(let i=0;i<tasks.length;i++){
    addToDOM(tasks[i]); 
}
};

 //FUCNTION ENDS






      //CREATING A FUNCTION THAT FETCH DATA FROM RESPONSE AND ADD IT TO LOCAL STORAGE

let responseDiv=document.querySelector("#responseAns");

let responseButton=document.querySelector("#responseSubmitButton");

responseButton.addEventListener('click',(event)=>{
  let parentDiv=document.getElementById("titleAndQuestion"),childDiv;
  childDiv= parentDiv.childNodes[0];
  let childId=childDiv.id;
  let name=document.getElementById("getName");
  let response=document.getElementById("getComment");


      if(name.value && response.value){
            let nameAndResponse={};
            nameAndResponse.name=name.value;
            nameAndResponse.response=response.value; 
            nameAndResponse.id=childId;
            responses.push(nameAndResponse);
            localStorage.setItem("response",JSON.stringify(responses));
            addToDomResponse(nameAndResponse);
            name.value="";
            response.value="";
        }

});

fetchResponses();
function fetchResponses(){
  //IF LOCAL STORAGE IS NOT EMPTY THEN GETTING DATA
  if(localStorage.getItem("response")){
    responses=JSON.parse(localStorage.getItem("response"));
  }

//ITERATING OVER THE DATA AND PUTTIN THEN INTO THE DOM USING 
};

function addToDomResponse(obj){
  let responseDiv=document.querySelector("#responseAns");
  let outerDivR=document.createElement("div");
  let innerdiv1R=document.createElement("div");
  innerdiv1R.setAttribute("class","fs-2 ms-2 mt-2 fontchange name");
  innerdiv1R.innerHTML=obj.name;
  outerDivR.appendChild(innerdiv1R);
 
  let innerdiv2R=document.createElement("div");
  innerdiv2R.setAttribute("class","fs-6 ms-2 fontchange response");
  innerdiv2R.innerHTML=obj.response;
  outerDivR.appendChild(innerdiv2R);

  let horizontalLineR=document.createElement("hr");
  outerDivR.appendChild(horizontalLineR);

  responseDiv.appendChild(outerDivR);

}




    //THIS FUNCTION IS CALLED WHEN WE CLICK ON NEW QUESTION FORM BUTTON
let rightActivatebutton=document.getElementById("activateRightSide");
rightActivatebutton.addEventListener("click",(event)=>{
  let clearDiv=document.querySelector('#beforeClick');
  clearDiv.style.display="block";

  let showDiv=document.querySelector("#afterClick");
      showDiv.style.display = "none";
    

});

  //FUNCTION ENDS







/*
  1.) NOW I HAVE TO CREATE A FUCNTION WHICH COMPARE THE CLICKED DIV TITLE 
  AND SHOW ITS RESPONSES. 
  2.) HAVE TO FIX THE PROBLEM(fetching elements into the localStorage
  printing the whole array again and again in both case RESPONSE AND TITLE).
  3.) CLICK EVENT ON THE DIV IS ONLY ON THE FIRST DIV.
  4.) CLICK ON RESOLVE BUTTON WILL DELETE ONLY THE GIVEN TITLE.
  5.) WORKING OF SEARCH BOX.
  6.) UPVOTE AND SORTING ACCORDING TO IT. 

 */




