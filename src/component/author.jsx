import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { axios } from 'axios';

function Author(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(
      async () => {
        setLoading(true);
        fetch(props.links.href)
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
    // console.log(data);
    return (
           <Link to={`/postpage/post/author/${data.id}`} style={{ color: 'black' }}>{data.name}</Link>
    );
}

export default Author;
