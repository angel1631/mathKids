import { useEffect } from "react";

function Camino({longitud, meta, state_puntuacion, state_camino, state_player}){

    let url_img_tramo = `/media/tramo.png`;
    let url_img_personaje = `/media/personaje.png`;
    useEffect(()=>{
        let camino = [];
        let pos_personaje = parseInt(state_puntuacion[0]/(meta/longitud));
        if(pos_personaje<0) pos_personaje = 0;
        for(var x = 0; x<longitud;x++){
            if(pos_personaje == x) camino.push(state_player[0].img);
            else camino.push(url_img_tramo);
        }
        state_camino[1](camino);
    },[state_puntuacion[0]]);
    return(
        <div className="camino w-full flex h-40 justify-center  mt-10">
            {state_camino[0].map((item,index)=>(
                <div className={`tramo w-1/6`} key={index}>
                    <img className="" src={item} />
                </div>
            ))}
        </div>
    );
}
export {Camino};