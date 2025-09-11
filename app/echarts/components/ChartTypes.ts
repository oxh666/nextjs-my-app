// 图表类型定义和配置
export interface ChartOption {
  title: { text: string };
  tooltip?: any;
  xAxis?: any;
  yAxis?: any;
  series: any[];
  [key: string]: any;
}

// 预定义的图表配置
export const CHART_OPTIONS: ChartOption[] = [
  {
    title: { text: 'BarChart' },
    tooltip: {},
    xAxis: { data: ['A', 'B', 'C', 'D', 'E', 'F'] },
    yAxis: {},
    series: [{ name: 'Sales', type: 'bar', data: [5, 20, 36, 10, 10, 20] }]
  },
  {
    title: { text: 'LineChart' },
    tooltip: {},
    xAxis: { data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yAxis: {},
    series: [{ name: 'Revenue', type: 'line', data: [15, 30, 46, 20, 15, 30] }]
  },
  {
    title: { text: 'PieChart' },
    tooltip: { trigger: 'item' },
    series: [
      {
        name: 'Access Source',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  },
  {
    title: { text: 'ScatterChart' },
    tooltip: {},
    xAxis: {},
    yAxis: {},
    series: [
      {
        name: 'Scatter',
        type: 'scatter',
        data: [
          [10, 8],
          [15, 20],
          [20, 15],
          [25, 30],
          [30, 25]
        ]
      }
    ]
  },
  {
    title: { text: 'RadarChart' },
    tooltip: {},
    radar: {
      indicator: [
        { name: 'Metric1', max: 100 },
        { name: 'Metric2', max: 100 },
        { name: 'Metric3', max: 100 },
        { name: 'Metric4', max: 100 },
        { name: 'Metric5', max: 100 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [80, 90, 70, 85, 95],
            name: 'Allocated Budget'
          }
        ]
      }
    ]
  },
  {
    title: { text: 'AreaChart' },
    tooltip: {},
    xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: {},
    series: [
      {
        name: 'Temperature',
        type: 'line',
        areaStyle: {},
        data: [22, 24, 19, 23, 25, 27, 28]
      }
    ]
  },
  {
    title: { text: 'CandlestickChart' },
    tooltip: { trigger: 'axis' },
    xAxis: { data: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'] },
    yAxis: {},
    series: [
      {
        name: 'Candlestick',
        type: 'candlestick',
        data: [
          [20, 30, 10, 35],
          [40, 35, 32, 55],
          [33, 38, 33, 40],
          [40, 40, 32, 42],
          [30, 32, 28, 35]
        ]
      }
    ]
  }
];
