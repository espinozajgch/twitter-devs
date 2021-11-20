import { useEffect, useState } from "react";
import { firestore } from "../util/firebase";
import corazon from "../img/corazon.svg";
const Home = () => {

    const [tweetsState, setTweetsState] = useState([])
    const [tweetMessage, setTweetMessage] = useState("home")
    const [body, setBody] = useState({});

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

    const createTweet = () => {
        firestore
        .collection("tweets")
        .add(body)
        .then(() => {
            getTweets();
        })
        .catch((err) => console.error(err.message));/** */
        console.log(body)
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
                <textarea name="tweet" id="" cols="30" rows="5" onChange={handleChange} defaultValue=""></textarea> 
                <input onChange={handleChange} type="text" name="autor" />   
                <button onClick={() => createTweet()}>Twittear</button>
            </div>
            <div>
                {
                    tweetsState.map((tweet)=>{
                        return (
                            <div key={tweet.id}>
                                <p>{tweet.message}</p>
                                <p>{tweet.user}</p>
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