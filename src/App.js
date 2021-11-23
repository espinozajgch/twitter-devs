import React from "react";
import './styles/App.css';
import './styles/styles.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Header from "./components/header";
import { Route } from "react-router-dom";

// import { Switch,Route,useParams } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Header/>
			<Route exact path ="/"><Login/></Route>
			<Route path ="/home"><Home/></Route>
			<Route path ="/signup"><Signup/></Route>
		</div>
	);
}

export default App;
