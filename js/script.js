let tasks = [
 
];
        function getItemsFromStorage(){
            let retrivedTasks = JSON.parse(localStorage.getItem("My Task"));
            if(retrivedTasks == null){
                tasks = []
            }else{
            tasks = retrivedTasks;
            }
        }

        getItemsFromStorage()

        alert("أضف المهام الخاصه بك وابدأ سلسله من الإنجازات")

    function fillTask(){
        document.getElementById("tasks").innerHTML = ""
        let index = 0;
        for(task of tasks){
            let content =
            `
                <div class="task ${task.isDone ?'task-done' :''}">
                    <div class="first">
                        <div id="first">
                            <h1>${task.title}</h1>
                        </div>
                        <div class="date"><i class="fa-solid fa-calendar-days"></i> ${task.date}</div>
                    </div>
                    <div class="second">
                        <button class="del" onclick="deleteTask(${index})"><i class="fa-solid fa-trash trash"></i></button>
                        ${task.isDone ? `<button class="xdone" onclick="completeTask(${index})"><i class="fa-solid fa-xmark xmark"></i></button>`: `<button class="done" onclick="completeTask(${index})"><i class="fa-solid fa-check check"></i></button>`}
                        <button class="edit" onclick="editTask(${index})"><i class="fa-solid fa-pen pen"></i></button>
                    </div>
                </div>
            `
            document.getElementById("tasks").innerHTML += content  
            index++    
        }
    }
    fillTask()

    function showCustomPrompt() {
        document.getElementById('prompt-overlay').style.display = 'block';
        document.getElementById('custom-prompt').style.display = 'block';
    }
    
    function submitPrompt() {
        const userInput = document.getElementById('prompt-input').value;
        let now = new Date();
        let dateYear = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear();
    let taskObj = {
        title: userInput,
        date: dateYear,
        isDone: false
    }
        tasks.push(taskObj)
        storage()

        fillTask()
        document.getElementById('prompt-overlay').style.display = 'none';
        document.getElementById('custom-prompt').style.display = 'none';
    }
    
    function cancelPrompt() {
        document.getElementById('prompt-overlay').style.display = 'none';
        document.getElementById('custom-prompt').style.display = 'none';
    }

        document.getElementById("add").addEventListener("click", function(){
            let taskName = showCustomPrompt()
        fillTask()
        })

        function deleteTask(index){
            let task = tasks[index]
        let isConfirm = confirm("هل أنت متأكد من حذف: " + task.title)

        if(isConfirm == true){
            tasks.splice(index, 1)
            storage()
            fillTask()
        }
        }

        function editTask(index){
            let task = tasks[index]
            let newTaskName = prompt("أدخل المهمة الجديدة بدلا من: "+task.title , task.title)
            if(newTaskName){
            task.title = newTaskName
            storage()
            fillTask()
            }
        }

        function completeTask(index){
            let task = tasks[index]
            task.isDone = !task.isDone;
            storage()
            fillTask()
        }

        // ============= Local Storage Code=========//
        function storage(){
        let myTaskString = JSON.stringify(tasks)
        localStorage.setItem("My Task", myTaskString)
        }