import {useEffect, useState, useRef} from 'react';
import { Camino } from './Camino';
import { MenuNivel } from './MenuNivel';
import { Options } from './Options';
import {RiArrowGoBackFill} from 'react-icons/ri';
import { Ganaste } from './Ganaste';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function Restas(){
    let a = useState();
    let b = useState();
    let respuesta = useState('');
    let resultado = useState('');
    let url_img = useState('');
    let url_back_opt = useState({a: `background${getRandomInt(0,3)}.jpg`, b: `background${getRandomInt(0,3)}.jpg`});
    let camino = useState([]);
    let puntuacion = useState(0);
    let show_resultado = useState(false);
    let audio;
    let niveles = useState([
        {id: 1, title:'Nivel 1', background: ' bg-yellow-400', num_maximo: 10, pts_ok: 1, pts_fail: 1, meta: 10},
        {id: 2, title:'Nivel 2', background: ' bg-yellow-400', num_maximo: 15, pts_ok: 3, pts_fail: 3, meta: 60},
        {id: 3, title:'Nivel 3', background: ' bg-yellow-400', num_maximo: 20, pts_ok: 4, pts_fail: 4, meta: 80},
        {id: 4, title:'Nivel 4', background: ' bg-yellow-400', num_maximo: 40, pts_ok: 5, pts_fail: 5, meta: 120},
        {id: 5, title:'Nivel 5', background: ' bg-yellow-400', num_maximo: 100, pts_ok: 10, pts_fail: 12, meta: 300},
        {id: 6, title:'Nivel 6', background: ' bg-yellow-400', num_maximo: 1000, pts_ok: 20, pts_fail: 25, meta: 800},      
        {id: 7, title:'Nivel 7', background: ' bg-yellow-400', num_maximo: 9000, pts_ok: 50, pts_fail: 100, meta: 3000}    
    ]);
    let player = useLocalStorage({nameItem: 'player', defaultValue: {img: `/media/personaje.png`, pts: 0}});
    
    console.log("player: ",player);
    let nivel = useState(-1);
    let url_fondo;
    let val_res = useState(0);
    function comprobar(value){
        if((a[0] - b[0])===parseInt(value)){
            url_img[1](`win${getRandomInt(0,11)}.gif`);
            resultado[1]('correcto');
            audio = new Audio(`/media/win_audio${getRandomInt(0,4)}.ogg`);
            audio.play();
            let nueva_pts = puntuacion[0]+niveles[0][nivel[0]].pts_ok;
            puntuacion[1](nueva_pts);
            player[1]({...player[0], pts: player[0].pts+niveles[0][nivel[0]].pts_ok});
            setTimeout(nueva_resta,3000);

        } 
        else{
            url_img[1](`lose${getRandomInt(0,5)}.gif`);
            resultado[1]('incorrecto');
            let audio = new Audio(`/media/lose_audio${getRandomInt(0,2)}.ogg`);
            audio.play();
            let nuevo_valor = puntuacion[0]-niveles[0][nivel[0]].pts_fail;
            if(nuevo_valor<0) nuevo_valor = 0; 
            puntuacion[1](nuevo_valor);
        } 
        show_resultado[1](true);
    }
    function nueva_resta(){
        let p = getRandomInt(1,niveles[0][nivel[0]].num_maximo);
        let s =  getRandomInt(1,p);
        a[1](p);
        b[1](s);
        val_res[1](p-s);
        reset_resultado();
        url_fondo = `/media/background${getRandomInt(0,3)}.jpg`;
    }
    function reset_resultado(){
        respuesta[1]('');
        resultado[1]('');
        show_resultado[1](false);
        if(audio) audio.pause();
    }
    useEffect(()=>{
        if(nivel[0]>=0){
            nueva_resta();
            puntuacion[1](0);
        }
    },[nivel[0]]);
    return (
    <div className='h-screen w-full restas bg-[url(/media/background_animado0.gif)]'>
        <div className='w-full text-center bg-sky-600 text-white text-2xl py-2 shadow-xl'>Restas</div>
        
        {nivel[0]<0 ?
            <MenuNivel state_niveles={niveles} on_click={(index)=>{nivel[1](index)}} /> 
            :
            <div className='container w-full'>
                {(puntuacion[0] > niveles[0][nivel[0]].meta) ?
                    <Ganaste on_click={()=>nivel[1](-1)} /> 
                    :
                    <div className='w-full'>
                        <div onClick={()=>nivel[1](-1)} className="w-full flex">
                            <div className='mt-2 ml-2 flex'>
                                <div className='w-8 h-8 bg-sky-300 grid place-items-center rounded-l-full'>
                                    <RiArrowGoBackFill className='text-white font-bold text-lg' />
                                </div>
                                <div className='h-8 px-4 pt-1 bg-yellow-400 font-bold'>
                                    {niveles[0][nivel[0]].title}
                                </div>
                                <div className='h-8 px-4 pt-1 bg-slate-100 rounded-r-full font-bold'>
                                    pts: {puntuacion[0]}
                                </div>
                            </div>
                            
                        </div>
                        {!show_resultado[0] ?
                            <div className='w-full mt-8'>
                                <div className='w-full mt-2 problem-container flex justify-center' >
                                    <div className={`grid place-items-center w-32 h-32 text-4xl bg-[url(/media/${url_back_opt[0].a})] rounded-full shadow-lg `}>
                                        <div className='grid place-items-center bg-white h-20 w-20 rounded-full shadow-lg'>
                                            {a[0]}
                                        </div>
                                    </div>
                                    <div className='text-9xl mt-10 mx-7 h-4 w-12 bg-slate-600 shadow-xl'> </div>
                                    <div className={`grid place-items-center w-32 h-32 text-4xl bg-[url(/media/${url_back_opt[0].b})] rounded-full shadow-lg `}>
                                        <div className='grid place-items-center bg-white h-20 w-20 rounded-full shadow-lg'>
                                            {b[0]}
                                        </div>
                                    </div>
                                </div>
                                <div className=' w-full flex justify-center mt-10  '>
                                    <div className='bg-yellow-400 font-bold text-white px-8 py-1 rounded-xl '>Elige una opcion</div>
                                </div>
                                <Options resultado={val_res[0]} quantity={4} min={0} max={niveles[0][nivel[0]].num_maximo} on_click={(value)=>{comprobar(value)}} />    
                            </div>
                            :
                            <div className='w-full'>
                                <div className='p-4 flex justify-center'>
                                    <img  onClick={reset_resultado} className=' rounded-lg shadow-xl' src={`/media/${url_img[0]}`} />
                                </div>
                                {resultado[0]=='incorrecto' &&
                                    <div className='botonera flex space-x-2 justify-center -mt-20'>
                                        <div className='px-4 z-10 py-2 bg-yellow-200 rounded-lg shadow-lg font-bold' onClick={reset_resultado}>Vuelve a probar</div>
                                        <div className='px-4 z-10 py-2 bg-blue-200 rounded-lg shadow-lg font-bold' onClick={nueva_resta}>Otra resta</div>
                                    </div>
                                }
                                
                            </div>
                        }
                        <div className='w-full '>
                            <Camino longitud={10} meta={niveles[0][nivel[0]].meta} state_puntuacion={puntuacion} state_camino={camino} state_player={player} />
                        </div> 
                    </div>
                }
                
                
            </div>
            
        }
          
    </div>);
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

export {Restas}