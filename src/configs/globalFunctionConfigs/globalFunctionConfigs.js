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


export default func
