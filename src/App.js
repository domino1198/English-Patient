import React, { Component } from "react";
import FormLogin from "./components/formlogin/form.js"
import Profile from "./components/profile/profile.js"
import './App.css';
import styled from "styled-components";
import {Route,BrowserRouter as Router,Redirect} from "react-router-dom";
import {connect} from "react-redux";


const Div = styled.div`
  posstion:relative;
  display:flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: rgb(24, 25, 35);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    inset: 0px;
`;

const Img1 = styled.img`
position: fixed;
    left: 0px;
    bottom: 0px;
    top: 0px;
`;

const Img2 = styled.img`
position: fixed;
    right: 0px;
    bottom: 0px;
    top: 0px;
`;

const Img3 = styled.img`
    margin-bottom: 40px;
    margin-top: 10px;
    cursor: pointer;
    width: 107px;
    height: 104.44px;
`;

const Main = styled.div`
    background: rgb(23, 24, 34);
    border: 2px solid rgba(255, 255, 255, 0.03);
    box-sizing: border-box;
    box-shadow: rgb(0 0 0 / 25%) 0px 30px 60px;
    border-radius: 12px;
    width: 520px;
    padding: 35px 47px;
    z-index: 10000000;
`;
 
 

class App extends Component {



    


  render(){
  return (
    <Container>
      <Div>
        <Img1 src="https://my.subtitles.love/static/media/login_scr_left.6cb41681.svg"></Img1>
        <Img2 src="https://my.subtitles.love/static/media/login_scr_right.745716da.svg"></Img2>
        <Img3 src="https://my.subtitles.love/static/media/sub_logo_.427cf098.svg"></Img3>
        <Main>
          <Router>
              <Route exact path = "/" >{this.props.loggedIn ? <Redirect to="/profile" /> : <FormLogin />}</Route>
              <Route exact path = "/profile" >{this.props.loggedIn ? <Profile updateData={this.updateData}/> : <Redirect to="/" />}</Route>
          </Router>
        </Main>
      </Div>
    </Container>
  );}
}

const mapStatetoProps = state => ({
    loggedIn: state.user.sign
})


export default connect(mapStatetoProps,null)(App)