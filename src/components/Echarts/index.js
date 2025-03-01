import { Divider  } from "antd";
import axios from "axios";
import React, { useEffect, useRef } from "react";


//echarts configure
const axisOption = {
    // text color
    textStyle: {
      color: "#333",
    },
    // reminder
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", 
      data: [],
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
      axisLabel: {
        interval: 0,
        color: "#333",
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
      },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
  }
  
  const normalOption = {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#0f78f4",
      "#dd536b",
      "#9462e5",
      "#a6a6a6",
      "#e1bb22",
      "#39c362",
      "#3ed1cf",
    ],
    series: [],
  }
  
  const Echarts = ({style, chartData, isAxisChart = true}) => {
    //get dom instance
    const echartRef = useRef();
    useEffect(() => {
        let options;
        //echarts initilize
        myChart = echarts.init(echartRef.current);
        //set option
        if(isAxisChart){
            axisOption.xAxis.data = chartData.xData
            axisOption.series = chartData.series;
            options = axisOption
        } else{
            normalOption.series = chartData.series
            options = normalOption
        }
        myChart.setOption(options)
    }, [chartData])
    return(
        <div style={style} ref={echartRef}></div>
        
    )
  }

  export default Echarts