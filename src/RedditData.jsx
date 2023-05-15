import React, { useEffect, useState } from 'react';

const SelfText = ({ selfTextHtml }) => {
  const [decodedText, setDecodedText] = useState('');

  useEffect(() => {
    const decodeText = () => {
      const parser = new DOMParser();
      const decodedHtml = parser.parseFromString(selfTextHtml, 'text/html').documentElement.textContent;
      setDecodedText(decodedHtml);
    };

    decodeText();
  }, [selfTextHtml]);

  return <div dangerouslySetInnerHTML={{ __html: decodedText }} />;
};

const RedditData = () => {
  const [redditPosts, setRedditPosts] = useState([]);

  useEffect(() => {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then(response => response.json())
      .then(data => {
        const posts = data.data.children.map(child => child.data);
        setRedditPosts(posts);
      })
      .catch(error => {
        console.error('Error fetching Reddit data:', error);
      });
  }, []);

  return (
    <div className="container">
      {redditPosts.map(post => (
        <div className="card" key={post.id}>
          <h3 className="title">{post.title}</h3>
          <SelfText selfTextHtml={post.selftext_html} />
          <p className="url">
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              {post.url}
            </a>
          </p>
          <p className="score">Score: {post.score}</p>
        </div>
      ))}
    </div>
  );
};

export default RedditData;
