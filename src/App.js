import React from "react";
import './styles/App.css';
import './styles/styles.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';

function App() {
	return (
		<Container className="App">
			<Route exact path ="/"><Login/></Route>
			<Route path ="/home"><Home/></Route>
			<Route path ="/signup"><Signup/></Route>
		</Container>
	);
}

export default App;
