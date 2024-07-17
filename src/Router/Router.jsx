import {React} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Article from "../Components/Article";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Bookmarks from "../Pages/BookMark";

const Routers = ()=>{

  return(
  <BrowserRouter>
    <Routes>
       <Route path = "/" element = {<Article/>}/>
       <Route path = "/login" element = {<Login/>}/>
       <Route path = "/Register" element = {<Register/>}/>
       <Route path ="/Bookmark" element = {<Bookmarks/>}/>
    </Routes>
    </BrowserRouter>
  )
   
}

export default Routers;