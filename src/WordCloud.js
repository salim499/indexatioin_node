/*import React from 'react';
import ReactWordcloud from 'react-wordcloud';
 
const words = [
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 801,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 47,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
]
 
const callbacks = {
  getWordColor: word => word.value > 50 ? "blue" : "red",
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
}
const options = {
  rotations: 20,
  rotationAngles: [-10, 0],
};
const size = [600, 400];
 
function App() {
  return (
    <ReactWordcloud
      callbacks={callbacks}
      options={options}
      size={size}
      words={words}
    />
  );
}
export default App*/
import React from "react";
import ReactDOM from "react-dom";
import ReactWordcloud from "react-wordcloud";
import { Resizable } from "re-resizable";
import {Modal, Button} from 'react-bootstrap'

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";


const resizeStyle = {
  display: "flex",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "rgba(0,45,105,1)"
};

function App(props) {
 
  const options = {
    rotations: 0,
    rotationAngles: [0, 0,0,0],
  };
  return (
    <Modal.Dialog style={{height:"500px", width:"500px"}}>
  <ReactWordcloud words={props.word} options={options} 
          style={{background: "rgba(0,0,0,1)", opacity:"1"}}/>
</Modal.Dialog>
   /* <div style={{marginLeft:"33.33%"}}>
      <Resizable
        defaultSize={{
          width:'50%',
          height: '100%'
        }}
        style={resizeStyle}
      >
        <div style={{ width: "80%", height: "110%" }}>*/
       /* </div>
      </Resizable>
    </div>*/
  );
}
export default App;

