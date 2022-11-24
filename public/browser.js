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