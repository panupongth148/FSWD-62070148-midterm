import { useEffect, useState } from "react";
import { axios } from 'axios';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Card, Button, Navbar, Nav, Container } from 'react-bootstrap';

import Author from "../component/author";
import ListTagPost from "../component/taglist";
import ListCatePost from "../component/catagorylist";

function Postpage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(
      async () => {
        setLoading(true);
        fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
      },
      [],
    );
    if (loading) {
        return (
          <div>Loading...</div>
        );
      }
      if (error) {
        return (
          <div>Error: {error.message}</div>
        );
      }
    if (!data) {
        return (
            <div>Loading...</div>
        );
    }
    const shortContent = (excerptText) => {
      const startIndex = excerptText.indexOf('<a');
      const lastIndex = excerptText.indexOf('</a>');
      const resultText = excerptText.substring(0, startIndex) + excerptText.substring(lastIndex, excerptText.length - 1);
      // console.log(startIndex);
      // console.log(resultText);
      if (startIndex === -1) {
        return (
          <div dangerouslySetInnerHTML={{ __html: excerptText }} />
        );
      }
      return (
        <div dangerouslySetInnerHTML={{ __html: resultText }} />
      );
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div>
              <h1> Post Page </h1>
          </div>
       { data.map((value, index) => {
        return <Card border="dark" style={{ width: '50%' }} className="my-2">
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>
            {value.title.rendered}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Published by <Author links={value._links.author[0]} />
            &nbsp;posted in {value.date.substring(0, 10)} at {value.date.substring(11)}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Tag : {value.tags.map((tag, index) => {
              return (<ListTagPost tagid={tag} />);
            })}
            &nbsp; Categories : {value.categories.map((tag, index) => {
              return (<ListCatePost cateid={tag} />);
            })}</Card.Subtitle>
          <Card.Text>
          {shortContent(value.excerpt.rendered)}
          <Link to={`/postpage/post/content/${value.id}`} params={{ contentId: value.id }}>Continues</Link>
          </Card.Text>
        </Card.Body>
      </Card>;
        })}
      </div>
    );
}

export default Postpage;
