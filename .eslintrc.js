// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'indent': [0, 2],
    //禁止使用多余的圆括号
    // "no-extra-parens": 1,
    // 箭头函数参数是否必须用括号包裹
    'arrow-parens': 0,
    //禁止多余的冒号
    "no-extra-semi": 2,
    //禁止重复的函数声明
    "no-func-assign": 2,
    //禁止在块语句中声明变量或函数
    "no-inner-declarations": 2,
    //全都需要{ }包围
    "curly": 2,
    //所有的switch语句都必须要有一个default分支
    "default-case": 2,
    //警告非4个空格缩进
    //该规则规定了在对象字面量语法中key和value之间的空白，冒号前不要留空格，冒号后面需留一个空格
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
    //警告混用tab制表符和空格
    "no-mixed-spaces-and-tabs": 1,
    //警告未使用但以声明的变量
    "no-unused-vars": [1, { "vars": "all", "args": "none" }],
    //字符串必须用单引号包裹
    "quotes": [2, "single", "avoid-escape"],
    //无分号时提示
    "semi": [1, "never"],
    //{}前必须一个单空格
    "space-before-blocks": [2, "always"],
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
