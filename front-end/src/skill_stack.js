import React, { Component } from 'react';


class SkillStack extends Component {
    state = {

    };

    componentDidMount() {

    }

    render() {
        return (
            <div className="skills col">
                <div><h3><u>Used skill</u></h3></div>
                <div className="skills-row">
                    <div className="skills-name"><strong>Back-end</strong></div>
                    <div className="skills-etcs">Python Django, Django Rest-Framework, Celery</div>
                </div>
                <div className="skills-row">
                    <div className="skills-name"><strong>Message Queue</strong></div>
                    <div className="skills-etcs">Redis, Celery</div>
                </div>
                <div className="skills-row">
                    <div className="skills-name"><strong>Front-end</strong></div>
                    <div className="skills-etcs">Create React App, React.js, D3.js, Font Awesome</div>
                </div>
                <div className="skills-row">
                    <div className="skills-name"><strong>Database</strong></div>
                    <div className="skills-etcs">Redis</div>
                </div>
                <div className="skills-row">
                    <div className="skills-name"><strong>Server</strong></div>
                    <div className="skills-etcs">AWS EC2, Ubuntu16.04, Nginx</div>
                </div>
            </div>
        );
    }
}

export default SkillStack;