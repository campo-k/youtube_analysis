import React, { Component } from 'react';
import GrapheTimePath from './graphe_time_path'
import * as d3 from 'd3';


class GrapheTimeDraw extends Component {
    state = {
        name: '',
        x: 0,
        y: 0,
        width: 0,
    };
    componentDidMount() {
        this.setState({
            width: (window.outerWidth >= 1440 ? ((window.outerWidth-68) / 2) :
                (window.outerWidth <= 690 ? 652 : window.outerWidth-38))
        });

        window.addEventListener('resize', this.handleResizeWindow.bind(this));
    }
    createComma = (num) => {
        var len, point, str;

        num = num + "";
        point = num.length % 3 ;
        len = num.length;

        str = num.substring(0, point);
        while (point < len) {
            if (str != "") str += ",";
            str += num.substring(point, point + 3);
            point += 3;
        }

        return str;
    };
    handleResizeWindow = (e) => {
        this.setState({
            width: (window.outerWidth >= 1440 ? ((window.outerWidth-68) / 2) :
                (window.outerWidth <= 690 ? 652 : window.outerWidth-38))
        });
    };
    handlePathMouseOver = (e) => {
        this.setState({
            name: e.target.attributes["name"].value,
            x: parseInt(e.clientX),
            y: parseInt(e.clientY)-150
        })
    };
    handlePathMouseOut = (e) => {
        this.setState({
            name: "",
            x: 0,
            y: 0
        })
    };

    render() {
        const datas  = this.props.time;
        const width  = this.state.width;
        const height = 400;
        const margin = {t: 10, b: 20, r: 5, l: 70};

        const m = this.props.yMax;
        const w = width - margin.l - margin.r;
        const h = height - margin.t - margin.b;

        if (!datas.length) {
            return ( <svg width={width} height={height}></svg> );
        }

        //y Max
        const yMin = (d3.min(datas.map(d => d3.min(d, e => e.va)), function(d) { return d }));
        const yMax = (!m ? d3.max(datas.map(d => d3.max(d, e => e.va)), function(d) { return d }) : m);

        //x scale
        const x = d3.scaleTime()
            .domain(d3.extent(datas[0], function(d) { return new Date(d.dt) }))
            .range([margin.l, width - margin.r]);

        //y scale
        const y = d3.scaleLinear()
            .domain([(yMin < 0 ? yMin: 0), yMax]).nice()
            .range([height - margin.b, margin.t]);

        //x tick and text
        const xTicks = x.ticks(10).map(d => {
            const date = new Date(d);
            return (x(date) > margin.l && x(date) < w+margin.l ?
                <g key={date} transform={`translate(${x(date)+10},${h+margin.t})`}>
                    <text x="0" y="20">{date.getDate()}</text>
                    <line x1='0' x2='0' y1='0' y2='5' transform="translate(0,0)"/>
                    <line className='gridline' x1='0' x2='0' y1={-h} y2='0' transform="translate(0,0)"/>
                </g> : null)
        });

        //y tick and text
        const yTicks = y.ticks(10).map(d => {
            return (y(d) > 0 && y(d) < h+margin.t ?
                <g key={d} transform={`translate(${margin.l},${y(d)})`}>
                    <text x="-35" y="5">{this.createComma(d3.format('1')(d))}</text>
                    <line x1='-5' x2='0' y1='0' y2='0' transform="translate(0,0)"/>
                    <line className='gridline' x1='0' x2={w} y1='0' y2='0' transform="translate(0,0)"/>
                </g> : null)
        });

        // line generator: each point is [x(d.a), y(d.b)] where d is a row in data
        // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
        const line = d3.line()
            .defined(function (d) { return !isNaN(d.va) })
            .x(d => x(new Date(d.dt)))
            .y(d => y(d.va))
            .curve(d3.curveCatmullRom.alpha(0.5)); //curve line

        return (
            <svg width={width} height={height}>
                <line className="axis" x1={margin.l} x2={width - margin.r} y1={height - margin.b} y2={height - margin.b}/>
                <line className="axis" x1={margin.l} x2={margin.l} y1={margin.t} y2={height - margin.b}/>
                {datas.map(d => <path key={d[0].id} name={d[0].id}
                                      onMouseOver={this.handlePathMouseOver}
                                      onMouseOut={this.handlePathMouseOut}
                                      d={line(d)}/>)}
                <GrapheTimePath name={this.state.name} x={this.state.x} y={this.state.y} />
                <g className="axis-labels">
                    {xTicks}
                </g>
                <g className="axis-labels">
                    {yTicks}
                </g>
            </svg>
        );
    }
}

export default GrapheTimeDraw;