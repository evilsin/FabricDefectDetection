var myColor = ['#27727B','#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD','#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0','#C1232B','#B5C334','#FCCE10','#E87C25'];

var imageDom = new Image();
imageDom.src = '../../images/chartBack.jpg';

$(function(){

    $(".p_chart").height($(".chart_shell").height()-30);
    $(".p_chart").width($(".chart_shell").width()-22);

    initChart1();
    initChart2();
    initChart3();
    initChart4();
    initChart5();
    initChart6();
    initChart7();
    initChart8();

})

//处方监管
function initChart1(){

    var chart1 = echarts.init(document.getElementById('chart1'));
    chart1.setOption({
        grid: {
            top: '20',
            left: '120',
            right:'60',
            bottom: '20',
        },
        xAxis: {
            show: false
        },
        yAxis: [{
            triggerEvent:true,
            data:  ['厦门第一医院','厦门中山医院','厦门中医院','厦门第五医院'],
            inverse: true,
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#034c6a',
                formatter: (function(value, index) {
                    return [
                        "{lg|"+(index+1)+"}" +"{title|"+value+"}"
                    ].join('\n')
                }),
                rich: {
                    lg: {
                        backgroundColor: '#339911',
                        color: '#034c6a',
                        borderRadius: 15,
                        // padding: 5,
                        align: 'center',
                        width: 15,
                        height: 15
                    },
                }
            },
        }, {
            show: true,
            inverse: true,
            data: [4000, 3000, 2000, 1000],
            axisLabel: {
                textStyle: {
                    fontSize: 12,
                    color: '#034c6a',
                },
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },

        }],
        series: [{
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: [40, 30, 20, 10],
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 20,
                    color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                },
                emphasis : {
                    borderColor: 'red',
                    borderWidth: 2,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}%'
                },
            },
        }, {
            name: '框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [100, 100, 100, 100],
            barWidth: 15,
            itemStyle: {
                normal: {
                    color: 'none',
                    borderColor: '#00c1de',
                    borderWidth: 3,
                    barBorderRadius: 15,
                }
            }
        }, ]
    })
    chart1.on('click', function(param) {
        if(param.componentType =="yAxis" || param.componentType =="xAxis" ){
            console.log(param.value);
        }else{
            console.log(param.name);
        }
    });
}

//当日门诊量
function initChart2(){
    var chart2 = echarts.init(document.getElementById('chart2'));
    chart2.setOption( {
        color:['#034c6a'],
        grid: {
            top: '60',
            left: '60',
            right:'20',
            bottom: '30',
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a}<br/>{b}<br/>{c}人"
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                triggerEvent:true,
                data : ['厦门第一医院','厦门中山医院','厦门中医院','厦门第五医院'],
                axisLine:{
                    lineStyle:{
                        color: '#034c6a'
                    },
                },
                axisLabel : {
                    show: false,
                    interval:0,
                    rotate:40,
                    textStyle: {
                        color: '#034c6a',
                        fontSize:13
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color: '#034c6a'
                    },
                },
                splitLine: {
                    "show": false
                },
                axisLabel: {
                    textStyle: {
                        color: '#034c6a'
                    },
                    formatter: function (value) {
                        return value + "人"
                    },
                },
            }
        ],
        series : [
            {  itemStyle: {
                    normal: {
                        color: function(params) {
                            return myColor[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    },
                    emphasis : {
                        borderColor: 'red',
                        borderWidth: 2,
                    }
                },
                name:'当日门诊量',
                type:'bar',
                barWidth:20,
                data:[6,8,7,5],
            },
        ]
    });
    chart2.on('click', function(param) {

        console.log(param.name);

    });
}

