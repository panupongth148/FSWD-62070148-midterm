import { Card, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';

const commentView = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    useEffect(
        async () => {
            setLoading(true);
            console.log(props);
            fetch(props.pathComments[0].href)
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
    const submitComment = async () => {
        await axios.post('https://fswd-wp.devnss.com/wp-json/wp/v2/comments', {
            author_name: username,
            content: message,
            post: data[0].post,
        }, {
            headers: {
                Authorization: 'Basic ZnN3ZDpmc3dkLWNtcw==',
            },
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    };
    const usernamehandleChange = (e) => {
        setUsername(e.target.value);
    };
    const messagehandleChange = (e) => {
        setMessage(e.target.value);
    };
    console.log(data);
    return (
        <div className="container">
            <div className="row mb-2">
                <div className="col">
                    <h2>Comments</h2>
                </div>
            </div>
            <div className="rows">
                <div className="row">
                    {data.map((value, index) => {
                        return (<Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title>{value.author_name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{value.date}</Card.Subtitle>
                                <Card.Text>
                                    <div dangerouslySetInnerHTML={{ __html: value.content.rendered }} />
                                </Card.Text>
                                {/* <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link> */}
                            </Card.Body>
                        </Card>);
                    })}
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h4>Your Comment</h4>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={username} onChange={usernamehandleChange} />
                            <Form.Text className="text-muted">
                                Your username to show at your comment
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Your message</Form.Label>
                            <Form.Control value={message} onChange={messagehandleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={submitComment}>
                            send
                        </Button>
                    </Form>
                </div>

            </div>
        </div>
    );
};

export default commentView;
