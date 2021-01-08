import React, { useState } from 'react';
import axios from 'axios'
import './EnvoieFichier.css'

function App() {
    const [file, setFile]=useState('')
    const [fileNames, setFileName]=useState('Chose file')
 function onChange(e){
          setFile(e.target.files[0])
          setFileName(e.target.files[0].name)
 }
 function onSubmit(e){
   const formData= new FormData()
   formData.append('file',file)
   formData.append('title',"chikh n ljama3")
   axios.post("http://localhost:1234/EnvoieFichier",formData)
   .then(data=>{console.log(data)})
   .catch(error=>{console.log(error)})
 }
  return (
    <div className="Search">
   <input type="file" name="file" onChange={onChange} className="logo"></input>
   <button onClick={onSubmit} className="searchButton">Envoyer</button>
   {console.log(file),fileNames}
   </div>

  );
}

export default App