import React, { useState, useEffect } from "react";
import { useAuth,useDarkMode } from "../config/AuthContext";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const user = useAuth().currUser;
  const pfp = user.photoURL;
  const [profile, setProfile] = useState(false);
  const{toggleDarkMode} = useDarkMode();

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar h-14 flex bg-[#F0EBE3]-700 dark:bg-[#242525]-700  transition transition-all delay-0.5">
      
      <a href ="/Home"><h1 className="text-4xl my-1 mx-11 dark:text-white transition transition-all delay-0.5 ">
        NEWS
      </h1></a> 
      <input
        placeholder="Search"
        className=" w-3/4 my-2.5 rounded-xl px-2 bg-#F6F5F2  dark:bg-[#3c4043] transition transition-all delay-0.5"
        onChange={(e) => setSearch(e.value)}
        value={search}
      ></input>

      <label className="switch mt-3 ml-4">
        <input type="checkbox" onClick={toggleDarkMode} />
        <span className="slider"></span>
      </label>

      <div
        onClick={() => setProfile(!profile)}
        className="rounded-3xl bg-black my-2 mx-10 h-10 overflow-hidden" 
      >
        <img
          src={pfp}
          onMouseEnter={() => setProfile(true)}
          onMouseLeave={() => setProfile(false)}
          className="rounded-3xl h-[100%] w-[100%]"
        />
      </div>

      </div>
      {profile && (
        <div
          onMouseEnter={() => setProfile(true)}
          onMouseLeave={() => setProfile(false)}
          className="navbar  fixed z-10 top-12 right-12 bg-[#F0EBE3]-700 dark:bg-[#242525]-700 dark:text-white transition transition-all delay-0.5 px-4 py-4 rounded-lg overflow-hidden z-index: 50 shadow-lg" 
        >
          <p className="text-xl font-semibold">{user.displayName}</p>
          <p className="text-sm">{user.email}</p>
          <div className="mt-4">
            <a href ="/Bookmark" className="text-sm cursor-pointer hover:text-gray-300">
              Bookmarks
            </a>
            <p className="text-sm cursor-pointer hover:text-gray-300">Logout</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
