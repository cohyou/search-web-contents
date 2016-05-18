// var ipc = require('ipc');
var ipcRenderer = require('electron').ipcRenderer;
console.log('yeah!!');
ipcRenderer.on('retrieveUnreadCount', function(){
    console.log('retrieveUnreadCount')
  var unreadCount = document.getElementsByTagName("body")[0].innerHTML;
  console.dir('unreadCount: ' + unreadCount);
  // ipc.sendToHost('retrieveUnreadCount', unreadCount);
});
