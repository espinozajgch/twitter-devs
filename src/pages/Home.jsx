import { useEffect, useState } from "react";
import { firestore } from "../util/firebase";
import { storage } from "../util/firebase";
import corazon from "../img/corazon.svg";


// import { Route } from "react-router-dom";

const Home = () => {

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
        if(file!==0)
            uploadFile();
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
          [e.target.name]: e.target.value
        };
        setTweetMessage(e.target.value);
        setBody(newTweet);
    };

    return (
        <div>
            
            <h1>Dev's United</h1>

            <div>
                <div>
                    <textarea name="tweet" id="" cols="30" rows="5" onChange={handleChange} defaultValue=""></textarea> 
                </div>
                <div>
                    <label>Usuario:</label>
                    <input onChange={handleChange} type="text" name="autor" />   
                </div>
               
                <div>
                    <input onChange={HandleUploadFile} type="file" name="files" id="files" accept="image/png, image/gif, image/jpeg" multiple/>
                    { progreso > 0 && <progress id="uploadingfile" max="100" value={progreso}> 70% </progress> }
                </div>
                <div>
                    <button onClick={() => handleTweet()}>Twittear</button>
                </div>
            </div>
            <div>
                {
                    tweetsState.map((tweet)=>{
                        return (
                            <div key={tweet.id}>
                                <p>{tweet.message}</p>
                                <p>{tweet.user}</p>
                                <div>
                                { tweet.imagen && <img width="100px" height="100px" src={tweet.imagen} alt={tweet.id} /> }
                                </div>
                                <button onClick={() => updateTweet(tweet)}>Actualizar tweet</button>
                                <button onClick={() => deleteTweet(tweet.id)}>Eliminar tweet</button>
                                <span onClick={() => checkLikeTweet(tweet)} className="likes">
                                    <img height="13px" src={corazon} alt="" />
                                    <span>{tweet.likes}</span>
                                </span>
                                <hr />
                            </div>
                        )
                    })
                }
            </div>
            

        </div>
    );
}

export default Home;