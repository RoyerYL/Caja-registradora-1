import React, { useState } from 'react';

function Ventana() {
    const[collapse,setCollapse]=useState("collapse")

    const handleClick=()=>{
        collapse==="collapse"?setCollapse("collapse.show"):setCollapse("collapse")
    }
    return (
        <div>
            <div className={`${"offcanvas offcanvas-start"} ${collapse}`} tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasLabel">Offcanvas</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleClick}></button>
                </div>
                <div className="offcanvas-body">
                    Content for the offcanvas goes here. You can place just about any Bootstrap component or custom elements here.
                </div>
            </div>

        </div>
    );

}

export default Ventana;
