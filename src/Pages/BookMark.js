import React, { useState, useEffect } from "react";
import {useAuth,useDarkMode} from '../config/AuthContext';
import { auth,db } from "../config/firebase";
import {getDoc,doc,arrayUnion} from "firebase/firestore";
import NavBar from '../Components/navbar';
import axios from "axios";
import Footer from "../Components/Footer";

const Bookmarks = ()=>{
    const user = useAuth().currUser;
    const userId = user.uid;
    const [bookmarks,setbookmarks] = useState([]);
    const [open, setOpen] = useState(false);

    const {darkmode} = useDarkMode();
    
    const ref = doc(db,"Users",userId);
    const [summary, setSummary] = useState("");


    useEffect(()=>{
       
        const getbooks= async ()=>{
            const r = await getDoc(ref);
            const books =r.data();
            setbookmarks(books.articles);
        }
        getbooks();
        
    },[])

    const removeBookmark = async ()=>{

    }
     
    const handleClose = () => {
      setOpen(false);
      setSummary(null);
    };

    const handleClick = async (url) => {
        setOpen(true);
        
        const options = {
          method: "GET",
          url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
          params: {
            url: url,
            lang: "en",
            engine: "2",
          },
          headers: {
            "x-rapidapi-key": "69f8d926dcmshf47e885ee5df937p11305ajsn790164993433",
            "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
          },
        };
        try {
          const response = await axios.request(options);
          setSummary(response.data.summary);
        } catch (error) {
          console.error(error);
        }
      };



    //console.log(bookmarks);
    
    return(
        <div className = {`h-[100%] ${darkmode ? "" :"dark"}`} >
        <div className="h-[100%]  bg-[#F6F5F2] dark:bg-[#29292d] transition transition-all delay-0.5 pb-2 min-h-screen">
            <NavBar/>
        <div
        className="w-3/4 m-auto my-10 pt-2 px-2 rounded-3xl bg-[#F0EBE3] dark:bg-[#202124] dark:text-white transition transition-all delay-0.5"
      >
        {bookmarks.length > 0 ? (
          <div>
            {bookmarks.map((article, index) => (
              <div className="relative" key={index}>
                <label className="ui-bookmark right-1 top-2 absolute">
                  <input type="checkbox" onChange={() => removeBookmark(article)}/>
                  <div className="bookmark">
                    <svg viewBox="0 0 32 32">
                      <g>
                        <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                      </g>
                    </svg>
                  </div>
                </label>

                <div className="flex">
                  <div className="w-2/5">
                  <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white w-[100%] rounded-2xl m-4">
                    <img
                      className="h-56  w-[100%] object-cover rounded-2xl"
                      src={article.image}
                      alt={article.title}
                    />
                  </div>
                    <h1 className="font-bold text-xl pl-4">{article.title}</h1>
                    <p className = "py-2 pl-4">{article.publish_date.split(" ")[0]}</p>
                  </div>
                  <div className="relative w-3/5 p-4  m-4">
                    <p className="text-md absolute mr-5 text-justify font-normal h-44">
                      {article.summary.slice(0,200)}...
                    </p>
                    <div className="absolute bottom-0 right-0 flex justify-between w-8/12">
                      <div>
                        <a href={article.url}>
                          <button className="readmore-btn">
                            <span className="book-wrapper">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="rgb(86, 69, 117)"
                                viewBox="0 0 126 75"
                                className="book"
                              >
                                <rect
                                  strokeWidth="3"
                                  stroke="#fff"
                                  rx="7.5"
                                  height="70"
                                  width="121"
                                  y="2.5"
                                  x="2.5"
                                ></rect>
                                <line
                                  strokeWidth="3"
                                  stroke="#fff"
                                  y2="75"
                                  x2="63.5"
                                  x1="63.5"
                                ></line>
                                <path
                                  strokeLinecap="round"
                                  strokeWidth="4"
                                  stroke="#fff"
                                  d="M25 20H50"
                                ></path>
                                <path
                                  strokeLinecap="round"
                                  strokeWidth="4"
                                  stroke="#fff"
                                  d="M101 20H76"
                                ></path>
                                <path
                                  strokeLinecap="round"
                                  strokeWidth="4"
                                  stroke="#fff"
                                  d="M16 30L50 30"
                                ></path>
                                <path
                                  strokeLinecap="round"
                                  strokeWidth="4"
                                  stroke="#fff"
                                  d="M110 30L76 30"
                                ></path>
                              </svg>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 65 75"
                                className="book-page"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeWidth="4"
                                  stroke="#fff"
                                  d="M40 20H15"
                                ></path>
                                <path
                                  strokeLinecap="round"
                                  strokeWidth="4"
                                  stroke="#fff"
                                  d="M49 30L15 30"
                                ></path>
                                <path
                                  strokeWidth="3"
                                  stroke="#fff"
                                  d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"
                                ></path>
                              </svg>
                            </span>
                            <span className="readtext dark:text-white"> Read more </span>
                          </button>
                        </a>
                      </div>

                      <span> </span>
                      <div>
                        <button
                          className="btn"
                          onClick={() => handleClick(article.url)}
                        >
                          <svg
                            height="24"
                            width="24"
                            fill="#FFFFFF"
                            viewBox="0 0 24 24"
                            data-name="Layer 1"
                            id="Layer_1"
                            className="sparkle"
                          >
                            <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                          </svg>
                          <span className="text">Summary</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {index !== bookmarks.length - 1 ? (
                  <hr className="bg-gray-400 h-0.5 w-11/12 m-auto my-2" />
                ) : (
                  <hr className="bg-gray-400 h-0.5 w-0 m-auto my-2" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div class="flex justify-center items-center  lg:h-[560px]">
    <div class="relative flex justify-center items-center">
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="h3">loading</div>
        </div>
</div>
        )}
      </div>
      {open && (
        <div
        className ="fixed top-1/2 left-1/2"
          style={{
            transform: "translate(-50%, -50%)",
            backgroundColor: "#F6F5F2",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
            zIndex: 10,
          }}
        >
          {summary ? (
            <div className = "relative  p-6 dark:bg-[#202124]">
            <button className = "absolute right-6 top-6 text-red-500 font-bold text-xl" onClick={handleClose}>X</button>
              <h1 className = "font-bold text-xl mb-3 dark:text-white">Summary</h1>

              <ul className = "list-disc p-4 dark:text-white">
              {summary.split("- ").map((s,index)=>(
               (index!==0) && (<li className = "mb-5 text-justify" key={index}><p>{s}</p></li>)
              ))}
              </ul>

            </div>
          ) : (
            <div className="loading relative dark:bg-[#202124]">
            <button className = "absolute   right-2 top-0 text-red-500 font-bold text-xl" onClick={handleClose}>X</button>

            <h1 className="mr-1 dark:text-white">Generating</h1>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  
</div>
          )}
        </div>
      )}
      
      </div>
      <Footer/>
        </div>
    )
}

export default Bookmarks;