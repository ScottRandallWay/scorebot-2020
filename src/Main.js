import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Team from './Team';
import TeamAdd from './TeamAdd';
import Report from './Report';
import Match from './Match';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <Switch>
                    <Route path='/team' component={Team}/>
                    <Route path='/teamadd' component={TeamAdd}/>
                    <Route path='/match' component={Match}/>
                    <Route path='/report' component={Report}/>
                </Switch>
            </main>
        )
    }
}

export default Main;
