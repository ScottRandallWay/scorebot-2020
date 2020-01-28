import React from 'react';
import Menu from './Menu';
import Main from './Main';
import Login from './Login';
import fire from './config/fire';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
        this.authListner = this.authListner.bind(this);
    }

    componentDidMount() {
        this.authListner();
    }

    authListner() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
            } else {
                this.setState({user: null});
            }

        });
    }

    render() {
        if (this.state.user) {
            return (<div><Menu/><Main/></div>);
        } else {
            return (<Login></Login>);
        }
    }
}

export default App;
