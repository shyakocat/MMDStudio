const fs=require('fs');
const path=require('path');
const {infoPmx,createPmx}=require('../Model/Pmx/PmxSh');
const {infoPmd,createPmd}=require('../Model/Pmd/PmdSh');
const {createObj}=require('../Model/Obj/ObjSh');
const {createX}=require('../Model/X/XSh');
const {setCanvas,saveCanvasSync}=require('./imgIO');

const dbfile='MMDStudioDB.json';
const defaultpic='Thumbnail/NotFound.png';

function loadDB(){
    if(!fs.existsSync(dbfile))
        fs.writeFileSync(dbfile,'{"Main":[]}');
    let res;
    try{res=JSON.parse(fs.readFileSync(dbfile).toString());}catch(e){console.log(e);}
    if(!res||!res.hasOwnProperty("Main")||!Array.isArray(res.Main))return {Main:[]};
    return res;
}

function saveDB(db){
    fs.writeFileSync(dbfile,JSON.stringify(db));
}

function sizeToString(s){
    if(!s)return null;
    if(s>>20>=1)return (s/1048576).toFixed(3)+'MB';
    if(s>>10>=1)return (s/1024).toFixed(3)+'KB';
    return s+'B';
}

function DBItem(){
    this.name=null;
    this.dir=null;
    this.comment=null;
    this.date=null;
    this.size=null;
    this.thumbnail=defaultpic;
}
DBItem.prototype.in=function(obj){
    this.name=obj["name"];
    this.dir=obj["dir"];
    this.comment=obj["comment"];
    this.date=obj["date"];
    this.size=obj["size"];
    this.thumbnail=obj["thumbnail"];
};
DBItem.prototype.create=function(url){
    var _this=this;
    if(!fs.existsSync(url))return null;
    let sta=fs.statSync(url);
    this.name=path.basename(url);
    this.dir=url;
    this.date=sta.birthtime;
    this.size=sta.size;
    function dealModel(url,suf,info,create){
        if(!new RegExp("\\"+suf+"$","i").test(url))return false;
        let t=info(url);
        if(t){_this.name=t.name;_this.comment=t.comment;}
        return true;
    }
    if(dealModel(url,'.pmx',infoPmx,createPmx))return;
    if(dealModel(url,'.pmd',infoPmd,createPmd))return;
    if(dealModel(url,'.obj',()=>null,createObj))return;
    if(dealModel(url,'.x',()=>null,createX))return;
};
DBItem.prototype.suf=function(p){
    let result=/(pmx|pmd|obj|x)$/i.exec(this.dir)[0];
    if(p)return '.'+result;
    return result;
};
DBItem.prototype.intro=function(){
    return "名称："+this.name+"\n"+
        //"路径："+this.dir+"\n"+
        "备注："+this.comment+"\n"+
        "体积："+sizeToString(this.size)+"\n";
};
DBItem.prototype.introhtml=function(){
    return "名称："+this.name+"<code>"+this.suf()+"</code><br/>"+
        "备注："+this.comment+"<br/>"+
        "体积："+sizeToString(this.size)+"<br/>";
};
DBItem.prototype.html=function(b){
    let tmp="<div class=\"card mb-4 shadow-sm\">\n\
                <button type=\"button\" class=\"close\" aria-hidden=\"true\" style=\"position:absolute;top:0;right:0;\"\
                onclick='itemRemove(itemMap.get(itemFather(this,2)))'>&times;</button>\
                <img width='100%' height='auto' src='"+this.thumbnail+"' alt='"+this.thumbnail+"'/>\n\
                <div class=\"card-body\">\n\
                    <p class=\"card-text\">"+this.introhtml()+"</p>\n\
                    <div class=\"d-flex justify-content-between align-items-center\">\n\
                        <div class=\"btn-group\">\n\
                            <button onclick='global_item=itemMap.get(itemFather(this,5));modalShow(global_item.dir,global_item.preview())' type=\"button\" class=\"btn btn-sm btn-outline-secondary\">预览</button>\n\
                            <button onclick='global_item=itemMap.get(itemFather(this,5));modalShow(global_item.dir,global_item.edit())' type=\"button\" class=\"btn btn-sm btn-outline-secondary\">编辑</button>\n\
                        </div>\n\
                        <small class=\"text-muted\">"+this.date.toLocaleString()+"</small>\n\
                    </div>\n\
                </div>\n\
             </div>\n";
    if(b)return tmp;
    return "<div class=\"col-md-4\">"+tmp+"</div>";
};
DBItem.prototype.preview=function(){
    global_item=this;
    global_url=this.dir;
    switch (this.suf()) {
        case "pmx":global_create=createPmx;break;
        case "pmd":global_create=createPmd;break;
        case "obj":global_create=createObj;break;
        case "x":global_create=createX;break;
        default:global_create=null;
    }
    //style="border:1px solid #c3c3c3;"
    return "<div align='center'>\
                <canvas id='glCanvas' width='512' height='512'></canvas>\
                <script>\
                    global_canvas=document.getElementById('glCanvas');\
                    if(global_item.suf()!=='obj')setCanvas(global_canvas);\
                    global_create(global_canvas,global_url,global_canvas);\
                </script>\
            </div>\
            <button onclick='\
                global_item.thumbnail=\"Thumbnail/\"+path.basename(global_url,global_item.suf(true))+Math.random()+\".png\";\
                saveCanvasSync(global_canvas,global_item.thumbnail);\
                itemMap.get(global_item).find(\"img\")[0].src=global_item.thumbnail;\
                saveDB(MMDStudioDB);' type=\"button\" class=\"btn btn-outline-primary\">截图</button>"
};
DBItem.prototype.edit=function(){
    global_item=this;
    return "<form  class=\"form-horizontal\" role=\"form\">\n\
                <div class=\"form-group\">\n\
                    <label for='name' class=\"col-sm-2 control-label\">名称</label>\n\
                    <div class=\"col-sm-10\">\n\
                        <input type=\"text\" class=\"form-control\" id=\"name\" value=\""+this.name+"\">\n\
                    </div>\n\
                </div>\n\
                <div class=\"form-group\">\n\
                    <label for='dir' class=\"col-sm-2 control-label\">路径</label>\n\
                    <div class=\"col-sm-10\">\n\
                        <input type=\"text\" class=\"form-control\" id=\"dir\" value=\""+this.dir+"\" readonly='readonly'>\n\
                    </div>\n\
                </div>\n\
                <div class=\"form-group\">\n\
                    <label for='comment' class=\"col-sm-2 control-label\">备注</label>\n\
                    <div class=\"col-sm-10\">\n\
                        <input type=\"text\" class=\"form-control\" id=\"comment\" value=\""+this.comment+"\">\n\
                    </div>\n\
                </div>\n\
                <div class=\"form-group\">\n\
                    <label for='thumbnail' class=\"col-sm-2 control-label\">图片</label>\n\
                    <div class=\"col-sm-10\">\n\
                        <input type=\"text\" class=\"form-control\" id=\"thumbnail\" value=\""+this.thumbnail+"\">\n\
                    </div>\n\
                </div>\n\
                <div class=\"form-group\">\n\
                    <div class=\"col-sm-offset-2 col-sm-10\">\n\
                        <button type=\"button\" onclick=\"\
                        global_item.name=$('#name').val();\
                        global_item.dir=$('#dir').val();\
                        global_item.comment=$('#comment').val();\
                        global_item.thumbnail=$('#thumbnail').val();\
                        itemMap.get(global_item).html(global_item.html(true));\
                        saveDB(MMDStudioDB);\" class=\"btn btn-primary\">修改</button>\n\
                    </div>\n\
                </div>\n\
            </form>"
};

module.exports={
    loadDB,
    saveDB,
    DBItem
};