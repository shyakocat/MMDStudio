'use strict';
const electron=require('electron');
const {app,Menu}=electron;
const BrowserWindow=electron.BrowserWindow;
let mainWindow;

var template=[
    {
        label:"功能",
        submenu:[
            {label:"开发者工具",accelerator:"CmdOrCtrl+F12",click:()=>mainWindow.toggleDevTools()},
            {label:"退出",accelerator:"CmdOrCtrl+Q",click:()=>app.quit()}
        ]
    }
];

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin')app.quit();
});
app.on('ready',()=>{
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    mainWindow=new BrowserWindow();
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed',()=>mainWindow=null);
});
app.on('will-quit',()=>{
    globalShortcut.unregisterAll();
});