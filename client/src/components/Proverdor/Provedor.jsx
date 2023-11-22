import React, { useState } from 'react';
import style from './Provedor.module.css'
function Provedor() {
    
   


    return (
        <div className={style.Provedor}>

            <div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Nombre:</span>
                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Codigo de barras (o codigo de articulo):</span>
                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Categoria</span>
                    <select className="form-select" aria-label="Default select example" defaultValue="default">
                        <option value="default">sin categoria</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Fabricante</span>
                    <select className="form-select" aria-label="Default select example" defaultValue="default">
                        <option value="default">sin fabricante</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Código:</span>
                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                </div>

                <div className={style.stock}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Stock:</span>
                        <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">Stock minimo:</span>
                        <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            por unidad
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            por peso
                        </label>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input type="number" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='precio' />
                </div>



                <div className={style.costo}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Costo:</span>
                        <span className="input-group-text">0.00</span>
                        <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Fabricante</span>
                        <select className="form-select" aria-label="Default select example" defaultValue="default">
                            <option value="default">sin fabricante</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripción:</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" resize="false" rows="3"></textarea>
                </div>

            </div>
        </div>
    );

}

export default Provedor;
