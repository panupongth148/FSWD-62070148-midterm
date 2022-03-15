import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axios } from 'axios';
import { Card, Button } from 'react-bootstrap';
import Author from "../component/author";
import CommentView from "../component/comment";

function Content() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [arthorState, setArthorState] = useState(null);
  useEffect(
    async () => {
      setLoading(true);
      fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts/${id}`)
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
    <div className="container my-3">
      <div className="rows">
        <div className="col m-auto text-center">
          <h1> {data.title.rendered} </h1>
          <h6> Published by <Author links={data._links.author[0]} /></h6>
        </div>
      </div>
      <div className="row">
        <div className="col mx-5 my-3">
          <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <CommentView pathComments={data._links.replies} />
        </div>
      </div>
    </div>
  );
}

export default Content;
