import { useEffect, useState } from "react";
import { axios } from 'axios';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Card, Button, Navbar, Nav, Container } from 'react-bootstrap';
import ListCatePost from "./catagorylist";

const Category = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(
      async () => {
        setLoading(true);
        fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/categories')
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
    console.log(data);
    return (
      <div className="container mb-3">
          <div className="my-4">
              <h2> Category </h2>
          </div>
          <div className="rows">
          {data.map((value, index) => {
                        return (<Link to={`/posts/category/${value.id}`} params={{ contentId: value.id }} style={{ textDecoration: 'none', color: 'black' }}><Card style={{ width: '100%' }} className="mb-2">
                            <Card.Body>
                                <Card.Title>{value.name}</Card.Title>
                                {/* <Card.Subtitle className="mb-2 text-muted">{value.date}</Card.Subtitle> */}
                                <Card.Text>
                                    have {value.count} Post
                                </Card.Text>
                            </Card.Body>
                        </Card> </Link>);
                    })}
          </div>
      </div>
    );
};

export default Category;
