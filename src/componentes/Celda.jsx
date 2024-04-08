import React from 'react';
import { useState } from 'react';
import equis from '../assets/x.png';
import tesoro from '../assets/tesoro.png';
import craneo from '../assets/craneo.png';

import 'animate.css';
import '../index.css';

const Celda = ({x,y,func,isHere}) => {

    const [img, setImg] = useState(<img className='craneo animate__animated animate__zoomIn animate__faster' src={craneo} alt="" />);

    const addImg = (isHere) => {
        if(isHere){
            setImg(<img className='tesoro animate__animated animate__flash' src={tesoro} alt="" />);
        }else{
            setImg(<img className='equis animate__animated animate__shakeX animate__faster' src={equis} alt="" />);
        }
    }

    return (
        <td onClick={() => 
            {
                func(x,y);
                addImg(isHere);
            }
        }>
            {img}
            
        </td>
    )
}

export default Celda;
