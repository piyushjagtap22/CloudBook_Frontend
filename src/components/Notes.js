import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/Notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context
    const Navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            Navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "General" })
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }
    const handleClick = async (e) => {
        // e.preventDefault();
        
        try {
            const isSuccess = await editNote(note.id, note.etitle, note.edescription, note.etag)
            if (isSuccess) {
                props.showAlert("Deleted Succesfully", "success")
            } else {
                props.showAlert("Error Deleting", "danger")
            }
        }
        catch (err) {
            props.showAlert("Error Deleting", "danger")
            console.log(err)
        }

        // if (res) {
        //     refClose.current.click();
        //     props.showAlert("Updated Succesfully", "success")
        // }
        // else {
        //     props.showAlert("Error Uupdating Notes, Please try again", "danger")
        // }


    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} placeholder="Enter Title" minLength={3} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} placeholder="Enter Description" minLength={5} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} placeholder="Enter Tag" />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary " onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2>Your Notes</h2>
            <div className='container row my-3'>
                <div className="container">
                    {notes.length === 0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {

                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />

                })}

            </div>
        </>
    )
}

export default Notes