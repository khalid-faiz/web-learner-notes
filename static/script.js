function saveUser(){
    // prevent default action
    let form = document.getElementById("user-name-form");
    form.addEventListener('submit', e=>e.preventDefault());

    // get name
    let name = document.getElementById("user-name-input").value;
    if (name.length == 0){
        // Print a message and get out
        let notify = document.getElementById("notify");
        notify.style.top = '5%'
        notify.innerHTML = "<p>Please provide your name.</p>"
        setTimeout(() => {
            setTimeout(()=>notify.innerHTML = "", 2000);
            notify.style.top = '-15%';
        }, 3000);
        return;
    }
    // put it to the localStorage
    localStorage.setItem("note-user-name", name);
    document.body.removeChild(document.getElementById("modal-container"));
    let welcome = document.getElementById("hello");
    welcome.innerText = `Welcome ${localStorage.getItem("note-user-name")}`
}

// check if user already entered thier name
if (localStorage.getItem("note-user-name") == null) {
    let body = document.body

    let modal = `<div id="modal-underlay">
    </div>
    <div id="modal-content">
        <h4 id="modal-title">Welcome message</h4>
        <p>Your name will be saved in your localStorage and never leaves your device, you can add a nick if you wish.</p>
        <form action="" id="user-name-form">
            <input type="text" name="user" id="user-name-input">
            <br>
            <button id="modal-confirm" onclick="saveUser()">Confirm</button>
        </form>
    </div>`

    let modalNode = document.createElement("div");
    modalNode.id = "modal-container";
    modalNode.innerHTML = modal;
    body.appendChild(modalNode);

    setTimeout(()=>{
        let modalContent = document.getElementById("modal-content");
        modalContent.style.marginTop = "10vh";
    }, 50)
}
else{
    let Welcome = document.getElementById("hello");
    Welcome.innerText = `Welcome back ${localStorage.getItem("note-user-name")}`
}

// confirm single note deletion
function confirmDelete(NoteID) {
    let body = document.body

    let modal = `<div id="modal-underlay">
    </div>
    <div id="modal-content">
        <h4 id="modal-title">Confirm Deletion</h4>
        <p>Are you sure you want to delete this note?</p>
        <form action="/delete-note" id="user-name-form">
            <input type="hidden" name="id" value="${NoteID}">
            <br>
            <button id="modal-confirm">Confirm</button>
        </form>
    </div>`

    let modalNode = document.createElement("div");
    modalNode.id = "modal-container";
    modalNode.innerHTML = modal;
    body.appendChild(modalNode);

    setTimeout(()=>{
        let modalContent = document.getElementById("modal-content");
        modalContent.style.marginTop = "10vh";
    }, 50)
}

// confirm delete all
function confirmClearAll() {
    // if there is no notes to clear, send toast
    if (document.getElementById("notes").children[0].innerText == "There are no notes to show"){
        // send a message and get out
        let notify = document.getElementById("notify");
        notify.style.top = '5%'
        notify.innerHTML = "<p>You can't clear an empty note pool.</p>"
        setTimeout(() => {
            setTimeout(()=>notify.innerHTML = "", 2000);
            notify.style.top = '-15%';
        }, 3000);
        return;
    }
    
    let body = document.body

    let modal = `<div id="modal-underlay">
    </div>
    <div id="modal-content">
        <h4 id="modal-title">Confirm Deletion</h4>
        <p>Are you sure you want to delete <b>All Notes</b>?</p>
        <form action="/delete-all-notes" id="user-name-form">
            <button id="modal-confirm">Confirm</button>
        </form>
    </div>`

    let modalNode = document.createElement("div");
    modalNode.id = "modal-container";
    modalNode.innerHTML = modal;
    body.appendChild(modalNode);

    setTimeout(()=>{
        let modalContent = document.getElementById("modal-content");
        modalContent.style.marginTop = "10vh";
    }, 50);
}

// Validate note addition
function validateAddition() {
    let noteName = document.getElementById("note-name").value;
    let noteDescription = document.getElementById("note-description").value;
    if (noteName == "") {
        // send a message and get out
        let notify = document.getElementById("notify");
        notify.style.top = '5%'
        notify.innerHTML = "<p>Please add a note name before adding it.</p>"
        setTimeout(() => {
            setTimeout(()=>notify.innerHTML = "", 2000);
            notify.style.top = '-15%';
        }, 3000);
        return false;
    }
    if (noteDescription == "") {
        // send a message and get out
        let notify = document.getElementById("notify");
        notify.style.top = '5%'
        notify.innerHTML = "<p>Please add a note description before adding it.</p>"
        setTimeout(() => {
            setTimeout(()=>notify.innerHTML = "", 2000);
            notify.style.top = '-15%';
        }, 3000);
        return false;
    }
}

// validate search
function validateSearch() {
    let keyword = document.getElementById("search-input").value;
    if (keyword == "") {
        // send a message and get out
        let notify = document.getElementById("notify");
        notify.style.top = '5%'
        notify.innerHTML = "<p>Please add a search term.</p>"
        setTimeout(() => {
            setTimeout(()=>notify.innerHTML = "", 2000);
            notify.style.top = '-15%';
        }, 3000);
        return false;
    }
}