<template>
    <div class="home">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div id="echartsDemo1" style="height:400px;"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div id="echartsDemo2" style="height:400px;"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图和饼形图
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
// 引入提示框和标题组件和
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");

export default {
    name: "home",
    data() {
        return {
            member: 50,
            option1: {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: 10,
                    data: ["现金", "微信", "支付宝", "银行卡"]
                },
                series: [
                    {
                        name: "支付类型",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "30",
                                    fontWeight: "bold"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            { value: 310, name: "现金" },
                            { value: 234, name: "微信" },
                            { value: 135, name: "支付宝" },
                            { value: 1548, name: "银行卡" }
                        ]
                    }
                ]
            },
            option2: {
                title: {
                    text: "ECharts 入门示例"
                },
                tooltip: {},
                legend: {
                    data: ["销量"]
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            }
        };
    },
    mounted() {
        this.drawLine1();
        this.drawLine2();
    },
    computed: {
        ...mapGetters(["getMemberList"])
    },
    methods: {
        drawLine1() {
            const myChart1 = echarts.init(
                document.getElementById("echartsDemo1")
            );
            myChart1.setOption(this.option1);
        },
        drawLine2() {
            const myChart2 = echarts.init(
                document.getElementById("echartsDemo2")
            );
            myChart2.setOption(this.option2);
        }
    }
};
</script>

<style lang='scss' scoped>
h1 {
    text-align: center;
    font-size: 30px;
    margin-top: 30px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>