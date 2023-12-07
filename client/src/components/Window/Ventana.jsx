import React, { useState } from 'react';
// const { remote } = window.require('electron');
// const { BrowserWindow } = remote;

function Ventana() {
    const[collapse,setCollapse]=useState("collapse")

    const handleClick=()=>{
        collapse==="collapse"?setCollapse("collapse.show"):setCollapse("collapse")
    }
    const openNewWindow=()=>{
        console.log(window);
        window.electron.openNewWindow()
    }
 
    return (
        <div>
            <h2>hola</h2>
            <button onClick={openNewWindow}>click me</button>

        </div>
    );

}

export default Ventana;
