//TODO: Support more pmx file
const fs=require('fs');
const path=require('path');
const iconv=require('iconv-lite');

// pmx.js
//region
// Definitions for PMX FILES HERE
function FileReader(data){
    var position = 0;

    this.getPosition = function(){ return position; };

    this.readByte = function(size){
        size = size || 1;
        var ret = [];
        while(size > 0){
            ret.push(data.readInt8(position));
            position+=1;
            size-=1;
        }
        return ret;
    };

    this.readUbyte = function(size){
        size = size || 1;
        var ret = [];
        while(size > 0){
            ret.push(data.readUInt8(position));
            position+=1;
            size-=1;
        }
        return ret;
    };

    this.readShort = function(){
        var ret = data.readInt16LE(position, true);
        position+=2;
        return ret;
    };

    this.readUshort = function(){
        var ret = data.readUInt16LE(position, true);
        position+=2;
        return ret;
    };

    this.readInt = function(){
        var ret = data.readInt32LE(position, true);
        position+=4;
        return ret;
    };

    this.readUint = function(){
        var ret = data.readUInt32LE(position, true);
        position+=4;
        return ret;
    };

    this.readFloat = function(){
        var ret = data.readFloatLE(position, true);
        position+=4;
        return ret;
    };

    this.readSize=function(sz){
        switch (sz) {
            case 1:return this.readUbyte();
            case 2:return this.readUshort();
            case 4:return this.readUint();
        }
    }
}

function Vec2(){
    this.x = null;
    this.y = null;
    this.readFromFile = function(file){
        this.x = file.readFloat();
        this.y = file.readFloat();
    }
}

function Vec3(){
    this.x = null;
    this.y = null;
    this.z = null;
    this.readFromFile = function(file){
        this.x = file.readFloat();
        this.y = file.readFloat();
        this.z = file.readFloat();
        return this;
    };
    this.getData = function(){
        return [this.x, this.y, this.z];
    }
}

function Vec4(){
    this.x = null;
    this.y = null;
    this.z = null;
    this.w = null;
    this.readFromFile = function(file){
        this.x = file.readFloat();
        this.y = file.readFloat();
        this.z = file.readFloat();
        this.w = file.readFloat();
        return this;
    };

    this.getData = function(){
        return new Float32Array([this.x, this.y, this.z, this.w]);
    }
}

Text.prototype.encoding='utf16';
function Text(){
    this.length = null;
    this.text = null;
    this.readFromFile = function(file){
        this.length=file.readUint();
        if(this.length === 0){
            return this;
        }
        this.text = file.readUbyte(this.length);
        return this;
    };


    this.toString = ()=>{
        if(this.text)return iconv.decode(Buffer.from(this.text),this.encoding).toString();
        return null;
    }

}

function Flag(){
    this.flag = null;
    this.readFromFile = function(file){
        this.flag = file.readByte(1)[0];
    }
}

function readBoneIndex(buffer, boneIndexSize){
    switch(boneIndexSize){
        case 1:
            return buffer.readByte(1)[0];
        case 2:
            return buffer.readShort();
        case 4:
            return buffer.readInt();
    }
}

function BDEF1(buffer, boneIndexSize){
    this.index = readBoneIndex(buffer, boneIndexSize);
}

function BDEF2(buffer, boneIndexSize){
    this.index1 = readBoneIndex(buffer, boneIndexSize);
    this.index2 = readBoneIndex(buffer, boneIndexSize);
    this.weight1 = buffer.readFloat();
    this.weight2 = 1.0 - this.weight1;
}

function BDEF4(buffer, boneIndexSize){
    this.index1 = readBoneIndex(buffer, boneIndexSize);
    this.index2 = readBoneIndex(buffer, boneIndexSize);
    this.index3 = readBoneIndex(buffer, boneIndexSize);
    this.index4 = readBoneIndex(buffer, boneIndexSize);
    this.weight1 = buffer.readFloat();
    this.weight2 = buffer.readFloat();
    this.weight3 = buffer.readFloat();
    this.weight4 = buffer.readFloat();
}

function SDEF(buffer, boneIndexSize){
    this.bdef = new BDEF2(buffer, boneIndexSize);
    this.C = new Vec3();
    this.C.readFromFile(buffer);
    this.R0 = new Vec3();
    this.R0.readFromFile(buffer);
    this.R1 = new Vec3();
    this.R1.readFromFile(buffer);
}

