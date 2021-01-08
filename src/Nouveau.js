import logo from './logo.svg';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import './home.css'
import Wordcloud from './WordCloud'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function splitTable(table){
    let compt=[]
    let count=0
    for(let i=0;i<table.length;i=i+2){
      count++
      compt.push(count)
    }

      return compt
  }

function App(){
    const [filesAndWords,setAllFilesAndWords]=useState([])
    const [filesChoisis,setFilesChoisis]=useState([])
    let [FileWords2, setFileWords2]=useState([])
    const [documents, setDocuments]=useState([])
    const [filesLinksTitles, setAllFilesLinksTitles]=useState([])
    const [WordCloud, setWordCloud]=useState(false)
    const [nuagesMots,setNuagesMots]=useState(false)
    const [choix, setChoix]=useState("")
    const input=useRef("")
    useEffect(()=>{

        axios.get("http://localhost:1234/fichiersMots")
        .then((res)=>{
          setAllFilesAndWords(res.data)

           }).catch(e=>console.log(e))
   
        axios.get("http://localhost:1234/fichiersTitresLiens")
         .then((res)=>{
           setAllFilesLinksTitles(res.data)
             console.log(res.data)
           }).catch(e=>console.log(e))
   },[])

   function paginationNumber(e){
    let limit=e.target.dataset["val"]*2
    setDocuments(FileWords2.slice(limit-2,limit))
 }
   
       function search(e){
         axios.post(`http://localhost:1234/post/${input.current.value}`)
         .then((res)=>{
            setFileWords2(res.data)
           setDocuments(res.data.splice(0,2))
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
            if(choix!==e.target.dataset.val){
                setChoix(e.target.dataset.val)
                e.target.background="red"
            }
            else{
               setChoix("")    
               e.target.background="none"        
            }
       }
    return(
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
          <img alt="Google" src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"></img>
        </div>
        <div className="bar">
          <input  className="searchbar" type="text" title="Search" ref={input} ></input>
        </div>
        <div className="buttons">
          <button className="button" onClick={search}>Recherche</button>
         </div>
         <div className="container2">
   <div className="item1">
   {
   (WordCloud===true)?
   documents?
   documents[1]!=="Aucun document correspond à votre recherche"?
   documents.map((val,key)=>(
    <div className="global">
<div className="firstPart" key={key}>
<br/>
<h3><a data-val={val[1]} style={{color:"blue"}} href={"saga"}
target="_blank">
{filesLinksTitles.find(e=>e.nomFichier===val[1])?
filesLinksTitles.find(e=>e.nomFichier===val[1]).titre?
filesLinksTitles.find(e=>e.nomFichier===val[1]).titre:
filesLinksTitles.find(e=>e.nomFichier===val[1]).nomFichier:null}
</a></h3><br/>
{documents.length>0?
<React.Fragment>
{filesLinksTitles.find(e=>e.nomFichier===val[1])?
filesLinksTitles.find(e=>e.nomFichier===val[1]).description[0]?
filesLinksTitles.find(e=>e.nomFichier===val[1]).description[0].
replace("&eacute;","")
:
filesLinksTitles.find(e=>e.nomFichier===val[1]).description[1]:
null
}
<br/>
<button className="myButton" onClick={nuagesDeMotsFunc} data-val={val[1]}
name={filesLinksTitles.find(e=>e.nomFichier===val[1])?
filesLinksTitles.find(e=>e.nomFichier===val[1]).nomFichier:"#"}>
nuages&nbsp;DeMots</button><br/></React.Fragment>:null}<br/><br/>
</div>
{
choix===val[1]?
<TransformWrapper>
<div>
          <TransformComponent>
    <div className="WordCloud">
    <br/>
    <Wordcloud word={filesChoisis}></Wordcloud>
   </div>
   </TransformComponent>
</div>
</TransformWrapper>
:null}

</div>
)):
<h1>{documents[1]}</h1>:null:null}
</div> 
<div className="item3">
{WordCloud==false?"":null}
</div>
</div>
   </header>
   <div className="Footer">
        {FileWords2?splitTable(FileWords2).map((val,key)=>(
        <p>
         <a onClick={paginationNumber}
         data-val={val}
         className="App-link"
         href="#"
         rel="noopener noreferrer"
       >
       {val}
       </a>
       &ensp;
       &nbsp;
       </p> 
        )):null}
        </div>
    </div>
    )
}

export default App