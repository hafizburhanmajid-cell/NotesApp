const notetitle=document.getElementById("title");
const notecontent=document.getElementById("note-content");
const button=document.getElementById("btn");
const notes=document.getElementById("notes");
const form = document.getElementById("noteForm");
const category=document.getElementById("filterCategory")
form.addEventListener("submit",function(event){
    event.preventDefault();
    let titleValue=notetitle.value;
    let contentValue=notecontent.value;
    let categoryValue=category.value;
    let newNote=document.createElement("div");
    newNote.className ="bg-black/40 border border-gray-300 rounded-xl p-5 mb-4 w-full shadow hover:shadow-lg transition-all";
    let newTitle = document.createElement("h3");
    newTitle.textContent = titleValue;
    newTitle.className ="text-2xl font-bold text-amber-950 mb-2";
    let newContent = document.createElement("p");
    newContent.textContent = contentValue;
    newContent.className ="text-gray-900 mb-7";
    let icon =document.createElement("div");
    let topRow=document.createElement("div");
    topRow.className="flex justify-between  items-center mb-2"
    icon.className="flex gap-2"
    let deletebtn=document.createElement("button");
    deletebtn.innerHTML='<i class="fa-solid fa-trash"></i>';
    deletebtn.className="hover:bg-white/40 text-black/50 hover:text-red-800 rounded cursor-pointer p-1";
    deletebtn.addEventListener("click",function(){
        newNote.remove();
    });
    let pin=document.createElement("button");
    pin.innerHTML='<i class="fa-solid fa-thumbtack"></i>';
    pin.className="hover:bg-white/40 text-black/50 hover:text-black rounded cursor-pointer p-1";
    pin.addEventListener("click",function(){
        notes.prepend(newNote);
    });
    let edit=document.createElement("button");
    edit.innerHTML='<i class="fa-solid fa-pencil"></i>';
    edit.className="hover:bg-white/40 text-black/50 hover:text-black rounded cursor-pointer p-1";
    edit.addEventListener("click",function(){
        let newtitleValue=prompt("Enter new title:");
        let newcontentvalue=prompt("Enter new content:");
        if(newtitleValue!==null){
            newTitle.textContent=newtitleValue;
        }
        if(newcontentvalue !== null){
            newContent.textContent=newcontentvalue;
        }
    });
let newcategory=document.createElement("span");
newcategory.textContent=categoryValue;
newcategory.className="bg-white/30 hover:bg-white rounded-2xl cursor-pointer p-1 text-amber-950 px-2 text-sm";
    topRow.append(newTitle);
    topRow.append(icon);
    icon.append(deletebtn);
    icon.append(pin);
    icon.append(edit);
    newNote.append(topRow);
    newNote.append(newContent);
    newNote.append(newcategory);
    notes.append(newNote);
});