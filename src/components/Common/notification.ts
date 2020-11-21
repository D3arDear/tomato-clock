const createNotification = (ifFinishedTomato: boolean) => {
  if (!("Notification" in window)) {
  } else if (Notification.permission === "granted") {
    new Notification(
      ifFinishedTomato ? "您已经完成了一个番茄时间" : "您已经休息了 5 分钟",
      {
        lang: "zh-CN",
      }
    );
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification(
          ifFinishedTomato ? "您已经完成了一个番茄时间" : "您已经休息了 5 分钟",
          {
            lang: "zh-CN",
          }
        );
      }
    });
  }
};

export { createNotification };
