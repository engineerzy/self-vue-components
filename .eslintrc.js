module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    //禁止使用alert confirm prompt
		"no-alert": 0,
		//禁止修改const声明的变量
		"no-const-assign": 2,
		// 禁止使用eval
		"no-eval": 2,
		//禁用var定义变量
		"no-var": 2,
		// 必须使用全等
		"eqeqeq": 2,
		// 禁止 function 定义中出现重名参数
		"no-dupe-args": 2,
		// 禁止对象字面量中出现重复的 key
		"no-dupe-keys": 2,
		// 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
		"no-empty-function": 2,
		// 禁止出现未使用过的变量 
		"no-unused-vars": [1, {"vars": "all", "args": "none"}]
  }
};

