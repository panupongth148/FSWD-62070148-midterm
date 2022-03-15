import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { axios } from 'axios';

function ListTagPost(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(
      async () => {
        setLoading(true);
        console.log(props);
        fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/tags/${props.tagid}`)
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
    if (!data || data.length === 0) {
        return (
            <div>Loading...</div>
        );
    }
    console.log(data);
    return (
        <Link to={`/posts/tag/${data.id}`} style={{ color: 'black' }}>{data.name + "  "} </Link>
    );
}

export default ListTagPost;
