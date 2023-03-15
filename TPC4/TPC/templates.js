exports.toDoListPage = function (tasks, users, max, maxUser) {
    var pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>To do list</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body class="w3-2018-almost-mauve">
        <header class="w3-container w3-center w3-2021-french-blue">
            <h1><b>To do list</b></h1>
        </header>
        <main class="w3-center">
            <div class="w3-cell-row">
                <div class="w3-container w3-cell" style="width:50%">
                    <h3 class="w3-margin-top" style="color:rgb(2, 48, 71)"><b>Add Task</b></h3>
                <form action="/tasks/registo" class="w3-container  w3-center w3-margin" method="POST">
                    <input type="hidden" name="id" value=${max}>
                    <label><p class="w3-2021-french-blue w3-center w3-round" ><b>Task</b></p></label>
                    <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="title">
                    <label><p class="w3-2021-french-blue w3-center w3-round" ><b>Task Description</b></p></label>
                    <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="description">
                     
                    <label><p class="w3-2021-french-blue w3-round"><b>User</b></p></label>
                    <select class="w3-select w3-border w3-round" name="user">
                    <option class="w3-center" value="" disabled selected>---</option>
                    `
    for (let i = 0; i < users.length; i++) {
        pagHTML += `
            <option class="w3-center" value="${users[i].id}">${users[i].name}</option>
            `
    }
    pagHTML +=
        `
                    </select>
                      

                    <label><p class="w3-2021-french-blue w3-round"><b>Due date</b></p></label>
                    <input class="w3-input w3-border w3-round w3-center" type="date" name="due">
                    
                    <button class="w3-btn w3-round w3-2021-french-blue w3-margin-top" type="submit">Add Task</button>
                     
                    </form>
                </div>
                <div class="w3-container w3-cell" style="width:50%">
                    <h3 class="w3-margin-top" style="color:rgb(2, 48, 71)"><b>Add User</b></h3>
                    <form action="/users/registo" class="w3-container  w3-center w3-margin" method="POST">
                        <input type="hidden" name="id" value=${maxUser}>
                        <label><p class="w3-2021-french-blue w3-center w3-round" ><b>Name</b></p></label>
                        <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="name">
                         
                        <label><p class="w3-2021-french-blue w3-round"><b>Occupation</b></p></label>
                        <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="occupation">
                          
    
                        <label><p class="w3-2021-french-blue w3-round"><b>E-mail</b></p></label>
                        <input class="w3-input w3-border w3-round w3-center" type="email" name="email">
                        
                        <button class="w3-btn w3-round w3-2021-french-blue w3-margin-top" type="submit">Add User</a>
                         
                        </form>
                </div>
            </div>
            
            <div class="w3-cell-row w3-margin-top">
                <div class="w3-container w3-cell" style="width:40%">
                    <div class="w3-container w3-center w3-2021-french-blue w3-round w3-margin-bottom"><h3>Tasks to be done</h3></div>
                    `


    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].finished == false) {
            u=tasks[i].user-1
            console.log(u)
            pagHTML += `
                <!-- Each Task Info -->
                <div class="w3-container w3-center w3-2021-french-blue w3-round w3-margin-top">
                    <p class="w3-right-align">
                        <a href="/tasks/edit/${tasks[i].id}"><b>Edit</b></a>|<a href="/tasks/delete/${tasks[i].id}"><b>Delete</b></a>|<a href="/tasks/done/${tasks[i].id}"><b>Done</b></a>
                    </p>  
                    <p><b>Task:</b> ${tasks[i].title}</p>  
                    <p><b>Description:</b> ${tasks[i].description}</p>  
                    <p><b>User:</b> ${users[u].name}</p> 
                    <p><b>Due date:</b> ${tasks[i].due}</p>  
                </div>`
        }
    }

    pagHTML += `</div>
        <div class="w3-container w3-cell" style="width:40%">
                    <div class="w3-container w3-center w3-2021-french-blue w3-round w3-margin-bottom"><h3>Completed Tasks</h3></div>
                  `

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].finished==true) {
            pagHTML += `
                <div class="w3-container w3-center w3-2021-french-blue w3-round w3-round w3-margin-top">
                    <p class="w3-right-align">
                        <a href="/tasks/delete/${tasks[i].id}"><b>Delete</b></a>
                    </p>
                    <p><b>Task:</b> ${tasks[i].title}</p>  
                    <p><b>Description:</b> ${tasks[i].description}</p>  
                    <p><b>User:</b> ${tasks[i].user}</p> 
                    <p><b>Due date:</b> ${tasks[i].due}</p>  
                </div>
                `
        }
    }

    pagHTML += `
                </div>
                <div class="w3-container w3-cell" style="width:20%">

                   <div class="w3-container w3-center w3-2021-french-blue w3-round w3-margin-bottom"><h3>Users</h3></div>
    `


    for (let i = 0; i < users.length; i++) {
        pagHTML += `
            <div class="w3-container w3-center w3-2021-french-blue w3-round w3-margin-top">
                <p><b>Id:</b> ${users[i].id}</p>
                <p><b>Name:</b> ${users[i].name}</p>
                <p><b>Occupation:</b> ${users[i].occupation}</p>
                <p><b>Email:</b> ${users[i].email}</p>
            </div>`
    }

    pagHTML += `
                </div>
            </div>
            
        </main>

        <footer class="w3-container w3-center w3-2021-french-blue w3-margin-top">
            <h5>Created by <b>Ricardo O.</b></h5>
          </footer>
    </body>
</html>
    `

    return pagHTML
}

exports.editTaskPage = function (task, users) {
    var pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>To do list</title>
        <link rel="stylesheet" href="./public/w3.css"/>
    </head>
    <body class="w3-2018-almost-mauve">
        <header class="w3-container w3-center w3-2021-french-blue">
            <h1><b>Edit Task</b></h1>
        </header>
        <main class="w3-center">
            
                <div class="w3-container w3-center" >
                    <h3 class="w3-margin-top" style="color:rgb(2, 48, 71)"><b>Edit Task</b></h3>
                <form class="w3-container  w3-center w3-margin" method="POST">

                    <label><p class="w3-2021-french-blue w3-center w3-round" ><b>Task</b></p></label>
                    <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="title" value="${task.title}">
                    <label><p class="w3-2021-french-blue w3-center w3-round" ><b>Task Description</b></p></label>
                    <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="description" value="${task.description}">

                    <label><p class="w3-2021-french-blue w3-round"><b>User</b></p></label>
                    <select class="w3-select w3-border w3-round" name="user">
                    <option class="w3-center" value="${task.user}" disabled selected>---</option>
                    `
    for (let i = 0; i < users.length; i++) {
        pagHTML += `
            <option class="w3-center" value="${users[i].id}">${users[i].name}</option>
            `
    }
    pagHTML +=
        `
                    </select>
                      

                    <label><p class="w3-2021-french-blue w3-round"><b>Due date</b></p></label>
                    <input class="w3-input w3-border w3-round w3-center" type="date" name="due" value=${task.due}>

                    <button class="w3-btn w3-round w3-2021-french-blue w3-margin-top" type="submit">Edit Task</button>
                     
                    </form>
                </div>
                
           
            
         
            
        </main>

        <footer class="w3-container w3-center w3-2021-french-blue w3-margin-top">
            <h5>Created by <b>Ricardo O.</b></h5>
          </footer>
    </body>
</html>
    `

    return pagHTML
}