function PMXTexture(buffer, index){
    var that = this;

    this.path = new Text();
    this.path.readFromFile(buffer);

    this.pathString = this.path.toString();

    this.smallFile = this.pathString;//.split(".").slice(0,-1).join(".")+".jpg";
    this.loaded = false;


    this.load = function(basePath,cb){
        cb = cb || function(){};
        cb(index,[basePath,this.smallFile].join("/"));
    }
}

function PMXHeader(buffer){
    this.signature = buffer.readByte(4);
    this.version = buffer.readFloat();
    this.globalsCount = buffer.readByte(1)[0];
    this.globals = buffer.readByte(this.globalsCount);
    Text.prototype.encoding=this.globals[0]===1?'utf8':'utf16';
    this.nameLocal = new Text();
    this.nameLocal.readFromFile(buffer);
    this.nameUniversal = new Text();
    this.nameUniversal.readFromFile(buffer);
    this.commentsLocal = new Text();
    this.commentsLocal.readFromFile(buffer);
    this.commentsUniversal = new Text();
    this.commentsUniversal.readFromFile(buffer);
}

function PMXVertex(buffer, addVec4, boneIndex){
    this.position = new Vec3();
    this.position.readFromFile(buffer);
    this.normal = new Vec3();
    this.normal.readFromFile(buffer);
    this.uv = new Vec2();
    this.uv.readFromFile(buffer);
    this.addVec4 = [];
    for(var i = 0; i < addVec4; i++){
        var vec4 = new Vec4();
        vec4.readFromFile(buffer);
        this.addVec4.push(vec4);
    }
    this.weightDeformType = buffer.readByte(1)[0];

    switch (this.weightDeformType){
        case 0:
            //BDEF1
            this.weightDeform = new BDEF1(buffer, boneIndex);
            break;
        case 1:
            //BDEF2
            this.weightDeform = new BDEF2(buffer, boneIndex);
            break;
        case 2:
            //BDEF4
            this.weightDeform = new BDEF4(buffer, boneIndex);
            break;
        case 3:
            //SDEF
            this.weightDeform = new SDEF(buffer, boneIndex);
            break;
        case 4:
            //QDEF
            this.weightDeform = new BDEF4(buffer, boneIndex);
            break;
    }

    this.edgeScale = buffer.readFloat();
}

function PMXMaterial(buffer, textureIndexSize){
    this.nameLocal = new Text().readFromFile(buffer);
    this.nameUniversal = new Text().readFromFile(buffer);
    this.diffuse = new Vec4().readFromFile(buffer);
    this.specular = new Vec3().readFromFile(buffer);
    this.specularStrength = buffer.readFloat();
    this.ambient = new Vec3().readFromFile(buffer);
    this.drawingFlags = buffer.readByte(1)[0];
    this.edgeColor = new Vec4().readFromFile(buffer);
    this.edgeScale = buffer.readFloat();
    this.textureIndex = readBoneIndex(buffer, textureIndexSize);
    this.environmentIndex = readBoneIndex(buffer, textureIndexSize);
    this.environmentBlendMode = buffer.readByte(1)[0];
    this.toonReference = buffer.readByte(1)[0];
    if(this.toonReference === 1){
        this.toonValue = buffer.readByte(1)[0];
    } else {
        this.toonValue = readBoneIndex(buffer, textureIndexSize);
    }
    this.metadata = new Text().readFromFile(buffer);
    this.surfaceCount = buffer.readUint();
}

function PMXFile(buffer){
    this.header = new PMXHeader(buffer);
//        switch(this.header.globals[2]){
//            case 1:
//                this.vertexCount = buffer.readUbyte(1)[0];
//                break;
//            case 2:
//                    this.vertexCount = buffer.readUshort();
//                break;
//            case 4:
//                    this.vertexCount = buffer.readUint();
//                break;
//            default:
//                throw "Vertex globals error";
//        }
    this.vertexCount = buffer.readInt();
    this.vertices = [];
    this.vertexData = new Float32Array(this.vertexCount*3);
    this.uvData = new Float32Array(this.vertexCount*2);
    for(var i = 0; i < this.vertexCount; i++){
        var vertex = new PMXVertex(buffer,this.header.globals[1], this.header.globals[5]);
        this.vertices.push(vertex);
        var vertexData = vertex.position.getData();
        this.vertexData[3*i] = vertexData[0];
        this.vertexData[3*i+1] = vertexData[1];
        this.vertexData[3*i+2] = vertexData[2];
        this.uvData[2*i] = vertex.uv.x;
        this.uvData[2*i+1] = vertex.uv.y;
    }

    this.surfaceCount = buffer.readInt();
    switch(this.header.globals[2]){
        case 1:
            this.surfaces=new Uint8Array(this.surfaceCount);
            for(let i=0;i<this.surfaceCount;++i)this.surfaces[i]=buffer.readUbyte(1)[0];
            break;
        case 2:
            this.surfaces=new Uint16Array(this.surfaceCount);
            for(let i=0;i<this.surfaceCount;++i)this.surfaces[i]=buffer.readUshort();
            break;
        default:
            this.surfaces=new Uint8Array(this.surfaceCount);
            for(let i=0;i<this.surfaceCount;++i)this.surfaces[i]=buffer.readInt();
            break;
    }

    this.textureCount = buffer.readInt();
    this.textures = [];
    for(i = 0; i < this.textureCount; i++){
        this.textures.push(new PMXTexture(buffer, i));
    }

    this.loadTextures = function(basePath, cb){
        this.textures.forEach(function(texture){
            texture.load(basePath, cb);
        })
    };

    this.materialCount = buffer.readInt();
    this.materials = [];
    for(i = 0; i < this.materialCount; i++){
        this.materials.push(new PMXMaterial(buffer, this.header.globals[3]));
    }

}

