import React, { Component } from 'react';
import GrapheRankDraw from './graphe_rank_draw'


class GrapheRank extends Component {
    state = {
        rank: [],
        s_date: null,
        s_sort: null,
        s_variable: null,
    };

    componentDidMount() {
        this.setState({
            rank: this.props.rank,
            s_date: 1,
            s_sort: true,
            s_variable: 2,
        });
    }
    fetchData = (param, args) => {
        var $ele = document.getElementsByClassName("graphe-progress")[1];
        var data = args;

        $ele.style.width = (window.innerWidth < 1440 ? (window.innerWidth - 16) : ((window.innerWidth) / 2 - 12)) + "px";
        $ele.style.display = "block";
        fetch('http://127.0.0.1:8000/api/dashboard/rank/' + param)
            .then(res =>
                res.json()
            )
            .then(json => {
                $ele.style.display = "none";
                data.rank = JSON.parse(json);
                this.setState(data);
            })
            .catch(error=> {
                console.log(error);
                alert("데이터 수집에 실패하였습니다.\r\n다시 시도하여 주십시오.");
            });
    };
    handleChangeVariable = (e) => {
        var v = e.target.value;
        var d = this.state.s_date;
        var iDate = "2019-02-" + (d > 9 ? d : "0"+ d);
        var param = "?va=" + v + "&date=" + iDate;

        this.fetchData(param, {s_variable: v});
    };
    handleChangeSort = (e) => {
        var data    = this.state.rank;
        var isOrder = (e.target.value === "true");

        if (!isOrder) {
            data = data.sort((a,b) => parseInt(a.va) - parseInt(b.va))
        }
        else {
            data = data.sort((a,b) => parseInt(b.va) - parseInt(a.va))
        }

        this.setState({
            rank: data,
            s_sort: isOrder
        });
    };
    handleChangeDate = (e) => {
        var t = e.target;
        var v = this.state.s_variable;
        var d = t.value;
        var iDate = "2019-02-" + (parseInt(d) > 9 ? d : "0"+ d);
        var param = "?va=" + v + "&date=" + iDate;

        this.fetchData(param, {s_date: d});
    };

    render() {
        if (!this.state.rank.length) return (<div></div>);
        else {
            return (
                <div className="graphe-rank col">
                    <div><h3><u>Rank chart</u></h3></div>
                    <div className="graphe-progress"><i className="fas fa-spinner fa-3x fa-spin"></i></div>
                    <div className="s-select">
                        <select className="s-variable" onChange={this.handleChangeVariable}>
                            <option value="2">조회수</option>
                            <option value="3">유료 사용자 조회수</option>
                            <option value="4">전체 시청 시간(분)</option>
                            <option value="5">유료 사용자 전체 시청 시간(분)</option>
                            <option value="8">구독자 획득</option>
                            <option value="9">구독자 이탈</option>
                            <option value="10">댓글수</option>
                            <option value="11">좋아요 수</option>
                            <option value="12">싫어요 수</option>
                            <option value="13">플래이 리스트 추가 수</option>
                            <option value="14">플래이 리스트 삭제 수</option>
                            <option value="15">공유수</option>
                        </select>
                        {/*<select className="s-sort" onChange={this.handleChangeSort}>*/}
                        {/*<option value="true">오름차순</option>*/}
                        {/*<option value="false">내림차순</option>*/}
                        {/*</select>*/}
                        <select className="s-date" value={this.state.s_date} onChange={this.handleChangeDate}>
                            <option value="1">2019-02-01</option>
                            <option value="2">2019-02-02</option>
                            <option value="3">2019-02-03</option>
                            <option value="4">2019-02-04</option>
                            <option value="5">2019-02-05</option>
                            <option value="6">2019-02-06</option>
                            <option value="7">2019-02-07</option>
                            <option value="8">2019-02-08</option>
                            <option value="9">2019-02-09</option>
                            <option value="10">2019-02-10</option>
                            <option value="11">2019-02-11</option>
                            <option value="12">2019-02-12</option>
                            <option value="13">2019-02-13</option>
                            <option value="14">2019-02-14</option>
                            <option value="15">2019-02-15</option>
                            <option value="16">2019-02-16</option>
                            <option value="17">2019-02-17</option>
                            <option value="18">2019-02-18</option>
                            <option value="19">2019-02-19</option>
                            <option value="20">2019-02-20</option>
                            <option value="21">2019-02-21</option>
                            <option value="22">2019-02-22</option>
                            <option value="23">2019-02-23</option>
                            <option value="24">2019-02-24</option>
                            <option value="25">2019-02-25</option>
                            <option value="26">2019-02-26</option>
                            <option value="27">2019-02-27</option>
                            <option value="28">2019-02-28</option>
                        </select>
                    </div>
                    <GrapheRankDraw rank={this.state.rank}/>
                </div>
            );
        }
    }
}

export default GrapheRank;