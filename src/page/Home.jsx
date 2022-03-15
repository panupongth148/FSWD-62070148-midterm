import { useEffect, useState } from "react";
import { axios } from 'axios';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Author from "../component/author";

function Homepage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [arthorState, setArthorState] = useState(null);
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
    return (
      <div className="container text-centered">
          <div className="row">
              <h1> Home </h1>
            </div>
            <div className="row">
                <h2> Welcome to Content Management Website</h2>
            </div>
            <div className="row">
                <img src="https://www.bangkokpost.co.th/images/product/newspaper/BP/bp-header-v2.jpg" alt="post" />
            </div>
            <Link to="/postpage" style={{ color: 'black' }}> to post page </Link>
        </div>
    );
}

export default Homepage;
