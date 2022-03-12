import {useEffect, useState, useRef} from 'react';

function Restas(){
    let a = useState();
    let b = useState();
    let respuesta = useState('');
    let resultado = useState('');
    let url_img = useState('');
    let url_back_opt = useState({a: `background${getRandomInt(0,3)}.jpg`, b: `background${getRandomInt(0,3)}.jpg`})
    let show_resultado = useState(false);
    let audio;
    let input_respuesta = useRef();
    let nivel = useState(1);
    let num_maximo = 10;
    let url_fondo;
    function seleccionar_nivel(nivel){
        if(nivel==1) num_maximo = 10;
        else if(nivel==2) num_maximo = 20;
        else if(nivel==3) num_maximo = 40;
        else if(nivel==4) num_maximo = 100;
    }
    function comprobar(e){
        e.preventDefault();
        if((a[0] - b[0])===parseInt(respuesta[0])){
            url_img[1](`win${getRandomInt(0,10)}.gif`);
            resultado[1]('correcto');
            audio = new Audio(`${process.env.PUBLIC_URL}/media/win_audio${getRandomInt(0,2)}.ogg`);
            audio.play();
            setTimeout(nueva_resta,3000);
        } 
        else{
            url_img[1](`lose${getRandomInt(0,5)}.gif`);
            resultado[1]('incorrecto');
            let audio = new Audio(`${process.env.PUBLIC_URL}/media/lose_audio${getRandomInt(0,2)}.ogg`);
            audio.play();
        } 
        show_resultado[1](true);
    }
    function nueva_resta(){
        let p = getRandomInt(1,num_maximo);
        let s =  getRandomInt(1,p);
        a[1](p);
        b[1](s);
        reset_resultado();
        url_fondo = `${process.env.PUBLIC_URL}/media/background${getRandomInt(0,3)}.jpg`;
    }
    function reset_resultado(){
        respuesta[1]('');
        resultado[1]('');
        show_resultado[1](false);
        if(audio) audio.pause();
        input_respuesta.current.focus();
    }
    useEffect(()=>{
        nueva_resta();
    },[])
    return (
    <div className={` h-screen w-full restas bg-[url(${process.env.PUBLIC_URL}/media/background_animado0.gif)]`}>
        <div className='w-full text-center bg-sky-600 text-white text-2xl py-2 shadow-xl'>Restas</div>
        {!show_resultado[0] &&
            <div className='w-full'>
                <div className='w-full mt-2 problem-container flex justify-center' >
                    <div className={`grid place-items-center w-32 h-32 text-4xl bg-[url(${process.env.PUBLIC_URL}/media/${url_back_opt[0].a})] rounded-full shadow-lg `}>
                        <div className='grid place-items-center bg-white h-20 w-20 rounded-full shadow-lg'>
                            {a}
                        </div>
                    </div>
                    <div className='text-9xl mt-10 mx-7 h-4 w-12 bg-slate-600 shadow-xl'> </div>
                    <div className={`grid place-items-center w-32 h-32 text-4xl bg-[url(${process.env.PUBLIC_URL}/media/${url_back_opt[0].b})] rounded-full shadow-lg `}>
                        <div className='grid place-items-center bg-white h-20 w-20 rounded-full shadow-lg'>
                            {b}
                        </div>
                    </div>
                </div>
                <form className='mt-10 w-full flex flex-col items-center space-y-4' onSubmit={comprobar}>
                    <input className="w-3/4  text-black bg-sky-200 px-4 rounded-xl h-10 shadow-lg" ref={input_respuesta} type="number" placeholder='Coloca tú respuesta ' value={respuesta[0]} onChange={e=>{respuesta[1](e.target.value)}}/>
                    <button className='w-1/2 px-8 py-2 bg-green-200 rounded-lg shadow-lg font-bold' type="submit" >Revisar</button>
                </form>        
            </div>
        }
        
        {(!!show_resultado[0]) && 
            <div className='w-full'>
                <div className='p-4 flex justify-center'>
                    <img  onClick={reset_resultado} className=' rounded-lg shadow-xl' src={`${process.env.PUBLIC_URL}/media/${url_img[0]}`} />
                </div>
                {resultado[0]=='incorrecto' &&
                    <div className='botonera flex space-x-2 justify-center -mt-20'>
                        <div className='px-4 z-10 py-2 bg-yellow-200 rounded-lg shadow-lg font-bold' onClick={reset_resultado}>Vuelve a probar</div>
                        <div className='px-4 z-10 py-2 bg-blue-200 rounded-lg shadow-lg font-bold' onClick={nueva_resta}>Otra resta</div>
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