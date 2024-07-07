import {React} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Article from "../Components/Article";

const Routers = ()=>{

  return(
  <BrowserRouter>
    <Routes>
       <Route path = "/" element = {<Article/>}/>
    </Routes>
    </BrowserRouter>
  )
   
}

export default Routers;