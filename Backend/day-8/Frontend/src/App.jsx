import React, { useState, useEffect } from 'react';
import axios from 'axios';

/*
use case:
  - add notes from api
  - store it in state variable
  - show in ui 
  
  - Integrate with Backend:
    - for api calls:
      - use axios package
*/


/*
  problem:
    - I have a list of note-wrapper and each contain a note.
    - I want to apply a update note feature:
      - my thought process to create a feature:
        - 1. note wrapper contains two children note and update-form.
        - 2. when note update button clicked, then only update-form is visible, achieving this using a real dom and set update-form to display flex.
  - Now the problem arises:
    - It violates the rule of react:
        - Never use a real dom, use virtual dom to perform task
*/

/*
  solution to the problem:
    - what I have -> all notes
    - problem in functions:
      - handleUpdateNote(noteIndex, updateFlag)
      - handleUpdateNoteForm(e, id, noteIndex)
      - component note-wrapper
    - after applying the isEditing logic another problem appears:
      - reloading website everytime, I clicked on update from button
      - solution:
        - remove [notes] -> creates infinite loop
        - to []
*/


const App = () => {

  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  async function getAllNotes() {
    await axios.get("http://localhost:3000/notes")
      .then((res) => setNotes(res.data.notes))
      .catch((error) => console.log(error))
  }

  async function handleDeleteNote(id) {

    await axios.delete(`http://localhost:3000/notes/${id}`)
      .then((res) => console.log(res))

    getAllNotes();
  }

  async function handleNoteForm(e) {

    e.preventDefault();
    const { title, description } = e.target.elements;

    const note = {
      title: title.value,
      description: description.value
    };

    await axios.post("http://localhost:3000/notes", note)
      .then(res => console.log(res.data))
      .catch((error) => console.log(error))
  }

  async function handleUpdateNoteForm(e, id) {

    e.preventDefault();
    const { title, description } = e.target;
    const note = {
      title: title.value,
      description: description.value
    }

    await axios.patch(`http://localhost:3000/notes/${id}`, note)
      .then(res => setNotes(res.data.notes))
      .catch((error) => console.log(error))

    getAllNotes();
    setIsEditing(null);
  }

  useEffect(() => {
    getAllNotes();
  }, []);


  return (
    <div className='main'>
      <h1>Create note</h1>
      <form className='note-create-form' onSubmit={(e) => handleNoteForm(e)} >
        <input className='input-field' type="text" placeholder="Enter title" name='title' />
        <input className='input-field' type="text" placeholder="Enter description" name='description' />
        <button className='btn btn-green'>Add Note</button>
      </form>
      <div className="notes">
        {notes.map((note) => {
          return <div className='note-wrapper' key={note._id}>
            {
              isEditing === note._id &&
              <form className='note note-update-form' onSubmit={(e) => handleUpdateNoteForm(e, note._id)} >
                <input className='input-field' type="text" defaultValue={note.title} name='title' />
                <input className='input-field' type="text" defaultValue={note.description} name='description' />
                <div className='all-btn'>
                  <button className='btn' type='submit'>update</button>
                  <button className='btn' onClick={() => setIsEditing(null)}>cancel</button>
                </div>
              </form>}

            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <div className='all-btn'>
                <button className='btn' onClick={() => setIsEditing(note._id)}>update</button>
                <button className='btn' onClick={() => handleDeleteNote(note._id)}>Delete</button>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default App