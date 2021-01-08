import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import './home.css'
import Wordcloud from './WordCloud'
import logo from './logo.svg'
function App() {
    const [filesAndWords,setAllFilesAndWords]=useState([])
    const [filesChoisis,setFilesChoisis]=useState([])
    const [documents, setDocuments]=useState([])
    const [filesLinksTitles, setAllFilesLinksTitles]=useState([])
    const [WordCloud, setWordCloud]=useState(false)
    const [nuagesMots,setNuagesMots]=useState(false)
    const input=useRef("")
useEffect(()=>{

     axios.get("http://localhost:1234/fichiersMots")
     .then((res)=>{
       setAllFilesAndWords(res.data)
         console.log(res.data)
        }).catch(e=>console.log(e))

     axios.get("http://localhost:1234/fichiersTitresLiens")
      .then((res)=>{
        setAllFilesLinksTitles(res.data)
          console.log(res.data)
        }).catch(e=>console.log(e))
},[])

    function search(e){
      axios.post(`http://localhost:1234/post/${input.current.value}`)
      .then((res)=>{
        console.log(res.data)
        setDocuments(res.data)
         }).catch(e=>console.log(e))
         setFilesChoisis([])
         setWordCloud(true)
         setNuagesMots(false)
    }

    function nuagesDeMotsFunc(e){
     let nomFichierChoisi=e.target.name
     if(nomFichierChoisi!=="#"){
      setFilesChoisis(filesAndWords.find(file=>file.nomFichier==nomFichierChoisi).mot)
      console.log(filesAndWords.find(file=>file.nomFichier==nomFichierChoisi).mot)
     }   
     setNuagesMots(true) 
    }

  return (
    <div className="all">
<div className="container">
<div className="nuagesMots">
{nuagesMots? <Wordcloud word={filesChoisis}></Wordcloud>:null}
</div>
   <div className="search">
   <button type="submit" className="logo">
        <i>SalimHasSearch</i>
     </button>
      <input type="text" className="searchTerm" placeholder="Chercher ici les documents?" ref={input}></input>
      <button type="submit" className="searchButton" onClick={search}>
        <i className="fa fa-search"></i>
     </button>
   </div>
   
   <div className="container2">
   <div className="item1">
   {
   (WordCloud===true)?
   documents?
   documents[1]!=="Aucun document correspond à votre recherche"?
   documents.map((val,key)=>(

<React.Fragment><br/>
<h3><a href={filesLinksTitles.find(e=>e.nomFichier===val[1])?
filesLinksTitles.find(e=>e.nomFichier===val[1]).nomLien:null
} 
target="_blank">
{filesLinksTitles.find(e=>e.nomFichier===val[1])?
filesLinksTitles.find(e=>e.nomFichier===val[1]).titre?
filesLinksTitles.find(e=>e.nomFichier===val[1]).titre:
filesLinksTitles.find(e=>e.nomFichier===val[1]).nomFichier:null}
</a></h3><br/>
{documents.length>0?
<React.Fragment>
<button onClick={nuagesDeMotsFunc} 
name={filesLinksTitles.find(e=>e.nomFichier===val[1])?
filesLinksTitles.find(e=>e.nomFichier===val[1]).nomFichier:"#"}>
nuages&nbsp;DeMots</button><br/></React.Fragment>:null}<br/><br/>
</React.Fragment>

)):
<h1>{documents[1]}</h1>:null:null}
</div> 
<div className="item3">
{WordCloud==false?<img src={logo} className="App-logo" alt="logo"></img>:null}
</div>
</div>
</div>

</div>
  );
}

export default App;
