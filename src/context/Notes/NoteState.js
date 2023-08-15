import NoteContext from "./NoteContext"
import { useState } from "react";
import { fetchNote, createNote, updateNote, removeNote } from '../../api/notesApi';
const NoteState = (props) => {
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Get All Notes
  const getNotes = async () => {
    await fetchNote(localStorage.getItem('token')).then((res) => {
      console.log(res)
      if (res.status === 200) {
        setNotes(res.data)
        return true
      } return false
    }).catch((err) => {
      console.log(err)
    })
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    return new Promise((resolve, reject) => {
      createNote(localStorage.getItem('token'), { title, description, tag })
        .then((res) => {
          if (res.status === 200) {
            setNotes(notes.concat(res.data))
            resolve(true)
          }
          resolve(false)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        });
    })
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    return new Promise((resolve, reject) => {
      updateNote(localStorage.getItem('token'), { id, title, description, tag })
        .then((res) => {
          if (res.status === 200) {
            setNotes(notes.concat(res.data))
            let newNotes = JSON.parse(JSON.stringify(notes))
            for (let index = 0; index < newNotes.length; index++) {
              const element = newNotes[index];
              if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
              }
            }
            setNotes(newNotes)
            resolve(true)
          }
          resolve(false)
        })
        .catch((error) => {
          console.log(error);
          reject(error)
        });
    })
  }

  //Delete a Note
  const deleteNote = async (id) => {
    return new Promise((resolve, reject) => {
      removeNote(localStorage.getItem('token'), id).then((res) => {
        if (res.status === 200) {
          console.log('in')
          const newNotes = notes.filter((note) => { return note._id !== id })
          setNotes(newNotes)
          resolve(true);
        }
        resolve(false);
      }).catch((err) => {
        console.log(err)
        reject(err);
      })
    })
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState