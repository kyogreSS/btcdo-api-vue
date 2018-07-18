const func = {}
import {Decimal} from 'decimal.js'

func.testFunc = function () {
  console.warn('test!')
}


// 加法
func.accAdd = function (num1, num2) {
  return Decimal.add(num1, num2).toString()
}
// 乘法
func.accMul = function (num1, num2) {
  return Decimal.mul(num1, num2).toString()
}

// 减法
func.accSub = function (num1, num2) {
  return Decimal.sub(num1, num2).toString()
}

// 除法
func.accDiv = function (num1, num2) {
  return Decimal.div(num1, num2).toString()
}

// 取平均数
func.getAverage = function (num1, num2) {
  return (Decimal.add(num1, num2).div(2)).toString()
}


// 精度处理不保留四舍五入，只舍弃，不进位
func.accFixed = function (num, acc) {
  if (isNaN(num)) return (0).toFixed(acc)
  let number = Number(func.accDiv(new Decimal(func.accMul(num, Math.pow(10, acc))).floor(), Math.pow(10, acc)))
  return number.toFixed(acc)
}


//格式化时间年-月-日  时：分：秒
func.formatDateUitl = function (time, formatString, offset = 8) {

  var pad0 = function (num, n) {
    var len = num.toString().length;
    while (len < n) {
      num = "0" + num;
      len++;
    }
    return num;
  }

  // time += (3600000 * offset)

  var myDate = new Date(time);

  formatString = formatString.replace('yy', myDate.getYear())
  console.log()
  formatString = formatString.replace('YYYY', myDate.getFullYear())
  formatString = formatString.replace('MM', pad0(myDate.getMonth() + 1, 2))
  formatString = formatString.replace('DD', pad0(myDate.getDate(), 2))
  formatString = formatString.replace('hh', pad0(myDate.getHours(), 2))
  formatString = formatString.replace('mm', pad0(myDate.getMinutes(), 2))
  formatString = formatString.replace('ss', pad0(myDate.getSeconds(), 2))

  return formatString;
}


export default func
