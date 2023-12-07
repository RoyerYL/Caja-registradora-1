import React, {useEffect, useState } from 'react';
import style from "./Provedor.module.css"
import Form from './Form';
import ListProvedores from './ListProvedores';
import axios from 'axios';
export default function Provedor() {

    return (
        <div className={style.Provedor}>
            <h2>Alta Provedor</h2>
            <div className={style.container}>
                <div className={style.ListProvedores}>

                    <ListProvedores />
                </div>
                <div>
                    <Form />
                </div>
            </div>
        </div>
    );
}

