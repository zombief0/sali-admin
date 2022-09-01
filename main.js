const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

function onReady () {
  win = new BrowserWindow({width: 900, height: 670, backgroundColor: 'white'})
  win.loadURL(url.format({
    pathname: path.join(
      __dirname,
      'dist/sali-admin/index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', onReady);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin'){
    app.quit();
  }
})
