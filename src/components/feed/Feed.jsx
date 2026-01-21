// import React, { useEffect, useState } from "react";
// import "./Feed.css";
// import thumbnil1 from "../../assets/thumbnail1.png";
// import thumbnil2 from "../../assets/thumbnail2.png";
// import thumbnil3 from "../../assets/thumbnail3.png";
// import thumbnil4 from "../../assets/thumbnail4.png";
// import thumbnil5 from "../../assets/thumbnail5.png";
// import thumbnil6 from "../../assets/thumbnail6.png";
// import thumbnil7 from "../../assets/thumbnail7.png";
// import thumbnil8 from "../../assets/thumbnail8.png";
// import { Link } from "react-router-dom";
// import { API_KEY } from "../data";

// const Feed = ({category}) => {
//   const [data, setData] = useState([]);
//   const fetchData = async () => {
//     const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
//     await fetch(videoList_url)
//       .then(Response.json())
//       .then((data) => setData(data.items));
//   };

//   useEffect(() => {
//     fetchData();
//   }, [category]);
//   return (
//     <div className="feed">
//       {data.map((item, index) => {
//         return (
//           <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
//             <img src={item.snippet.thumbnails.medium.url} alt="" />
//             <h2>
//               Best Channel to learn coding that help you to be a web devlaper
//             </h2>
//             <h3>Greatstack</h3>
//             <p>15k views &bull; 2 days ago </p>
//           </Link>
//         );
        
//       })}
//     </div>
//   );
// };
// export default Feed;


import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

    const response = await fetch(videoList_url);
    const result = await response.json();

    setData(result.items || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item) => (
        <Link
          key={item.id}
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          className="card"
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
          />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {value_converter(item.statistics.viewCount)} views &bull;{" "}
            {/* {new Date(item.snippet.publishedAt).toDateString()} */}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
