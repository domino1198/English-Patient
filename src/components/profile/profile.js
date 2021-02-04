import React, { Component } from "react";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import {connect} from "react-redux"
import {removeLogin,deletePost,SignOut} from "../../redux/action.js"

const Div = styled.div`
  margin:auto;
  margin-top:50px;
`;

const Bbutton = styled.button`
    height: 50px;
    background: rgb(255, 172, 48);
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    margin-top:20px;
    opacity: 1;
    color: white;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold; 
    :hover {
    opacity: 0.8;
}
`;
const Img = styled.img`
  margin:auto;
  margin-bottom:10px;
  text-align:center;
  border-radius: 50%;
  max-width: 200px;
`;

const Container = styled.div`
  margin:auto;
  text-align:center
`;

const InfoProfil = styled.div`
  margin:auto;
  color: white;
`;


class Profile extends Component {

    submitHandler = event =>{
    event.preventDefault()
    this.props.removeLogin()
    this.props.deletePost()
    this.props.SignOut()
    };

    render(){

        let userfull = this.props.syncPosts.result.user
        return(
            <DocumentTitle title="profile">
            <Div>
                <Container>
                <Img src={userfull.avatar}></Img>
                <InfoProfil>{userfull.firstName}</InfoProfil>
                <InfoProfil>{userfull.lastName}</InfoProfil>
                </Container>
                <Bbutton onClick={this.submitHandler}>Выход из профиля</Bbutton>
            </Div>
            </DocumentTitle>
            );
    }
    
}   

const mapStatetoProps = state => {
      return {
    syncPosts: state.user.user
  }
}

const mapDispatchToProps = {
    removeLogin,deletePost,SignOut
}

export default connect(mapStatetoProps,mapDispatchToProps)(Profile);