


let tasks=[
        {
            "title":"",
            "date":"",
            "isDone":false
        }
]


 function getTaskFromStorage(){
    let retrivetasks= JSON.parse(localStorage.getItem("myTasks"))

    if(retrivetasks ==null){
        tasks=[]

    }else{ tasks =retrivetasks}
 }


getTaskFromStorage()
fillTasksOnThePage()

function fillTasksOnThePage(){
    let index=0
    
    document.getElementById("tasks").innerHTML=""

    for (const x of tasks){

    document.getElementById("tasks").innerHTML+=`
   <!-- TASK -->
                 <div class="task ${x.isDone?'done':''}">
                    <!--TASK INFO -->
                    <div style="width: 70%;">
                        <h2 id="title"> ${x.title}</h2>
                        <div>
                            <span class="material-symbols-outlined">
                                calendar_month
                            </span>
                            <span id="time">${x.date}</span>
                        </div>

                    </div>
                    <!--//TASK INFO// -->   

                    <!--TASK ACTION -->
                    <div  class="task-actions">
                        
                        ${x.isDone?`
                            <button class="cirular" style="background-color:red;color: white;">
                                <span onclick="doneTask(${index})" class="material-symbols-outlined">                               
                                    cancel
                                </span>   
                                </button>
                        ` : `
                            <button class="cirular" style="background-color:red;color: white;">
                            <span onclick="doneTask(${index})" class="material-symbols-outlined">
                                check
                            </span>   
                            </button>
                        `}
                        

                        <button class="cirular" style="background-color: green;color: white;">
                            <span onclick="deleteTask(${index})" class="material-symbols-outlined">
                                delete
                            </span>
                        </button>

                        <button class="cirular" style="background-color: chocolate;color: white;">
                            <span onclick="upoateTask(${index})" class="material-symbols-outlined">
                                edit
                            </span>
                            </button>
                        
                    </div>
                    <!--//TASK ACTION// -->

                 </div>
                
                 `
index++

}


}


//عدليه لشي احسن
document.getElementById("addNew").addEventListener("click",function(){
    console.log("click already")
    const Etitle = prompt("Enter task title:");
    let Now= new Date()
    let Edate=Now.getDate()+"/"+(Now.getMonth()+1)+"/"+Now.getFullYear()
    
    //const Edate = prompt("Enter task date:");

    tasks.push({title:Etitle, date:Edate, isDone:false})
    
    //حفظ
    storeTasks()
    fillTasksOnThePage()
})


function deleteTask(index){
    var confirmation = confirm("Do you want to delete: " + tasks[index].title + " ?")

    if(confirmation){
    tasks.splice(index,1);
    storeTasks()
    fillTasksOnThePage();
    }
}

function upoateTask(index){
    console.log(index)
    const newTitle=prompt("Enter the new title :",tasks[index].title)

    tasks[index].title = newTitle
    storeTasks()
    fillTasksOnThePage()
}

function doneTask(index){
    console.log(index)

    if(!tasks[index].isDone){
        tasks[index].isDone=true
        
        showGoodJob()
    }else{
        tasks[index].isDone=false
        
    }

    //alert("GOOD JOBE")

    

    //tasks.splice(index,1)
    storeTasks()
    fillTasksOnThePage()

}




function showGoodJob() {
    const popup = document.createElement("div");
    popup.textContent = "🎉 GOOD JOB! 🎉";

    popup.style.position = "fixed";
    popup.style.top = "20%";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.backgroundColor = "gold";
    popup.style.color = "black";

    /* responsive sizes */
    popup.style.fontSize = "6vw";           // scales on mobile
    popup.style.fontWeight = "bold";
    popup.style.padding = "4% 6%";
    popup.style.maxWidth = "90%";           // prevents overflow
    popup.style.textAlign = "center";

    popup.style.borderRadius = "4%";
    popup.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
    popup.style.zIndex = "1000";

    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.5s, transform 0.5s";

    document.body.appendChild(popup);

    requestAnimationFrame(() => {
        popup.style.opacity = "1";
        popup.style.transform = "translateX(-50%) translateY(-5%)";
    });

    setTimeout(() => {
        popup.style.opacity = "0";
        popup.style.transform = "translateX(-50%) translateY(-10%)";
        setTimeout(() => popup.remove(), 500);
    }, 2000);
}




///////////////// STORAGE FUNCTION/////////////////
function storeTasks(){
    let taskString=JSON.stringify(tasks)
    localStorage.setItem("myTasks",taskString)

}