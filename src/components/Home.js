import React, { useContext } from 'react'
import noteContext from '../context/Notes/NoteContext';
import Notes from './Notes';
const Home = (props) => {

    
    return (
        <div className='container'>
            <Notes showAlert={props.showAlert}/>

        </div>
    )
}

export default Home;
