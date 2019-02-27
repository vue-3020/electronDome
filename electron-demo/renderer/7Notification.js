  var btn4 = document.querySelector('#btn4');

  btn4.onclick = function() {
      //   var option2 = {
      //       title: 'electron 通知',
      //       body: 'electron跨平台软件开发教程更新了'
      //   }

      //   //h5弹窗
      //   var myNotification = new window.Notification(option2.title, option2);
      //   console.log(Notification.permission);
      //   myNotification.onclick = function() {

      //       console.log('点击了');
      //   }

      var notification = new Notification("Hi，", {
          body: '可以加你为好友吗？',
      });
      notification.onclick = function() {
          notification.close();
      };
  }


  //监听网络变化实现通知

  window.addEventListener('online', function() {
      console.log('有网络了');
  })

  window.addEventListener('offline', function() {
      console.log('无网络了');
      //其他参数查询Notification文档
      var option = {
          title: '网易邮箱',
          body: '网络异常,请检查您的网络'
      }

      var myNotification = new window.Notification(option.title, option);

      myNotification.onclick = function() {

          console.log('点击了');
      }

  })