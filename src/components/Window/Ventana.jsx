import React, { useState } from 'react';

function Ventana() {
    const[collapse,setCollapse]=useState("collapse")

    const handleClick=()=>{
        collapse==="collapse"?setCollapse("collapse.show"):setCollapse("collapse")
    }
    return (
        <div>
            

        </div>
    );

}

export default Ventana;
