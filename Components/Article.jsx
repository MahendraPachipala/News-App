import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Article() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("");

  const date = new Date();
  const day = String(date.getDate() - 1).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const currdate = `${year}-${month}-${day}`;

  const handleClick = async (url) => {
    setOpen(true);
    const options = {
      method: 'GET',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
      params: {
        url: url,
        lang: 'en',
        engine: '2'
      },
      headers: {
        'x-rapidapi-key': 'a18a867a10mshb3b02c0e990ff06p142273jsn25cb327837f7',
        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/everything?from=${currdate}&to=${currdate}&sources=the-times-of-india&language=en&domains=techcrunch.com,thenextweb.com&apiKey=43c4506078914be3afaed92450bf23ec`)
    // 7027cf58e4b74a5ca31057eff8752216
      .then((response) => {
        setData(response.data.articles);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [currdate]);

  const handleClose = () => {
    setOpen(false);
    setSummary(null);
  };

  return (
    <div>
      <div></div>
      {data.length > 0 ? (
        <ul>
          {data.map((article, index) => (
            <li key={index}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url}>Read more</a>
              <span> </span>
              <button onClick={() => handleClick(article.url)}>View Summay</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}

      {open && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
          zIndex: 1000
        }}>
          <h1>Summary</h1>
          <p>{summary || "Loading..."}</p>
          <button onClick={handleClose}>X</button>
        </div>
      )}

      {open && <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999
      }} />}
    </div>
  );
}

export default Article;
