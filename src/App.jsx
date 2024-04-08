import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import Celda from './componentes/Celda';


const App = () => {
  const [intentos, setIntentos] = useState(0);
  const [arrFilas, setArrFilas] = useState([]);
  const [arrColumnas, setArrColumnas] = useState([]);
  const [posX, setPosX] = useState(null);
  const [posY, setPosY] = useState(null);
  const [encontrado, setEncontrado] = useState(false)

  //Cuando el componente se monte llamar a la funcion useEffect
  /*useEffect(() => {
    ajustes();
  }, []);*/

  const  ajustes = async () => {
    setArrFilas(Array.from({ length: 0 }));
    setArrColumnas(Array.from({ length: 0 }));
    const { value: formValues } = await Swal.fire({
      title: "ENCUENTRA EL TESORO",
      html: `Introduce cuantas filas y cuantas <br> columnas quieres que tenga tu tablero
             <input id="filas" type='number' min='2' class="swal2-input" placeholder='introduce las filas'>
             <input id="columnas" type='number' min='2' class="swal2-input" placeholder='introduce las columnas'>`,
      icon: "question",
      preConfirm: () => {
        return [
          document.getElementById("filas").value,
          document.getElementById("columnas").value
        ];
      }
      
    });
    if(formValues){ //Esto Hago esto para evitar el error del undefined
      let filas = parseInt(formValues[0]);
      let columnas = parseInt(formValues[1]);

      setArrFilas(Array.from({ length: filas }));
      setArrColumnas(Array.from({ length: columnas }));

      console.log(filas, columnas);

      const randomPosX = Math.floor(Math.random() * columnas);
      const randomPosY = Math.floor(Math.random() * filas);
  
      setPosX(randomPosX);
      setPosY(randomPosY);

      console.log(randomPosX, randomPosY);
    }
  }

  const busca = (x, y) => {
    if(posX === x & posY === y){
      console.log(`(${x}, ${y}) || (${posX}, ${posY}) `);
      if(!encontrado){
        setIntentos(intentos+1);
      }
      setEncontrado(true);
      Swal.fire({
        title: "Enhorabuena!!",
        icon: "success"
      });
      return true;
    }else{
      console.log(`(${x}, ${y}) || (${posX}, ${posY}) `);
      if(!encontrado){
        setIntentos(intentos+1);
      }
      return false;
    }
  }

  const reset = () => {
    ajustes();
    setIntentos(0);
    setEncontrado(false);
    setArrFilas([]);
    setArrColumnas([]);
    setPosX(null);
    setPosY(null);
  }

  return (
    <div className='juego'>
      <h1>Intentos: {intentos} </h1>
      <button onClick={ () => reset()}>Empieza de nuevo</button>
        <table>
          <tbody>
          {
            arrFilas.map( (fila, i) => {
              return <tr key={i}>

                {arrColumnas.map((columna, index) => {

                  if(posX === index && posY === i){
                    return <Celda key={index} x={index} y={i} func={busca} isHere={true}></Celda>
                  }else{
                    return <Celda key={index} x={index} y={i} func={busca} isHere={false}></Celda>
                  }
                  
                })}

              </tr>
            })
          }
          </tbody>
        </table>
    </div>
  )
}

export default App;
