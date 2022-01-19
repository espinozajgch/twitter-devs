import { useEffect, useState } from "react";
import { firestore } from "../util/firebase";
import { storage } from "../util/firebase";
import corazon from "../img/corazon.svg";
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useProtectedContext } from "../context/Protected";
import { auth } from "../util/firebase";
import { Redirect , Link } from "react-router-dom";
import Header from "../components/header";
import { AiFillDelete } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
// import { BarLoader } from 'react-css-loaders';
// import { Route } from "react-router-dom";

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
    const [file, setFile] =  useState(0);
    const [progreso, setProgreso] = useState(0);

    const [tweetId, setTweetId] = useState(0)

    const HandleUploadFile =(e) =>{
        //console.log(e);
        for(var i = 0; i < e.target.files.length; i++){
            //uploadFile(e.target.files[i]);
            setFile(e.target.files[i]);
        }
    }

    const uploadFile = () => {
        /*console.log(ImgFile.name);
        storage.ref().child(`/profile/${ImgFile.name}`)
        .put(ImgFile)
        .then(()=>{
            console.log("archivo cargado");
        })/***/

        const uploadTask = storage
        .ref()
        .child(`tweets/${file.name}`)
        .put(file);

        uploadTask.on("stated_changed", (snapshot) => {
            
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(!isNaN(progress)){
                setProgreso(progress);
                console.log('Upload is ' + progress + '% done');
            }

            /*switch (snapshot.state) {
                case storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
                case storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }/** */
            //console.log("cargando imagen:" + snapshot)

        }, (err) => {
            console.error("error")
        }, () =>{
            console.log("imagen cargada");
            //var urlFile = uploadTask.snapshot.downloadURL;
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                setBody({...body, imagen: downloadURL})    
                createTweet();
                setProgreso(0);
                setFile(0);
            });
        });
    }

    /***************** */

    /*const getUser = (id) =>{

        //console.log(id);
        const desuscribir = firestore
        .collection("users")
        .onSnapshot((snapshot) => {
            let users = snapshot.docs.map(doc =>{

                if(id==doc.data().uid){
                    return {
                        name: doc.data().name || "",
                        email: doc.data().email,
                        id: doc.data().uid
                    }
                }
            })

            users = users[0];
            setUserTweet(users);
            //console.log(users);
            //setTweetsState(tweets);
        })
        return () => desuscribir();
        
        /**/

        /*var citiesRef = firestore.collection("cities");

        citiesRef.doc("SF").set({
            name: "San Francisco", state: "CA", country: "USA",
            capital: false, population: 860000,
            regions: ["west_coast", "norcal"] });

            var docRef = firestore.collection("cities").doc("SF");

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        */

        /*
        var docRef = firestore.collection("users").doc("1jcdK5pddRq0gb8xpTKy");

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }/** */

    const getTweets = () =>{
        /*
        firestore
        .collection("tweets")
        .get()
        .then(snapshot => {
            const tweets = snapshot.docs.map(doc =>{
                return {
                    likes: doc.data().likes || 0,
                    message: doc.data().tweet,
                    user: doc.data().autor,
                    id: doc.id
                }
            })
            // console.log(tweets);
            setTweetsState(tweets);
        })
        /***/

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
                    //created: new Date(doc.data().created.seconds * 1000 + doc.data().created.nanoseconds/1000000),
                    id: doc.id
                }
            })
            console.log(tweets)
            setTweetsState(tweets);
        })

        return () => desuscribir();
        
    }

    /*const getTweet = (id) => {
        firestore.doc(`tweets/${id}`)
        .update({
            likes : 1
        })
        .then(() => {
            getTweets();
        })
        .catch((err) => console.error(err.message));
     
    }/**/ 

    const getSubscribe = () =>{
        auth.onAuthStateChanged((userCredential) =>{
            //let { uid, email } = userCredential;
            setUser(userCredential);
            //console.log( userCredential !== null && userCredential);
        });/** */

    }

    useEffect( () => {
        getTweets()

        //getUser();
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

    const deleteTweet = (id) => {
        firestore
        .collection("tweets")
        .doc(id)
        .delete()
        .then(() => {
            getTweets();
            handleClose();
        })
        .catch((err) => console.error(err.message));
        /**/
        console.log("id eliminado:" + id);
        
    }

    /*const updateTweet = (id) => {

        const bodyUpdate = {
            tweet : tweetMessage
        };
        
        firestore.doc(`tweets/${id}`)
        .update(bodyUpdate)
        .then(() => {
            getTweets();
        })
        .catch((err) => console.error(err.message));
        
    }/***/

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
        //console.log("tweet?")
        
        // if(file!==0)
            // uploadFile();
        // else
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
        //console.log(body)/** */
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
                    //console.log(newTweet);
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

            

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alerta</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta seguro de eliminar el Tweet!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="danger" onClick={() => deleteTweet(tweetId)}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Header/>
            <Row>
                <Col className="border-top" md={3}>
                </Col>

                <Col className="border" md={6}>
                   
                    <Container >
                    <Row>
                        <Col md={12} className="pt-4">
                            <FormControl as="textarea" aria-label="With textarea" cols="30" rows="5" onChange={handleChange} name="tweet" id=""/>
                        </Col>  
                        <Form.Text className="text-muted">
                            Di lo que piensa en un maximo de {max} caracteres
                        </Form.Text>                  
                        {/* <div>}
                            <input onChange={HandleUploadFile} type="file" name="files" id="files" accept="image/png, image/gif, image/jpeg" multiple/>
                            { progreso > 0 && <progress id="uploadingfile" max="100" value={progreso}> 70% </progress> }
                        {/* </div> */}
                        <Col md={12} className="pt-2 d-grid gap-2">
                            <Button size="lg" onClick={() => handleTweet()} disabled={disabledButton}>
                                
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className={`visually-${estiloOculto ? "hidden" : ""}`}
                                />
                                
                                Twittear
                            </Button>
                        </Col>
                    </Row>

                    <Row className="pt-2 mt-4">
                        {/* <Col md={12} className="m-3 pt-2"> */}
                        {
                            tweetsState.map((tweet)=>{
                                return (
                                    <Col className="border-bottom pb-2 m-1" md={12} key={tweet.id}>
                                        <Card>
                                        <Card.Header bg="light">{user.uid === tweet.uid ? user.email : tweet.uid}</Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                            <p>{tweet.message}</p>
                                            </Card.Text>

                                            <Row className="">
                                                
                                                <Col md={4}>
                                                    <span>{tweet.created}</span>
                                                </Col>

                                                {/* {user.uid === tweet.uid && */}
                                                <Col md={4}>
                                                    {/* <Button variant="danger" onClick={() => deleteTweet(tweet.id)}>Eliminar tweet</Button> */}
                                                </Col>
                                                {/* } */}
                                                <Col md={4}>
                                                    {/* <Button className="border" variant="light" onClick={() => checkLikeTweet(tweet)} > */}
                                                        {/* <img height="13px" src={corazon} alt="" /> */}
                                                        {/* <span>{tweet.likes}</span> */}
                                                    {/* </Button> */}

                                                    <ButtonGroup size="sm">
                                                    {user.uid === tweet.uid &&
                                                        <Button variant="danger" onClick={() => handleShow(tweet.id) } /*onClick={handleShow}*/><AiFillDelete /></Button>
                                                    }
                                                    <Button variant="info" onClick={() => checkLikeTweet(tweet)} >
                                                        {/* <img height="13px" src={corazon} alt="" /> */}
                                                        <AiFillHeart/>
                                                        <span className="pt-4">{tweet.likes}</span>
                                                    </Button>
                                                </ButtonGroup>
                                                </Col>
                                                
                                            </Row>
                                        </Card.Body>
                                        </Card>

                                        
                                        {/* <div> */}
                                        {/* { tweet.imagen && <img width="100px" height="100px" src={tweet.imagen} alt={tweet.id} /> } */}
                                        {/* </div> */}


                                    </Col>
                                )
                            })
                        }
                        {/* </Col> */}
                    </Row>
                    
                    </Container>
                </Col>

                <Col className="border-top" md={3}>

                </Col>
            </Row>
        </Container>
    );
}

export default Home;