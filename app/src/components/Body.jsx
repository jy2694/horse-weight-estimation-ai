

export default function Body(props){
    if(props.menu.length <= props.selection){
        return [];
    } else {
        return props.menu[props.selection].page;
    }
}