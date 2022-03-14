import React from "react";

const useLocalStorage = ({nameItem , defaultValue = ''})=>{
    if(!nameItem) throw "useLocalStorage necesita un nameItem para usarse";
    if(typeof(nameItem) != 'string') throw 'el campo nameItem debe ser un string';  
    
    if (typeof window !== "undefined") {
      let lsItem = window.localStorage.getItem(nameItem);
      let parseItem;
      if(!lsItem){
        window.localStorage.setItem(nameItem, JSON.stringify(defaultValue));
        parseItem = defaultValue;
      }else{
        parseItem = JSON.parse(lsItem);
      }
      const [item, setItem] = React.useState(parseItem);
      function saveItem(newItem){
        window.localStorage.setItem(nameItem, JSON.stringify(newItem));
        setItem(newItem);
      }
      return [item,saveItem];
    }
  }

  export{useLocalStorage}