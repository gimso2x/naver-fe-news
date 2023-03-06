import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    await axios
      .get("https://api.github.com/repos/naver/fe-news/contents/issues")
      .then((response) => {
        setNews(response.data.reverse());
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <ul>
      {news?.map(({ name }, i) => (
        <Link key={i} href={name}>
          <li>{name}</li>
        </Link>
      ))}
      <style jsx>{`
        ul,
        li {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        li {
          border: 1px solid rgb(242, 242, 242);
          padding: 5px 3px;
          color: black;
        }
      `}</style>
    </ul>
  );
}
