var through = require('through2');

module.exports = function gulp_prefix(){
    
    var prefix = 'module.exports=`';
    var affix='`';
    

    prefix = Buffer.from(prefix);
    affix = Buffer.from(affix);
    var stream = through.obj(function(file, encoding, callback){
        // 如果file类型不是buffer 退出不做处理
        if(!file.isBuffer()){
            return callback();
        }

        // 将字符串加到文件数据开头
        file.contents = Buffer.concat([prefix, file.contents,affix]);
        file.path=file.path+'.ts';
        // 确保文件会传给下一个插件
        this.push(file);
        console.log(`${file.path} completed`)
        // 告诉stream引擎，已经处理完成
        callback();
    });

    return stream;
};

