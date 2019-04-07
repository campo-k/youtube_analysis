import React, { Component } from 'react';
import GrapheTimeDraw from './graphe_time_draw'


class GrapheTime extends Component {
    state = {
        time: [],
        clip: [],
        s_clip: null,
        s_yMax: null,
        s_sDate: null,
        s_eDate: null,
        s_switch: null,
        s_variable: null,
    };

    componentDidMount() {
        this.setState({
            time: this.props.time,
            clip: this.props.clip.sort((a,b) => {
                    if (a.id.toUpperCase() > b.id.toUpperCase()) return 1; else return -1}
                ),
            s_clip: "7m+xuexdi5rd29$+hk&%6",
            s_yMax: 0,
            s_sDate: 1,
            s_eDate: 28,
            s_switch: false,
            s_variable: 2,
        });
    }
    fetchData = (param, args) => {
        var $ele = document.getElementsByClassName("graphe-progress")[0];
        var data = args;

        $ele.style.width = (window.innerWidth < 1440 ? (window.innerWidth - 16) : ((window.innerWidth) / 2 - 12)) + "px";
        $ele.style.display = "block";
        fetch('http://127.0.0.1:8000/api/dashboard/time/' + param)
            .then(res =>
                res.json()
            )
            .then(json => {
                $ele.style.display = "none";
                data.time = JSON.parse(json);
                this.setState(data);
            })
            .catch(error=> {
                console.log(error);
                alert("데이터 수집에 실패하였습니다.\r\n다시 시도하여 주십시오.");
            });
    };
    handleChangeSwitch = (e) => {
        this.setState({
            s_switch: (e.target.value === "true")
        });
    };
    handleClickSwitch = (e) => {
        var ele = document.getElementsByClassName("s-clip-multi")[0];

        for (var i = 0; i < ele.classList.length; i++) {
            if (ele.classList[i] == "s-clip-milti-show") {
                ele.classList.remove("s-clip-milti-show");
                return;
            }
        }
        ele.classList.add("s-clip-milti-show");
    };
    handleChangeClip = (e) => {
        var c = "";
        var t = e.target;
        var v = this.state.s_variable;
        var s = this.state.s_sDate;
        var d = this.state.s_eDate;

        console.log(t);
        if (t.selectedOptions.length > 10) return alert("10개 이상은 조회할 수 없습니다.");
        if (!t.classList.contains("s-clip-multi")) c = t.value;
        else
        {
            for (var i = 0; i < t.length; i++) {
                if (t[i].selected) c += (!c ? t[i].value : "*" + t[i].value);
            }
        }

        var sDate = "2019-02-" + (s > 9 ? s : "0"+ s);
        var eDate = "2019-02-" + (d > 9 ? d : "0"+ d);
        var param = c + "?va=" + v + "&sD=" + sDate + "&eD=" + eDate;

        this.fetchData(param, {s_clip: c});
    };
    handleChangeVariable = (e) => {
        var c = this.state.s_clip;
        var v = e.target.value;
        var s = this.state.s_sDate;
        var d = this.state.s_eDate;
        var sDate = "2019-02-" + (s > 9 ? s : "0"+ s);
        var eDate = "2019-02-" + (d > 9 ? d : "0"+ d);
        var param = c + "?va=" + v + "&sD=" + sDate + "&eD=" + eDate;

        this.fetchData(param, {s_variable: v});
    };
    handleChangeDate = (e) => {
        var t = e.target;
        var c = this.state.s_clip;
        var v = this.state.s_variable;
        var s = this.state.s_sDate;
        var d = this.state.s_eDate;

        if (t.className === 's-sDate') s = t.value;
        if (t.className === 's-eDate') d = t.value;

        if (d - s < 14) return alert("15일 이내로는 조회 할 수 없습니다.");
        else if (d < s) return alert("시작일이 더 클 수 없습니다.");

        var sDate = "2019-02-" + (s > 9 ? s : "0"+ s);
        var eDate = "2019-02-" + (d > 9 ? d : "0"+ d);
        var param = c + "?va=" + v + "&sD=" + sDate + "&eD=" + eDate;
        var _args = t.className === 's-sDate' ? {s_sDate: s} : {s_eDate: d};

        this.fetchData(param, _args);

        console.log(s+"/"+d)
    };
    handleBlurInput = (e) => {
        this.setState({ s_yMax: (!e.target.value ? 0 : parseInt(e.target.value)) });
    };
    handleKeyInput = (e) => {
        if (e.keyCode == 13) e.target.blur();
    };

    render() {
        if (!this.state.time.length) return (<div></div>);
        else {
            return (
                <div className="graphe-time col">
                    <div><h3><u>Time series chart</u></h3></div>
                    <div className="graphe-progress"><i className="fas fa-spinner fa-3x fa-spin"></i></div>
                    <div className="s-select">
                        <select className="s-switch" value={this.state.s_switch} onChange={this.handleChangeSwitch}>
                            <option value={false}>단일 선택</option>
                            <option value={true}> 복수 선택</option>
                        </select>
                        { this.state.s_switch ? <div className="s-clip-div" onClick={this.handleClickSwitch}>복수 선택</div> : "" }
                        <select className={this.state.s_switch ? "s-clip s-clip-multi" : "s-clip"}
                                multiple={this.state.s_switch}
                                onChange={this.handleChangeClip}>
                            {this.state.s_switch ? "" : <option value="7m+xuexdi5rd29$+hk&%6">전체 누적</option>}
                            {this.state.clip.map(item => (
                                <option key={item.id} value={item.id}>{item.id}</option>
                            ))}
                        </select>
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
                        <select className="s-sDate" value={this.state.s_sDate} onChange={this.handleChangeDate}>
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
                        <select className="s-eDate" value={this.state.s_eDate} onChange={this.handleChangeDate}>
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
                        <input className="s-yMax" placeholder="y 최대값" onBlur={this.handleBlurInput} onKeyUp={this.handleKeyInput} />
                    </div>
                    <GrapheTimeDraw time={this.state.time} yMax={this.state.s_yMax} />
                </div>
            );
        }
    }
}

export default GrapheTime;