function MenuNivel({state_niveles, on_click}){
   return(
        <div className="flex flex-col px-2 mt-2 space-y-2">
            {state_niveles[0].map((nivel,index)=>(
                <div key={index} onClick={()=>on_click(index)} className={`opcion_nivel rounded-lg py-2 text-center font-bold ${nivel.background}`}>{nivel.title}</div>
            ))}
        </div>)
}
export {MenuNivel}