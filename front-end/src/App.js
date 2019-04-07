import React, { Component } from 'react';
import GrapheTime from './graphe_time';
import GrapheRank from './graphe_rank';
import SkillStack from './skill_stack';


class App extends Component {
    state = {
        time: [],
        rank: [],
        clip: []
    };
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/dashboard/start')
            .then(res =>
                res.json()
            )
            .then(json => {
                var time = JSON.parse(json.ts);
                var rank = JSON.parse(json.rank);
                this.setState({
                    time: time,
                    rank: rank,
                    clip: rank.map(d => d)
                });
            });

        try {
            // const apis = await fetch('http://127.0.0.1:8000/api/dashboard/start')
            // const data = await apis.json();
            // const time = JSON.parse(data.ts);
            // const rank = JSON.parse(data.rank);
        }
        catch (e) {
            console.log(e);
        }
    }

    render() {
        if (!this.state.time.length) return ( <div></div> );
        else {
            return (
                <div className="container">
                    <div className="row">
                        <GrapheTime time={this.state.time} clip={this.state.clip} />
                        <GrapheRank rank={this.state.rank} />
                    </div>
                    <div className="row">
                        <SkillStack />
                    </div>
                </div>
            );
        }
    }
}

export default App;