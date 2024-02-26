import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'
export default function LandingPage(props) {

    return (
        <div className={style.LandingPage}>
            <Link to={"/HomePage"}>
                <button>Iniciar</button>
            </Link>
        </div>
    )
}