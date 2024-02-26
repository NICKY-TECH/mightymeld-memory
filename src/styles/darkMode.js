import {useState,useEffect} from "react";
export const useDarkMode = () =>{
  const [theme, setTheme] = useState('light');

const setMode = (mode) =>{
localStorage.setItem("theme",mode);
    setTheme(mode);
  }

  const toggleTheme = () =>{
theme  === 'dark'? setMode('light'):setMode('dark') 
  }
  useEffect(()=>{
    const localTheme = localStorage.getItem("theme");
    const newTheme = localTheme ? localTheme :"light";
    setMode(newTheme)
},[])

  return [theme,toggleTheme]
}