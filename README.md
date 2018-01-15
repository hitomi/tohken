# Tohken Ranbu Helper
## 介绍
Chrome插件一枚，总而言之多年之后经历了大规模重构

## 功能
* 疲劳度查看以及疲劳演算
* 远征，损坏提醒
* 锻刀和捞刀结果预知

## 运行机理
利用Chrome Devtools API来监听符合条件的网络通讯并将数据传至路由组件。

解析并将处理后的数据传递至view模型中。

通过Vue.js的数据绑定机制来更新视图

## 参考资料
https://developer.chrome.com/extensions/api_index

https://lodash.com/docs

http://vuejs.org/

https://github.com/eligrey/FileSaver.js

## License
CC0 1.0 Universal