vite模板项目
搭建步骤
1. pnpm create vite
2. 选择 react18+ts
3. pnpm install && pnpm run dev启动

项目配置
1. 新增开发常用库，dependencies
   1. lodash - 函数式编程
   2. ahooks - react hooks库
   3. antd v4 - 组件库
   4. axios - 网络请求
   5. classnames - 类名合并
```bash
pnpm add lodash ahooks antd@4.x axios classnames --save
```
2. devDependencies
   1. preitter - 代码格式化
      1. 新增配置文件.prettierrc.js
   2. @types/node - node类型定义
```bash
pnpm add prettier @types/node --save-dev
```
3. 别名配置
   1. alias - 别名配置vite.config.js
      
4. 