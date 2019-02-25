import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';

export default class Echart extends Component{
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('main'));
        let malecount = 0;
        this.props.Ddata.map(
            (item,index) => {
                if(item.profile.gender == 'male'){
                    malecount++
                }
            }
        )
        myChart.setOption({
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['男性医生','女性医生']
            },
            series : [
                {
                    name: '男女医生比例',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:malecount, name:'男性医生:'+malecount},
                        {value:(this.props.Ddata.length-malecount), name:'女性医生:'+(this.props.Ddata.length-malecount)},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    }
    render() {
        return (
            <div>
                <div id="main" style={{ width: '100%', height: 400 }}></div>
                <p style={{ width:'100%',textAlign:'center'}}>图表显示医生名单中男女比例</p>
            </div>
            
        );
    }
}