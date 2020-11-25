const notificationBody = (ifFinishedTomato: boolean) => {
  new Notification("番茄闹钟", {
    lang: "zh-CN",
    body: ifFinishedTomato ? "您已经完成了一个番茄时间" : "您已经休息了 5 分钟",
  });
};
const createNotification = (ifFinishedTomato: boolean) => {
  if (!("Notification" in window)) {
  } else if (Notification.permission === "granted") {
    notificationBody(ifFinishedTomato);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        notificationBody(ifFinishedTomato);
      }
    });
  }
};

export { createNotification };
