import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const IssueNum = () => {
  const [children, setChildren] = useState();
  const router = useRouter();
  const issueNum = router.query.issueNum;

  const fetchMd = async (mdFile: string) => {
    await axios.get(mdFile).then((response) => setChildren(response.data));
  };

  useEffect(() => {
    if (issueNum) {
      fetchMd(
        `https://raw.githubusercontent.com/naver/fe-news/master/issues/${issueNum}`
      );
    }
  }, [issueNum]);

  if (!children) return "Loading...";

  return (
    <>
      <header>
        <button onClick={() => router.back()}>뒤로가기</button>
      </header>
      <style jsx>{`
        header {
          width: 100%;
          padding: 10px 0;
          margin-bottom: 15px;
          border-bottom: 1px solid black;
        }
      `}</style>

      <code className="markdown-body">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
          {children}
        </ReactMarkdown>
      </code>
    </>
  );
};

export default IssueNum;
