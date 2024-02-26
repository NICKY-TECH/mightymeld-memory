import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle `
.start{
background-color:${(props) => props.theme.start};
overflow-x:hidden;
transition: all .5s linear;
}
.play{
background-color:${(props) => props.theme.play};
overflow-x:hidden;
transition: all .5s linear;
}
.level{
color:${(props) => props.theme.level}; 
}

body{
overflow-x:hidden
}
`
export const lightTheme ={
start:'#fecdd3',
play:"#ffffff",
level:"#000000"
}
export const darkTheme ={
start:'#212122',
play:"#212122",
level:"#ffffff"
}