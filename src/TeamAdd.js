import {Button, Form} from "react-bootstrap";
import {Link, Redirect} from 'react-router-dom';
import React from "react";
import fire from "./config/fire";;

class TeamAdd extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.location.state.id)
        this.state = {redirect: false, event: this.props.location.state.id};
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

    handleFormSubmit(event) {
        event.preventDefault();
        console.log(this.state.event, this.state.teamName, this.state.teamNumber);
        const db = fire.firestore();
        db.collection('Teams').add({'TeamNumber': this.state.teamNumber, 'TeamName': this.state.teamName, 'EventCode': this.state.event}).then((docRef) => {
            this.setState({redirect: true});
        });
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/team' />
        }
    }

    render() {
        return (
            <div className="container">
                {this.renderRedirect()}
                <Form id="teamAdd" onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Event:</Form.Label>
                        <Form.Control name="event" disabled value={this.props.location.state.id}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Team Number:</Form.Label>
                        <Form.Control name="teamNumber" type="number" required onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Team Name:</Form.Label>
                        <Form.Control name="teamName" type="text" required onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Button size="sm" type="submit">Submit</Button>
                    &nbsp;
                    <Link to='/team' href='/team'><Button size="sm">Cancel</Button></Link>
                </Form>
            </div>
        )
    }
}

export default TeamAdd;
