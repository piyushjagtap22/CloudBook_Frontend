import React, { useContext } from 'react'
import noteContext from '../context/Notes/NoteContext';

function NoteItem(props) {

    let { title, description, tag } = props.note;

    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                {/* <img src="..." className="card-img-top" alt="..."/> */}
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{title}</h5>
                        {/* {tag} */}
                        <i className="fa-solid fa-pen-to-square mx-2 mb-3" onClick={() => {
                            updateNote(note);
 
                        }}></i>
                    </div>
                    <p className="card-text"> {description}</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    <i className="fa-solid fa-trash-can mx-2 mb-3" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Succesfully","success")}}></i>

                </div>
            </div>
        </div>
    )
}

export default NoteItem