let btn = document.querySelector("#manda");
let show = document.querySelector(".main");
let notas;
localStorage.getItem("minhasNotas") ? notas = localStorage.getItem("minhasNotas") : notas = [];

window.onload = function(){
    if(localStorage.getItem("minhasNotas")){
        loadNotes()
    }
}

btn.addEventListener("click", ()=>{
    let title = document.querySelector(".titulo").value;
    let text = document.querySelector(".texto").value;
    addNote(title, text);
    loadNotes();
})

//FUNCTIONS

function loadNotes(){
    show.innerHTML= "";
    let showNotes = notesManage();
    showNotes.forEach((note, i) => {
    constructVNote(note.noteTitle, note.noteText, i);
    });
}
function addNote(title, text){
    if (localStorage.getItem("minhasNotas")){
        notas = notesManage()
        notas.push({"noteTitle": title, "noteText": text});
    }
    else{
        notas.push({"noteTitle": title, "noteText": text});
    }
    notesManage(notas, "POST");
}
function constructVNote(title, text, i){
    let divNote = document.createElement("div");
    divNote.innerHTML =  `<h3>${title}</h3><p>${text}</p> <button onclick="deleteNote(${i})">Delete</button>`;
    show.appendChild(divNote)
}
function notesManage(attNotes=null, action=null){
    if(action == "POST")
        localStorage.setItem("minhasNotas", JSON.stringify(attNotes))
    else{
        notas = JSON.parse(localStorage.getItem("minhasNotas"));
        return notas;
    }
         
}
function deleteNote(id){
    notas = notesManage();
    notas.splice(id, 1);
    notesManage(notas, "POST");
    loadNotes();
}