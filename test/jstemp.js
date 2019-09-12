var NInput = document.getElementById("N")
var btn = document.getElementById("btn");
var N = 100;
btn.addEventListener("click", () => {
  N = NInput.value;
  draw()
})
var constant = echarts.init(document.getElementById('constant'));
var logarithm = echarts.init(document.getElementById('logarithm'));
var linear = echarts.init(document.getElementById('linear'));
var loglinear = echarts.init(document.getElementById('log-linear'));
var square = echarts.init(document.getElementById('square'));
var cube = echarts.init(document.getElementById('cube'));
var exponent = echarts.init(document.getElementById('exponent'));

function draw() {
  // 基于准备好的dom，初始化echarts实例

  let xdata = []
  let ydata = []
  for (let i = 0; i < N; i += 10) {
    xdata.push(i);
    ydata.push(1);
  }

  let baseOption = {
    xAxis: {
      data: xdata,
    },
    yAxis: {
      max: function (value) {
        return value.max + 2;
      },
    },
    series: [{
      data: ydata,
      type: 'line'
    }]
  };
  constant.setOption(baseOption);
  xdata = []
  ydata = []
  for (let i = 1; i < N; i += 10) {
    xdata.push(i);
    ydata.push(Math.log10(i));
  }
  let logarithmOption = setXY(xdata, ydata)
  logarithm.setOption(logarithmOption);

  xdata = []
  ydata = []
  for (let i = 1; i < N; i + 10) {
    xdata.push(i);
    ydata.push(i);
  }
  let linearOption = setXY(xdata, ydata)
  linear.setOption(linearOption);


  xdata = []
  ydata = []
  for (let i = 1; i < N; i += 10) {
    xdata.push(i);
    ydata.push(i * Math.log10(i));
  }
  let loglinearOption = setXY(xdata, ydata)

  loglinear.setOption(loglinearOption);
  square.setOption(baseOption);
  cube.setOption(baseOption);
  exponent.setOption(baseOption);


}


function setXY(xdata, ydata) {
  return {
    xAxis: {
      data: xdata,
    },
    yAxis: {
      max: function (value) {
        return value.max + 2;
      },
    },
    series: [{
      smooth: true,
      data: ydata,
      type: 'line'
    }]
  };
}
draw()