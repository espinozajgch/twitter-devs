import { useEffect, useState } from "react";
import { firestore } from "../util/firebase";
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useProtectedContext } from "../context/Protected";
import { auth } from "../util/firebase";
import { Redirect , Link } from "react-router-dom";
import Header from "../components/header";

import ModalClose from "../components/modalClose";
import TimeLine from "../components/timeline";

const Home = () => {

    let maxCharacters = 134;
    const [max, setMax] = useState(maxCharacters);
    const [disabledButton, setDisabledButton] = useState(true);
    const [show, setShow] = useState(false);

    const [user, setUser] = useProtectedContext();
    
    const [estiloOculto, setEstiloOculto] = useState(true);
    const [tweetsState, setTweetsState] = useState([])

    const [tweetMessage, setTweetMessage] = useState("home")
    const [body, setBody] = useState({});
    const [tweetId, setTweetId] = useState(0)

    const getTweets = () =>{

        const desuscribir = firestore
        .collection("tweets").orderBy("created", "desc")
        .onSnapshot((snapshot) => {
            const tweets = snapshot.docs.map(doc =>{

                return {
                    likes: doc.data().likes || 0,
                    message: doc.data().tweet,
                    user: doc.data().autor,
                    uid: doc.data().uid,
                    imagen: doc.data().imagen,
                    counter : doc.data().counter,
                    id: doc.id
                }
            })
            //console.log(tweets)
            setTweetsState(tweets);
        })

        return () => desuscribir();
    }

    const getSubscribe = () =>{
        auth.onAuthStateChanged((userCredential) =>{
            setUser(userCredential);
        });/** */
    }

    useEffect( () => {
        getTweets()
    }, []);

    useEffect( () => {
        getSubscribe();
    }, []);/***/

    const handleClose = () => setShow(false);
    const handleShow = (id) => { 
        setShow(true);
        setTweetId(id);
        console.log(tweetId);
    }

    const checkLikeTweet = (tweet) => {
        const likesCount = ++tweet.likes;
        firestore.doc(`tweets/${tweet.id}`)
        .update({
            likes : likesCount
        })
        .then(() => {
            getTweets();
        })
        .catch((err) => console.error(err.message));
        /**/
    }

    const handleTweet = () => {
        setEstiloOculto(false);
        setDisabledButton(true);
        createTweet();
    }

    const createTweet = () => {

        firestore
        .collection("tweets")
        .add(body)
        .then(() => {
            console.log("Tweet Publicado");
            setEstiloOculto(true);
            setDisabledButton(false);
            getTweets();
        })
        .catch((err) => console.error(err.message));
    }

    const handleChange = (e) => {

        const cant = (e.target.value != null && e.target.value.length);

        if(cant==0){
            setDisabledButton(true);
        }
        else{
            if(cant <= maxCharacters){
                setMax(maxCharacters - cant);

                if(max < maxCharacters){
                    setDisabledButton(false);

                    let newTweet = {
                    ...body,
                        created: new Date(),
                        autor: user.email,
                        uid: user.uid,
                    [e.target.name]: e.target.value
                    };
                    setTweetMessage(e.target.value);
                    setBody(newTweet);
                }
            }
            else{
                setDisabledButton(true);
            }
        }

    };

    if(!user){
        return <Redirect to='/'></Redirect>
    }/***/

    return (
        <Container>
            <ModalClose setShow={setShow} show={show} getTweets={getTweets} handleClose={handleClose} tweetId={tweetId} />
            <Header logo={user.photoURL}/>

            <Row>
                <Col className="border-top" md={3}></Col>

                <Col className="border" md={6}>
                   
                    <Container >
                    <Row>
                        <Col md={12} className="pt-4">
                            <FormControl as="textarea" aria-label="With textarea" cols="30" rows="5" onChange={handleChange} name="tweet" id=""/>
                        </Col>  
                        <Form.Text className="text-muted">
                            Di lo que piensa en un maximo de {max} caracteres
                        </Form.Text>                  
                        <Col md={12} className="pt-2 d-grid gap-2">
                            <Button variant="success" size="lg" onClick={() => handleTweet()} disabled={disabledButton}>
                                
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className={`visually-${estiloOculto ? "hidden" : ""}`}
                                />
            
                                Postear
                            </Button>
                        </Col>
                    </Row>

                    <TimeLine tweetsState={tweetsState} user={user} handleShow={handleShow} checkLikeTweet={checkLikeTweet} />
                    </Container>
                </Col>
                <Col className="border-top" md={3}></Col>
            </Row>
        </Container>
    );
}

export default Home;