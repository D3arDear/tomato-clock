const notification = new Notification("您已经完成了一个番茄时间", {
  lang: "zh-CN",
});

const notificationPermission = () => {
  function notifyMe() {
    if (!("Notification" in window)) {
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
        }
      });
    }
  }
};
