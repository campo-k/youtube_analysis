import React, { Component } from 'react';
import * as d3 from 'd3';


class GrapheRankDraw extends Component {
    state = {
        rank: [],
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

    render() {
        var count = 0;
        const data   = this.props.rank;
        const width  = this.state.width;
        const height = 400;
        const margin = {t: 10, b: 20, r: 5, l: 70};

        const w = width - margin.l - margin.r;
        const h = height - margin.t - margin.b;

        const datas = data.filter(function (data) {

            count++;
            return count < 11
        });


        if (!datas.length) {
            return ( <svg width={width} height={height}></svg> );
        }

        //x scale
        const x = d3.scaleBand()
            .domain(datas.map(d => d.id))
            .range([margin.l, width - margin.r])
            .padding(0.2);

        //y scale
        const y = d3.scaleLinear()
            .domain([0, d3.max(datas, function(d) { return d.va })]).nice()
            .range([height - margin.b, margin.t]);

        //y tick and text
        const yTicks = y.ticks(10).map(d => {
            return (y(d) > 0 && y(d) < h+margin.t ?
                <g key={d} transform={`translate(${margin.l},${y(d)})`}>
                    <text x="-35" y="5">{this.createComma(d3.format('1')(d))}</text>
                    <line x1='-5' x2='0' y1='0' y2='0' transform="translate(0,0)"/>
                    <line className='gridline' x1='0' x2={w} y1='0' y2='0' transform="translate(0,0)"/>
                </g> : null)
        });

        const bars = (
            datas.map(datum =>
                <rect key={datum.id} x={x(datum.id)} y={y(datum.va)}
                    height={height - margin.b - y(datum.va)}
                    width={x.bandwidth()}
                ></rect>
            )
        );
        const text = (
            datas.map(datum =>
                <text key={datum.id} x={x(datum.id)+((x.bandwidth()-28)/2)} y={height}
                >{datum.id}</text>
            )
        );
        const value = (
            datas.map(datum =>
                <text key={datum.id} x={x(datum.id)+5} y={(height - margin.b - y(datum.va)) < 25 ? y(datum.va)-5 : y(datum.va)+15}
                >{this.createComma(datum.va)}</text>
            )
        );

        // line generator: each point is [x(d.a), y(d.b)] where d is a row in data
        // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)

        return (
            <svg width={width} height={height}>
                <line className="axis" x1={margin.l} x2={width - margin.r} y1={height - margin.b} y2={height - margin.b}/>
                <line className="axis" x1={margin.l} x2={margin.l} y1={margin.t} y2={height - margin.b}/>
                <g>{bars}</g>
                <g>{value}</g>
                <g>{text}</g>
                {/*<g className="axis-labels">*/}
                    {/*{xTicks}*/}
                {/*</g>*/}
                <g className="axis-labels">
                    {yTicks}
                </g>
            </svg>
        );
    }
}

export default GrapheRankDraw;