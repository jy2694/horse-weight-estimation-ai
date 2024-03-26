import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/NavigationBar";
import FooterFrame from "./components/FooterFrame";
import {useEffect, useState} from "react";
import Body from "./components/Body";

function App() {
  
  const [selection, setSelection] = useState(0);
  
  useEffect(()=> {
    const id = localStorage.getItem("id");
    if(id == null){
      localStorage.setItem("id", crypto.randomUUID());
    }
  }, []);
  
  return (
    <div className="App">
      <NavigationBar/>
      <Body selection={selection}/>
      <FooterFrame onPageChange={(value) => setSelection(value)}/>
    </div>
  );
}

export default App;
