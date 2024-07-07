import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Components/navbar";


function Article() {
  const [data, setData] = useState([
    {
      source: {
        id: "the-times-of-india",
        name: "The Times of India",
      },
      author: "TNN",
      title: "Direct tax kitty increases 22%, cushion for government to spend more",
      description:
        "India's Gross Direct Tax Collections surged by 22.2% to reach Rs 5.15 Lakh Crore, supporting higher government spending. The finance ministry's latest data highlights a 27.3% boost in advance tax collections, mostly from the corporate sector. Refunds amountin…",
      url: "https://timesofindia.indiatimes.com/business/india-business/direct-tax-kitty-increases-22-cushion-for-govt-to-spend-more/articleshow/111096712.cms",
      urlToImage:
        "https://static.toiimg.com/thumb/msid-111096806,width-1070,height-580,imgsize-576546,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
      publishedAt: "2024-06-18T23:13:19Z",
      content:
        "FD Calculator\r\nWhen investing in a fixed deposit, the amount you deposit earns interest as per the prevailing...\r\nCalculate Now",
    },
    {
      source: {
        id: "the-times-of-india",
        name: "The Times of India",
      },
      author: "TNN",
      title: "Direct tax kitty increases 22%, cushion for government to spend more",
      description:
        "India's Gross Direct Tax Collections surged by 22.2% to reach Rs 5.15 Lakh Crore, supporting higher government spending. The finance ministry's latest data highlights a 27.3% boost in advance tax collections, mostly from the corporate sector. Refunds amountin…",
      url: "https://timesofindia.indiatimes.com/business/india-business/direct-tax-kitty-increases-22-cushion-for-govt-to-spend-more/articleshow/111096712.cms",
      urlToImage:
        "https://static.toiimg.com/thumb/msid-111096806,width-1070,height-580,imgsize-576546,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
      publishedAt: "2024-06-18T23:13:19Z",
      content:
        "FD Calculator\r\nWhen investing in a fixed deposit, the amount you deposit earns interest as per the prevailing...\r\nCalculate Now",
    },
  ]);

  const [darkmode,setdarkmode] = useState(true);
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("- A college in Chembur, Mumbai told the Bombay High Court that it is implementing a dress code for students of all communities, not just for Muslim students. - The college is defending its ban on burqa, hijab, and naqab in the classroom, stating that the dress code applies to all and is not targeted at any specific community. - The students argue that wearing the hijab and naqab is their choice and a fundamental right, protected under the right to privacy and freedom of expression. - The college argues that religious symbols should not be openly displayed, and the dress code is to maintain a neutral, non-revealing environment for education. - The judges will pass the order on the issue on June 26.");

  const date = new Date();
  const day = String(date.getDate()-1).padStart(2, "0");
  const month = String(date.getMonth()+1).padStart(2, "0");
  const year = date.getFullYear();
  const currdate = `${year}-${month}-${day}`;
  
  const handledarkmode = () => {
    setdarkmode(darkmode?false:true);
    console.log(darkmode);
  }
  const handleClick = async (url) => {
    setOpen(true);
    // const options = {
    //   method: "GET",
    //   url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
    //   params: {
    //     url: url,
    //     lang: "en",
    //     engine: "2",
    //   },
    //   headers: {
    //     "x-rapidapi-key": "69f8d926dcmshf47e885ee5df937p11305ajsn790164993433",
    //     "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
    //   },
    // };
    // try {
    //   const response = await axios.request(options);
    //   setSummary(response.data.summary);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
axios.get(`https://newsapi.org/v2/everything?from=${currdate}&to=${currdate}&sources=the-times-of-india&language=en&apiKey=fe368080bde84609b012936a091fbe43`)
.then((response) => {
setData(response.data.articles);
console.log(data);
})
.catch((error) => {
console.error("Error fetching data: ", error);
});
}, []);

  const handleClose = () => {
    setOpen(false);
    setSummary(null);
  };

  return (
    <div className = {`${darkmode ? "" :"dark"}`}>
    <div className="bg-[#F6F5F2] dark:bg-[#29292d] transition transition-all delay-0.5">
    <NavBar handledarkmode={handledarkmode}/>
      <div
        className="w-3/4 m-auto my-10 pt-2 px-2 rounded-3xl bg-[#F0EBE3] dark:bg-[#202124] dark:text-white transition transition-all delay-0.5"
        
      >
        {data.length > 0 ? (
          <div>
            {data.map((article, index) => (
              <div className="relative" key={index}>
                <label className="ui-bookmark right-1 top-2 absolute">
                  <input type="checkbox" />
                  <div className="bookmark">
                    <svg viewBox="0 0 32 32">
                      <g>
                        <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                      </g>
                    </svg>
                  </div>
                </label>

                <div className="flex">
                  <div className="w-2/5 ">
                    <img
                      className="h-56  rounded-2xl m-4"
                      src={article.urlToImage}
                      alt={article.title}
                    />
                  
                    <h1 className="font-bold text-xl pl-4">{article.title}</h1>
                    <p className = "py-2 pl-4">{article.publishedAt.split("T")[0]}</p>
                  </div>
                  <div className="relative w-3/5 p-4  m-4">
                    <p className="absolute mr-5 text-justify font-normal h-44">
                      {article.description}
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

                {index !== data.length - 1 ? (
                  <hr className="bg-gray-400 h-0.5 w-11/12 m-auto my-2" />
                ) : (
                  <hr className="bg-gray-400 h-0.5 w-0 m-auto my-2" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
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
            <div className = "relative  p-6">
            <button className = "absolute right-6 top-6 text-red-500 font-bold text-xl" onClick={handleClose}>X</button>
              <h1 className = "font-bold text-xl mb-3">Summary</h1>

              <ul className = "list-disc p-4">
              {summary.split("- ").map((s,index)=>(
               (index!==0) && (<li className = "mb-5 text-justify" key={index}><p>{s}</p></li>)
              ))}
              </ul>

            </div>
          ) : (
            <div className="loading relative">
            <button className = "absolute right-2 top-0 text-red-500 font-bold text-xl" onClick={handleClose}>X</button>

            <h1 className="mr-1">Generating</h1>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  
</div>
          )}
        </div>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
      )}
    </div>
    </div>
  );
}

export default Article;