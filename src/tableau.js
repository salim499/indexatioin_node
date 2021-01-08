import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3-cloud'
import * as d from 'd3'
function App(props) {
  const svg=useRef()

  let words=["1","2","3","4","5","6","7","8","9","10"]
  let height = 500
  let width=500
  let fontFamily = "Open Sans"
  let fontScale = d3.scaleLinear().range([20, 120]) // Construction d'une échelle linéaire continue qui va d'une font de 20px à 120px
  let fillScale = d3.scaleOrdinal(d3.schemeCategory10)
  let minSize = d3.min(words, d => d.size)
  let maxSize = d3.max(words, d => d.size)
  fontScale.domain([minSize, maxSize])

  let svgs=d3.select(svg.current)
  console.log(svgs)
  d3.layout.cloud()
  .size([width, height])
  .words(words)
  .padding(1)
  .rotate(function() {
      return ~~(Math.random() * 2) * 45;
  })
  .spiral("rectangular")
  .font(fontFamily)
  .fontSize(d => fontScale(d.size))
  .on("end", draw)
  .start()

function draw() {
    d3.select(svg.current).append("svg") // Ajout d'un élément SVG sur un DIV existant de la page
        .attr("className", "svg")
        .attr("width", 500)
        .attr("height", 500)
        .append("g") // Ajout du groupe qui contiendra tout les mots
            .attr("transform", "translate(" + 500 / 2 + ", " + 500 / 2 + ")") // Centrage du groupe
            .selectAll("text")
            .data(words)
            .enter().append("text") // Ajout de chaque mot avec ses propriétés
                .style("font-size", d => d + "px")
                .style("font-family", fontFamily)
                .style("fill", d => fillScale(d))
                .attr("text-anchor", "middle")
                .attr("transform", d => "translate(" + [5, 5] + ")rotate(" + 5 + ")")
                .text(d => d);
}
  return (
   <div ref={svg}>
       
   </div>
  );
}

export default App;