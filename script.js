const notetitle = document.getElementById("title");
const notecontent = document.getElementById("note-content");
const button = document.getElementById("btn");
const notes = document.getElementById("notes");
const form = document.getElementById("noteForm");
const category = document.getElementById("filterCategory");
const search = document.getElementById("searchInput");
const selectcategory = document.getElementById("category");
let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let titleValue = notetitle.value;
    let contentValue = notecontent.value;
    let categoryValue = category.value;
    let note = {
        id:Date.now(),
        title: titleValue,
        content: contentValue,
        category: categoryValue
    };
    savedNotes.push(note);
    localStorage.setItem(
        "notes",
        JSON.stringify(savedNotes)
    );
    displayNote(note);
    form.reset();
});
function displayNote(note) {
    let newNote = document.createElement("div");
    newNote.className ="bg-black/40 border border-gray-300 rounded-xl p-5 mb-4 w-full shadow hover:shadow-lg transition-all";
    let newTitle = document.createElement("h3");
    newTitle.textContent = note.title;
    newTitle.className ="text-2xl font-bold text-amber-950 mb-2";
    let newContent = document.createElement("p");
    newContent.textContent = note.content;
    newContent.className ="text-gray-900 mb-7";
    let icon = document.createElement("div");
    let topRow = document.createElement("div");
    topRow.className ="flex justify-between items-center mb-2";
    icon.className ="flex gap-2";
    let deletebtn = document.createElement("button");
    deletebtn.innerHTML ='<i class="fa-solid fa-trash"></i>';
    deletebtn.className ="hover:bg-white/40 text-black/50 hover:text-red-800 rounded cursor-pointer p-1";
    deletebtn.addEventListener("click", function () {
        newNote.remove();
        savedNotes = savedNotes.filter(function (item) {
            return item.id !== note.id;
        });
        localStorage.setItem(
            "notes",
            JSON.stringify(savedNotes)
        );
    });
    let pin = document.createElement("button");
    pin.innerHTML ='<i class="fa-solid fa-thumbtack"></i>';
    pin.className ="hover:bg-white/40 text-black/50 hover:text-black rounded cursor-pointer p-1";
    pin.addEventListener("click", function () {
        notes.prepend(newNote);
        let pinIcon=pin.querySelector("i");
        rotatePin(pinIcon);
    });
    let edit = document.createElement("button");
    edit.innerHTML ='<i class="fa-solid fa-pencil"></i>';
    edit.className ="hover:bg-white/40 text-black/50 hover:text-black rounded cursor-pointer p-1";
    edit.addEventListener("click", function () {
        let newtitleValue =prompt("Enter new title:", newTitle.textContent);
        let newcontentvalue= prompt("Enter new content:", newContent.textContent);
        if (newtitleValue !== null) {
            newTitle.textContent =newtitleValue;
            note.title=newtitleValue;
        }
        if (newcontentvalue !== null) {
            newContent.textContent =newcontentvalue;
            note.content=newcontentvalue;
        }
        savedNotes = savedNotes.map(function (item) {
            if (item.id === note.id) {
            item.title = note.title;
            item.content = note.content;
        }
        return item;
    });
      localStorage.setItem(
        "notes",
        JSON.stringify(savedNotes)
    );
    });
    let newcategory =document.createElement("span");
    newcategory.textContent =note.category;
    newcategory.className ="bg-white/30 hover:bg-white rounded-2xl cursor-text p-1 text-amber-950 px-2 text-sm";
    topRow.append(newTitle);
    topRow.append(icon);
    icon.append(deletebtn);
    icon.append(pin);
    icon.append(edit);
    newNote.append(topRow);
    newNote.append(newContent);
    newNote.append(newcategory);
    notes.append(newNote);
}
savedNotes.forEach(function (note) {
    displayNote(note);
});
function rotatePin(button) {
    button.classList.toggle("rotate-45");
}
function filterNotes() {
    let searchValue =search.value.toLowerCase();
    let selectedCategory =selectcategory.value;
    let allNotes =notes.children;
    for (let i = 0; i < allNotes.length; i++) {
        let note = allNotes[i];
        let title =note.querySelector("h3").textContent.toLowerCase();
        let content =note.querySelector("p").textContent.toLowerCase();
        let noteCategory =note.querySelector("span").textContent;
        let searchMatch =title.includes(searchValue) ||content.includes(searchValue);
        let categoryMatch =selectedCategory === "All" ||noteCategory === selectedCategory;
        if (searchMatch && categoryMatch) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    }
}
search.addEventListener(
    "input",
    filterNotes
);
selectcategory.addEventListener(
    "change",
    filterNotes
);