import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import { axios } from 'axios';
import { Card, Button } from 'react-bootstrap';
import Author from "../component/author";
import ListTagPost from "../component/taglist";
import ListCatePost from "../component/catagorylist";

function CategoryPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    useEffect(
      async () => {
        setLoading(true);
        fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
        .then((res) => res.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                if (json[i].categories.includes(parseInt(id))) {
                    data.push(json[i]);
                }
            }
        })
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
    console.log(data);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div>
            <h1> Category Page </h1>
            <h4><ListCatePost cateid={id} /></h4>
        </div>
     { data.map((value, index) => {
      return <Card border="dark" style={{ width: '50%', paddingTop: '20px' }} className="my-3">
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
          <Card.Text></Card.Text>
        <Card.Text>
        {/* <div dangerouslySetInnerHTML={{ __html: value.excerpt.rendered }} /> */}
        <Link to={`/postpage/post/content/${value.id}`} params={{ contentId: value.id }}>Continues</Link>
        </Card.Text>
      </Card.Body>
    </Card>;
      })}
    </div>
    );
}

export default CategoryPage;