//年度门诊量
function initChart3(){
    var chart3 = echarts.init(document.getElementById('chart3'));
    chart3.setOption( {
        color:['#034c6a'],
        grid: {
            top: '20',
            left: '60',
            right:'20',
            bottom: '80',
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a}<br/>{b}<br/>{c}人"
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                triggerEvent:true,
                data : ['年度门诊量','厦门第一医院','厦门中山医院','厦门中医院','厦门第五医院'],
                axisLine:{
                    lineStyle:{
                        color: '#034c6a'
                    },
                },
                axisLabel : {
                    interval:0,
                    rotate:40,
                    textStyle: {
                        color: '#034c6a',
                        fontSize:13
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color: '#034c6a'
                    },
                },
                splitLine: {
                    "show": false
                },
                axisLabel: {
                    textStyle: {
                        color: '#034c6a'
                    },
                    formatter: function (value) {
                        return value + "人"
                    },
                },
            }
        ],

        series : [
            {
                name:'辅助',
                type:'bar',
                stack: '总量',
                itemStyle:{
                    normal:{
                        barBorderColor:'rgba(0,0,0,0)',
                        color:'rgba(0,0,0,0)'
                    },
                },
                data:[0, 1200, 900, 700, 0]
            },
            {
                name:'年度门诊量',
                type:'bar',
                stack: '总量',
                barWidth:20,
                itemStyle : {
                    normal: {
                        color: function(params) {
                            return myColor[params.dataIndex]
                        },
                        label : {show: true, position: 'inside'}
                    },
                    emphasis : {
                        borderColor: 'red',
                        borderWidth: 2,
                    }
                },
                data:[2600, 1400, 300, 200, 700]
            }
        ]

    });
    chart3.on('click', function(param) {
        if(param.componentType =="yAxis" || param.componentType =="xAxis" ){
            console.log(param.value);
        }else{
            console.log(param.name);
        }
    });
}

//机构上线日期
function initChart4(){

    var date =  ['2018-08-08','2018-09-09','2018-10-10','2018-11-11']


    var chart4 = echarts.init(document.getElementById('chart4'));
    chart4.setOption( {

        color:myColor,
        grid: {
            top: '60',
            left: '80',
            right:'20',

        },
        yAxis : [
            {
                type : 'category',
                // boundaryGap : false,
                data : date,
                axisLine:{
                    lineStyle:{
                        color: '#034c6a'
                    },
                },
                axisLabel : {
                    interval:0,
                    rotate:40,
                    textStyle: {
                        color: '#034c6a',
                        fontSize:13
                    }
                }
            }
        ],
        xAxis : {
            "show": false
        },
        calculable : true,
        series : [
            {
                name:'上线日期',
                type:'funnel',
                x: '80',
                y: 60,
                //x2: 80,
                y2: 60,
                width: '80%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort : 'descending', // 'ascending', 'descending'
                gap : 10,
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 1,
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        labelLine: {
                            show: false,
                            length: 10,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    emphasis: {
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            show: true,
                            formatter:function(param){
                                if(param.data){
                                    return param.data.name+":"+param.data.date;
                                }
                            },
                            textStyle:{
                                fontSize:20
                            }
                        },

                    }
                },
                data:[
                    {value:20, name:'厦门第一医院',date:"2018-08-08"},
                    {value:40, name:'厦门中山医院',date:"2018-09-09"},
                    {value:60, name:'厦门中医院',date:"2018-10-10"},
                    {value:80, name:'厦门第五医院',date:"2018-11-11"},
                ]
            }
        ]

    });
    chart4.on('click', function(param) {
        console.log(param.name);
    });
}

//安全监管
function initChart5(){
    var chart5 = echarts.init(document.getElementById('chart5'));
    chart5.setOption( {

        color:myColor,

        legend: {
            y : 'bottom',
            x : 'center',
            textStyle : {
                color : '#034c6a',

            },
            data : ['厦门第一医院','厦门中山医院','厦门中医院','厦门第五医院',],
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a}<br/>{b}<br/>{c}人 ({d}%)"
        },
        calculable : false,
        series : [
            {
                name:'安全监管',
                type:'pie',
                radius : ['35%', '65%'],
                center : ['50%', '50%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        borderColor: 'red',
                        borderWidth: 2,
                    }
                },
                data:[
                    {value:335, name:'厦门第一医院'},
                    {value:310, name:'厦门中山医院'},
                    {value:234, name:'厦门中医院'},
                    {value:135, name:'厦门第五医院'}

                ]
            }
        ]

    });
    chart5.on('click', function(param) {
        console.log(param.name);
    });
}

