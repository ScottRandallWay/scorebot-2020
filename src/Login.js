import React from 'react';
import { Form, Button } from 'react-bootstrap';
import fire from './config/fire';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(cred => {
                console.log('login successful');
            })
            .catch(error => {
                alert('Incorrect Credentials');
            });
    }

    render() {
        return (
            <div className="container">
                <Form id="login-form" onSubmit={this.handleSubmit}>
                    <h3 style={{textAlign: "center", marginTop: 30}}>ScoreBot Login</h3>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" required onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" required onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Login;
