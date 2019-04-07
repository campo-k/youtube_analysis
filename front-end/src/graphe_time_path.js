import React, { Component } from 'react';


class GrapheTimePath extends Component {
    state = {

    };

    render() {
        return (
            <text className="pathName" x={this.props.x} y={this.props.y}>{this.props.name}</text>
        );
    }
}

export default GrapheTimePath;