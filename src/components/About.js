import React,{useContext,useEffect} from 'react'
import noteContext from '../context/Notes/NoteContext';
const About = () => {
    const a = useContext(noteContext)
    useEffect(()=>{
        // a.update();
        // eslint-disable-next-line

    },[])
  return (
    <div>This is About </div>
  )
}


export default About;