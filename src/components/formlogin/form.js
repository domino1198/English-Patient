import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import {connect} from "react-redux";
import {userLogin,postLogin,SignIn,deletePost} from "../../redux/action.js"

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

const Sign = styled.div`
    width: 100%;
    margin-bottom: 40px;
    color: rgb(255, 255, 255);
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 46px;
    text-align: center;
`;

const Label = styled(Form.Label)`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: rgb(123, 127, 158);
    margin-bottom: 14px; 
`;

const Input = styled(Form.Control)`
    height: 50px;
    background: rgb(33, 35, 48);
    border: 2px solid rgb(41, 43, 54);
    box-sizing: border-box;
    border-radius: 6px;
    width: 100%;
    outline: none;
    text-align: left;
    color: white;
    font-weight: bold;
    font-size: 17px;
    padding-left: 25px;
`;







class FormLogin extends Component{
    
    constructor(props){
        super(props)

        this.state ={
            email:'',
            password:'',
            invalidate: false,
            validate: false,
        }
    }


    submitHandler = async event =>{ 
        event.preventDefault();
        this.setState({validate: false});
        const token = await this.props.asyncPosts(this.state.email,this.state.password)  
        
            
        if (this.props.asyncPost.length === 0)  {       
            this.setState({invalidate: true});
            this.props.deletePost()
            event.stopPropagation();      
        }
        else
        {            
            this.setState({invalidate: false});
            this.setState({validate: true});
            const tt = await this.props.GetUser(this.props.asyncPost)
            this.props.deletePost()
            this.props.signIn()
        }
    }

    changeInputHandle = event =>{
        event.persist()
        this.setState(prev=>({...prev,...{
            [event.target.name]:event.target.value
        }}))
    }

    
    render(){
    return(
        <DocumentTitle title="sign in">
        <Div>
            <Sign>Sign In</Sign>
            <Form noValidate onSubmit={this.submitHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Label>Email </Label>
                    <Input required isInvalid = {this.state.invalidate === true} isValid = {this.state.validate === true} onChange={this.changeInputHandle} type="email" value={this.state.email} name="email"  placeholder="Enter email" />
                    <Input.Feedback type="invalid">Введена неверная почта или пароль</Input.Feedback>
                </Form.Group>

                <Form.Group  style={{marginTop:"18px"}} controlId="formBasicPassword">
                    <Label>Password</Label>
                    <Input required isInvalid = {this.state.invalidate === true} isValid = {this.state.validate === true} onChange={this.changeInputHandle} type="password" value={this.state.password} name="password"  placeholder="Password" />
                    <Input.Feedback type="invalid">Введена неверная почта или пароль</Input.Feedback>
                </Form.Group>
                    <Bbutton type="submit">Submit</Bbutton>
                 
            </Form>  
        </Div>
        </DocumentTitle>
    )}
}   


const mapDispatchToProps = (dispatch) => {
    return{
        GetUser: (token) => dispatch (userLogin(token)),
        asyncPosts : (email,password) => dispatch(postLogin(email,password)),
        signIn : () => dispatch(SignIn()),
        deletePost: () => dispatch(deletePost())
    }
    
}

const mapStatetoProps = state => ({
    asyncPost: state.user.posts
})

export default connect(mapStatetoProps,mapDispatchToProps)(FormLogin)