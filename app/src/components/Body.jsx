import {getMenus} from "./FooterFrame";

export default function Body(props){
    const menu = getMenus()
    if(menu.length <= props.selection){
        return [];
    } else {
        return menu[props.selection].page;
    }
}