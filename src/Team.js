import React from 'react';
import {Table, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fire from './config/fire';
import './index.css'

class Team extends React.Component {

    constructor(props) {
        super(props);
        this.state = { events: null, teams: null };
        this.handleEventChange = this.handleEventChange.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);
    }

    componentDidMount() {
        const db = fire.firestore();
        db.collection('Events').get().then((snap) => {
            const events = [];
            snap.forEach((doc) => {
                events.push(doc.data());
            });
            this.setState({events});
            this.setState({'event': events[0].EventCode});
            this.updateTeamList(events[0].EventCode);
        });
    }

    handleEventChange(event) {
        const target = event.target;
        const EventCode = target.value;
        this.updateTeamList(EventCode);
    }

    updateTeamList(EventCode) {
        this.setState({event: EventCode});
        const db = fire.firestore();
        db.collection('Teams').where('EventCode', '==', EventCode).get().then((snap) => {
            const teams = [];
            snap.forEach((doc) => {
                teams.push({id: doc.id, data: doc.data()});
            });
            this.setState({teams});
        });
    }

    deleteTeam(id) {
        console.log('delete team -> ', id);
        const db = fire.firestore();
        db.collection('Teams').doc(id).delete();
        let teams = this.state.teams;
        for (var i=0; i<teams.length; i++) {
            if (teams[i].id == id) {
                teams.splice(i, 1);
            }
        }
        this.setState({teams});
    }

    createEventOptions() {
        let eventOptions = [];
        const events = this.state.events;
        if (events) {
            events.forEach(event => {
                eventOptions.push(<option value={event.EventCode} key={event.EventCode}>{event.EventName}</option>);
            });
        }
        return eventOptions;
    }

    createTeamRows() {
        let teamRows = [];
        const teams = this.state.teams;
        if (teams) {
            teams.forEach(team => {
                teamRows.push(
                    <tr key={team.id}>
                        <td>{team.data.TeamNumber}</td>
                        <td>{team.data.TeamName}</td>
                        <td><Button size="sm" onClick={() => { this.deleteTeam(team.id) }}>Delete</Button></td>
                    </tr>
                )
            })
        }
        return teamRows;
    }

    getSelectedEvent() {
        return this.state.event;
    }

    render() {
        return (
            <div className="container">
                <div>
                    <Link size="sm" to={{pathname: '/teamadd', state: { id: this.getSelectedEvent()}}} href='/teamaddd' ><Button>Add Team</Button></Link>
                    <h3 style={{marginTop: "10px"}}>Teams</h3>
                    <Form id="teamList">
                        <Form.Group>
                            <select className="form-control" name="event" onChange={this.handleEventChange}>
                                {this.createEventOptions()}
                            </select>
                        </Form.Group>
                    </Form>
                    <Table bordered>
                        <tbody>
                            {this.createTeamRows()}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default Team
