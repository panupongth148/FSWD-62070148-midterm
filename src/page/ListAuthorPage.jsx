import { useEffect, useState } from "react";
import { axios } from 'axios';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Card, Button, Navbar, Nav, Container } from 'react-bootstrap';

import Category from "../component/category";
import TagComponent from "../component/tag";

function ListAuthor() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(
      async () => {
        setLoading(true);
        fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/users')
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
      <div className="container my-4">
          <div>
              <h1> Tag and Category </h1>
          </div>
          <div className="row mt-3">
              <div className="col-12">
              {data.map((value, index) => {
                        return (<Link to={`/postpage/post/author/${value.id}`} style={{ textDecoration: 'none', color: 'black' }}><Card style={{ width: '100%' }} className="mb-2">
                            <Card.Body>
                                <Card.Title>{value.name}</Card.Title>
                                {/* <Card.Subtitle className="mb-2 text-muted">{value.date}</Card.Subtitle> */}
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card> </Link>);
                    })}
              </div>
          </div>
      </div>
    );
}

export default ListAuthor;
