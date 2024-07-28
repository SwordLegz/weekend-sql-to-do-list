function onReady() {
    console.log('JS is sourced!');
    getToDoItem()
}
// GET
function getToDoItem() {
    // console.log(`in getToDoItem`)
    axios({
        method: `GET`,
        url: `/todos`
    }).then((response) => {
        console.log(`Got something back in my GET /todos!`, response)
        document.getElementById(`toDoListTable`).innerHTML = ``
        for (let item of response.data) {
            if(item.isComplete){
            document.getElementById(`toDoListTable`).innerHTML += `
            <tr data-testid="toDoItem" class="completed container">
            <td>${item.text}</td>
            <td class="buttonColumn"><button data-testid="completeButton" class="btn btn-complete" onClick="toggleCompleted('complete', ${item.id})">Completed!</button>
            <button data-testid="deleteButton" class="btn btn-delete" onClick="deleteToDoItem(${item.id})">Delete</button></td>
            </tr>`
        } else{
            document.getElementById(`toDoListTable`).innerHTML += `
            <tr data-testid="toDoItem" class="incomplete container">
            <td>${item.text}</td>
            <td class="buttonColumn"><button data-testid="completeButton" class="btn btn-incomplete" onClick="toggleCompleted('incomplete', ${item.id})">Incomplete</button>
            <button data-testid="deleteButton" class="btn btn-delete" onClick="deleteToDoItem(${item.id})">Delete</button></td>
            </tr>`
        }
        }
    }).catch((error) => {
        console.log(`Error in GET route!`, error)
    })
}

// POST
function postToDoForm(e) {
    e.preventDefault()
    console.log(`postToDoForm recieved a request!`)
    let itemToPost = document.getElementById(`toDoFormText`).value
    axios({
        method: `POST`,
        url: `/todos`,
        data: { text: itemToPost }
    }).then((response) => {
        document.getElementById(`toDoFormText`).value = ``
        getToDoItem()
    }).catch((error) => {
        console.log(`Oopsie! Recieved an error in the POST/todos!`, error)
    })
    //
}

//  PUT
function toggleCompleted(status, itemId){
    axios({
        method: 'PUT',
        url: `/todos`,
        data: {status: status, itemId: itemId}
    }).then((response) =>{
        console.log(`PUT done!`)
        getToDoItem()
    }).catch((error) =>{
        console.log(`Errorrrr` , error)
    })
}

// DELETE
function deleteToDoItem(itemId){
    // console.log(`DELETE item ${itemId}!`)
    Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Your task has been deleted!",
        showConfirmButton: false,
        timer: 1500
      });
    axios({
        method: `DELETE`,
        url: `/todos/${itemId}`,
    }).then((response) =>{
        getToDoItem()
    }).catch((error) =>{
        console.log(`Error in POST /todos:`, error)
    })
}

onReady()