//医生资质监管
function initChart6(){
    var chart6 = echarts.init(document.getElementById('chart6'));
    chart6.setOption( {
        color:myColor,
        grid: {
            top: '20',
            left: '20',
            right:'20',
            bottom: '20',
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a}<br/>{b}<br/>{c}人"
        },
        calculable : true,
        series : [
            {
                name:'医生资质监管',
                type:'pie',
                radius : [30, '80%'],
                center : ['50%', '50%'],
                roseType : 'area',
                x: '50%',
                max: 40,
                sort : 'ascending',
                data:[
                    {value:10, name:'厦门第一医院'},
                    {value:5, name:'厦门中山医院'},
                    {value:15, name:'厦门中医院'},
                    {value:25, name:'厦门第五医院'},
                ],
                itemStyle :　{
                    normal : {
                        label : {
                            position : 'inner',
                            formatter:'{b} \n {c}',
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        borderColor: 'red',
                        borderWidth: 2,
                    }

                },
            }
        ]
    });
    chart6.on('click', function(param) {
        console.log(param.name);
    });
}

//药品物资监管
function initChart7(){
    var chart7 = echarts.init(document.getElementById('chart7'));
    chart7.setOption( {

        color:myColor,
        grid: {
            top: '20',
            left: '100',
            right:'20',
            bottom: '80',
        },
        legend: {
            data:['厦门第一医院','厦门中山医院','厦门中医院','厦门第五医院',],
            y: 'bottom',
            x:'center',
            textStyle:{
                color:'#034c6a',
                fontSize:12
            }
        },
        calculable :true,
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            }
        },

        xAxis : [
            {
                type : 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#034c6a'
                    }
                },
                splitLine:{
                    lineStyle:{
                        color:'#034c6a',
                        width:0,
                        type:'solid'
                    }
                }

            }
        ],

        yAxis : [
            {
                type : 'category',
                data:['药品销售额(元)', '药品销售额(元)'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#034c6a'
                    }
                },
                splitLine:{
                    lineStyle:{
                        width:0,
                        type:'solid'
                    }
                }
            }
        ],

        series : [
            {
                name:'厦门第一医院',
                type:'bar',
                stack: '总量',
                itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                data:[320, 302]
            },
            {
                name:'厦门中山医院',
                type:'bar',
                stack: '总量',
                itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                data:[120, 132]
            },
            {
                name:'厦门中医院',
                type:'bar',
                stack: '总量',
                itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                data:[220, 182]
            },
            {
                name:'厦门第五医院',
                type:'bar',
                stack: '总量',
                itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                data:[150, 212]
            }

        ]
    });
    chart7.on('click', function(param) {
        console.log(param.seriesName);
    });
}

//运行监管
function initChart8(){
    var chart8 = echarts.init(document.getElementById('chart8'));
    chart8.setOption( {
        color:myColor,
        grid: {
            top: '40',
            left: '60',
            right:'20',
            bottom: '80',
        },
        tooltip : {
            trigger: 'item',
            formatter: "运行监管<br/>{a}<br/>{b}:{c}次"
        },
        legend: {
            data:['厦门第一医院','厦门中山医院','厦门中医院','厦门第五医院',],
            y: 'bottom',
            x:'center',
            textStyle:{
                color:'#034c6a',
                fontSize:12
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日'],
                axisLine:{
                    lineStyle:{
                        color: '#034c6a'
                    },
                },
                axisLabel : {
                    interval:0,
                    rotate:40,
                    textStyle: {
                        color: '#034c6a',
                        fontSize:13
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color: '#034c6a'
                    },
                },
                splitLine: {
                    "show": false
                },
                axisLabel: {
                    textStyle: {
                        color: '#034c6a'
                    },
                    formatter: function (value) {
                        return value + "次"
                    },
                },
            }
        ],
        series : [
            {
                name:'厦门第一医院',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[120, 122, 221, 524, 460, 530, 610]
            },
            {
                name:'厦门中山医院',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[130, 682, 534, 691, 490, 130, 110]
            },
            {
                name:'厦门中医院',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[320, 132, 161, 134, 112, 190, 120]
            },
            {
                name:'厦门第五医院',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[320, 132, 461, 34, 202, 93, 222]
            }
        ]
    });
    chart8.on('click', function(param) {
        console.log(param.name);
        console.log(param.seriesName);
    });
}
