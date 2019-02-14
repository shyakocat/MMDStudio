const fs=require('fs');
const { dialog } = require('electron').remote;
const $=require('jquery');

module.exports= {
    openFile(){
        let url=dialog.showOpenDialog({properties:['openFile']});
        url=url?url[0]:null;
        if(!url)return null;
        global_data=fs.readFileSync(url);
        global_create=(c)=>$('#encodingOutput').text(iconv.decode(global_data,c));
        return {
            path:url,
            content:"<div>\
                        <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>\
                            编码<span class='caret'></span>\
                        </button>\
                        <ul class='dropdown-menu'>\
                            <li><a class='dropdown-item' href='javascript:global_create(\"shift_jis\")'>Shift-JIS</a></li>\
                            <li><a class='dropdown-item' href='javascript:global_create(\"gb2312\")'>GB2312</a></li>\
                            <li><a class='dropdown-item' href='javascript:global_create(\"gbk\")'>GBK</a></li>\
                            <li><a class='dropdown-item' href='javascript:global_create(\"utf8\")'>UTF8</a></li>\
                            <li class='dropdown-divider'></li>\
                            <li><a class='dropdown-item' href='javascript:global_create(\"win1251\")'>Windows-1251</a></li>\
                            <li><a class='dropdown-item' href='javascript:global_create(\"base64\")'>Base64</a></li>\
                            <li><a class='dropdown-item' href='javascript:global_create(\"cp936\")'>CP936</a></li>\
                            <li><a class='dropdown-item' href='javascript:global_create(\"gb18030\")'>GB18030</a></li>\
                            <li><a class='dropdown-item' href='javascript:global_create(\"big5\")'>Big5</a></li>\
                            <li><a class='dropdown-item' href='javascript:global_create(\"euc_jp\")'>EUC-JP</a></li>\
                        </ul>\
                    </div>\
                    <p id='encodingOutput'>"+iconv.decode(global_data,'shift_jis')+"</p>"
        }
    },
    searchFile(filter=()=>true) {
        let urls = dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']});

        function walker(url) {
            try{var sta = fs.statSync(url);}
            catch(e){return null;}
            if (!sta) return null;
            if (sta.isFile()){
                if (filter(url,sta)) result.push(url);
            }
            else if (sta.isDirectory()) {
                var d=fs.readdirSync(url);
                for (_url in d) walker(url + '\\' + d[_url]);
            }
        }

        let result = [];
        for (let url in urls) walker(urls[url]);
        return result;

    }
};