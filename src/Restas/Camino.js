import { useEffect } from "react";

function Camino({longitud, state_puntuacion, state_camino}){

    let pasos = [];
    let url_img_tramo = `${process.env.PUBLIC_URL}/media/tramo.png`;
    let url_img_personaje = `${process.env.PUBLIC_URL}/media/personaje.png`;
    useEffect(()=>{
        let camino = [];
        for(var x = 0; x<longitud;x++){
            if(state_puntuacion[0] == x) camino.push(url_img_personaje);
            else camino.push(url_img_tramo);
        }
        state_camino[1](camino);
    },[state_puntuacion[0]]);
    return(
        <div className="camino w-full flex h-40 bg-cyan-300 mt-10">
            {state_camino[0].map((item,index)=>(
                <div className={`tramo w-1/6`} key={index}>
                    <img className="" src={item} />
                </div>
            ))}
        </div>
    );
}
export {Camino};