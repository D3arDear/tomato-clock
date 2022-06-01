const isPushNotificationSupported = () => {
  return "serviceWorker" in navigator && "PushManager" in window;
};
const askUserPermission = async () => {
  return await Notification.requestPermission();
};

function sendNotification(ifFinishedTomato: boolean) {
  const title = "番茄闹钟";
  const options = {
    lang: "zh-CN",
    icon: "/logo512.png",
    body: ifFinishedTomato ? "您已经完成了一个番茄时间" : "您已经休息了 5 分钟",
  };
  navigator.serviceWorker.ready.then(function (serviceWorker) {
    serviceWorker.showNotification(title, options);
  });
}

const createNotification = (ifFinishedTomato: boolean) => {
  if (isPushNotificationSupported()) {
    navigator.serviceWorker.register("/service-worker.ts");
    Notification.requestPermission((result) => {
      if (result === "granted") {
        sendNotification(ifFinishedTomato);
      } else {
        askUserPermission().then((consent) => {
          if (consent === "granted") {
            sendNotification(ifFinishedTomato);
          }
        });
      }
    });
  }
};

// if (!("Notification" in window)) {
// } else if (Notification.permission === "granted") {
//   sendNotification(ifFinishedTomato);
// } else if (Notification.permission !== "denied") {
//   Notification.requestPermission().then(function (permission) {
//     if (permission === "granted") {
//       sendNotification(ifFinishedTomato);
//     }
//   });
// }

export { createNotification };