function loadModel(canvas,url){
    fs.readFile(url,function(err,buf){
        if(err){
            console.log(err);
        }
        else{
            if (buf) {
                file = new FileReader(buf);
                pmx = new PMXFile(file);

                var textures = [];

                pmx.loadTextures(path.dirname(url),function(index, image){
                    textures[index] = loadTexture(image);
                });

                var rot = Math.PI;
                var frameFunction = function(){
                    if(!document.body.contains(canvas))return;
                    rot+=0.01;
                    draw(pmx.vertexData,pmx.uvData,textures, pmx.materials, pmx.surfaces,0,-10,-25,canvas.width,canvas.height,rot);
                    requestAnimationFrame(frameFunction);
                };
                requestAnimationFrame(frameFunction);
            }
        }
    });
}

var gl;
var shaderProgram;
var textureLoader;

function compileShader(gl, shaderSource, shaderType) {
    // Create the shader object
    var shader = gl.createShader(shaderType);

    // Set the shader source code.
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check if it compiled
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        // Something went wrong during compilation; get the error
        throw "could not compile shader:" + gl.getShaderInfoLog(shader);
    }

    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    // create a program.
    var program = gl.createProgram();

    // attach the shaders.
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // link the program.
    gl.linkProgram(program);

    // Check if it linked.
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        // something went wrong with the link
        throw ("program filed to link:" + gl.getProgramInfoLog (program));
    }

    return program;
}

function createShaderFromScript(gl, scriptId, opt_shaderType) {
    // look up the script tag by id.
    var shaderScript = document.getElementById(scriptId);
    if (!shaderScript) {
        console.log(shaderScript);
        throw("*** Error: unknown script element " + scriptId);
    }

    // extract the contents of the script tag.
    var shaderSource = shaderScript.text;

    // If we didn't pass in a type, use the 'type' from
    // the script tag.
    if (!opt_shaderType) {
        if (shaderScript.type === "x-shader/x-vertex") {
            opt_shaderType = gl.VERTEX_SHADER;
        } else if (shaderScript.type === "x-shader/x-fragment") {
            opt_shaderType = gl.FRAGMENT_SHADER;
        } else if (!opt_shaderType) {
            throw("*** Error: shader type not set");
        }
    }

    return compileShader(gl, shaderSource, opt_shaderType);
}

function createProgramFromScripts(gl, vShaderSource,fShaderSource) {
    var vertexShader = compileShader(gl,vShaderSource,gl.VERTEX_SHADER);
    var fragmentShader = compileShader(gl, fShaderSource,gl.FRAGMENT_SHADER);
    return createProgram(gl, vertexShader, fragmentShader);
}


var whiteTex;

function start(canvas,url){
    // Get A WebGL context
    gl = canvas.getContext("experimental-webgl");

    gl.enable(gl.DEPTH_TEST);

    whiteTex = gl.createTexture();

    textureLoader=new TextureUtil.TextureLoader(gl);

    // setup a GLSL program
    let vShaderSource="attribute vec4 a_position;\n" +
        "        attribute vec2 a_uv;\n" +
        "        uniform mat4 u_matrix;\n" +
        "\n" +
        "        varying highp vec2 vTextureCoord;\n" +
        "        void main() {\n" +
        "          // Multiply the position by the matrix.\n" +
        "          gl_Position = u_matrix * a_position;\n" +
        "          vTextureCoord = a_uv;\n" +
        "        }";
    let fShaderSource="precision mediump float;\n" +
        "        varying highp vec2 vTextureCoord;\n" +
        "        uniform sampler2D uSampler;\n" +
        "\n" +
        "        void main() {\n" +
        "          gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n" +
        "          // gl_FragColor = vec4(0, 1, 0, 1);  // green\n" +
        "        }";
    shaderProgram = createProgramFromScripts(gl, vShaderSource,fShaderSource);
    gl.useProgram(shaderProgram);

    loadModel(canvas,url);
}

