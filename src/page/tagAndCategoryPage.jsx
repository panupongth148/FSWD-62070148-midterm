import { useEffect, useState } from "react";
import { axios } from 'axios';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Card, Button, Navbar, Nav, Container } from 'react-bootstrap';

import Category from "../component/category";
import TagComponent from "../component/tag";

function TagAndCategoryPage() {
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
      <div className="container">
          <div>
              <h1> Tag and Category </h1>
          </div>
          <div className="row">
              <div className="col-6">
                    <Category />
              </div>
              <div className="col-6">
                    <TagComponent />
              </div>
          </div>
      </div>
    );
}

export default TagAndCategoryPage;
