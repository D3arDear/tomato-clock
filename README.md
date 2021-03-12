# Tomato-Clock

这是一个基于 React 的线上番茄闹钟应用
[Pomodoro Technique](https://zh.wikipedia.org/zh-hans/%E7%95%AA%E8%8C%84%E5%B7%A5%E4%BD%9C%E6%B3%95) 能不能提升效率有待验证，有效缓解眼疲劳我倒是验证了。

## 预览

[Tomato-Clock](https://tomato.zealot.fun)

## 实现功能

1. 用户系统
   - 用户注册、登录、鉴权
   - 注册登录错误反馈
2. 番茄闹钟
   - 25 分钟定时闹钟，休息 5 分钟
   - 完成番茄时间和休息时间后使用`serviceWorker.showNotification`推送提示
3. todoList
   - 番茄时间内完成的任务自动添加到该番茄时间的描述中
   - 任务可删改可恢复
4. 数据统计
   - 番茄历史统计、任务统计
     - 统计总计、月平均数、月增长数，折线图形式表达
     - 最佳工作日( 柱状图 )，最佳工作时间( 饼图 )
   - 番茄历史
     - 每日已完成番茄时间、打断的番茄时间的记录( 可恢复，可删除 )
     - 补记番茄( 选择起始时间结束时间，输入番茄时间描述 )
     - 日期选择器显示时间范围内的任务
   - 任务历史
     - 每日已完成任务、删除的任务的记录( 可恢复，可删除 )
     - 日期选择器显示时间范围内的任务

## 技术栈

### 前端：

- create-react-app 构建项目； mbox 状态管理；基本使用 hooks
- 使用 Svg 构建图表（柱状图:`<rect>` 折线图 `<polygon>` 饼图 `<circle>` `<line>` `<path>` ）
- 使用简单的 `serviceWorker` 实现倒计时结束推送
- axios interceptors 存取 token

### 后端：

我还在研究怎么脱敏，敏感信息放在环境变量里恐怕有点不安全

- 使用 Nest.js 构建 api 服务器
- mongoose 驱动 mongodb
- 鉴权方式： JWT + salt

### 部署：

- 前后端分离 docker 部署，通过 bridge( [user-defined bridge](https://docs.docker.com/network/bridge/#manage-a-user-defined-bridge) ) 通信
- 前端通过 nginx 容器 + 一层 nginx-proxy 容器(反向代理) + ssl 访问
- 后端本身 docker 化，通过 bridge 与 db-docker 通信。自身接口通过 bridge 暴露给前端 nginx 容器，最后以前端 nginx 容器经由 nginx-proxy 反向代理实现接口访问

层级结构：

```
---proxy-docker
    |
    | bridge
    |
    |---tomato-nginx
          |
          | bridge
          |
          |--tomato-clock
          |
          |--tomato-server
              |
              | bridge
              |
            db-docker
```
