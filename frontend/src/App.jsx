import React, { useEffect, useState } from "react";
import "./App.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const App = () => {
  const [code, setCode] = useState(`function sum(a, b) {\n  return a + b;\n}`);
  const [review, setReview] = useState(``);

  const handleReview = async (code) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/ai/get-review`,
        { code }
      );
      setReview(response.data);
    } catch (error) {
      setReview(error);
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "0.6rem",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <div className="review" onClick={() => handleReview(code)}>
          Review
        </div>
      </div>
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
};

export default App;
