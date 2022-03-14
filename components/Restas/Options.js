import { useEffect, useState } from "react";

function Options({resultado, quantity, min, max, on_click}){
    console.log(resultado);
    let options = useState([]);
    useEffect(()=>{
        let ops = [];
        for(let x = 0; x<quantity;x++){
            ops.push(getRandomInt(min, max, ops));
        }
        if(ops.indexOf(resultado)<0)
            ops[getRandomInt(0, quantity)] = resultado;
        options[1](ops);
    },[resultado])
    return(
        <div className="options w-full flex space-x-3 justify-center mt-10">
            {options[0].map((option,index)=>{
                return(<div onClick={()=>on_click(option)} className="w-20 h-20 rounded-xl text-2xl grid  place-items-center  bg-white" key={index}>
                    {option}
                </div>)
            })}
        </div>
    )
}

function getRandomInt(min, max, prevs=[]) {
    let valor = Math.floor(Math.random() * (max - min)) + min;
    if(prevs.indexOf(valor)>=0) valor =  getRandomInt(min,max,prevs);
    return valor
  }
export {Options};