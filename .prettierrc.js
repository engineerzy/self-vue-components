module.exports = {
	"printWidth": 100, // 句子超过最大值换行
  "trailingComma": "all",  // 对象最后一个属性也会加上都好
  "tabWidth": 2, // 缩进大小
  "semi": true, // 是否在一行末尾添加分号
  "singleQuote": true, // 是否单引号
  "jsxSingleQuote": true , // 在jsx语法中是否启用单引号
  "endOfLine": "lf", // 换行符
  "useTabs": false, // 是否使用tab缩进
  "bracketSpacine": true, // 对象属性打上空格 {a:1,b:1} => { a: 1, b: 1 }
  "arrowParens": "avoid", // 箭头函数的参数是否有括号 avoid: 当参数只有一个时，没有括号。当参数没有或者多个时，有括号。always: 总是有括号;
  "jsxBracketSameLine": true // 是否将jsx闭合标签 > 放在最后一行末尾，而不是单独起一行；
}