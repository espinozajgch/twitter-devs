import { useEffect, useState } from "react";
import { firestore } from "../util/firebase";
import { storage } from "../util/firebase";
import corazon from "../img/corazon.svg";
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useProtectedContext } from "../context/Protected";
import { auth } from "../util/firebase";
import { Redirect , Link } from "react-router-dom";

// import { Route } from "react-router-dom";

const Home = () => {

    const [user, setUser] = useProtectedContext();

    const [tweetsState, setTweetsState] = useState([])
    const [tweetMessage, setTweetMessage] = useState("home")
    const [body, setBody] = useState({});
    const [file, setFile] =  useState(0);
    const [progreso, setProgreso] = useState(0);

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
        .collection("tweets")
        .onSnapshot((snapshot) => {
            const tweets = snapshot.docs.map(doc =>{
                return {
                    likes: doc.data().likes || 0,
                    message: doc.data().tweet,
                    user: doc.data().autor,
                    uid: doc.data().uid,
                    imagen: doc.data().imagen,
                    id: doc.id
                }
            })
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

    useEffect( () => {
        getTweets()
    }, []);

    useEffect( () => {
        auth.onAuthStateChanged((userCredential) =>{
            //let { uid, email } = userCredential;
            setUser(userCredential);
            console.log( userCredential !== null && userCredential.uid);
        });/** */
        
    }, []);/***/

    const deleteTweet = (id) => {
        firestore
        .collection("tweets")
        .doc(id)
        .delete()
        .then(() => {
            getTweets();
        })
        .catch((err) => console.error(err.message));
    }

    const updateTweet = (id) => {

        const bodyUpdate = {
            tweet : tweetMessage
        };
        
        firestore.doc(`tweets/${id}`)
        .update(bodyUpdate)
        .then(() => {
            getTweets();
        })
        .catch((err) => console.error(err.message));
        /**/
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
        console.log("tweet?")
        
        if(file!==0)
            uploadFile();
        else
            createTweet();
    }

    const createTweet = () => {

        firestore
        .collection("tweets")
        .add(body)
        .then(() => {
            console.log("Tweet Publicado");
            getTweets();
        })
        .catch((err) => console.error(err.message));
        console.log(body)/** */
    }

    const handleChange = (e) => {
        let newTweet = {
          ...body,
            uid: user.uid,
           [e.target.name]: e.target.value
        };
        setTweetMessage(e.target.value);
        setBody(newTweet);
        console.log(newTweet);
    };

    if(!user){
        // navigate('/home');
        return <Redirect to='/'></Redirect>
    }

    return (
        <div>
            
            <h1>Dev's United</h1>
            <h3>Hola {user.email}</h3>
            <Container>
            <Row>
                <Col>
                    <FormControl as="textarea" aria-label="With textarea" cols="30" rows="5" onChange={handleChange} name="tweet" id=""/>
                </Col>
                {/* <div>}
                    { <label>Usuario:</label> }
                    <FormControl aria-label="Last name"  onChange={handleChange} type="text" name="autor"/>  
                {</div> */}
               
                {/* <div>}
                    <input onChange={HandleUploadFile} type="file" name="files" id="files" accept="image/png, image/gif, image/jpeg" multiple/>
                    { progreso > 0 && <progress id="uploadingfile" max="100" value={progreso}> 70% </progress> }
                {/* </div> */}
                <div>
                    <Button onClick={() => handleTweet()}>Twittear</Button>
                </div>
            </Row>

            <Row>
                <Col className="m-3 pt-2">
                {
                    tweetsState.map((tweet)=>{
                        return (
                            <Col className="border p-3 m-1" md={12} key={tweet.id}>
                                <p>{tweet.message}</p>
                                <p>{user.uid === tweet.uid && user.email}</p>
                                <div>
                                { tweet.imagen && <img width="100px" height="100px" src={tweet.imagen} alt={tweet.id} /> }
                                </div>

                                <Row className="p-2 border">
                                    <Col md={4}>
                                        <Button onClick={() => updateTweet(tweet)}>Actualizar tweet</Button>
                                    </Col>

                                    {user.uid === tweet.uid &&
                                    <Col md={4}>
                                        <Button variant="danger" onClick={() => deleteTweet(tweet.id)}>Eliminar tweet</Button>
                                    </Col>
                                    }
                                    <Col md={4}>
                                        <Button className="border" variant="light" onClick={() => checkLikeTweet(tweet)} >
                                            <img height="13px" src={corazon} alt="" />
                                            <span>{tweet.likes}</span>
                                        </Button>
                                    </Col>
                                    
                                </Row>
                            </Col>
                        )
                    })
                }
                </Col>
            </Row>
            </Container>

        </div>
    );
}

export default Home;