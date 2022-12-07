
function itemTemplate(item) {
    return `
        <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.text}</span>
            <div>
                <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
        </li>    
    `;
}

// lista cose da fare
let liHTML = items.map(function(item) {
    return itemTemplate(item);
}).join('');

document.getElementById("item-list").insertAdjacentHTML("beforeend", liHTML);

//CREATE
let createField = document.getElementById("create-field");
document.getElementById("create-form").addEventListener("submit", function(event) {
    event.preventDefault();
    axios.post('/create-item', {text: createField.value}).then(
        function(response) {
            //CREAZIONE HTML NUOVO
            document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data));
            createField.value = "";
            createField.focus();
        }
    ).catch(
        function() {
            console.log("cornuto, hai sbagliato");
        }
    );
});

document.addEventListener("click", function(event) {
    // UPDATE
    if(event.target.classList.contains("edit-me")) {
        let userInput = prompt("Aggiornami", event.target.parentElement.parentElement.querySelector(".item-text").innerHTML);
        if(userInput) {
            axios.post('/update-item', {text: userInput, id: event.target.getAttribute("data-id")}).then(
                function() {
                    event.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput;    
                }
            ).catch(
                function() {
                    console.log("cornuto, hai sbagliato");
                }
            );
        }
    }
    // DELETE
    if(event.target.classList.contains("delete-me")) {
        if(confirm("Sei sicuro di voler eliminare questo elemento?")) {
            axios.post('/delete-item', {id: event.target.getAttribute("data-id")}).then(
                function() {
                    event.target.parentElement.parentElement.remove();
                }
            ).catch(
                function() {
                    console.log("cornuto, hai sbagliato");
                }
            );
        }
    }
});