function generateVerticeBuffer(gl, vertices){
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    return vertexBuffer;
}


function draw(vertices, uvs, textures, materials, indices, x,y,z, w,h, rot){
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    //Bind vertices position to shader
    var vertexBuffer = generateVerticeBuffer(gl, vertices);
    var positionLoc = gl.getAttribLocation(shaderProgram,"a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0,0);

    // Texture Coordinates
    var textureCoordsBuffer = generateVerticeBuffer(gl, uvs);
    var textureCoordsAttrib = gl.getAttribLocation(shaderProgram, "a_uv");
    gl.enableVertexAttribArray(textureCoordsAttrib);
    gl.vertexAttribPointer(textureCoordsAttrib, 2, gl.FLOAT, false, 0,0);

    // Triangles
    var indiceBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indiceBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    // Projection Matrix
    var matrixLoc = gl.getUniformLocation(shaderProgram,"u_matrix");
    var matrix = matrixMultiply(makeYRotation(rot), makeTranslation(x,y,z));
    gl.uniformMatrix4fv(matrixLoc, false, matrixMultiply(matrix,makePerspective(Math.PI/4,w/h,1,2000)));

    var surfaces = 0;
    gl.activeTexture(gl.TEXTURE0);

    for(var i = 1; i < materials.length; i++){
        if(materials[i].toonReference === 0){
            gl.bindTexture(gl.TEXTURE_2D, textures[materials[i].textureIndex]);
            gl.uniform1i(gl.getUniformLocation(shaderProgram,"uSampler"), 0);
            gl.drawElements(gl.TRIANGLES, surfaces+materials[i].surfaceCount, gl.UNSIGNED_SHORT, surfaces);
            /*
            if(rot == 0.01){
                console.log(surfaces);
                console.log(i);
                console.log(materials[i]);
            }
            */

        }

        surfaces+=materials[i].surfaceCount;

    }


}

function makePerspective(fieldOfViewInRadians, aspect, near, far) {
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    var rangeInv = 1.0 / (near - far);

    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
    ];
}


function makeTranslation(tx, ty, tz) {
    return [
        1,  0,  0,  0,
        0,  1,  0,  0,
        0,  0,  1,  0,
        tx, ty, tz,  1
    ];
}

function makeYRotation(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1
    ];
}

function matrixMultiply(a, b) {
    var a00 = a[0*4+0];
    var a01 = a[0*4+1];
    var a02 = a[0*4+2];
    var a03 = a[0*4+3];
    var a10 = a[1*4+0];
    var a11 = a[1*4+1];
    var a12 = a[1*4+2];
    var a13 = a[1*4+3];
    var a20 = a[2*4+0];
    var a21 = a[2*4+1];
    var a22 = a[2*4+2];
    var a23 = a[2*4+3];
    var a30 = a[3*4+0];
    var a31 = a[3*4+1];
    var a32 = a[3*4+2];
    var a33 = a[3*4+3];
    var b00 = b[0*4+0];
    var b01 = b[0*4+1];
    var b02 = b[0*4+2];
    var b03 = b[0*4+3];
    var b10 = b[1*4+0];
    var b11 = b[1*4+1];
    var b12 = b[1*4+2];
    var b13 = b[1*4+3];
    var b20 = b[2*4+0];
    var b21 = b[2*4+1];
    var b22 = b[2*4+2];
    var b23 = b[2*4+3];
    var b30 = b[3*4+0];
    var b31 = b[3*4+1];
    var b32 = b[3*4+2];
    var b33 = b[3*4+3];
    return [a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
        a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
        a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
        a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
        a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
        a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
        a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
        a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
        a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
        a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
        a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
        a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
        a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
        a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
        a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
        a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33];
}

function loadTexture(image) {
    let tex=textureLoader.load(image);
    gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return tex;
}

/*
function loadTexture(image){
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

    return texture;
}
*/
//endregion



module.exports={
    createPmx(canvas,url){
        start(canvas,url)
    },
    infoPmx(url){
        let buf=fs.readFileSync(url);
        if(!buf)return null;
        let pmx=new PMXHeader(new FileReader(buf));
        return {
            name:pmx.nameLocal.toString(),
            comment:pmx.commentsLocal.toString()
        }
    }
};