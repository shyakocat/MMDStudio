const fs=require('fs');
function setCanvas(canvas){
    gl=canvas.getContext("experimental-webgl",{preserveDrawingBuffer:true});
}
function saveCanvas(canvas,url,callback=()=>{}){
    let buf=Buffer.from(canvas.toDataURL().replace(/^data:image\/\w+;base64,/,""),'base64');
    fs.writeFile(url,buf,function(err){if(err)console.log(err);callback();});
}
function saveCanvasSync(canvas,url){
    let buf=Buffer.from(canvas.toDataURL().replace(/^data:image\/\w+;base64,/,""),'base64');
    fs.writeFileSync(url,buf);
}
function loadCanvas(canvas,url,callback=()=>{}){
    let img=new Image();
    img.src=url;
    img.onload=function(){canvas.getContext("2d").drawImage(img,0,0);callback();}
}

module.exports={
    setCanvas,
    saveCanvas,
    loadCanvas,
    saveCanvasSync
};