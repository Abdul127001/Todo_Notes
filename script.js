const Add_Card = document.querySelector('.add-card'),
Model_box = document.querySelector('.model'),
Close_Model = document.querySelector('header i'),
Add_Note = document.querySelector('main button'),
Title = document.querySelector("#title"),
Message = document.querySelector("textarea"),
Month_Arr = ["Jan","Feb","March","April","May","June","july","Aug","Sep","Oct","Nov","Dec"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]"); 



Add_Card.addEventListener('click', () => {
    Model_box.classList.add('show');
})

Close_Model.addEventListener('click', () => {
    Title.value="";
    Message.value="";
    Model_box.classList.remove('show');  
})

window.onclick = function(event) {
    if (event.target == Model_box) {
        Model_box.style.display = "none";
    }
}

let ShowNotes = () => {
    document.querySelectorAll('.note').forEach(note=>note.remove());
    notes.map((note,id)=>{
        let New_Note = ` <li class="note">
                <div class="details">
                    <p>${note.title}</p>
                    <span>${note.message}</span>
                </div>
                <div class="details-footer">
                    <span>${note.date}</span>
                    <div class="settings">
                        <i class="fa-solid fa-ellipsis" onclick="ShowSettings(this)"></i>
                        <ul class="menu">
                            <li><i class="fa-solid fa-pen-to-square"></i>Edit</li>
                            <li  onclick="DeleteNote(${id})"><i class="fa-solid fa-trash-can" ></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>`;
        Add_Card.insertAdjacentHTML('afterend', New_Note);
    })
}

ShowNotes();

function ShowSettings(elem)  {
elem.parentElement.classList.add("show");
document.addEventListener("click", (e)=>{
    if(e.target.tagName != "I" || e.target != elem) {
        elem.parentElement.classList.remove("show");
    }
})
}

function DeleteNote(NoteId) {
    notes.splice(NoteId,1);
    localStorage.setItem("notes", JSON.stringify(notes));
    ShowNotes();
}


Add_Note.addEventListener('click', () => {
//   console.log(Title.value, Message.value)
if(Title.value || Message.value) {
    let Cur_Date = new Date(),
    Day = Cur_Date.getDate(),
    Month = Month_Arr[Cur_Date.getMonth()],
    Year = Cur_Date.getFullYear();

    // console.log(Month, Day, Year);

    let Details = {
        title:Title.value, message:Message.value, date:`${Day} ${Month}, ${Year}`
    }

    // console.log(Details);

   
    notes.push(Details);
    localStorage.setItem("notes", JSON.stringify(notes));
    Close_Model.click();
    ShowNotes();

    
} 

})








