import React, { useContext, useState } from 'react'
import noteContext from '../context/Notes/NoteContext'
function AddNote(props) {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const isSuccess = await addNote(note.title, note.description, note.tag)
            if (isSuccess) {
                setNote({ title: "", description: "", tag: "" })
                props.showAlert("Added Succesfully", "success")
            }
            else {
                props.showAlert("Error Adding Note, Please Try Again Later", "danger")
            }
        }
        catch (err) {
            props.showAlert("Error Adding Note, Please Try Again Later", "danger")
            console.log(err)
        }
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h1>Add a Note</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} placeholder="Enter Title" minLength={3} value={note.title} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} placeholder="Enter Description" minLength={5} value={note.description} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} placeholder="Enter Tag" />
                </div>


                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>


        </div>
    )
}

export default AddNote