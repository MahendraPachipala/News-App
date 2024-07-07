import React,{ useState, useEffect } from 'react';

const Navbar = ({handledarkmode}) =>{
    const [search,setSearch] = useState("");
    
    return(
        
        <div className="navbar h-14 flex bg-[#F0EBE3]-700 dark:bg-[#242525]-700 sticky top-0 z-10 transition transition-all delay-0.5">
            <h1 className="text-4xl my-1 mx-11 dark:text-[#8bb4f8] transition transition-all delay-0.5">NEWS</h1>
            
            <input placeholder='Search' className=" w-3/4 my-2.5 rounded-xl px-2 bg-#F6F5F2  dark:bg-[#3c4043] transition transition-all delay-0.5"  onChange={(e)=>setSearch(e.value)} value={search}>
               
            </input>

            <label className="switch mt-3 ml-4">
            <input type="checkbox"onClick={handledarkmode}/>
            <span className="slider"></span>
          </label>
            

            <div className='bg-green-700 rounded-3xl h-10 w-10 my-2 mx-7'>
                <p className = "text-xl pl-3.5 pt-1 ">S</p>
            </div>
        </div>
    )
}
export default Navbar;