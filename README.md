# Tohken Ranbu Helper
## 介绍
Chrome插件一枚，目前有计划移植到nw.js

## 功能
* 疲劳度查看以及疲劳演算
* 远征，损坏提醒
* 锻刀和捞刀结果预知

## 目录结构
```
src─┐
    │  manifest.json
    │
    ├─assets
    │  │  bgs.png                     # 右下角的背景
    │  │  icon.png                    # 图标
    │  │  icon_128.png                # 图标
    │  │  sakura.png                  # 樱花
    │  │  # 存放资源的目录
    │  └─sword
    |     sword_id.png                # 刀纹
    │     # 存放刀纹的目录
    ├─devtools
    │  │  devtools.html
    │  │  devtools.js
    │  │
    │  └─panel
    │      │  index.jade              # 面板宿主
    │      │
    │      ├─app
    │      │      app.coffee          # Vue构造，主体部分
    │      │      config.coffee       # 默认的设置
    │      │      data.coffee         # 默认的数据
    │      │      define.coffee       # 定义静态数据
    │      │      event.coffee        # 休息时的疲劳计算
    │      │      inject.coffee       # 页面注入，负责推送通知
    │      │      log.coffee          # 暂无作用
    │      │      parse.coffee        # 解析和填充数据
    │      │      router.coffee       # 数据包路由
    │      │      store.coffee        # 储存部分的封装
    │      │      view.coffee         # 默认的视图数据
    │      │
    │      ├─assets
    │      │      base.less
    │      │      index.less
    │      │      main.less
    │      │      party-item.less
    │      │      # 样式
    │      └─template
    │              about.jade         # 关于
    │              config.jade        # 设置
    │              forge_rep.jade     # 本丸
    │              logs.jade          # 记录
    │              party_item.jade    # 队伍
    │              # 面板
    ├─popup
    │      container.html
    │      popup.coffee
    │      popup.html
    │      resize.coffee
    │      # 暂时弃用的部分
    └─thirdparty
            FileSaver.js
            jquery.js
            livereload.js
            lodash.js
            vue.js
            # 第三方库
```
## 运行机理
```coffee
  # line 35~:  /src/devtools/panel/app/app.coffee
  ready: ->
    # Listen the network request
    chrome.devtools.network.onRequestFinished.addListener (request)=>
      # filter
      tohken = request.request.url.match /http:\/\/(.*?)\.touken-ranbu\.jp\/(.*)/
      if tohken != null
        # throw static
        return if tohken[1] == "static"
        # pass
        @route(request, tohken[2])
```
利用Chrome Devtools API来监听符合条件的网络通讯并将数据传至路由组件。

解析并将处理后的数据传递至view模型中。

通过Vue.js的数据绑定机制来更新视图
## License
CC0 1.0 Universal
