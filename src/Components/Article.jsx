import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Components/navbar";
import { auth, db } from "../config/firebase";
import { setDoc, doc, arrayUnion, updateDoc } from "firebase/firestore";
import { useAuth, useDarkMode } from "../config/AuthContext";
import Footer from "./Footer";

function Article() {
  const [data, setData] = useState([]);
  const { darkmode } = useDarkMode();
  const user = useAuth().currUser;
  const userId = user.uid;

  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [profile, isprofile] = useState(true);


  const date = new Date();
  const currdate = date.toISOString().split("T")[0]; 

  const prev = new Date(date);
  prev.setDate(prev.getDate() - 1);

  function getPreviousDate(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

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

  const handleBookmark = async (article) => {
    updateDoc(doc(db, "Users", userId), {
      articles: arrayUnion(article),
    });
  };

//  useEffect(() => {
//   setData(
//     [{
//         "id": 322692782,
//         "title": "Ryan Preece responds after receiving penalty at the All-Star race at North Wilkesboro",
//         "text": "Ryan Preece was frustrated over his ‘choose V violation’ at the NASCAR All-Star Open. He was sent to the back of the field, compromising his run for a chance to advance to the main event, where a $1 million prize awaits.A ‘choose cone’ is a marking on the track where drivers can choose whether to run top or bottom on a restart. Preece, driver of the #60 RFK Racing Ford, claimed he didn't see the marking, resulting in a penalty, which he accepted after calling it a mistake.NASCAR Insider Dustin Long caught the 34-year-old driver's heated radio message over the penalty at North Wilkesboro Speedway and posted it on X (formerly Twitter).“(Ryan) Preece on team radio: ‘How can we do that. You can't even see the (#&(@&* thing. ... That's @(*(*(! ... How can you call it if you can't even see it?’” Long wrote.After the 100-lap last chance qualifier, Ryan Preece, on X, posted a picture of the ‘choose cone’ next to the start/finish line. Based on the photo, the marking seemed covered by burned tire rubber, though the two supplementary triangular signs could be seen on the fence.As a result, Preece came short of the two transfer spots in 11th place. The top two finishers were Carson Hocevar and John Hunter Nemechek, who will start in the NASCAR All-Star Race in 21st and 22nd, respectively. Noah Gragson, meanwhile, won the fan vote contest to complete the 23-car field of the main event.FS1 will commence the All-Star Race broadcast on Sunday at 8:00 p.m. ET. RFK Racing teammate Brad Keselowski will start in pole position ahead of Christopher Bell. Preece's other teammate, Chris Buescher, will also participate and start in 10th.“Just frustrated with the outcome”: Ryan Preece on ‘choose V violation’ at North WilkesboroIn a post-race interview, Ryan Preece shared his thoughts on his ‘choose V violation’ at the NASCAR All-Star Open. He was frustrated with the penalty after pointing out the orange marking wasn't visible.Preece, who previously drove for the now-defunct Stewart-Haas Racing, said (via Matt Weaver on X):“It's a cone that's nonexistent. So if you're going to... I don't know. Can't even see it right now so, a rule is a rule. I understand that. But at the end of the day, I made a mistake, just frustrated with the outcome... or the decision.” [0:03]The Connecticut native later proposed an idea regarding the ‘choose V rule,' saying:“Put a cone out there. If we're going to have a cone rule, put a cone.” [1:10]With Ryan Preece finishing 11th at the NASCAR All-Star Open, his day at North Wilkesboro Speedway is done. He will be back in action next week at Charlotte Motor Speedway for the Coca-Cola 600, the longest race on the schedule.As of this writing, the first-year RFK Racing driver has amassed one top-5 and four top-10 finishes. His best result came at the Las Vegas Motor Speedway, finishing third behind race winner Josh Berry and Daniel Suarez.",
//         "summary": "Ryan Preece was frustrated over his ‘choose V violation’ at the NASCAR All-Star Open.",
//         "url": "https://www.sportskeeda.com/nascar/news-ryan-preece-responds-receiving-penalty-all-star-race-north-wilkesboro",
//         "image": "https://staticg.sportskeeda.com/editor/2025/05/25402146-1747611035.jpeg",
//         "video": null,
//         "publish_date": "2025-05-19 00:50:06",
//         "author": "Zarec Sanchez",
//         "authors": [
//             "Zarec Sanchez"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": -0.203
//     },
//     {
//         "id": 322692784,
//         "title": "\"Nico Harrison would trade him tomorrow\" - NBA fans clown Nikola Jokic for focusing on 'beer' after Nuggets playoff flameout",
//         "text": "A cloud of uncertainty surrounds Nikola Jokic and the Denver Nuggets during the 2024/25 offseason. Not only does the front office need to figure out how to retool the roster around Jokic, but it also needs to answer questions regarding their next coach and their vacant general manager position.While there will be a time for these lingering questions to be answered, Jokic already knows how he plans to start the offseason. He said he'll likely be drinking \"a lot of beer,\" at least for the next few days. View this post on Instagram Instagram PostNikola Jokic's plans for the immediate future earned some laughs from the assembled media and the fans who later saw the clip on social media.\"Nico (Harrison) would trade him tomorrow,\" one fan joked.\"Jokic: Beers and Horses,\" another chimed in.\"Luka's twin,\" one person added.Fans on Instagram also did the same, as several commenters unleashed hilarious statements in response to the Joker.\"\"Shai: Hungry for MVP and a ring. Jokic: Hungry for beer and ride horses,\" one fan said.Fans react to Nikola Jokic's comment (Credits: @bleacherreport/Instagram)\"The man is happy he don't gotta play anymore and he can go back to his horses,\" another commented.Fans react to Jokic's comment (Credits: @bleacherreport/Instagram)\"The NBA is holding this man back from living his dreams,\" one person quipped.Fans react to Jokic's comment (Credits: @bleacherreport/Instagram)Their defeat at the hands of the OKC Thunder marks the second straight year that the Denver Nuggets were eliminated in the Conference semifinals.Also read: Giannis Antetokounmpo picks himself, Nikola Jokic and 3 other NBA players weighing 805 lbs to take on silverback gorillaNikola Jokic advised Aaron Gordon to sit out Game 7 amidst injury concernAaron Gordon was a valuable contributor for the Denver Nuggets this postseason, especially with his clutch play. However, he was reportedly not at 100% entering Game 7 on Sunday.He reportedly had a strained left hamstring, which made his status questionable. However, Gordon still managed to suit up and try to help his team reach the Western Conference finals.Nikola Jokic told the media that he had told Gordon not to play to avoid exacerbating his injury. Still, he appreciated how he battled despite being hobbled.\"I told him to not play, you can injure yourself even worse. He was struggling to move \" Jokic said. \"But, he went out there and fought with us and we can just appreciate it.\"Despite the injury, Aaron Gordon played for 24-and-a-half minutes. He logged eight points and grabbed 11 rebounds in his team's 93-125 loss.",
//         "summary": "A cloud of uncertainty surrounds Nikola Jokic and the Denver Nuggets during the 2024/25 offseason.",
//         "url": "https://www.sportskeeda.com/basketball/news-nico-harrison-trade-tomorrow-nba-fans-clown-nikola-jokic-focusing-beer-nuggets-playoff-flameout",
//         "image": "https://staticg.sportskeeda.com/editor/2025/05/26220172-1747613743.jpeg",
//         "video": null,
//         "publish_date": "2025-05-19 00:50:06",
//         "author": "Miguel de Guzman",
//         "authors": [
//             "Miguel de Guzman"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": -0.09
//     },
//     {
//         "id": 322692786,
//         "title": "2025 PGA Championship payouts: How much each golfer earned from the $19M purse",
//         "text": "The second Major championship of the year, the 2025 PGA Championship, has concluded. Scottie Scheffler has been crowned the champion after posting a final-round score of even par to total 11 under par for the week.The winner of the 2025 PGA Championship earned $3.42 million for posting rounds of 69, 68, 65, and 71 at Quail Hollow. Scheffler also earned 750 FedEx Cup points.Harris English, Bryson DeChambeau, and Davis Riley shared joint second place. The three world-class golfers earned paychecks of $1,418,667 each.Here's a look at the breakdown of the 2025 PGA Championship's $19 million purse prize (via Golfweek):Pos.PlayerScoreEarnings1Scottie Scheffler-11$3,420,000T2Bryson DeChambeau-6$1,418,667T2Harris English-6$1,418,667T2Davis Riley-6$1,418,667T5Taylor Pendrith-5$694,700T5Jhonattan Vegas-5$694,700T5J.T. Poston-5$694,700T8Joaquín Niemann-4$415,262T8Ben Griffin-4$415,262T8Denny McCarthy-4$415,262T8Ryan Gerard-4$415,262T8Joe Highsmith-4$415,262T8Keegan Bradley-4$415,262T8Matt Fitzpatrick-4$415,262T8Jon Rahm-4$415,262T8Si Woo Kim-4$415,262T17Alex Noren-3$290,230T17Matt Wallace-3$290,230T19Sam Burns-2$190,109T19Corey Conners-2$190,109T19Beau Hossler-2$190,109T19Aaron Rai-2$190,109T19Taylor Moore-2$190,109T19Harry Hall-2$190,109T19Cam Davis-2$190,109T19Adam Scott-2$190,109T19Tony Finau-2$190,109T28Xander Schauffele-1$115,820T28Marco Penge-1$115,820T28Viktor Hovland-1$115,820T28Alex Smalley-1$115,820T28Ryan Fox-1$115,820T33Daniel BergerE$89,193T33Thorbjorn OlesenE$89,193T33Maverick McNealyE$89,193T33Max GreysermanE$89,193T37Richard Bland1$75,378T37J.J. Spaun1$75,378T37Ryo Hisatsune1$75,378T37Lucas Glover1$75,378T41Nicolai Hojgaard2$60,677T41Tommy Fleetwood2$60,677T41Nico Echavarria2$60,677T41Eric Cole2$60,677T41Michael Thorbjornsen2$60,677T41Matthieu Pavon2$60,677T47Rory McIlroy3$49,190T47Cameron Young3$49,190T47Robert MacIntyre3$49,190T50Kevin Yu4$40,674T50Collin Morikawa4$40,674T50Tom McKibbin4$40,674T50Christiaan Bezuidenhout4$40,674T50Wyndham Clark4$40,674T55Chris Kirk5$32,138T55Brian Campbell5$32,138T55Michael Kim5$32,138T55Rafael Campos5$32,138T55Garrick Higgo5$32,138T60Brian Harman6$27,015T60Justin Lower6$27,015T60Sam Stevens6$27,015T60Luke Donald6$27,015T60Tyrrell Hatton6$27,015T60Max Homa6$27,015T60David Puig6$27,015T67Sergio Garcia7$24,927T67Austin Eckroat7$24,927T67Rasmus Hojgaard7$24,92770Stephan Jaeger8$24,24071Tom Kim9$23,940T72Bud Cauley10$23,660T72Elvis Smylie10$23,66074Byeong Hun An13$23,420Following the conclusion of the 2025 PGA Championship, the next tournament on the PGA Tour's schedule is the Charles Schwab Challenge. The event will be held in Texas from May 22 to 25.Scottie Scheffler's 2025 PGA Championship ScorecardsHere's a look at Scottie Scheffler's scorecards for all four rounds of the 2025 PGA Championship (via PGA Tour):Round 1 (2 under par - 69)Hole 1 (par 4) - 4Hole 2 (par 4) - 3Hole 3 (par 4) - 5Hole 4 (par 3) - 3Hole 5 (par 4) - 4Hole 6 (par 3) - 3Hole 7 (par 5) - 4Hole 8 (par 4) - 4Hole 9 (par 4) - 3Hole 10 (par 5) - 5Hole 11 (par 4) - 5Hole 12 (par 4) - 3Hole 13 (par 3) - 3Hole 14 (par 4) - 4Hole 15 (par 5) - 3Hole 16 (par 4) - 6Hole 17 (par 3) - 3Hole 18 (par 4) - 4Round 2 (3 under par - 68)Hole 1 (par 4) - 4Hole 2 (par 4) - 4Hole 3 (par 4) - 3Hole 4 (par 3) - 3Hole 5 (par 4) - 4Hole 6 (par 3) - 3Hole 7 (par 5) - 5Hole 8 (par 4) - 3Hole 9 (par 4) - 4Hole 10 (par 5) - 5Hole 11 (par 4) - 4Hole 12 (par 4) - 4Hole 13 (par 3) - 4Hole 14 (par 4) - 3Hole 15 (par 5) - 4Hole 16 (par 4) - 4Hole 17 (par 3) - 3Hole 18 (par 4) - 4Round 3 (6 under par - 65)Hole 1 (par 4) - 5Hole 2 (par 4) - 4Hole 3 (par 4) - 4Hole 4 (par 3) - 2Hole 5 (par 4) - 3Hole 6 (par 3) - 3Hole 7 (par 5) - 4Hole 8 (par 4) - 4Hole 9 (par 4) - 4Hole 10 (par 5) - 5Hole 11 (par 4) - 5Hole 12 (par 4) - 3Hole 13 (par 3) - 4Hole 14 (par 4) - 2Hole 15 (par 5) - 4Hole 16 (par 4) - 4Hole 17 (par 3) - 2Hole 18 (par 4) - 3Round 4 (even par - 71)Hole 1 (par 4) - 5Hole 2 (par 4) - 3Hole 3 (par 4) - 4Hole 4 (par 3) - 3Hole 5 (par 4) - 4Hole 6 (par 3) - 4Hole 7 (par 5) - 5Hole 8 (par 4) - 4Hole 9 (par 4) - 5Hole 10 (par 5) - 4Hole 11 (par 4) - 4Hole 12 (par 4) - 4Hole 13 (par 3) - 3Hole 14 (par 4) - 3Hole 15 (par 5) - 4Hole 16 (par 4) - 4Hole 17 (par 3) - 3Hole 18 (par 4) - 5",
//         "summary": "The second Major championship of the year, the 2025 PGA Championship, has concluded.",
//         "url": "https://www.sportskeeda.com/golf/news-2025-pga-championship-payouts-how-much-golfer-earned-19m-purse",
//         "image": "https://staticg.sportskeeda.com/editor/2025/05/26220613-1747611251.jpeg",
//         "video": null,
//         "publish_date": "2025-05-19 00:50:06",
//         "author": "Lathika Krishna",
//         "authors": [
//             "Lathika Krishna"
//         ],
//         "language": "en",
//         "category": "sports",
//         "source_country": "in",
//         "sentiment": -0.104
//     },
//     {
//         "id": 322693264,
//         "title": "India News | Uttar Pradesh ATS Arrests Suspected Pakistani Spy",
//         "text": "Lucknow (Uttar Pradesh) [India], May 19 (ANI): The Uttar Pradesh Anti-Terrorism Squad has arrested a suspected Pakistani spy, who had been smuggling goods across the India-Pak border and allegedly working for the Pakistani intelligence agency.\nAccording to the ATS, the suspected spy, identified as Shahzad, is from Moradabad and had smuggled cosmetics, clothes, spices and other goods illegally across the border between India and Pakistan. Under the guise of smuggling, he worked for the Pakistani intelligence agency ISI, the Uttar Pradesh ATS said on Sunday.\nAlso Read | Gulzar Houz Fire: 17 People, Including 8 Children Killed in Massive Blaze in Hyderabad's Charminar; PM Narendra Modi, Telangana Govt Announce Ex-Gratia for Families of Victims.\n\"Shahzad has good relations with the agents of ISI, with whom he was in constant touch. Shahzad has shared confidential information related to India's security with the agents of ISI,\" the ATS said in a statement.\n\"On confirmation of this information, FIR was registered under sections 148 and 152 at ATS, Lucknow. Shahzad was arrested today (May 19) by UP ATS from Moradabad, who is being presented before the court as per rules, and further legal action is being taken,\" it added.\nAlso Read | Spying for Pakistan: Haryana Police Arrest Several for Espionage; DGP Shatrujeet Kapoor Says ‘Action Result of Increased Vigilance Post Operation Sindoor’ (Watch Video).\nThe ATS further said that Shahzad used to provide money to the agents of ISI present in India. \"He also used to send people from many parts of Rampur district and Uttar Pradesh to Pakistan to work for ISI under the guise of smuggling. The ISI also arranged the visas of these people. Shahzad had also provided Indian SIMs to the ISI agents to spy against India,\" the statement stated.\nEarlier in Haryana, several individuals were arrested for alleged espionage activities in favour of Pakistan, according to Haryana Director General of Police (DGP) Shatrujeet Kapoor. He said the crackdown was the result of increased vigilance and surveillance across the state.\nSpeaking at a press conference, Kapoor said the arrests were made in the aftermath of Operation Sindoor, with anti-national elements apprehended in various districts of Haryana.\nHe said the arrests were based on input from central and state intelligence agencies, adding, \"After Operation Sindoor, we had increased vigilance, and under that, based on information received from our central agencies and state intelligence agencies, anti-national elements were caught in some districts. Cases have been registered against them, and they have been arrested and sent to jail.\" (ANI) (This is an unedited and auto-generated story from Syndicated News feed, LatestLY Staff may not have modified or edited the content body)",
//         "summary": "Get latest articles and stories on India at LatestLY.  The Uttar Pradesh Anti-Terrorism Squad has arrested a suspected Pakistani spy, who had been smuggling goods across the India-Pak border and allegedly working for the Pakistani intelligence agency.",
//         "url": "https://www.latestly.com/agency-news/india-news-uttar-pradesh-ats-arrests-suspected-pakistani-spy-6864543.html",
//         "image": "https://st1.latestly.com/wp-content/uploads/2025/05/ANI-20250518221053.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 00:50:25",
//         "author": null,
//         "language": "en",
//         "category": "politics",
//         "source_country": "in",
//         "sentiment": -0.247
//     },
//     {
//         "id": 322698080,
//         "title": "Bellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4",
//         "text": "Home » Gallery » Tollywood » Bellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4\n\nPosted By: Harsha Vardhan\nMay 18, 2025\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nBellamkonda Sai Sreenivas – Manoj Manchu And Nara Rohith’s Bhairavam Trailer Launch Gallery Set 4 (Photo:SocialNews.XYZ/NewsHelpline.com)\n\nFacebook Comments\n\nAbout Harsha\n\nLike Loading...",
//         "summary": "The post Bellamkonda Sai Sreenivas &#8211; Manoj Manchu And Nara Rohith&#8217;s Bhairavam Trailer Launch Gallery Set 4 appeared first on Social News XYZ.",
//         "url": "https://www.socialnews.xyz/2025/05/18/bellamkonda-sai-sreenivas-manoj-manchu-and-nara-rohiths-bhairavam-trailer-launch-gallery-set-4/",
//         "image": "https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2025/05/18/bellamkonda-sai-sreenivas--manoj-manchu-and-nara-rohith-s-bhairavam-trailer-launch-gallery-set-4-.jpg?fit=1707%2C2560&quality=80&zoom=1&ssl=1?v=1747593588",
//         "video": null,
//         "publish_date": "2025-05-19 00:50:38",
//         "author": "Harsha Vardhan",
//         "authors": [
//             "Harsha Vardhan"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": -0.432
//     },
//     {
//         "id": 322693148,
//         "title": "Gemini Horoscope Today, May 19th, 2025",
//         "text": "Gemini Daily Horoscope Today, 19th May 2025: Ganesha says you’ve been thinking about making a big purchase recently, perhaps a new car or motorbike. Now is a good time to adopt this option, so consider your options today. Your financial aspects are positive, so adopt the model you are hoping for. You may get help from some special people to expand your business. Professional clarity will increase. The industry will strengthen trade.\nThe partnership will be carried forward. There will be coordination with all. Leadership and management will improve. There will be discipline in the field of work. Auspicious proposals related to work and business will be received. Will be involved in creative work. Respect will increase. Will increase communication. Will pay attention to food. Will give importance to stability. Will be full of enthusiasm. The situation and reputation will be found. Check out your daily horoscope for May 19, 2025 here.\nGemini Horoscope Today, May 19th, 2025\n\nPositive: Ganesha says it is a favorable time. You will implement your plans and get positive results. You will get a chance to meet close relatives. And this meeting will give you relief from the everyday stressful environment, Gemini.\nNegative: Be careful while transacting money with a stranger. There can be a loss. Along with helping someone, take care of your budget as well. Along with entertainment, it is also important to pay attention to your work.\nBusiness: While taking any decision related to business and job, do not depend on others and find a solution to your problem yourself. If any court case is going on. Then there is a need to be very careful. Otherwise, you may have to bear the brunt of someone else’s mistake.\nLove: Family environment will be normal. You will meet a friend of the opposite sex. And old memories will be refreshed.\nHealth: The current weather can affect health. People suffering from high blood pressure, diabetes, etc., should take special care of themselves. And get your regular checkup done.\n\nLucky Colour: Blue\nLucky Number: 3\n\n(The author Chirag Daruwalla is the son of Astrologer Bejan Daruwalla).",
//         "url": "https://www.news18.com/astrology/gemini-daily-horoscope-today-mithuna-rashifal-astrological-predictions-on-may-19th-2025-ws-e-9341903.html",
//         "image": "https://images.news18.com/ibnlive/uploads/2025/05/image-2025-05-7072026f88fb032079ac5b1ad1de01d1.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 00:50:47",
//         "author": "Chirag Daruwalla,News18,Nibandh Vinod",
//         "authors": [
//             "Chirag Daruwalla",
//             "News18",
//             "Nibandh Vinod"
//         ],
//         "language": "en",
//         "category": "lifestyle",
//         "source_country": "in",
//         "sentiment": 0.392
//     },
//     {
//         "id": 322693266,
//         "title": "India News | North Bengal Exporters Association Welcomes Centre's Decision to Impose Trade Restrictions with Bangladesh",
//         "text": "Siliguri (West Bengal) [India], May 19 (ANI): The North Bengal Exporters Association has welcomed the central government's decision to impose port restrictions on the import of certain goods, such as readymade garments and processed food items from Bangladesh. Brij Kishore Prasad, the Secretary of the Association, said that the decision is in the country's interest and will also impact Bangladesh's economy.\nAlso Read | Gulzar Houz Fire: 17 People, Including 8 Children Killed in Massive Blaze in Hyderabad's Charminar; PM Narendra Modi, Telangana Govt Announce Ex-Gratia for Families of Victims.\n\"We welcome the decision of the Government of India. It is in the interest of our country. It will impact the economy of Bangladesh. We heartily welcome it, and this is good for us as well as for the countrymen. We are with the country,\" Prasad told ANI.\nEarlier, Foreign Affairs Expert Robinder Sachdev claimed that the decision to impose restrictions sends a clear message of vigilance and was a strict response to a few concerning developments in India's eastern neighbour amid tensions between India and Pakistan.\nAlso Read | Spying for Pakistan: Haryana Police Arrest Several for Espionage; DGP Shatrujeet Kapoor Says ‘Action Result of Increased Vigilance Post Operation Sindoor’ (Watch Video).\nSpeaking to ANI on Sunday, Sachdev stated that the move was a \"strict response\" to Bangladesh's movements promoting 'Greater Bangla' and 'Sultanate Bangla', which claim territories such as Bihar, Jharkhand, and Northeast India.\nOn Saturday, the Ministry of Commerce and Industry imposed immediate land port restrictions on the import of several categories of goods from Bangladesh, following a directive issued by the Directorate General of Foreign Trade (DGFT).\nThe move limits the entry of products such as ready-made garments and processed foods to specific seaports, an official press release by the Ministry stated and is widely viewed as a response to Bangladesh's recent curbs on Indian yarn, rice, and other goods, along with its decision to impose a transit fee on Indian cargo, marking a shift from previously cooperative trade relations. Under the new directive, all kinds of ready-made garments from Bangladesh can now only be imported through Nhava Sheva and Kolkata seaports, with entry through land ports no longer permitted.\nEadrleir, Global Trade Research Initiative (GTRI), reported that India's restrictions on imports from Bangladesh via land ports will impact goods worth USD 770 million, accounting for nearly 42 per cent of total bilateral imports. (ANI) (This is an unedited and auto-generated story from Syndicated News feed, LatestLY Staff may not have modified or edited the content body)",
//         "summary": "Get latest articles and stories on India at LatestLY.  Brij Kishore Prasad, the Secretary of the Association, said that the decision is in the country's interest and will also impact Bangladesh's economy.",
//         "url": "https://www.latestly.com/agency-news/india-news-north-bengal-exporters-association-welcomes-centres-decision-to-impose-trade-restrictions-with-bangladesh-6864545.html",
//         "image": "https://st1.latestly.com/wp-content/uploads/2025/05/ANI-20250518232004.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 00:52:25",
//         "author": null,
//         "language": "en",
//         "source_country": "in",
//         "sentiment": 0.042
//     },
//     {
//         "id": 322720792,
//         "title": "30-50% rise in mental health insurance claims, most claims for anxiety, depression: Study",
//         "text": "27%This is how likely women are to enrol for mental health coverage, with 65% of insured women choosing policies that offer add-ons or features addressing mental and hormonal health.+41%The year-on-year growth in mental health insurance searches in 2025.30-50%This is the rise in mental health-related claims over the past 2–3 years.50-55% This is how much tier 1 cities account for in terms of mental health insurance uptake.25-35 yearsThis is the age group that leads in search interest, adoption and claims.Anxiety disorders are the top reason for claimsShare of claims30-35%Anxiety disorders (generalised anxiety, panic disorder, etc.)5-10%Insomnia, adjustment disorders25-30%Depression (MDD, dysthymia, etc.)15-20%Workplace stress and burnout5%Others (OCD, PTSD, bipolar, etc.)Source: Policybazaar. The study was based on 40,000+ claims from across India for 2024-25.",
//         "summary": "Most claims are for anxiety and depression, reveals a recent study on mental health insurance by Policybazaar.",
//         "url": "https://economictimes.indiatimes.com/wealth/insure/health-insurance/30-50-rise-in-mental-health-insurance-claims-most-claims-for-anxiety-depression-study/articleshow/121218701.cms",
//         "image": "https://img.etimg.com/thumb/msid-121231783,resizemode-4,width-1200,height-900,imgsize-80270,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Et Contributors",
//         "authors": [
//             "Et Contributors"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": 0.392
//     },
//     {
//         "id": 322720794,
//         "title": "Which factor-based equity investment strategy gave most returns in last 11 years? Here’s an annual performance tracker",
//         "text": "121219629Steady wins: Low volatility and value shine Alpha and momentum investment strategies, which consider outperforming stocks, maintained their ranks among the top three investment strategies in eight out of the last 11 years.In 2025 so far, the low volatility strategy has taken the lead, outperforming amid market turbulence driven by tariff uncertainties, slowing earnings, export concerns, and high valuations.The value strategy, which focuses on stocks trading below their fair values, has performed well post-Covid-19 as lower interest rates, pent-up demand and higher government capex aided the share prices of undervalued companies. This strategy is the second-best performer in 2025 year-to-date, following the low volatility strategy.When considering the average and standard deviation of returns over the last 11 years, the low volatility strategy has the best risk-to-reward ratio.However, the risk-to-reward ratio of the value strategy is less favourable compared to other strategies.Source: NSE. *2025 data is year-to-date based on 13 May 2025 closing values. Other years’ returns are calculated between the first and the last trading day closing values. Indices considered—Equal weight: Nifty100 equal Weight; Low volatility: Nifty100 Low Volatility 30; Alpha: Nifty200 Alpha 30; Momentum: Nifty200 Momentum 30; Quality: Nifty200 Quality 30; Value: Nifty200 Value 30; Nifty 500: Nifty 500.",
//         "summary": "Welcome to TrendMap, your quick, visual guide to the performance of different investment segments. In this edition, we present an 11-year performance tracker of various factor-based investment strategies. The annual returns are ranked for six key NSE factor indices, with a broad-based index, Nifty 500, thrown in for comparison. This map shows that no single-factor strategy reigns supreme. Hence, diversification helps. By Sameer Bhardwaj.",
//         "url": "https://economictimes.indiatimes.com/wealth/invest/which-factor-based-equity-investment-strategy-gave-most-returns-in-last-11-years-heres-an-annual-performance-tracker/articleshow/121219654.cms",
//         "image": "https://img.etimg.com/thumb/msid-121231222,resizemode-4,width-1200,height-900,imgsize-44726,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Sameer Bhardwaj",
//         "authors": [
//             "Sameer Bhardwaj"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": 0.678
//     },
//     {
//         "id": 322720796,
//         "title": "How to get promoted without changing your job",
//         "text": "In a volatile job market, opportunities shrink. With major economic shifts and geopolitical uncertainty, companies worldwide are cutting costs and slowing hiring. So, internal mobility—promotions, lateral shifts, and stretch assignments—is the preferred tool for talent management because internal hires adapt faster, stay longer, and are lower risk than outsiders. For you, this is an opportunity. Instead of chasing fewer external offers, focus on growing within. You know the culture, understand the systems and have a reputation you can leverage.Spot the signsAre you ready for a promotion? Learn to recognise the signs. Readiness doesn’t start with the title; it starts with behaviour. Are your team members coming to you for help? Is your manager seeking your opinion on different decisions? When you are helping colleagues, delivering beyond your role and solving problems during crises, you are probably exceeding expectations. Don’t ignore these positive signs. Step up to your manager and discuss your prospects for the next promotion, including the timeline and how you can meet the job requirements.How internal hiring worksInternal job vacancies and promotions are not just about the job application, but also about perception. Most decisions are made before the role is posted. Managers and business heads have an informal shortlist of people known to deliver results in mind. If your name isn’t part of those early conversations, you are probably out of the process. So, you need to be visible. Internal hiring works in your favour if you stay on top of the mind, build a strong network, and make your contributions known to the right people.Trust across teamsYour reputation is your currency. The fastest way to get a promotion is to be the person everyone wants on their side, especially in cross-functional tasks. Volunteer for interdepartmental projects and urgent deadlines. Show that you solve issues proactively and under pressure. Reliability builds trust, and trust builds career momentum. Don’t just showcase competence, shape how people feel when they work with you. Emotional trust tips the scales in your favour when senior leaders choose you.Signal ambitionWaiting to be considered for promotion is not a great strategy. Show your intent, but tactfully and without entitlement. Your agenda in your one-on-one meetings with your manager should include discussions on career goals and feedback. Talk about your ambition in terms of contributions, not promotions: ‘How can I add more value?’ or ‘What skills do I need to take on more responsibility?’ Managers like to invest in people who align with team goals.Fill gapsDon’t wait for the promotion letter, prepare for it. What are the skills or abilities that your team leaders have that you are missing? Are they better at data analysis or client management or generating sales? Shortlist one or two high-value skills and start acquiring them. Use internal learning platforms, LinkedIn Learning, or fund your own training. Taking ownership of your development proves intent and also gets you ready for job.Solve for painWant to fast-track your career? Solve real business problems for your employer. What are some inefficiencies or unmet needs in your department? Create a solution-oriented proposal and execute it. The project gives you visibility, shows initiative and builds leadership skills. Create an internal case study that others will talk about, even when you are not in the room. Promotions go to those who show evidence of leadership.Create advocatesAdvocates are those who push your case and are different from mentors who guide your development. The person who stands up for you in a promotion meeting can be your direct manager, skip level leader, crossfunctional partner, or a business head. Build relationships with influencers in the organisation by asking for feedback, contributing to their projects and offering help where possible. Thereafter, keep them updated about your wins and your interests. The more people rooting for you, the greater your chances of success.Your internal resumeWhen you apply for an internal job posting, make sure that you customise your CV. Do not list down your roles and responsibilities. Instead highlight outcomes and business impact in terms of saved costs, accelerated timelines, improved processes, or happier clients. Always use numbers, benchmarks, or before-after snapshots. Your resume won’t be enough to get you through. Learn to document your achievements with key stakeholders and create informal visibility by sharing wins in town halls, internal Slack channels, or weekly team updates.Accept lateral movesNot all promotions are upwards. Sometimes, the path to the top involves a lateral shift into a different function, geography, or domain. Such moves prepare you for leadership by broadening your perspective, deepening your skills, and building versatility. They can be your strategic chess moves rather than career detours. Choose a lateral role today that places you in a better position for a big leap tomorrow. Become the kind of professional who thrives across contexts and adds value wherever placed.Be in actionInternal promotions are all about creating momentum, and by acting out the next version of yourself, shaping perception and building influence, before the title comes to you. Be proactive. Be strategic. And most of all, be ready—because the next opportunity may already be within reach.LEAD BEFORE YOU’RE PROMOTED1. ACT THE PARTLeadership is never conferred; it’s demonstrated. Act like the next-level leader to make your promotion inevitable. Step up in meetings, offer solutions, and guide your colleagues. When you take responsibility beyond your official role and behave like a team lead to help your manager achieve bigger goals, your promotion becomes a certainty.2. DELIVER BUSINESS IMPACTThink like the business owner to decide what matters most. So how will your current work make an impact on revenue, cost, or maybe client satisfaction? Speak the language of outcomes. Show quantifiable results in your reviews and updates. Impact is more compelling than just hard work.3. OWN A SIGNATURE PROJECTHow do you make your unique personal brand within the company, and link it to initiative and outcome? Pick a challenge nobody wants and solve it. Thus build an internal reputation by launching something new, fixing a broken process, or delivering a project with clear value.4. BE SEEN AND BE HEARDKnow that visibility multiplies opportunity. People cannot speak up for your promotion until they know what you have done. So share updates, insights, and your success stories through internal channels. Speak up in meetings and recognise others’ contributions too.5. BE A CULTURE MULTIPLIERGreat leaders uplift others. Are you mentoring juniors, promoting collaboration and driving positivity during crises? Employers promote those who not only show results, but also strengthen others. Be a person who builds a team culture of communication, learning and support.THE WRITER IS FOUNDER SALARYNEXT.COM, A JOB LOSS ASSURANCE FIRM, AND AUTHOR OF GET HIRED IN 30 DAYS.",
//         "summary": "Alter your career strategy in order to get the big break at your existing place of work, says Devashish Chakravarty.",
//         "url": "https://economictimes.indiatimes.com/wealth/earn/how-to-get-promoted-without-changing-your-job/articleshow/121217913.cms",
//         "image": "https://img.etimg.com/thumb/msid-121232714,resizemode-4,width-1200,height-900,imgsize-53036,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Devashish Chakravarty",
//         "authors": [
//             "Devashish Chakravarty"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": 0.188
//     },
//     {
//         "id": 322720798,
//         "title": "Why property may not be the best thing to leave behind for your children",
//         "text": "When I wrote a few years ago that leaving behind a house, land or property to children is wrought with hassles, I got mixed reaction. Some felt that the problems I described were real and it was practical to sell and leave financial instruments instead; others felt that selling a house might be difficult and would make the elderly vulnerable and, perhaps, subject to exploitation by children. We are living through a phase of unprecedented intergenerational wealth transfer across the world. It’s a good time to be an inheritor of wealth.However, I choose to return to the question about what to leave behind and why property might still be a poor choice. There were at least three different situations of wealth transfer that I happened to discuss with friends, and we could not agree on what to do with the land and house in all the three cases. At the same time, I read a story about how a large estate of an ace photographer was turned over to a trust, to be converted into a museum of her work, a small library and cafe, and a natural park for visitors to relax and walk about. There is a lot that can be done with hard-earned wealth, if one pauses to consider the choices from a position of power, rather than choose the default option of leaving it behind for the children.White elephantIn the first case, the children lived abroad. The elderly parents continued to live in the house they owned. They had friends nearby, reliable household help to take care of their needs and a stable pension income. Everything was fine until the building they lived in came up for redevelopment. The parents wanted the new flat that would be allotted. The children worried about the parents moving and living on rent while the house was being constructed, and wanted the shares in the housing society sold. They did not want or need the property. Even if it was renovated, they had no plans of returning to India. They also expressed the view that they would buy a house of their choice, if they decided to return. However, the parents felt that a reconstructed house was better and the children should have it.The father, however, passed away before the redevelopment could be finished. The family is now struggling to sell a house that is not even complete. The mother wants to live in a retirement home, but the children are hesitant to buy another property in India.Those who want to give something to someone often view the transaction from their own perspective. Being the giver, they believe they must have a say in what to give and how; they expect children to graciously accept it. However, the children may not truly need what is being offered. They may not be in a position to spend the time and effort to access it. Significant amounts of wealth remain locked in wasted assets that are not used, but simply passed on.Sibling rivalryIn the second case, the elderly mother was living in the house after her husband’s demise. She, however, depended on her two children for income. The older child lived close by, and the younger one, in another city. The elder son and his family took care of her needs, and spent a significant sum every month on her care. His younger brother sent a monthly allowance, which the mother chose to keep in the bank.The woman wants to write a will that leaves the house and bank deposits to both the children. The older brother resents this. He needs money to start a business that he had been planning for long. However, she cannot sell and divide the proceeds in her lifetime as she lives in that house. There is no other asset, financial or physical. An asset as chunky as a house, with no scope of dividing it or to will it as desired, makes property a difficult resource to transfer to one’s progeny.Dissatisfied heirThe third case involves parents, who decided to leave behind one property each for their two sons. The couple lived with the older son in one of the properties and rented the other, the income from which they used for miscellaneous expenses. The mother saved a portion of that income and gave gifts to the children of the son they were living with.Following the father’s demise, when the will was read, each son was bequeathed a house as decided earlier. However, the second child resented the fact that his house was valued lower, and that the rent had been consumed by the other sibling. The older child resented that the second one got the house earmarked for him without having to participate in the care of the parents.The mother feels alienated in the process. She is uncomfortable living with the elder son without contributing to the household. She cannot live with the second son whose wife is reluctant to care for her. She cannot claim the other house that her husband had bought because the will does not grant her its rights after his demise.Property is hard to split equally, as its value depends on location, amenities and market forces. Financial assets, on the other hand, are easier to divide; they’re valued in monetary terms, can be sold or transferred quickly, and involve lower transaction costs. The benefits of financial assets are well known, even to those who invest in property. Yet, the social prestige of owning multiple properties can be heady. Transferring them to the next generation, however, is often tricky, cumbersome and exhausting. Which is why it bears repeating: love your kids, but don’t leave property as proof of that love.The author is Chairperson, Centre for Investment Education and Learning.",
//         "summary": "Those who want to give something to someone often view the transaction from their own perspective. Being the giver, they believe they must have a say in what to give and how; they expect children to graciously accept it. However, the children may not truly need what is being offered.",
//         "url": "https://economictimes.indiatimes.com/wealth/plan/why-property-may-not-be-the-best-thing-to-leave-behind-for-your-children/articleshow/121218120.cms",
//         "image": "https://img.etimg.com/thumb/msid-121232571,resizemode-4,width-1200,height-900,imgsize-40758,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Uma Shashikant",
//         "authors": [
//             "Uma Shashikant"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": -0.141
//     },
//     {
//         "id": 322720800,
//         "title": "5 affordable holiday destinations in Europe, Asia as vacation alternatives to Turkey, Azerbaijan",
//         "text": "With public sentiment turning decisively against Turkey and Azerbaijan over their stance on the India-Pakistan tension, many Indian travellers are reconsidering their itineraries.Leading travel platforms such as MakeMyTrip, Cleartrip, and Ixigo have reported a significant spike in cancellations for trips booked to Turkey and Azerbaijan. To show solidarity with the national sentiment, travel aggregators have suspended bookings and removed promotional offers for both countries.Many travellers are now making plans for nations perceived as more friendly and welcoming to Indians. A typical budget trip to Turkey or Azerbaijan costs Rs.1-1.5 lakh per person—including round flights, visa, accommodation, activities, food, and local transport. If you’re looking to make a change, here are five alternative international destinations that offer rich experiences within the same expenditure.7 Days in GeorgiaTOTALRs.85,000-90,000 for one personWhat works:Flights: Rs.30,000 round trip (Delhi/Mumbai to Tbilisi; off-peak, Mar-Apr)Visa: Rs.1,800Food: Rs.1,000 per day per head (meals, coffee, snacks)Accommodation: Hotel Rs.2,000- 3,000 a night (Rs.21,000 a week)Transport: Car rental Rs.2,000 a day(Rs.10,000-12,000 for 4 days)Currency: Georgian Lari (GEL),Rs.1.0.032 GEL (as of May 2025)Insurance: Rs.2,000Activities: Rs.9,000-11,000Places to visit: Tbilisi, Kakheti wine region, Gergeti Trinity, Batum7 Days in SerbiaTOTALRs.1.1-1.2 lakh for one personWhat works:Flights: Rs.60,000 round trip (Delhi/Mumbai to Belgrade; off-peak, Mar-Apr)Visa:Rs.2,700Food:Rs.1,700 per day per head (meals, coffee, snacks)Accommodation: Hotel Rs.2,000-3,000 a night (Rs.19,000 a week)Transport:Rs.800-1,000 a day Currency: Serbian Dinar (RSD), Rs.1.1.22 RSD (as of May 2025)Insurance: Rs.2,000 Places to visit: Belgrade, Novi Sad, Subotica7 Days in GreeceTOTALRs.1.1-1.3 lakh per personWhat works:Flights:Rs.45,000 round trip (Delhi/Mumbai to Athens; shoulder season, Mar-Apr)Visa:Rs.10,000-12,000Food:Rs.2,500 per day per headAccommodation: Hotel Rs.3,000 a night (Rs.21,000 a week)Transport: Scooter rental Rs.2,800-3,000 a day, car rental Rs.3,800-5,000 a dayCurrency: Euro,Rs.1.0.01 Euro (as of May 2025)Insurance:Rs.2,000Activities:Rs.4,000Places to visit: Athens, Paros, Naxos, Santorini7 Days in ThailandTOTALRs.80,000- 1 lakh for one personWhat works:Flights:Rs.20,000 round trip (Delhi/Mumbai to Bangkok; off-peak, Apr-May/Jul-Sep)Visa: Rs.2,500; visa on arrivalFood:Rs.1,200-1,500 per day per headAccommodation: Hostel Rs.700-800 a night, hotel Rs.1,500-2,000 a night (Rs.14,000 a week)Transport: Taxi Rs.1,500-2,000 a day, ferry Rs.160 a ride per head, internal flights Rs.2,500-4,000 per person (total Rs.13,000-15,000 for a week)Currency: Thai Baht (THB), Rs.1.0.39 THB (as of May 2025)Insurance: Rs.2,000Activities: Rs.22,000-25,000Places to visit: Bangkok, Phi Phi Island, Pattaya, Phuket7 Days in VietnamTOTALRs.70,000-80,000 for one personWhat works:Flights: Rs.20,000 round trip (Delhi/Mumbai to Hanoi/Ho Chi Minh City)Visa:Rs.2,100Food:Rs.1,200-1,500 per day per headAccommodation: Hotel Rs.1,500-2,000 a night (Rs.10,000-12,000 a week)Transport: Scooter rental Rs.500-600 a dayCurrency: Vietnamese dong (VND), Rs.1.302.58 (as of may 2025)Insurance:Rs.2,000Activities:Rs.10,000-12,000Cities to visit: Hanoi, Ba Na hills, Ho Chi Minh City",
//         "summary": "As Indians drop Turkey and Azerbaijan from their holiday plans, we bring you five affordable and culturally rich alternatives across Europe and Asia. By Yasmin Hussain.",
//         "url": "https://economictimes.indiatimes.com/wealth/spend/5-affordable-holiday-destinations-in-europe-asia-as-vacation-alternatives-to-turkey-azerbaijan/articleshow/121219453.cms",
//         "image": "https://img.etimg.com/thumb/msid-121231440,resizemode-4,width-1200,height-900,imgsize-53654,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Yasmin Hussain",
//         "authors": [
//             "Yasmin Hussain"
//         ],
//         "language": "en",
//         "category": "politics",
//         "source_country": "in",
//         "sentiment": 0.248
//     },
//     {
//         "id": 322720802,
//         "title": "Your social media a/cs, digital pictures, data: Decide in advance who inherits these digital assets",
//         "text": "Indira Gandhi, then India’s prime minister, was expelled from the Congress party in November 1969. Her next move was to form a breakaway party, calling a Congress session to make the announcement. Veteran photojournalist Raghu Rai was in the room along with other cameramen and journalists. After the briefing, most of the journalists and photographers left, except Rai. He hung around and went on taking photos unobtrusively, capturing some stunning images, among them Gandhi in tears at the heartfelt support she got from party members. Still, the newspaper where Rai worked at the time published just two of his pictures. The Times of London, on the other hand, devoted half a page to them.Now at 83, Rai has been digitising his photographic archives—historic images spanning over 60 years. One of India’s most celebrated photojournalists, Delhi-based Rai says that bequeathing our digital assets is just as important as deciding who inherits our financial assets.Most of us live our lives on social media—posting photos on Facebook, sharing stories on Instagram, and storing files on cloud services like iCloud and Google One. The question is: what happens to our photos and documents up there after we’re gone and how can we pass them on?The password dilemmaDigital assets include cloud storage that syncs photos and documents from mobile phones, tablets, and computers. These go beyond just photos, and include files, identity cards, and even records stored on DigiLocker, the government’s digital document vault.The most basic way to pass on digital assets is a written will. Passwords can be included in the will and heirs nominated to take charge after your demise, just as with other assets. This though is risky, says Neha Pathak, Head, Trust & Estate Planning, Motilal Oswal Private Wealth. “To write down your passwords in your will is dangerous. Whoever has a copy would know them in your lifetime. Besides, after your death, your will becomes part of public record when it needs to get probated,” she says.She suggests writing passwords down on paper and putting this in a place known to you and the person you want to bequeath your digital assets to.However, this too can be dodgy because passwords that aren’t changed often run the risk of being hacked. And if you change them often, you need to keep changing that piece of paper.Rajat Dutta, Founder, Inheritance Needs Services, cites a client who used a password app for email, banking and social media. When he died, his heirs couldn’t access the password app and his emails got locked. “Post probate, only after sharing the same with the app provider, could they get access,” he said.Digital wealthBefore you write a will, give a thought to where your digital assets should go.For those of us who click pictures at every street corner, on holidays and family dinners besides taking multiple selfies, there’s probably little interest in preserving them. It’s best to assign someone to take charge of the library and have it deleted.But for those pursuing a passion and have photos, videos and content that form part of their research and knowledge sharing, your digital assets could form a valuable archive that will benefit others. Here’s a close look at what three people, including Rai, are planning, to give you an idea of the options available.Raghu Rai, 83 Photojournalist, New Delhi 121217334Made a will?YesCore interestTo chronicle changing social, cultural and political landscape of India’s history. Occupation Photojournalism. Still working.Digital collectionPhotos, rare pictures of Indira Gandhi, Mother Teresa, Dalai Lama, stories documented since 1960s, over 60 authored books, and 8-10 books in the pipeline.Have the digital assets been bequeathed? Yes.Who will inherit the digital assets?Raghu Rai Foundation.The Institutional Route: Mumbai-based R. Venkatesh, 51, is an urban researcher, who spends many weekends roaming the streets of the Maximum City, chronicling Art Deco buildings, heritage railway stations and municipal bridges, as well as the ever-changing Fort area.“To retain the culture of Mumbai, remember how it began, who contributed and how we became such a warm, culturally inclusive and communally harmonious city with the greatest professional ethics and values across levels, is a story that deserves to be told, and added to, for centuries,” he says. Venkatesh juggles his day job in the finance sector with a passion for studying and documenting history and culture in his spare time.Aside from conducting study and walking tours on topics such as Mumbai’s maritime trade, and the rise of India’s shipping and finance industries, Venkatesh spends most of his free time travelling across India, armed with his DSLR camera.Over the years, he has built a repository of more than 20,000 photos backed up from his iPhone, 25 folders of camera photos on iCloud, and pre-2020 photos now stored on Google Cloud—dating back to his first camera, a Minolta. All of these are now digitised and stored on the cloud.As a full-time finance professional, Venkatesh understands the importance of writing a will. A lifetime member of the Asiatic Society of Mumbai, he wants to leave copies of his collection of photos and notes to the institution. “Future generations of its members will benefit,” he says.Venkatesh also has plans to leave behind some of his work to other institutions such as the Maritime Mumbai Museum Society and the Instucen Trust. He will leave behind all of his work to his legal successor as well, to make sure one institution won’t have exclusive rights, so that there are no restrictions accessing his work. He also has plans to bequeath his social media handles to his legal successors.The Family Way: You could bequeath your digital legacy to your family, as numismatist Pascal Lopes, 45, plans to do. Like Venkatesh, he too has a regular day job, as a software engineer at a global financial services firm. In his spare time, Lopes, also based in Mumbai, studies the coins of the Portuguese-Maratha era in the context of the history of Mumbai and India. Lopes got drawn to collecting—and eventually studying—them in his childhood after he saw his father collecting rare coins. His passion drove him to pick up a Masters in Numismatics and Archaeology from Mumbai University.Lopes has documented the evolution of coins against the backdrop of Mumbai’s history. He studied the erstwhile Portuguese colonial territory of Mumbai north of Bandra, all the way to present-day Vasai and Nala Sopara. This includes the various archaeological sites associated with Portuguese history, including the Vasai Fort, which lies in ruins today. His coin collection isn’t limited to the Portuguese-Maratha period; it includes coins from the princely states, the British era, and rare, out-of-circulation coins of independent India.Over time, Lopes has photographed his vast coin collection as well as his handwritten notes. And, social media has brought him closer to an audience that is hungry for knowledge; his Instagram handle has nearly 21,000 followers.However, Lopes hasn’t yet made a will. “I am not much aware of how digitised data can be made available to my legal heirs and others, but I have worked very hard to document history. I don’t want to lose my work,” says Lopes, who is getting ready to publish his forthcoming book A Walk Through Vasai Sopara Virar sponsored by the Mumbai Metropolitan Region Development Authority. He once bought some rare journals during a clearance sale at Mumbai’s Asiatic Society and Library that he digitised eventually. “I would want somebody to use these journals and maybe even publish them,” he says.Lopes has a plan though. He wants to leave all the actual coins, especially those of Vasai and Mumbai, and their digital photographs to his family— wife and two daughters. “I don’t want these to be in a museum. I want them to be with my family, but where people can come and see them,” he says. He also wants some of his own research and digitised notes, especially on Vasai and Sopara architecture, to be available to individual researchers, though he says he is inclined to leave them to some credible foundations.Leaving a digital legacy: One account at a timeAppoint a legacy contact and state it clearly in your will.What exactly are digital assets?Cloud storage (Photos, documents, and so on)• DigiLocker • Emails • Computer • Mobile phonesWho is a legacy contact?A person you can assign to manage your social media accounts. 121217381Pascal Lopes, 45 Numismatist, Mumbai 121217387Made a Will?NoCore interestStudy of coins from the Portuguese– Maratha era in the context of Mumbai and India’s history, along with study of forts across Maharashtra.OccupationSoftware engineer at a large, global financial services firm.Digital collectionRare coins, books, digitised journals, notes, presentations of history of Vasai, Sopara and the erstwhile Portuguese settlement in and around Mumbai.Have the digital assets been bequeathed?Not yet.Who might inherit the digital assets?Mostly family, some independent researchers, foundations that document heritage and history.Take charge of your digital afterlifeFrom listing assets to writing a will, secure your online presence with clear instructions.Preserve or deleteTake a count of your digital assets, (social media accounts, Cloud accounts and emails).Identify a person you wish to give control to.Ascertain the future of your digital content (photos, files, documents, books, etc).Write a willDo not write your password in your will. But assign an heir for your digital assets.Assign legacy contact for your Apple, Google and Facebook accountsWrite in your will that after your legacy contact deals with the data as per your wishes, your account should be shut.Setting up a Foundation: Although Rai has been using a digital camera for the past 20 years, he had about 40 years of photos taken using film. Rai says that he started digitising these after being coaxed by his gallerist Devika Daulat Singh. It took him around seven years, including all the time spent by his office to caption all of them and assign dates. Was the effort worth it? “Yes. If honest journalism is the first draft of history, then photojournalism is the evidence of that history which cannot be changed. History is written and rewritten, but an image cannot be rewritten,” says Rai.Archiving is important, Rai says, especially if you are documenting change over the years. He cites the work of two photographers from British India who took pictures of the colonial times, the people, their way of life. “When we see those photographs today, we say ’wow that’s how India used to look like in the 1880s and early 1900s’.” If you don’t have your own resources to create a meaningful place to preserve your assets, give it to an institution, he says.Rai owns a six-acre farmhouse on the outskirts of Delhi, where he and his wife, along with Devika Daulat Singh, plan to house the Raghu Rai Foundation and his body of work. His wife, a conservation architect, brings a deep understanding of preservation. Rai has also written a will.Legacy contactsA legacy contact is a person appointed in your lifetime to take charge of your social media accounts after you die. ET Wealth checked out the policies of Apple, Google, Facebook and Instagram to see what happens to your accounts after you die.Instagram: At the bottom of the pyramid of ease of bequeathing is Meta-owned Instagram with the least number of features. After you die, your legal heir must write to Instagram to memorialise your account. The account gets a ‘Remembering’ tag below the person’s name. Memorialised accounts don’t appear in searches. The downside is that photos and posts remain with Instagram; the legal heir cannot claim those. In fact, there’s nothing of a person’s account that the legal heir can claim.Facebook: Facebook, also owned by Meta, fares slightly better in this regard. You can appoint a legacy contact during your lifetime—someone who will manage your Facebook profile after your death. Once notified, Facebook will memorialise the account. If you do not want to appoint any legacy contact and want your account deleted, you can choose that option in your settings. Once Facebook comes to know that you are dead, it will delete your account permanently.Your legacy contact won’t have access to your photos, posts and content, but can write a pinned post for your memorialised profile, saying that you’ve passed on, a line or two in your remembrance, and so on. Your legacy contact can change your profile photo but cannot remove or edit any of your posts.Apple iCloud: Apple’s legacy contact features are more evolved. It lists data that the legacy contact can access after your death—iCloud photos, notes, gmail, calendars, voice memos and health data. Your legacy contact cannot access licensed data such as music purchased through iTunes or Apple Keychain (where passwords are stored), and so on. Your legacy contact needn’t be an Apple or iPhone user.Once you appoint your legacy contact in your settings, you will get an Access Key—a QR code and an alphanumeric key. This can be printed or kept with your will.Google: Google’s legacy contact feature is among the best. Google steps in once your account becomes inactive. Choose the length of inactivity after which you want Google to get in touch with your legacy contact. You can, in your lifetime, choose up to 10 legacy contacts. The legacy contact has three months to download your data. After another three months, Google will permanently delete your account. At the time of choosing your legacy contact, Google gives you an exhaustive list of items in your Google account that you can choose to share—Mail, Chat, Blogger, Calendar, contacts, Drive, Fitbit, Tasks, and so on.What should you do?If you want your social media accounts and cloud to be deleted after you pass on, that’s fine. But still, appoint someone to take charge of your accounts and get them to proactively initiate the deletion process.If you wish to pass on your digital wealth, then start making a plan. Dutta says that even if you do not appoint a legacy contact, your legal heirs can still approach social media and big technology companies to gain control over your accounts. To make this easy for your legal heirs, mention that in your will as also the individuals who will be in charge of your social media accounts. In fact, even though Meta says that legacy contacts cannot get access to a deceased person’s data, it has said that in some countries, courts can enforce sharing.“Remember, the platform has its own terms of use,” says Radhika Gaggar, Partner, Co-head, Private client, Cyril Amarchand Mangaldas. “You might be clear that you want to leave behind your digital wealth for someone, but the platform might not allow full access.”But legal and inheritance experts like Dutta say that courts in India have been of great help in this regard.R. Venkatesh, 51,Urban researcher, Mumbai 121217445Made a will?YesCore interestDocumenting the changing face of Mumbai—its maritime history, the rise of India’s banking and shipping industries, and its diverse heritage of temples, churches, Buddhist sites, and Islamic architecture.OccupationFinance sector.Digital collection20,000 photos backed up from an iPhone, 25 folders of camera photos on iCloud, pre-2020 photos stored on Google Drive, along with notes from heritage walks, talks, and presentations.Have the digital assets been bequeathed?Not yet.Who might inherit the digital assets?Family, Asiatic Society of Mumbai, Maritime Mumbai Museum Society, Instucen Trust.",
//         "summary": "From treasured photos and notes to cloud-stored documents and social media accounts, your digital footprint may outlive you— but only if you plan for it. Here’s how to pass on your digital legacy wisely.",
//         "url": "https://economictimes.indiatimes.com/wealth/legal/will/your-social-media-a/cs-digital-pictures-data-decide-in-advance-who-inherits-these-digital-assets/articleshow/121217326.cms",
//         "image": "https://img.etimg.com/thumb/msid-121234981,resizemode-4,width-1200,height-900,imgsize-40758,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Kayezad E. Adajania",
//         "authors": [
//             "Kayezad E. Adajania"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": -0.069
//     },
//     {
//         "id": 322720804,
//         "title": "Mental health insurance problems continue: 5 things to check before buying a cover",
//         "text": "There has been a 30-50% rise in mental health-related claims in the past 2-3 years, claims a recent study by Policybazaar (see graphic). “We’ve also seen a 41% year-on-year growth in mental health insurance searches in 2025,” says Siddharth Singhal, Head of Health Insurance, Policybazaar.The surge is corroborated by Bhaskar Nerurkar, Head, Health Administration Team, Bajaj Allianz General Insurance: “We’ve seen a steady increase in mental health related claims, with a CAGR of about 33% from 2021-22 to 2024-25. In the last year alone, there was a 23% rise in such claims over the previous year.”These figures seem reassuring in the face of grim societal stigma and the fact that 10.6% of adults in India suffer from mental disorders and the lifetime prevalence of mental disorders is 13.7%, as per the National Mental Health Survey 2015-16 by NIMHANS.However, Anuradha Sriram, Chief Actuarial Officer, Aditya Birla Health Insurance, strikes a discordant note. “While awareness and conversation around mental health have increased in recent years, we have not observed a significant rise in mental health related hospitalisation claims,” she says. This is because most treatments for mental health continue to be outpatient-based, which are generally not captured in the scope of hospitalisation plans, she explains.The in-patient focus of most plans is only one of the several problems faced by people seeking mental health covers despite the insurance regulator’s proactive approach in widening the scope of coverage.Irdai guidelinesThough the Mental Healthcare Act, 2017, was enforced in May 2018, Irdai was forced to issue circulars in August 2018 and then again in October 2022, requesting compliance by insurers and removal of mental illnesses from their list of exclusions. The guidelines stated that mental illnesses had to be treated at par with physical illnesses when it came to providing coverage.While insurers eventually started offering mental health coverage in their plans by the end of 2022, in February 2023, Irdai was again forced to issue a circular to ‘mandatorily launch and immediately offer’ an ‘appropriate product’ and a ‘specific cover’ for persons with mental illnesses, disabilities and HIV/AIDS, which translated to a standardised, standalone cover.A crucial inclusion was the need to put in place a ‘Board-approved underwriting policy that ensures no proposal is denied’. This meant the insurers could not refuse a cover to a person with pre-existing mental disorders.Problems in getting coverageToday, all general and standalone health insurers do abide by the Mental Healthcare Act, 2017, and include mental illnesses in their health plans. “We offer mental health coverage as part of our health insurance plans in alignment with Irdai guidelines. The plans typically cover hospitalisation expenses arising from mental illnesses, including depression, anxiety, bipolar disorder and schizophrenia,” says Priya Deshmukh, Head, Health Product, Operations & Services, ICICI Lombard. Other insurers too cover mental illnesses under their comprehensive plans.In-patient, not OPD plans: The problem with most such covers is that these are indemnity plans that only cover hospitalisation or in-patient expenses, whereas most mental disorders require periodic doctor consultations, therapies, counselling, medication and psychiatric evaluations, which are out-patient features. Policybazaar data shows that conditions like anxiety (30-35%) and depression (25-30%) are the top reasons for claims, which are usually managed through out-patient care rather than inpatient admission.5 questions to ask before buying a mental health planWithout these features and benefits, the insurance policy may not be of much use to you.1. Does it have a pre-existing disease waiting period?If the applicant already suffers from a mental illness, buying a plan may be a challenge, depending on the severity of the disorder. In all probability, he will have to clear the waiting period for pre-existing diseases, which is 2-3 years for most insurers, before he can be covered for the disorder.2. Does it offer OPD benefit?Doctor consultations and medication are an integral part of mental health treatments, which can only be covered by a plan with an OPD feature. So, if OPD benefit is missing, either as a part of the base cover or as an optional feature, the plan won’t be of much use to you.3. Does it cover therapy & counselling?Even if the OPD benefit is included in the plan, not all insurers offer all the features that are crucial for mental health treatments, such as therapy, counselling and psychiatric evaluations, which can be very expensive. Make sure these are a part of the cover.4. Is your therapist or health care centre in the network?Most insurers require the treatment to be conducted by a qualified practitioner in a recognised institute, hospital or clinic that falls in its network. If these don’t fulfill the insurer requirements, you will not be able to make a claim.5. Is your illness covered?You will need to ensure that your particular mental illness is included in the plan. The disorders usually covered by insurers include anxiety, depression, bipolar disorder, schizophrenia, PTSD and dementia. If the illness is not covered, there’s no point buying the cover.Agrees Sriram: “Our flagship products are hospitalisation-focused indemnity plans, covering in-patient treatment for mental health conditions. However, many mental health treatments, like therapy or consultations, are outpatient in nature and are not covered under the base plan.”“OPD coverage is crucial even as an addon because a plan that only covers hospitalisation may not suffice for real-world needs,” says Singhal. So, either the policy buyer needs to find a plan that has an in-built OPD feature, or buy an OPD rider along with the base cover, both of which require additional expense due to higher premiums that these entail.Underwriting hurdles: For people with existing mental conditions, especially with a high degree of severity, it can be difficult to buy a plan despite Irdai specifying that insurers cannot refuse it.“While Irdai has mandated insurers to cover mental health conditions, underwriting still applies. This means that individuals with a known history of mental illness may face medical assessments, loading on premiums, or specific exclusions,” says Deshmukh. This could mean either expensive plans, limits on coverage, or long waiting periods, usually between two and three years, and sometimes even rejection for severe disorders.Network practitioners: Since the treatment for many mental illnesses requires therapy and counselling, many people pick private therapists or clinics, which may not be in the insurer networks or empanelled. Besides, correct diagnosis and effective therapy can often mean sifting through various doctors and counsellors before finding the right one that suits the patient, and not every such practitioner may be a part of the insurer network.Standardised plans: Many general and standalone health insurance companies offer a standardised plan that provides a cover of `4-5 lakh and includes mental illnesses among other disabilities and disorders. This standardised plan is an affordable base plan with similar offerings across insurers, but is available under different names and varying premiums, which is typically low. However, since it is not a comprehensive plan and offers low coverage, it means the policyholders would need to pad it up, besides buying another cover for other illnesses as well.What to look for in a plan“Consumers should look for comprehensive plans that include mental health as part of their base coverage and evaluate whether the insurer offers any additional riders/add-ons that support out-patient care or wellness programs,” says Sriram.Agrees Nerurkar. “It’s advisable to consider whether the policy offers OPD benefits for consultations, therapy sessions, and medication. Some plans also provide wellness programs or teleconsultation services, which can be highly valuable for ongoing support. Transparency regarding waiting periods, exclusions (like illnesses related to substance abuse), and pre-existing condition disclosures is critical to ensuring seamless claims later,” he says.One should also check whether the insurer has a strong hospital network with the required facilities. “Ensure that the insurer’s network hospitals include facilities offering psychiatric services and that these are accessible in your area,” says Deshmukh.",
//         "summary": "Even as mental health-related claims have increased in the past few years, problems continue in acquiring an adequate plan catering to the specific needs of mental illnesses.",
//         "url": "https://economictimes.indiatimes.com/wealth/insure/health-insurance/mental-health-insurance-problems-continue-5-things-to-check-before-buying-a-cover/articleshow/121218592.cms",
//         "image": "https://img.etimg.com/thumb/msid-121232406,resizemode-4,width-1200,height-900,imgsize-35282,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Riju Mehta",
//         "authors": [
//             "Riju Mehta"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": -0.194
//     },
//     {
//         "id": 322720806,
//         "title": "What is the digital rupee?",
//         "text": "Let's understand what is the digital rupee:1. The digital rupee is India’s central bank digital currency, issued by the RBI.2. It is a tokenised digital version of the Indian rupee, designed to complement physical cash and existing digital payment systems.3. Banks provide the digital rupee app, where one can convert INR from linked bank accounts to digital rupees and start transacting using scan codes.4. It uses distributed ledger technology to ensure security and transparency.5. Unlike bank deposits, holding digital rupees does not generate any interest.Content courtesy Centre for Investment Education and Learning (CIEL).Contributions by Girija Gadre, Arti Bhargava and Labdhi Mehta.",
//         "summary": "Here are 5 things to know about the digital rupee.",
//         "url": "https://economictimes.indiatimes.com/wealth/save/what-is-the-digital-rupee/articleshow/121219930.cms",
//         "image": "https://img.etimg.com/thumb/msid-121230713,resizemode-4,width-1200,height-900,imgsize-35040,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Et Contributors",
//         "authors": [
//             "Et Contributors"
//         ],
//         "language": "en",
//         "category": "business",
//         "source_country": "in",
//         "sentiment": -0.092
//     },
//     {
//         "id": 322720808,
//         "title": "What is a top-up home loan? What are its advantages compared to personal loan?",
//         "text": "PAPER WORKGetting a top-up home loanA top-up home loan offers additional funding to existing home loan borrowers. It can be used for purposes like home renovation, education, medical expenses, or other personal needs. These loans are typically available at lower interest rates than personal loans, making them a cost-effective option.Features of top-up loanA top-up home loan allows borrowers to access additional funds on their existing home loan, without applying for a fresh loan. Since the borrower already has a relationship with the lender, the process is faster and involves minimal paperwork. The top-up loan tenure usually aligns with the remaining term of the original home loan.Who is eligible?To be eligible for the loan, borrowers must typically have a good repayment history, with 12-24 months of timely EMI payments. Lenders also assess repayment capacity, outstanding loan balance, and the property’s current market value. The combined loan amount (original + top-up) should generally not exceed 75-80% of the property’s value.How to applyThe borrower can approach the existing lender with a top-up loan request. The lender reviews his credit history, repayment track record, and may reassess the property’s value. Minimal documentation is required, typically including updated income proof, KYC and property papers. Once approved, the funds are disbursed directly to the borrower’s account.Points to noteInterest rates for top-up loans are slightly higher than those for regular home loans, but lower than those for personal loans.Ensure that the additional EMI fits your monthly budget.Content courtesy Centre for Investment Education and Learning (CIEL).Contributions by Girija Gadre, Arti Bhargava and Labdhi Mehta.",
//         "summary": "A top-up home loan offers additional funding to existing home loan borrowers. It can be used for purposes like home renovation, education, medical expenses, or other personal needs. These loans are typically available at lower interest rates than personal loans, making them a cost-effective option.",
//         "url": "https://economictimes.indiatimes.com/wealth/borrow/what-is-a-top-up-home-loan-what-are-its-advantages-compared-to-personal-loan/articleshow/121219976.cms",
//         "image": "https://img.etimg.com/thumb/msid-121230816,resizemode-4,width-1200,height-900,imgsize-27252,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Et Contributors",
//         "authors": [
//             "Et Contributors"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": 0.201
//     },
//     {
//         "id": 322720810,
//         "title": "A higher CTC doesn’t always equal higher take-home salary: Check CTC break-up to know actual take home",
//         "text": "Suhaan Gupta and Aryan Chowdhury, both top engineering graduates, landed similar roles in the same industry. While Gupta got a Rs.36 lakh annual package, Chowdhury got Rs.24 lakh per annum. Naturally, Gupta expected a much higher take-home salary. However, a year later, he discovered that the difference between his and Chowdhury’s salary was only Rs.1 lakh. He wants to know how this is possible despite a 25% gap in their pay packages?At the time of placement, the salary package of Suhaan Gupta must have been quoted as cost to company (CTC). As the name suggests, CTC reflects the total amount a company spends on an employee, not just the cash component of the salary. It includes benefits like the employer’s contribution to the EPF, insurance premiums, and other perks. This often inflates the package on paper, creating a mismatch between the quoted figure and the actual in-hand salary.In Gupta’s case, his Rs.36 lakh CTC possibly included non-cash components, such as the employer’s share of the EPF, life and health insurance premiums, interest subsidies on loans, food coupons and transport allowance. Additionally, a one-time payment, like the joining bonus and performance-linked variable pay, may have been factored in. The variable pay depends on job performance and may vary each year. As a result, despite a higher CTC, Gupta’s take-home salary isn’t significantly more than that of Aryan Chowdhury.Most large companies follow the CTC model, but the extent and structure of components vary. Hence, prospective employees should closely examine the composition of the CTC before making a decision. As seen in Gupta’s case, a higher CTC doesn’t always translate to a higher take-home salary. Rather than focusing solely on the total CTC, it’s wiser to evaluate its components and consider the benefits that are truly valuable.Content courtesy Centre for Investment Education and Learning (CIEL).Contributions by Girija Gadre, Arti Bhargava and Labdhi Mehta.",
//         "summary": "A higher CTC doesn’t always translate to a higher take-home salary. Rather than focusing solely on the total CTC, it’s wiser to evaluate its components and consider the benefits that are truly valuable.",
//         "url": "https://economictimes.indiatimes.com/wealth/earn/a-higher-ctc-doesnt-always-equal-higher-take-home-salary-check-ctc-break-up-to-know-actual-take-home/articleshow/121219899.cms",
//         "image": "https://img.etimg.com/thumb/msid-121230962,resizemode-4,width-1200,height-900,imgsize-189304,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Et Contributors",
//         "authors": [
//             "Et Contributors"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": 0.036
//     },
//     {
//         "id": 322720812,
//         "title": "Frequent flyers can transfer airmiles from one loyalty program to another only if…",
//         "text": "This debate goes back ages. Airlines have always wanted both frequent and occasional flyers to stay loyal—and ignore all other options. But this is a very puritan approach, and worked many moons ago. Times have changed, and so should you. Because miles are like money, and just like you keep your mutual funds diversified, you also need to keep your miles collection diversified.You will typically need to select one airline that meets many of the requirements for your travel purposes. For instance, back in the day, Jet Airways was my preferred airline, which used to fly me around India, as well as to Europe and Asia. Consequently, JetPrivilege was my core programme. It also had deep partnerships with other airlines, such as KLM, Air France, and Etihad, allowing flights on these airlines to earn me miles on JetPrivilege.Airlines frequently enter into partnerships with other airlines, because one airline cannot usually bring people around the globe. This allows them to provide their passengers the ability to fly to their final destination by changing planes. The next step in their partnership is usually to collaborate for frequent flyer programmes. This allows passengers to credit their miles for the entire trip on a single airline, according to their preference or loyalty. Therefore, you don’t need to open accounts with multiple airlines and credit a small amount of miles to each. You can accumulate most of them in one programme.Friendships become alliancesMany airlines around the globe have organised themselves one step beyond a partnership. They participate in an alliance. This membership is akin to a cohort, which provides passengers with a uniform set of benefits across all member airlines.There are three major airline alliances globally. Star Alliance (www.staralliance. com) is the largest, with 25 member airlines, including Air India (India), Lufthansa (Germany), United (US) and Singapore Airlines (Singapore). Oneworld (www.oneworld. com) comprises 15 member carriers, including British Airways (UK), Cathay Pacific (Hong Kong) and Qatar Airways (Qatar). SkyTeam (www.skyteam.com) comprises Delta Air Lines (US), KLM (the Netherlands), Air France (France), and 15 other airlines as its members.Suppose you travel frequently on member airlines of a single alliance. In that case, you can also credit your flights from all airlines into one loyalty programme, which allows you to accumulate miles in one place, rather than crediting them in small amounts to various airlines. The benefit is that you will be able to collect enough miles for a redemption ticket, rather than having a small number of miles in many places. This is the piggy bank approach, as I call it. For instance, when I fly Lufthansa or any other Star Alliance carrier, I put my Air India Maharaja Club membership number to accrue Air India points rather than Miles & More miles (the frequent flier membership programme from Lufthansa).Entering my Air India number also allows me to access benefits across all member carriers. For instance, as a Star Alliance Gold tier member (due to my airline status with Air India), all other member carriers offer me priority check-in at their business class counters, even when I am travelling economy class. They also offer lounge access worldwide due to this status equivalence, allowing me to board the plane before most other passengers.Core and satellite programmesThe wise approach is to have one core loyalty programme and then have additional memberships in other programmes as needed. This is because one airline may or may not be able to fly you to all the destinations you want to visit, so you will need to use others as well.Alternatively, you can find cheaper redemption options on other airlines due to the redemption rules of these programmes. For instance, to fly between Delhi and London, British Airways charges 30,000 miles on its programme for an economy ticket and 90,000 for business class. But American Airlines, another oneworld member carrier, can provide you with the same ticket for 20,000 American Airlines miles. So, while you might want a core programme to be the centre of your efforts, you might want to build mileage balances in other programmes because there might be a good opportunity for you to save miles there.The question that people often ask is whether they can transfer miles from one programme to another to build balances quickly. That does not happen, except if the same entity operates the programmes. For instance, you can move around miles between Qatar Airways, British Airways, Iberia, and Finnair because all of them participate in Avios, the loyalty currency of IAG. However, if you expect to convert Air India points into United miles because the ticket is cheaper in United, then that is not possible.The Author is THE FOUNDER AND EDITOR OF LIVEFROMALOUNGE.COM",
//         "summary": "Airlines frequently enter into partnerships with other airlines, because one carrier cannot usually bring people around the globe. These collaborations typically extend to frequent-flyer programmes, allowing passengers to credit miles for their entire journey to the airline of their choice—based on preference or loyalty.",
//         "url": "https://economictimes.indiatimes.com/wealth/spend/frequent-flyers-can-transfer-airmiles-from-one-loyalty-program-to-another-only-if/articleshow/121217829.cms",
//         "image": "https://img.etimg.com/thumb/msid-121232859,resizemode-4,width-1200,height-900,imgsize-32802,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Et Contributors",
//         "authors": [
//             "Et Contributors"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": 0.265
//     },
//     {
//         "id": 322720814,
//         "title": "Electronics manufacturing sector set for growth: These 3 factors make it a good bet",
//         "text": "Strong domestic demand, government support, substantial export opportunities and benefits from the China Plus One strategy are driving the performance of the electronics manufacturing services (EMS) segment. The sector includes design, assembly and testing of components for products ranging from IT, consumer electronics, industrial electronics, auto, telecom equipment, lighting and printed circuit board assembly (PCBA).The sector’s historical performance and estimates highlight its resilience. Between 2019-20 and 2023-24, EMS companies (including component manufacturers) recorded revenue CAGR ranging from 8% to 49%. The estimates for the next three years, over 2023-24 and 2026-27, anticipate a healthy revenue growth CAGR between 22% and 69%. The data is compiled from an Axis Capital report released in April 2025.The order books of the EMS companies are growing, aided by a diversified client base and entry into new segments, like smart meters, railways and IT. Moreover, focus on gaining higher wallet share, improved product mix, and cost control measures, have helped the companies maintain healthy profit margins. Electronics demand is expected to remain healthy due to low penetration levels and rising disposable incomes. While the domestic production of electronic goods has increased by a CAGR of more than 17%, the exports of electronic goods have grown at a CAGR of over 20% between 2014-15 and 2023-24, according to a March 2025 PIB release.Segment-wise growth driversMobile phones have contributed significantly to the EMS segment with the highest CAGR growth in the last four years among other segments. The performance was aided by policy support, like differential duties, Phased Manufacturing Program (PMP) for sub-assemblies, and large-scale electronics PLI (production linked incentives).IT hardware is another key driver of the EMS industry. According to an Emkay report released in the last week of March 2025, strong policy push, rising trust in India as a supply-chain destination and its cost advantage over China are some factors that will support growth in the IT hardware segment. The government has set a target output of $40 billion for the IT hardware segment by 2030. The PCBA segment is gaining significance due to the government’s focus on domestic manufacturing, growing demand for miniaturised gadgets and increased digitisation of the medical sector.PCBAs are required to operate a wide variety of electronic products such as mobile phones, tablets, laptops, desktops, gaming consoles, televisions, washing machines, microwave ovens, ACs, refrigerators, automobiles, medical equipment, and industrial products. The improved value addition is expected to drive orders and revenue growth over the next two-three years.The other segment where EMS companies (especially the contract manufacturers) are growing is the heating, ventilation, and airconditioning segment. The strong demand for RACs (room air conditioners), coupled with government incentives in the form of PLI schemes for white goods, has motivated contract manufacturers to increase manufacturing capacities for RAC. This includes RAC assembly and components, including injection moulding, heat exchangers, and fans. The Axis Capital report believes that efficient resource utilisation, cost competitiveness, a smoother component supply chain, seasonal products, and demand surpassing supply are some of the factors that will continue to encourage contract manufacturing companies to increase manufacturing capacities.Government incentivesThe government aims to boost electronics industry output to $500 billion by 2030 and has introduced several measures to support the EMS sector growth. These include the Make in India initiative, PLI, and fiscal benefits like duty exemptions. “Ease of doing business, policy predictability, identification and addressal of disabilities, capitalising on positive geopolitical developments, and incentive support where necessary are identified as key drivers for achieving the electronics output target,” says the Emkay report.Electronics PLI and white goods PLI saw massive success in terms of localising production of mobiles and ACs in India by incentivising assembly; however, inadequate domestic supply of components used in these products has forced the companies to rely on imports.Mobile phones led electronics output 121218954Consumer electronics include televisions, digital cameras, PDAs, calculators, audio devices, headphones. Industrial electronics include power electronics, DC/ AC converters. Strategic electronics include military communication systems and satellite-based communication. Source: Axis Capital report.To curb component imports, the government launched the Indian Semiconductor Mission in 2021. The initiative has driven significant progress across the semiconductor ecosystem—including fabrication, packaging, design, and skill development. Also, multiple projects in the semiconductor space, from Tata Electronics, CG Power and Industrial Solutions and Kaynes Technology, received approvals in 2024.Powered up 121219011The government also approved the electronics component PLI for non-semiconductor components with an outlay of Rs.22,900 crore in March 2025. The scheme offers turnover-linked, capex-linked and hybrid incentives and aims to develop a component ecosystem in India. The scheme is targeted at increasing domestic value addition and integrating Indian companies into global value chains, says a JM Financial report. Analysts are bullish on PG Electroplast, Dixon Technologies and Avalon Technologies.PG ElectroplastThe contract manufacturer for consumer electronics and home appliances reported a strong performance in the March 2025 quarter.While the revenue grew by 77% year-on-year, net profit registered 104% growth. It reported growth across product categories (RACs, washing machines and coolers).The management has provided a strong year-on-year revenue and net profit guidance of 30.3% and 39.2% respectively, for 2025-26.It has planned capital expenditure of Rs.800-900 crore for 2025-26 for the establishment of new greenfield facilities, enhancing production capacity and improving operational efficiency.New product launches, deepening client relationships, strong balance sheet, robust order book and strategic investments are some of the key strongholds of the company. PhillipCapital report maintains its earnings estimates for 2026-27 but retains a neutral rating as it expects a moderate growth in the RAC segment in 2025-26. The report mentions that the moderate growth may create challenges in attaining the stated revenue guidance.Dixon Technologies (India)The EMS player offers design-focused solutions in consumer durables, home appliances, lighting and mobile phones. It is expected to report a strong performance in the March 2025 quarter.The revenue and net profit are expected to register a year-on-year growth of 147% and 152.8% respectively, according to consensus estimates of analysts compiled by Reuters-Refinitiv.Strong volumes in the mobile segment and improvement in the refrigerator business are expected to support performance during the quarter, according to a sector preview report by Systematix.New customer relationships in the mobile segment, focus on backward integration to increase value addition, higher ODM (original design manufacturer) mix, focus on high-margin segments and healthy return ratios are some of the key strongholds.Foray into the component production business, such as display module assembly followed by camera module assembly will support margins in the future.Avalon TechnologiesThe integrated EMS company reported a strong performance in the March 2025 quarter with revenue and net profit registering year-on-year growth of 58% and 243% respectively.Strong performance in both India and US businesses aided the revenue growth during the quarter. While gross margins contracted by 240 basis points, EBITDA margins surged 410 basis points, supported by operating leverage gains.The management has guided for an 18-20% growth in revenue for 2025-26 with a significant growth expected in the second half of the current financial year. ƒÜ Continued growth from existing clients and improved execution for new clients in the auto, industrial and clean energy segments will support the guidance.A Motilal Oswal report says that the company¡¦s long-term revenue trajectory is strong, aided by the addition of new customers in the US and Indian markets, order inflows from high-growth or high-margin industries, strategic collaborations, which will enhance competence and margin, and its foray into advanced technology segments.Telecom exports lead in overall electronics segmentIndia electronics exports CAGR (2018-19 to 2023-24) 121219016",
//         "summary": "Government incentives, a buoyant electronics market and healthy export prospects will support the long-term growth of EMS companies.",
//         "url": "https://economictimes.indiatimes.com/wealth/invest/electronics-manufacturing-sector-set-for-growth-these-3-factors-make-it-a-good-bet/articleshow/121218965.cms",
//         "image": "https://img.etimg.com/thumb/msid-121231604,resizemode-4,width-1200,height-900,imgsize-98582,overlay-etwealth/articleshow.jpg",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:00",
//         "author": "Sameer Bhardwaj",
//         "authors": [
//             "Sameer Bhardwaj"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": 0.269
//     },
//     {
//         "id": 322695766,
//         "title": "Sai Sudharsan On Fire: Young Star Reflects On Recent Purple Patch After GT&#8217;s Win Over DC",
//         "text": "Gujarat Titans stamped their authority with a dominant 10-wicket victory over Delhi Capitals in a crucial IPL 2025 clash at the Arun Jaitley Stadium on Sunday. The win not only sealed GT’s spot in the playoffs but also sent a strong message to their title rivals.\nDelhi, powered by KL Rahul’s century, put up a competitive total of 199. However, the score proved insufficient as Gujarat openers Sai Sudharsan and Shubman Gill chased it down with remarkable ease and composure.\nSudharsan’s Ton Powers GT's Charge and Secures Orange Cap Lead\nSudharsan remained unbeaten on 108, showcasing both flair and control in his innings. His innings, paired with Gill’s fluent 93, saw the Titans chase down the target with six balls to spare.\nThe young left-hander, now the top scorer in the tournament, was visibly pleased with his match-winning effort.\n“If feels great to help the team win. I missed out quite a few times at doing so this season and during the break, I was thinking about it and it paid off today,\" Sudharsan said post-match.\nHe acknowledged Delhi’s disciplined bowling during the middle phase of the innings, but credited the team’s composure and key overs for turning the tide.\n“After the initial 6 overs, they bowled really well, the momentum went down, we were cool and calm enough to take the game deep. We got a couple of big overs from 12-13, which helped,\" he noted.\nA Mindset Shift Behind Sudharsan’s Maturity at the Crease\nReflecting on his growth through the season, Sudharsan highlighted how his evolving mindset played a vital role in this performance.\n“Previous games I took chances and got out, but was aware enough to pick the right matchups,\" he admitted.\nHe further elaborated on the mental clarity he’s gained, which is helping him play with more freedom.\n“I’ve also started to believe myself more to take the game deeper, expand my game. Not much has changed with my batting, but mentally I’m more free and expressive,\" he said.\nEyes on Refinement as Playoffs Loom\nDespite the dominant knock, the 23-year-old is still eyeing improvement, particularly in playing spin during the latter stages of an innings.\n“When I look at the spinners, maybe I can get better at striking them. After the 15th over I have a lot of things to work on, I’m keeping a check on that,\" he stated.\nSudharsan also praised his partnership with Gill, pointing out how their chemistry at the crease is translating into results.\n“There’s a lot of understanding between us. Running between the wickets is one thing which we talk about and when I do a mistake he points out and similarly from my side as well,\" he concluded.\nWith this result, GT’s playoff qualification also paved the way for Royal Challengers Bengaluru and Punjab Kings to progress, with all three teams tied at 17 points.\nALSO READ: IPL Record Broken: Gujarat Titans Become First Team To Chase 200 Runs With 10 Wickets To Spare",
//         "summary": "He acknowledged Delhi’s disciplined bowling during the middle phase of the innings, but credited the team’s composure and key overs for turning the tide.",
//         "url": "https://www.newsx.com/sports/sai-sudharsan-on-fire-young-star-reflects-on-recent-purple-patch-after-gts-win-over-dc/",
//         "image": "https://www.newsx.com/wp-content/uploads/2025/05/Sai-Sudarshan-GT-IPL-2025.webp",
//         "video": null,
//         "publish_date": "2025-05-19 01:00:11",
//         "author": "Ashish Rana",
//         "authors": [
//             "Ashish Rana"
//         ],
//         "language": "en",
//         "source_country": "in",
//         "sentiment": 0.203
//     }]
// )
//  },[]);

 
   useEffect(() => {
    const fetchNews = async (date, attempt = 0) => {
      const MAX_ATTEMPTS = 3; 
      
      try {
        const url = `https://api.worldnewsapi.com/search-news?source-countries=in&language=en&number=100&earliest-publish-date=${date}`;
         const apiKey = "b94af77ff30148b1b040e90079d40e0f";
        
        const response = await axios.get(url, {
          headers: {
            "x-api-key": apiKey,
          },
        });

        if (response.data.news.length > 0) {
          setData(response.data.news);
        } else {
          if (attempt < MAX_ATTEMPTS) {
            console.log(`No data for date ${date}, trying previous date... (attempt ${attempt + 1})`);
            const previousDate = getPreviousDate(date); // You'll need to implement this function
            fetchNews(previousDate, attempt + 1);
          } else {
            console.log("Reached maximum attempts without finding news");
            // You might want to set some state here to show a "no news found" message
          }
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews(currdate);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSummary(null);
  };

  return (
    <div className={`${darkmode ? "" : "dark"}`}>
      <div className="bg-[#F6F5F2] dark:bg-[#29292d] transition transition-all delay-0.5">
        <NavBar />
        <div className="w-3/4 m-auto my-10 pt-2 px-2 rounded-3xl bg-[#F0EBE3] dark:bg-[#202124] dark:text-white transition transition-all delay-0.5">
          {data.length > 0 ? (
            <div>
              {data.map((article, index) => (
                <div className="relative" key={index}>
                  <label className="ui-bookmark right-1 top-2 absolute">
                    <input
                      type="checkbox"
                      onChange={() => handleBookmark(article)}
                    />
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
                      <div className="bg-[#F6F5F2]  w-[100%] rounded-2xl m-4">
                        <img
                          className="h-56  w-[100%] object-cover rounded-2xl "
                          src={article.image}
                          alt="Image"
                        />
                      </div>

                      <h1 className="font-bold text-xl pl-4">
                        {article.title?.length > 85
                          ? article.title.substring(
                              0,
                              article.title.lastIndexOf(" ", 85)
                            ) + "..."
                          : article.title}
                        ...
                      </h1>
                      <p className="py-2 pl-4">
                        {article.publish_date.split(" ")[0]}
                      </p>
                    </div>
                    <div className="relative w-3/5 p-4  m-4">
                      <p className="absolute mr-5 text-justify font-normal h-44">
                        {article.text?.length > 280
                          ? article.text.substring(
                              0,
                              article.text.lastIndexOf(" ", 280)
                            ) + "..."
                          : article.text}
                        ...
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
                              <span className="readtext dark:text-white">
                                {" "}
                                Read more{" "}
                              </span>
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
            <div class="flex justify-center items-center h-[560px]">
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
            className="fixed top-1/2 left-1/2"
            style={{
              transform: "translate(-50%, -50%)",
              backgroundColor: "#F6F5F2",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
              zIndex: 10,
            }}
          >
            {summary ? (
              <div className="relative  p-6 dark:bg-[#202124]">
                <button
                  className="absolute right-6 top-6 text-red-500 font-bold text-xl"
                  onClick={handleClose}
                >
                  X
                </button>
                <h1 className="font-bold text-xl mb-3 dark:text-white">
                  Summary
                </h1>

                <ul className="list-disc p-4 dark:text-white">
                  {summary.split("- ").map(
                    (s, index) =>
                      index !== 0 && (
                        <li className="mb-5 text-justify" key={index}>
                          <p>{s}</p>
                        </li>
                      )
                  )}
                </ul>
              </div>
            ) : (
              <div className="loading relative dark:bg-[#202124]">
                <button
                  className="absolute   right-2 top-0 text-red-500 font-bold text-xl"
                  onClick={handleClose}
                >
                  X
                </button>

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
        <Footer />
      </div>
    </div>
  );
}

export default Article;
