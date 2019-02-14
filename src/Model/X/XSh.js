const THREE=require('./three.min');
const path=require('path');

// lib/stats.min.js
//region
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));
    if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};
Stats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=f;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         v){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};"object"===typeof module&&(module.exports=Stats);

//endregion

// lib/Detector.js
//region
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

    canvas: !! window.CanvasRenderingContext2D,
    webgl: ( function () {

        try {

            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

        } catch ( e ) {

            return false;

        }

    } )(),
    workers: !! window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,

    getWebGLErrorMessage: function () {

        var element = document.createElement( 'div' );
        element.id = 'webgl-error-message';
        element.style.fontFamily = 'monospace';
        element.style.fontSize = '13px';
        element.style.fontWeight = 'normal';
        element.style.textAlign = 'center';
        element.style.background = '#fff';
        element.style.color = '#000';
        element.style.padding = '1.5em';
        element.style.width = '400px';
        element.style.margin = '5em auto 0';

        if ( ! this.webgl ) {

            element.innerHTML = window.WebGLRenderingContext ? [
                'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
            ].join( '\n' ) : [
                'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
            ].join( '\n' );

        }

        return element;

    },

    addGetWebGLMessage: function ( parameters ) {

        var parent, id, element;

        parameters = parameters || {};

        parent = parameters.parent !== undefined ? parameters.parent : document.body;
        id = parameters.id !== undefined ? parameters.id : 'oldie';

        element = Detector.getWebGLErrorMessage();
        element.id = id;

        parent.appendChild( element );

    }

};

// browserify support
if ( typeof module === 'object' ) {

    module.exports = Detector;

}

//endregion

// lib/OrbitControls.js
//region
/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe

THREE.OrbitControls = function ( object, domElement ) {

    this.object = object;

    this.domElement = ( domElement !== undefined ) ? domElement : document;

    // Set to false to disable this control
    this.enabled = true;

    // "target" sets the location of focus, where the object orbits around
    this.target = new THREE.Vector3();

    // How far you can dolly in and out ( PerspectiveCamera only )
    this.minDistance = 0;
    this.maxDistance = Infinity;

    // How far you can zoom in and out ( OrthographicCamera only )
    this.minZoom = 0;
    this.maxZoom = Infinity;

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    this.minAzimuthAngle = - Infinity; // radians
    this.maxAzimuthAngle = Infinity; // radians

    // Set to true to enable damping (inertia)
    // If damping is enabled, you must call controls.update() in your animation loop
    this.enableDamping = false;
    this.dampingFactor = 0.25;

    // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
    // Set to false to disable zooming
    this.enableZoom = true;
    this.zoomSpeed = 1.0;

    // Set to false to disable rotating
    this.enableRotate = true;
    this.rotateSpeed = 1.0;

    // Set to false to disable panning
    this.enablePan = true;
    this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

    // Set to true to automatically rotate around the target
    // If auto-rotate is enabled, you must call controls.update() in your animation loop
    this.autoRotate = false;
    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

    // Set to false to disable use of the keys
    this.enableKeys = true;

    // The four arrow keys
    this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

    // Mouse buttons
    this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

    // for reset
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;

    //
    // public methods
    //

    this.getPolarAngle = function () {

        return spherical.phi;

    };

    this.getAzimuthalAngle = function () {

        return spherical.theta;

    };

    this.reset = function () {

        scope.target.copy( scope.target0 );
        scope.object.position.copy( scope.position0 );
        scope.object.zoom = scope.zoom0;

        scope.object.updateProjectionMatrix();
        scope.dispatchEvent( changeEvent );

        scope.update();

        state = STATE.NONE;

    };

    // this method is exposed, but perhaps it would be better if we can make it private...
    this.update = function() {

        var offset = new THREE.Vector3();

        // so camera.up is the orbit axis
        var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
        var quatInverse = quat.clone().inverse();

        var lastPosition = new THREE.Vector3();
        var lastQuaternion = new THREE.Quaternion();

        return function () {

            var position = scope.object.position;

            offset.copy( position ).sub( scope.target );

            // rotate offset to "y-axis-is-up" space
            offset.applyQuaternion( quat );

            // angle from z-axis around y-axis
            spherical.setFromVector3( offset );

            if ( scope.autoRotate && state === STATE.NONE ) {

                rotateLeft( getAutoRotationAngle() );

            }

            spherical.theta += sphericalDelta.theta;
            spherical.phi += sphericalDelta.phi;

            // restrict theta to be between desired limits
            spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

            // restrict phi to be between desired limits
            spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

            spherical.makeSafe();


            spherical.radius *= scale;

            // restrict radius to be between desired limits
            spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

            // move target to panned location
            scope.target.add( panOffset );

            offset.setFromSpherical( spherical );

            // rotate offset back to "camera-up-vector-is-up" space
            offset.applyQuaternion( quatInverse );

            position.copy( scope.target ).add( offset );

            scope.object.lookAt( scope.target );

            if ( scope.enableDamping === true ) {

                sphericalDelta.theta *= ( 1 - scope.dampingFactor );
                sphericalDelta.phi *= ( 1 - scope.dampingFactor );

            } else {

                sphericalDelta.set( 0, 0, 0 );

            }

            scale = 1;
            panOffset.set( 0, 0, 0 );

            // update condition is:
            // min(camera displacement, camera rotation in radians)^2 > EPS
            // using small-angle approximation cos(x/2) = 1 - x^2 / 8

            if ( zoomChanged ||
                lastPosition.distanceToSquared( scope.object.position ) > EPS ||
                8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

                scope.dispatchEvent( changeEvent );

                lastPosition.copy( scope.object.position );
                lastQuaternion.copy( scope.object.quaternion );
                zoomChanged = false;

                return true;

            }

            return false;

        };

    }();

    this.dispose = function() {

        scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
        scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
        scope.domElement.removeEventListener( 'mousewheel', onMouseWheel, false );
        scope.domElement.removeEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox

        scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
        scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
        scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

        document.removeEventListener( 'mousemove', onMouseMove, false );
        document.removeEventListener( 'mouseup', onMouseUp, false );
        document.removeEventListener( 'mouseout', onMouseUp, false );

        window.removeEventListener( 'keydown', onKeyDown, false );

        //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

    };

    //
    // internals
    //

    var scope = this;

    var changeEvent = { type: 'change' };
    var startEvent = { type: 'start' };
    var endEvent = { type: 'end' };

    var STATE = { NONE : - 1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };

    var state = STATE.NONE;

    var EPS = 0.000001;

    // current position in spherical coordinates
    var spherical = new THREE.Spherical();
    var sphericalDelta = new THREE.Spherical();

    var scale = 1;
    var panOffset = new THREE.Vector3();
    var zoomChanged = false;

    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();

    var panStart = new THREE.Vector2();
    var panEnd = new THREE.Vector2();
    var panDelta = new THREE.Vector2();

    var dollyStart = new THREE.Vector2();
    var dollyEnd = new THREE.Vector2();
    var dollyDelta = new THREE.Vector2();

    function getAutoRotationAngle() {

        return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

    }

    function getZoomScale() {

        return Math.pow( 0.95, scope.zoomSpeed );

    }

    function rotateLeft( angle ) {

        sphericalDelta.theta -= angle;

    }

    function rotateUp( angle ) {

        sphericalDelta.phi -= angle;

    }

    var panLeft = function() {

        var v = new THREE.Vector3();

        return function panLeft( distance, objectMatrix ) {

            v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
            v.multiplyScalar( - distance );

            panOffset.add( v );

        };

    }();

    var panUp = function() {

        var v = new THREE.Vector3();

        return function panUp( distance, objectMatrix ) {

            v.setFromMatrixColumn( objectMatrix, 1 ); // get Y column of objectMatrix
            v.multiplyScalar( distance );

            panOffset.add( v );

        };

    }();

    // deltaX and deltaY are in pixels; right and down are positive
    var pan = function() {

        var offset = new THREE.Vector3();

        return function( deltaX, deltaY ) {

            var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

            if ( scope.object instanceof THREE.PerspectiveCamera ) {

                // perspective
                var position = scope.object.position;
                offset.copy( position ).sub( scope.target );
                var targetDistance = offset.length();

                // half of the fov is center to top of screen
                targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

                // we actually don't use screenWidth, since perspective camera is fixed to screen height
                panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
                panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

            } else if ( scope.object instanceof THREE.OrthographicCamera ) {

                // orthographic
                panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
                panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

            } else {

                // camera neither orthographic nor perspective
                console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
                scope.enablePan = false;

            }

        };

    }();

    function dollyIn( dollyScale ) {

        if ( scope.object instanceof THREE.PerspectiveCamera ) {

            scale /= dollyScale;

        } else if ( scope.object instanceof THREE.OrthographicCamera ) {

            scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
            scope.object.updateProjectionMatrix();
            zoomChanged = true;

        } else {

            console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
            scope.enableZoom = false;

        }

    }

    function dollyOut( dollyScale ) {

        if ( scope.object instanceof THREE.PerspectiveCamera ) {

            scale *= dollyScale;

        } else if ( scope.object instanceof THREE.OrthographicCamera ) {

            scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
            scope.object.updateProjectionMatrix();
            zoomChanged = true;

        } else {

            console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
            scope.enableZoom = false;

        }

    }

    //
    // event callbacks - update the object state
    //

    function handleMouseDownRotate( event ) {

        //console.log( 'handleMouseDownRotate' );

        rotateStart.set( event.clientX, event.clientY );

    }

    function handleMouseDownDolly( event ) {

        //console.log( 'handleMouseDownDolly' );

        dollyStart.set( event.clientX, event.clientY );

    }

    function handleMouseDownPan( event ) {

        //console.log( 'handleMouseDownPan' );

        panStart.set( event.clientX, event.clientY );

    }

    function handleMouseMoveRotate( event ) {

        //console.log( 'handleMouseMoveRotate' );

        rotateEnd.set( event.clientX, event.clientY );
        rotateDelta.subVectors( rotateEnd, rotateStart );

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        // rotating across whole screen goes 360 degrees around
        rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

        // rotating up and down along whole screen attempts to go 360, but limited to 180
        rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

        rotateStart.copy( rotateEnd );

        scope.update();

    }

    function handleMouseMoveDolly( event ) {

        //console.log( 'handleMouseMoveDolly' );

        dollyEnd.set( event.clientX, event.clientY );

        dollyDelta.subVectors( dollyEnd, dollyStart );

        if ( dollyDelta.y > 0 ) {

            dollyIn( getZoomScale() );

        } else if ( dollyDelta.y < 0 ) {

            dollyOut( getZoomScale() );

        }

        dollyStart.copy( dollyEnd );

        scope.update();

    }

    function handleMouseMovePan( event ) {

        //console.log( 'handleMouseMovePan' );

        panEnd.set( event.clientX, event.clientY );

        panDelta.subVectors( panEnd, panStart );

        pan( panDelta.x, panDelta.y );

        panStart.copy( panEnd );

        scope.update();

    }

    function handleMouseUp( event ) {

        //console.log( 'handleMouseUp' );

    }

    function handleMouseWheel( event ) {

        //console.log( 'handleMouseWheel' );

        var delta = 0;

        if ( event.wheelDelta !== undefined ) {

            // WebKit / Opera / Explorer 9

            delta = event.wheelDelta;

        } else if ( event.detail !== undefined ) {

            // Firefox

            delta = - event.detail;

        }

        if ( delta > 0 ) {

            dollyOut( getZoomScale() );

        } else if ( delta < 0 ) {

            dollyIn( getZoomScale() );

        }

        scope.update();

    }

    function handleKeyDown( event ) {

        //console.log( 'handleKeyDown' );

        switch ( event.keyCode ) {

            case scope.keys.UP:
                pan( 0, scope.keyPanSpeed );
                scope.update();
                break;

            case scope.keys.BOTTOM:
                pan( 0, - scope.keyPanSpeed );
                scope.update();
                break;

            case scope.keys.LEFT:
                pan( scope.keyPanSpeed, 0 );
                scope.update();
                break;

            case scope.keys.RIGHT:
                pan( - scope.keyPanSpeed, 0 );
                scope.update();
                break;

        }

    }

    function handleTouchStartRotate( event ) {

        //console.log( 'handleTouchStartRotate' );

        rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

    }

    function handleTouchStartDolly( event ) {

        //console.log( 'handleTouchStartDolly' );

        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

        var distance = Math.sqrt( dx * dx + dy * dy );

        dollyStart.set( 0, distance );

    }

    function handleTouchStartPan( event ) {

        //console.log( 'handleTouchStartPan' );

        panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

    }

    function handleTouchMoveRotate( event ) {

        //console.log( 'handleTouchMoveRotate' );

        rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        rotateDelta.subVectors( rotateEnd, rotateStart );

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        // rotating across whole screen goes 360 degrees around
        rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

        // rotating up and down along whole screen attempts to go 360, but limited to 180
        rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

        rotateStart.copy( rotateEnd );

        scope.update();

    }

    function handleTouchMoveDolly( event ) {

        //console.log( 'handleTouchMoveDolly' );

        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

        var distance = Math.sqrt( dx * dx + dy * dy );

        dollyEnd.set( 0, distance );

        dollyDelta.subVectors( dollyEnd, dollyStart );

        if ( dollyDelta.y > 0 ) {

            dollyOut( getZoomScale() );

        } else if ( dollyDelta.y < 0 ) {

            dollyIn( getZoomScale() );

        }

        dollyStart.copy( dollyEnd );

        scope.update();

    }

    function handleTouchMovePan( event ) {

        //console.log( 'handleTouchMovePan' );

        panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

        panDelta.subVectors( panEnd, panStart );

        pan( panDelta.x, panDelta.y );

        panStart.copy( panEnd );

        scope.update();

    }

    function handleTouchEnd( event ) {

        //console.log( 'handleTouchEnd' );

    }

    //
    // event handlers - FSM: listen for events and reset state
    //

    function onMouseDown( event ) {

        if ( scope.enabled === false ) return;

        event.preventDefault();

        if ( event.button === scope.mouseButtons.ORBIT ) {

            if ( scope.enableRotate === false ) return;

            handleMouseDownRotate( event );

            state = STATE.ROTATE;

        } else if ( event.button === scope.mouseButtons.ZOOM ) {

            if ( scope.enableZoom === false ) return;

            handleMouseDownDolly( event );

            state = STATE.DOLLY;

        } else if ( event.button === scope.mouseButtons.PAN ) {

            if ( scope.enablePan === false ) return;

            handleMouseDownPan( event );

            state = STATE.PAN;

        }

        if ( state !== STATE.NONE ) {

            document.addEventListener( 'mousemove', onMouseMove, false );
            document.addEventListener( 'mouseup', onMouseUp, false );
            document.addEventListener( 'mouseout', onMouseUp, false );

            scope.dispatchEvent( startEvent );

        }

    }

    function onMouseMove( event ) {

        if ( scope.enabled === false ) return;

        event.preventDefault();

        if ( state === STATE.ROTATE ) {

            if ( scope.enableRotate === false ) return;

            handleMouseMoveRotate( event );

        } else if ( state === STATE.DOLLY ) {

            if ( scope.enableZoom === false ) return;

            handleMouseMoveDolly( event );

        } else if ( state === STATE.PAN ) {

            if ( scope.enablePan === false ) return;

            handleMouseMovePan( event );

        }

    }

    function onMouseUp( event ) {

        if ( scope.enabled === false ) return;

        handleMouseUp( event );

        document.removeEventListener( 'mousemove', onMouseMove, false );
        document.removeEventListener( 'mouseup', onMouseUp, false );
        document.removeEventListener( 'mouseout', onMouseUp, false );

        scope.dispatchEvent( endEvent );

        state = STATE.NONE;

    }

    function onMouseWheel( event ) {

        if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

        event.preventDefault();
        event.stopPropagation();

        handleMouseWheel( event );

        scope.dispatchEvent( startEvent ); // not sure why these are here...
        scope.dispatchEvent( endEvent );

    }

    function onKeyDown( event ) {

        if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

        handleKeyDown( event );

    }

    function onTouchStart( event ) {

        if ( scope.enabled === false ) return;

        switch ( event.touches.length ) {

            case 1:	// one-fingered touch: rotate

                if ( scope.enableRotate === false ) return;

                handleTouchStartRotate( event );

                state = STATE.TOUCH_ROTATE;

                break;

            case 2:	// two-fingered touch: dolly

                if ( scope.enableZoom === false ) return;

                handleTouchStartDolly( event );

                state = STATE.TOUCH_DOLLY;

                break;

            case 3: // three-fingered touch: pan

                if ( scope.enablePan === false ) return;

                handleTouchStartPan( event );

                state = STATE.TOUCH_PAN;

                break;

            default:

                state = STATE.NONE;

        }

        if ( state !== STATE.NONE ) {

            scope.dispatchEvent( startEvent );

        }

    }

    function onTouchMove( event ) {

        if ( scope.enabled === false ) return;

        event.preventDefault();
        event.stopPropagation();

        switch ( event.touches.length ) {

            case 1: // one-fingered touch: rotate

                if ( scope.enableRotate === false ) return;
                if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?...

                handleTouchMoveRotate( event );

                break;

            case 2: // two-fingered touch: dolly

                if ( scope.enableZoom === false ) return;
                if ( state !== STATE.TOUCH_DOLLY ) return; // is this needed?...

                handleTouchMoveDolly( event );

                break;

            case 3: // three-fingered touch: pan

                if ( scope.enablePan === false ) return;
                if ( state !== STATE.TOUCH_PAN ) return; // is this needed?...

                handleTouchMovePan( event );

                break;

            default:

                state = STATE.NONE;

        }

    }

    function onTouchEnd( event ) {

        if ( scope.enabled === false ) return;

        handleTouchEnd( event );

        scope.dispatchEvent( endEvent );

        state = STATE.NONE;

    }

    function onContextMenu( event ) {

        event.preventDefault();

    }

    //

    scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

    scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
    scope.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
    scope.domElement.addEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox

    scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
    scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
    scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

    window.addEventListener( 'keydown', onKeyDown, false );

    // force an update at start

    this.update();

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

Object.defineProperties( THREE.OrbitControls.prototype, {

    center: {

        get: function () {

            console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
            return this.target;

        }

    },

    // backward compatibility

    noZoom: {

        get: function () {

            console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
            return ! this.enableZoom;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
            this.enableZoom = ! value;

        }

    },

    noRotate: {

        get: function () {

            console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
            return ! this.enableRotate;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
            this.enableRotate = ! value;

        }

    },

    noPan: {

        get: function () {

            console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
            return ! this.enablePan;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
            this.enablePan = ! value;

        }

    },

    noKeys: {

        get: function () {

            console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
            return ! this.enableKeys;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
            this.enableKeys = ! value;

        }

    },

    staticMoving : {

        get: function () {

            console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
            return ! this.enableDamping;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
            this.enableDamping = ! value;

        }

    },

    dynamicDampingFactor : {

        get: function () {

            console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
            return this.dampingFactor;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
            this.dampingFactor = value;

        }

    }

} );

//endregion

// XLoader.js
//region
"use strict";

/**
 * @author Jey-en  https://github.com/adrs2002
 *
 * this loader repo -> https://github.com/adrs2002/threeXLoader
 *
 * This loader is load model (and animation) from .X file format. (for old DirectX).
 *  ! this version are load from TEXT format .X only ! not a Binary.
 *
 * Support
 *  - mesh
 *  - texture
 *  - normal / uv
 *  - material
 *  - skinning
 *
 *  Not Support
 *  - template
 *  - material(ditail)
 *  - morph
 *  - scene
 */

const {XBoneInf} = require('./parts/xBoneInf');
const {XAnimationInfo} = require('./parts/xAnimationInfo');
const {XAnimationObj} = require('./parts/XAnimationObj');
const {XKeyFrameInfo} = require('./parts/KeyFrameInfo');


class XLoader {
    // コンストラクタ

    /**
     *
     * @param { THREE.LoadingManager } manager
     * @param { THREE.TextureLoader } texloader
     */
    constructor( manager, texloader ) {

        this.debug = false;

        this.manager = ( manager !== undefined ) ? manager : new THREE.DefaultLoadingManager();
        this.texloader = ( texloader !== undefined ) ? texloader : new THREE.TextureLoader();

        this.url = "";
        this.baseDir = "";

        this._putMatLength = 0;
        this._nowMat = null;

        //UV割り出し用の一時保管配列
        this._tmpUvArray = [];

        this._facesNormal = [];

        //現在読み出し中のフレーム名称
        this._nowFrameName = "";

        //現在読み出し中のフレームの階層構造。
        this.frameHierarchie = [];
        this.Hierarchies = {};
        this.HieStack = [];
        this._currentObject = {};
        this._currentFrame = {};

        this._data = null;
        this.onLoad = null;

        this.IsUvYReverse = true;

        this.Meshes = [];
        this.animations = [];
        this.animTicksPerSecond = 30;

        this._currentGeo = null;
        this._currentAnime = null;
        this._currentAnimeFrames = null;

    }

    _setArgOption( _arg, _start = 0 ) {
        if ( !_arg ) {
            return;
        }
        for ( let i = _start; i < _arg.length; i++ ) {
            switch ( i ) {
                case 0:
                    this.url = _arg[ i ];
                    break;
                case 1:
                    this.options = _arg[ i ];
                    break;
            }
        }
        if ( this.options === undefined ) {
            this.options = {};
        }
    }

    //読み込み開始命令部
    load( _arg, onLoad, onProgress, onError ) {

        this._setArgOption( _arg );

        const loader = new THREE.FileLoader( this.manager );
        loader.setResponseType( 'arraybuffer' );

        loader.load( this.url, ( response ) => {

            this._parse( response, onLoad );

        }, onProgress, onError );

    }

    // DL済みのレスポンスデータから読み込みを行う
    fromResponsedData( _data, _arg, onLoad ) {

        this._setArgOption( _arg );
        this._parse( _data, onLoad );

    }

    /**
     * コメントを外した行を取得する
     */
    _readLine( line ) {
        let readed = 0;
        while ( true ) {
            let find = -1;
            find = line.indexOf( '//', readed );
            if ( find === -1 ) {
                find = line.indexOf( '#', readed );
            }
            if ( find > -1 && find < 2 ) {
                let foundNewLine = -1;
                foundNewLine = line.indexOf( "\r\n", readed );
                if ( foundNewLine > 0 ) {
                    readed = foundNewLine + 2;
                }
                else {
                    foundNewLine = line.indexOf( "\r", readed );
                    if ( foundNewLine > 0 ) {
                        readed = foundNewLine + 1;
                    }
                    else {
                        readed = line.indexOf( "\n", readed ) + 1;
                    }
                }
            }
            else {
                break;
            }
        }
        return line.substr( readed );
    }

    /**
     * コメントを外した行を取得する
     */
    _readLine( line ) {
        let readed = 0;
        while ( true ) {
            let find = -1;
            find = line.indexOf( '//', readed );
            if ( find === -1 ) {
                find = line.indexOf( '#', readed );
            }
            if ( find > -1 && find < 2 ) {
                let foundNewLine = -1;
                foundNewLine = line.indexOf( "\r\n", readed );
                if ( foundNewLine > 0 ) {
                    readed = foundNewLine + 2;
                }
                else {
                    foundNewLine = line.indexOf( "\r", readed );
                    if ( foundNewLine > 0 ) {
                        readed = foundNewLine + 1;
                    }
                    else {
                        readed = line.indexOf( "\n", readed ) + 1;
                    }
                }
            }
            else {
                break;
            }
        }
        return line.substr( readed );
    }

    _isBinary( binData ) {

        const reader = new DataView( binData );
        const face_size = ( 32 / 8 * 3 ) + ( ( 32 / 8 * 3 ) * 3 ) + ( 16 / 8 );
        const n_faces = reader.getUint32( 80, true );
        const expect = 80 + ( 32 / 8 ) + ( n_faces * face_size );

        if ( expect === reader.byteLength ) {
            return true;
        }

        // some binary files will have different size from expected,
        // checking characters higher than ASCII to confirm is binary
        const fileLength = reader.byteLength;
        for ( let index = 0; index < fileLength; index++ ) {

            if ( reader.getUint8( index, false ) > 127 ) {

                return true;

            }
        }
        return false;
    }

    ensureBinary( buf ) {

        if ( typeof buf === "string" ) {

            const array_buffer = new Uint8Array( buf.length );
            for ( let i = 0; i < buf.length; i++ ) {

                array_buffer[ i ] = buf.charCodeAt( i ) & 0xff; // implicitly assumes little-endian

            }

            return array_buffer.buffer || array_buffer;

        }
        else {

            return buf;

        }
    }

    ensureString( buf ) {

        if ( typeof buf !== "string" ) {
            const array_buffer = new Uint8Array( buf );
            let str = '';
            for ( let i = 0; i < buf.byteLength; i++ ) {
                str += String.fromCharCode( array_buffer[ i ] ); // implicitly assumes little-endian
            }

            return str;

            // return THREE.Loader.decodeText( new Uint8Array( buf ) );
        }
        else {

            return buf;

        }
    }

    //解析を行う前に、バイナリファイルかテキストファイルかを判別する。今はテキストファイルしか対応できていないので・・・
    _parse( data, onLoad ) {

        const binData = this.ensureBinary( data );
        this._data = this.ensureString( data );
        this.onLoad = onLoad;
        return this._isBinary( binData )
            ? this._parseBinary( binData )
            : this._parseASCII();

    }

    /*
    バイナリデータだった場合の読み込み。現在は基本的に未対応
    */
    _parseBinary( data ) {
        //ねげちぶ！
        return this._parseASCII( String.fromCharCode.apply( null, data ) );

    }

    _parseASCII() {
        //モデルファイルの元ディレクトリを取得する
        let baseDir = "";
        if ( this.url.lastIndexOf( "/" ) > 0 ) {

            this.baseDir = this.url.substr( 0, this.url.lastIndexOf( "/" ) + 1 );

        }

        // 返ってきたデータを行ごとに分解

        // 階層構造分解
        let added = 0;
        let endRead = 16; // 先頭16文字は固定
        this.Hierarchies.children = [];
        this._hierarchieParse( this.Hierarchies, endRead );
        this._changeRoot();
        this._currentObject = this.Hierarchies.children.shift();
        this.mainloop();

    }

    _hierarchieParse( _parent, _end ) {
        let endRead = _end;
        while ( true ) {
            const find1 = this._data.indexOf( '{', endRead ) + 1;
            const findEnd = this._data.indexOf( '}', endRead );
            const findNext = this._data.indexOf( '{', find1 ) + 1;
            if ( find1 > 0 && findEnd > find1 ) {
                const _currentObject = {};
                _currentObject.children = [];
                const nameData = this._readLine( this._data.substr( endRead, find1 - endRead - 1 ) )
                    .trim();

                const word = nameData.split( / /g );
                if ( word.length > 0 ) {
                    _currentObject.type = word[ 0 ];
                    if ( word.length >= 2 ) {
                        _currentObject.name = word[ 1 ];
                    }
                    else {
                        _currentObject.name = word[ 0 ] + this.Hierarchies.children.length;
                    }
                }
                else {
                    _currentObject.name = nameData;
                    _currentObject.type = "";
                }

                if ( _currentObject.type === "Animation" ) {
                    _currentObject.data = this._data.substr( findNext, findEnd - findNext )
                        .trim();
                    const refs = this._hierarchieParse( _currentObject, findEnd + 1 );
                    endRead = refs.end;
                    _currentObject.children = refs.parent.children;
                }
                else {
                    const DataEnder = this._data.lastIndexOf( ';', findNext > 0 ? Math.min( findNext, findEnd )
                        : findEnd );
                    _currentObject.data = this._data.substr( find1, DataEnder - find1 )
                        .trim();
                    if ( findNext <= 0 || findEnd < findNext ) {
                        // 子階層なし。クローズ
                        endRead = findEnd + 1;
                    }
                    else {
                        // 子階層あり
                        const nextStart = Math.max( DataEnder + 1, find1 );
                        const refs = this._hierarchieParse( _currentObject, nextStart );
                        endRead = refs.end;
                        _currentObject.children = refs.parent.children;
                    }
                }
                _currentObject.parent = _parent;
                if ( _currentObject.type != "template" ) {
                    _parent.children.push( _currentObject );
                }
            }
            else {
                endRead = find1 === -1 ? this._data.length : findEnd + 1;
                break;
            }
        }

        return {
            parent: _parent,
            end: endRead
        };
    }

    mainloop() {

        this.mainProc();
        if ( this._currentObject.parent || this._currentObject.children.length > 0 || !this._currentObject.worked ) {
            // this._currentObject = this._currentObject.parent;
            setTimeout( () => {
                this.mainloop();
            }, 1 );
        }
        else {
            // this._readFinalize();
            setTimeout( () => {
                this.onLoad( {
                    models: this.Meshes,
                    animations: this.animations
                } )
            }, 1 );
        }
    }

    mainProc() {
        let breakFlag = false;
        while ( true ) {
            if ( !this._currentObject.worked ) {
                switch ( this._currentObject.type ) {
                    case "template":
                        break;

                    case "AnimTicksPerSecond":
                        this.animTicksPerSecond = parseInt( this._currentObject.data );
                        break;

                    case "Frame":
                        this._setFrame();
                        break;

                    case "FrameTransformMatrix":
                        this._setFrameTransformMatrix();
                        break;

                    case "Mesh":
                        this._changeRoot();
                        this._currentGeo = {};
                        this._currentGeo.name = this._currentObject.name.trim();
                        this._currentGeo.parentName = this._getParentName( this._currentObject )
                            .trim();
                        this._currentGeo.VertexSetedBoneCount = [];
                        this._currentGeo.Geometry = new THREE.Geometry();
                        this._currentGeo.Materials = [];
                        this._currentGeo.normalVectors = [];
                        this._currentGeo.BoneInfs = [];
                        // putBones = [];
                        this._currentGeo.baseFrame = this._currentFrame;
                        this._makeBoneFrom_CurrentFrame();
                        this._readVertexDatas();
                        breakFlag = true;
                        break;

                    case "MeshNormals":
                        this._readVertexDatas();
                        break;

                    case "MeshTextureCoords":
                        this._setMeshTextureCoords();
                        break;

                    case "VertexDuplicationIndices":
                        //イラネ
                        break;

                    case "MeshMaterialList":
                        this._setMeshMaterialList();
                        break;

                    case "Material":
                        this._setMaterial();
                        break;

                    case "SkinWeights":
                        this._setSkinWeights();
                        break;

                    case "AnimationSet":
                        this._changeRoot();
                        this._currentAnime = {};
                        this._currentAnime.name = this._currentObject.name.trim();
                        this._currentAnime.AnimeFrames = [];
                        break;

                    case "Animation":
                        if ( this._currentAnimeFrames ) {
                            this._currentAnime.AnimeFrames.push( this._currentAnimeFrames );
                        }
                        this._currentAnimeFrames = new XAnimationInfo();
                        this._currentAnimeFrames.boneName = this._currentObject.data.trim();
                        break;

                    case "AnimationKey":
                        this._readAnimationKey();
                        breakFlag = true;
                        break;
                }
                this._currentObject.worked = true;
            }

            if ( this._currentObject.children.length > 0 ) {
                this._currentObject = this._currentObject.children.shift();
                if ( this.debug ) {
                    console.log( 'processing ' + this._currentObject.name );
                }
                if ( breakFlag ) break;
            }
            else {
                // ルート＝親が１つだけの場合
                if ( this._currentObject.worked ) {
                    if ( this._currentObject.type === "Mesh" || this._currentObject.type === "AnimationSet" ) {
                        // this._changeRoot();
                    }

                    if ( this._currentObject.parent && !this._currentObject.parent.parent ) {
                        this._changeRoot();
                    }
                }

                if ( this._currentObject.parent ) {
                    this._currentObject = this._currentObject.parent;
                }
                else {
                    breakFlag = true;
                }
                if ( breakFlag ) break;
            }
        }
        return;
    }

    _changeRoot() {

        if ( this._currentGeo != null && this._currentGeo.name ) {
            this._makeOutputGeometry();
        }
        this._currentGeo = {};
        if ( this._currentAnime != null && this._currentAnime.name ) {
            if ( this._currentAnimeFrames ) {
                this._currentAnime.AnimeFrames.push( this._currentAnimeFrames );
                this._currentAnimeFrames = null;
            }
            this._makeOutputAnimation();
        }
        this._currentAnime = {};
    }

    _getParentName( _obj ) {
        if ( _obj.parent ) {
            if ( _obj.parent.name ) {
                return _obj.parent.name;
            }
            else {
                return this._getParentName( _obj.parent );
            }
        }
        else {
            return "";
        }
    }

    _setFrame() {
        this._nowFrameName = this._currentObject.name.trim();
        this._currentFrame = {};
        this._currentFrame.name = this._nowFrameName;
        this._currentFrame.children = [];

        if ( this._currentObject.parent && this._currentObject.parent.name ) {
            this._currentFrame.parentName = this._currentObject.parent.name;
        }
        this.frameHierarchie.push( this._nowFrameName );
        this.HieStack[ this._nowFrameName ] = this._currentFrame;
    }

    _setFrameTransformMatrix() {
        this._currentFrame.FrameTransformMatrix = new THREE.Matrix4();
        const data = this._currentObject.data.split( "," );
        this._ParseMatrixData( this._currentFrame.FrameTransformMatrix, data );
        this._makeBoneFrom_CurrentFrame();
    }

    _makeBoneFrom_CurrentFrame() {
        if ( !this._currentFrame.FrameTransformMatrix ) {
            return;
        }

        const b = new THREE.Bone();
        b.name = this._currentFrame.name;
        b.applyMatrix( this._currentFrame.FrameTransformMatrix );
        b.matrixWorld = b.matrix;
        b.FrameTransformMatrix = this._currentFrame.FrameTransformMatrix;
        this._currentFrame.putBone = b;

        if ( this._currentFrame.parentName ) {
            for ( var frame in this.HieStack ) {
                if ( this.HieStack[ frame ].name === this._currentFrame.parentName ) {
                    this.HieStack[ frame ].putBone.add( this._currentFrame.putBone );
                }
            }
        }

    }

    _readVertexDatas() {

        // 1行目は総頂点数。
        let endRead = 0;
        let totalV = 0;
        let totalFace = 0;
        let mode = 0;
        let mode_local = 0
        let maxLength = 0;
        let nowReadedLine = 0;
        while ( true ) {
            let changeMode = false;
            if ( mode_local === 0 ) {
                const refO = this._readInt1( endRead );
                totalV = refO.refI;
                endRead = refO.endRead;
                mode_local = 1;
                nowReadedLine = 0;
                maxLength = this._currentObject.data.indexOf( ';;', endRead ) + 1;
                if ( maxLength <= 0 ) {
                    maxLength = this._currentObject.data.length
                }
            }
            else {
                let find = 0;
                switch ( mode ) {
                    case 0:
                        find = this._currentObject.data.indexOf( ',', endRead ) + 1;
                        break;
                    case 1:
                        find = this._currentObject.data.indexOf( ';,', endRead ) + 1;
                        break;
                }

                if ( find === 0 || find > maxLength ) {
                    find = maxLength;
                    mode_local = 0;
                    changeMode = true;
                }

                switch ( this._currentObject.type ) {
                    case "Mesh":
                        switch ( mode ) {
                            case 0:
                                this._readVertex1( this._currentObject.data.substr( endRead, find - endRead ) );
                                break;
                            case 1:
                                this._readFace1( this._currentObject.data.substr( endRead, find - endRead ) );
                                break;
                        }
                        break;

                    case "MeshNormals":
                        switch ( mode ) {
                            case 0:
                                this._readNormalVector1( this._currentObject.data.substr( endRead, find - endRead ) );
                                break;
                            case 1:
                                this._readNormalFace1( this._currentObject.data.substr( endRead, find - endRead ),
                                    nowReadedLine );
                                break;
                        }
                        break;
                }
                endRead = find + 1;
                nowReadedLine++;
                if ( changeMode ) {
                    mode++;
                }
            }
            if ( endRead >= this._currentObject.data.length ) {
                break;
            }
        }
    }

    _readInt1( start ) {
        const find = this._currentObject.data.indexOf( ';', start );
        return {
            refI: parseInt( this._currentObject.data.substr( start, find - start ) ),
            endRead: find + 1
        };
    }

    _readVertex1( line ) {
        //頂点が確定
        const data = this._readLine( line.trim() )
            .substr( 0, line.length - 2 )
            .split( ";" );
        this._currentGeo.Geometry.vertices.push( new THREE.Vector3( parseFloat( data[ 0 ] ), parseFloat( data[ 1 ] ), parseFloat( data[ 2 ] ) ) );
        //頂点を作りながら、Skin用構造も作成してしまおう
        this._currentGeo.Geometry.skinIndices.push( new THREE.Vector4( 0, 0, 0, 0 ) );
        this._currentGeo.Geometry.skinWeights.push( new THREE.Vector4( 1, 0, 0, 0 ) );
        this._currentGeo.VertexSetedBoneCount.push( 0 );
    }

    _readFace1( line ) {
        // 面に属する頂点数,頂点の配列内index という形で入っている
        const data = this._readLine( line.trim() )
            .substr( 2, line.length - 4 )
            .split( "," );
        this._currentGeo.Geometry.faces.push( new THREE.Face3( parseInt( data[ 0 ], 10 ), parseInt( data[ 1 ],
            10 ), parseInt( data[ 2 ], 10 ), new THREE.Vector3( 1, 1, 1 )
            .normalize() ) );
    }

    _readNormalVector1( line ) {
        const data = this._readLine( line.trim() )
            .substr( 0, line.length - 2 )
            .split( ";" );
        this._currentGeo.normalVectors.push( new THREE.Vector3( parseFloat( data[ 0 ] ), parseFloat(
            data[ 1 ] ), parseFloat( data[ 2 ] ) ) );
    }

    _readNormalFace1( line, nowReaded ) {

        const data = this._readLine( line.trim() )
            .substr( 2, line.length - 4 )
            .split( "," );

        let nowID = parseInt( data[ 0 ], 10 );
        const v1 = this._currentGeo.normalVectors[ nowID ];
        nowID = parseInt( data[ 1 ], 10 );
        const v2 = this._currentGeo.normalVectors[ nowID ];
        nowID = parseInt( data[ 2 ], 10 );
        const v3 = this._currentGeo.normalVectors[ nowID ];

        this._currentGeo.Geometry.faces[ nowReaded ].vertexNormals = [ v1, v2, v3 ];

    }

    _setMeshNormals() {
        let endRead = 0;
        let totalV = 0;
        let totalFace = 0;
        let mode = 0;
        let mode_local = 0
        while ( true ) {
            switch ( mode ) {
                case 0: //vertex
                    if ( mode_local === 0 ) {
                        const refO = this._readInt1( 0 );
                        totalV = refO.refI;
                        endRead = refO.endRead;
                        mode_local = 1;
                    }
                    else {
                        let find = this._currentObject.data.indexOf( ',', endRead ) + 1;
                        if ( find === -1 ) {
                            find = this._currentObject.data.indexOf( ';;', endRead ) + 1;
                            mode = 2;
                            mode_local = 0;
                        }
                        const line = this._currentObject.data.substr( endRead, find - endRead );
                        const data = this._readLine( line.trim() )
                            .split( ";" );
                        this._currentGeo.normalVectors.push( [ parseFloat( data[ 0 ] ), parseFloat( data[ 1 ] ),
                            parseFloat( data[ 2 ] )
                        ] );
                        endRead = find + 1;
                    }
                    break;
            }
            if ( endRead >= this._currentObject.data.length ) {
                break;
            }
        }
    }

    _setMeshTextureCoords() {
        this._tmpUvArray = [];
        this._currentGeo.Geometry.faceVertexUvs = [];
        this._currentGeo.Geometry.faceVertexUvs.push( [] );

        let endRead = 0;
        let totalV = 0;
        let totalFace = 0;
        let mode = 0;
        let mode_local = 0
        while ( true ) {
            switch ( mode ) {
                case 0: //vertex
                    if ( mode_local === 0 ) {
                        const refO = this._readInt1( 0 );
                        totalV = refO.refI;
                        endRead = refO.endRead;
                        mode_local = 1;
                    }
                    else {
                        let find = this._currentObject.data.indexOf( ',', endRead ) + 1;
                        if ( find === 0 ) {
                            find = this._currentObject.data.length;
                            mode = 2;
                            mode_local = 0;
                        }
                        const line = this._currentObject.data.substr( endRead, find - endRead );
                        const data = this._readLine( line.trim() )
                            .split( ";" );
                        if ( this.IsUvYReverse ) {
                            this._tmpUvArray.push( new THREE.Vector2( parseFloat( data[ 0 ] ), 1 - parseFloat( data[
                                1 ] ) ) );
                        }
                        else {
                            this._tmpUvArray.push( new THREE.Vector2( parseFloat( data[ 0 ] ), parseFloat( data[ 1 ] ) ) );
                        }
                        endRead = find + 1;
                    }
                    break;
            }
            if ( endRead >= this._currentObject.data.length ) {
                break;
            }
        }
        //UV読み込み完了。メッシュにUVを割り当てる
        this._currentGeo.Geometry.faceVertexUvs[ 0 ] = [];
        for ( var m = 0; m < this._currentGeo.Geometry.faces.length; m++ ) {
            this._currentGeo.Geometry.faceVertexUvs[ 0 ][ m ] = [];
            this._currentGeo.Geometry.faceVertexUvs[ 0 ][ m ].push( this._tmpUvArray[ this._currentGeo.Geometry
                .faces[ m ].a ] );
            this._currentGeo.Geometry.faceVertexUvs[ 0 ][ m ].push( this._tmpUvArray[ this._currentGeo.Geometry
                .faces[ m ].b ] );
            this._currentGeo.Geometry.faceVertexUvs[ 0 ][ m ].push( this._tmpUvArray[ this._currentGeo.Geometry
                .faces[ m ].c ] );

        }
        this._currentGeo.Geometry.uvsNeedUpdate = true;
    }

    _setMeshMaterialList() {
        let endRead = 0;
        let mode = 0;
        let mode_local = 0;
        let readCount = 0;
        while ( true ) {
            if ( mode_local < 2 ) {
                const refO = this._readInt1( endRead );
                endRead = refO.endRead;
                mode_local++;
                readCount = 0;
            }
            else {
                let find = this._currentObject.data.indexOf( ';', endRead );
                if ( find === -1 ) {
                    find = this._currentObject.data.length;
                    mode = 3;
                    mode_local = 0;
                }
                const line = this._currentObject.data.substr( endRead, find - endRead );
                const data = this._readLine( line.trim() )
                    .split( "," );
                for ( let i = 0; i < data.length; i++ ) {
                    this._currentGeo.Geometry.faces[ i ].materialIndex = parseInt( data[ i ] );
                }
                endRead = this._currentObject.data.length;
            }
            if ( endRead >= this._currentObject.data.length || mode >= 3 ) {
                break;
            }
        }
    }

    _setMaterial() {
        const _nowMat = new THREE.MeshPhongMaterial( {
            color: Math.random() * 0xffffff
        } );

        _nowMat.side = THREE.FrontSide;
        _nowMat.name = this._currentObject.name;

        let endRead = 0;
        // １つめの[;;]まで＝Diffuse
        let find = this._currentObject.data.indexOf( ';;', endRead );
        let line = this._currentObject.data.substr( endRead, find - endRead );
        const data = this._readLine( line.trim() )
            .split( ";" );
        _nowMat.color.r = parseFloat( data[ 0 ] );
        _nowMat.color.g = parseFloat( data[ 1 ] );
        _nowMat.color.b = parseFloat( data[ 2 ] );

        // 次の [;]まで＝反射率
        endRead = find + 2;
        find = this._currentObject.data.indexOf( ';', endRead );
        line = this._currentObject.data.substr( endRead, find - endRead );
        _nowMat.shininess = parseFloat( this._readLine( line ) );

        // 次の[;;]まで＝反射光？
        endRead = find + 1;
        find = this._currentObject.data.indexOf( ';;', endRead );
        line = this._currentObject.data.substr( endRead, find - endRead );
        const data2 = this._readLine( line.trim() )
            .split( ";" );
        _nowMat.specular.r = parseFloat( data2[ 0 ] );
        _nowMat.specular.g = parseFloat( data2[ 1 ] );
        _nowMat.specular.b = parseFloat( data2[ 2 ] );

        // 次の [;]まで＝発光色?
        endRead = find + 2;
        find = this._currentObject.data.indexOf( ';;', endRead );
        if ( find === -1 ) {
            find = this._currentObject.data.length;
        }
        line = this._currentObject.data.substr( endRead, find - endRead );
        const data3 = this._readLine( line.trim() )
            .split( ";" );
        _nowMat.emissive.r = parseFloat( data3[ 0 ] );
        _nowMat.emissive.g = parseFloat( data3[ 1 ] );
        _nowMat.emissive.b = parseFloat( data3[ 2 ] );

        // 子階層処理
        let localObject = null;
        while ( true ) {
            if ( this._currentObject.children.length > 0 ) {
                localObject = this._currentObject.children.shift();
                if ( this.debug ) {
                    console.log( 'processing ' + localObject.name );
                }
                const fileName = localObject.data.substr( 1, localObject.data.length - 2 );
                switch ( localObject.type ) {
                    case "TextureFilename":
                        _nowMat.map = this.texloader.load( this.baseDir + fileName );
                        break;
                    case "BumpMapFilename":
                        _nowMat.bumpMap = this.texloader.load( this.baseDir + fileName );
                        _nowMat.bumpScale = 0.05;
                        break;
                    case "NormalMapFilename":
                        _nowMat.normalMap = this.texloader.load( this.baseDir + fileName );
                        _nowMat.normalScale = new THREE.Vector2( 2, 2 );
                        break;
                    case "EmissiveMapFilename":
                        _nowMat.emissiveMap = this.texloader.load( this.baseDir + fileName );
                        break;
                    case "LightMapFilename":
                        _nowMat.lightMap = this.texloader.load( this.baseDir + fileName );
                        break;

                    // _nowMat.envMap = this.texloader.load(this.baseDir + data);
                }
            }
            else {
                break;
            }
        }

        this._currentGeo.Materials.push( _nowMat );
    }

    _setSkinWeights() {
        const boneInf = new XBoneInf();

        let endRead = 0;
        // １つめの[;]まで＝name
        let find = this._currentObject.data.indexOf( ';', endRead );
        let line = this._currentObject.data.substr( endRead, find - endRead );
        endRead = find + 1;

        boneInf.boneName = line.substr( 1, line.length - 2 );
        boneInf.BoneIndex = this._currentGeo.BoneInfs.length;

        // ボーンに属する頂点数。今はいらない
        find = this._currentObject.data.indexOf( ';', endRead );
        endRead = find + 1;

        // 次の[;]まで：このボーンに属する頂点Index
        find = this._currentObject.data.indexOf( ';', endRead );
        line = this._currentObject.data.substr( endRead, find - endRead );
        const data = this._readLine( line.trim() )
            .split( "," );
        for ( let i = 0; i < data.length; i++ ) {
            boneInf.Indeces.push( parseInt( data[ i ] ) );
        }
        endRead = find + 1;
        //  次の[;]まで：それぞれの頂点に対するweight
        find = this._currentObject.data.indexOf( ';', endRead );
        line = this._currentObject.data.substr( endRead, find - endRead );
        const data2 = this._readLine( line.trim() )
            .split( "," );
        for ( let i = 0; i < data2.length; i++ ) {
            boneInf.Weights.push( parseFloat( data2[ i ] ) );
        }
        endRead = find + 1;
        // 次の[;] or 最後まで：ini matrix
        find = this._currentObject.data.indexOf( ';', endRead );
        if ( find <= 0 ) {
            find = this._currentObject.data.length;
        }
        line = this._currentObject.data.substr( endRead, find - endRead );
        const data3 = this._readLine( line.trim() )
            .split( "," );

        //boneInf.initMatrix = new THREE.Matrix4();
        //this._ParseMatrixData(boneInf.initMatrix, data3);

        boneInf.OffsetMatrix = new THREE.Matrix4();
        this._ParseMatrixData( boneInf.OffsetMatrix, data3 );
        // boneInf.OffsetMatrix.getInverse(boneInf.initMatrix);

        this._currentGeo.BoneInfs.push( boneInf );

    }

    _makePutBoneList( _RootName, _bones ) {
        let putting = false;
        for ( var frame in this.HieStack ) {
            if ( this.HieStack[ frame ].name === _RootName || putting ) {
                putting = true;
                const b = new THREE.Bone();
                b.name = this.HieStack[ frame ].name;
                b.applyMatrix( this.HieStack[ frame ].FrameTransformMatrix );
                b.matrixWorld = b.matrix;
                b.FrameTransformMatrix = this.HieStack[ frame ].FrameTransformMatrix;
                b.pos = new THREE.Vector3()
                    .setFromMatrixPosition( b.FrameTransformMatrix )
                    .toArray();
                b.rotq = new THREE.Quaternion()
                    .setFromRotationMatrix( b.FrameTransformMatrix )
                    .toArray();
                b.scl = new THREE.Vector3()
                    .setFromMatrixScale( b.FrameTransformMatrix )
                    .toArray();

                if ( this.HieStack[ frame ].parentName && this.HieStack[ frame ].parentName.length > 0 ) {
                    for ( let i = 0; i < _bones.length; i++ ) {
                        if ( this.HieStack[ frame ].parentName === _bones[ i ].name ) {
                            _bones[ i ].add( b );
                            b.parent = i;
                            break;
                        }
                    }
                }
                _bones.push( b );
            }
        }
    }

    _makeOutputGeometry() {

        //１つのmesh終了
        this._currentGeo.Geometry.computeBoundingBox();
        this._currentGeo.Geometry.computeBoundingSphere();

        this._currentGeo.Geometry.verticesNeedUpdate = true;
        this._currentGeo.Geometry.normalsNeedUpdate = true;
        this._currentGeo.Geometry.colorsNeedUpdate = true;
        this._currentGeo.Geometry.uvsNeedUpdate = true;
        this._currentGeo.Geometry.groupsNeedUpdate = true;

        //ボーンの階層構造を作成する

        let mesh = null;

        if ( this._currentGeo.BoneInfs.length > 0 ) {
            const putBones = [];
            this._makePutBoneList( this._currentGeo.baseFrame.parentName, putBones );
            //さらに、ウェイトとボーン情報を紐付ける
            for ( let bi = 0; bi < this._currentGeo.BoneInfs.length; bi++ ) {
                // ズレているskinWeightのボーンと、頂点のないボーン情報とのすり合わせ
                let boneIndex = 0;
                for ( let bb = 0; bb < putBones.length; bb++ ) {
                    if ( putBones[ bb ].name === this._currentGeo.BoneInfs[ bi ].boneName ) {
                        boneIndex = bb;
                        putBones[ bb ].OffsetMatrix = new THREE.Matrix4();
                        putBones[ bb ].OffsetMatrix.copy( this._currentGeo.BoneInfs[ bi ].OffsetMatrix );
                        break;
                    }
                }

                //ウェイトのあるボーンであることが確定。頂点情報を割り当てる
                for ( let vi = 0; vi < this._currentGeo.BoneInfs[ bi ].Indeces.length; vi++ ) {
                    //頂点へ割り当て
                    const nowVertexID = this._currentGeo.BoneInfs[ bi ].Indeces[ vi ];
                    const nowVal = this._currentGeo.BoneInfs[ bi ].Weights[ vi ];

                    switch ( this._currentGeo.VertexSetedBoneCount[ nowVertexID ] ) {
                        case 0:
                            this._currentGeo.Geometry.skinIndices[ nowVertexID ].x = boneIndex;
                            this._currentGeo.Geometry.skinWeights[ nowVertexID ].x = nowVal;
                            break;

                        case 1:
                            this._currentGeo.Geometry.skinIndices[ nowVertexID ].y = boneIndex;
                            this._currentGeo.Geometry.skinWeights[ nowVertexID ].y = nowVal;
                            break;
                        case 2:
                            this._currentGeo.Geometry.skinIndices[ nowVertexID ].z = boneIndex;
                            this._currentGeo.Geometry.skinWeights[ nowVertexID ].z = nowVal;
                            break;
                        case 3:
                            this._currentGeo.Geometry.skinIndices[ nowVertexID ].w = boneIndex;
                            this._currentGeo.Geometry.skinWeights[ nowVertexID ].w = nowVal;
                            break;

                    }
                    this._currentGeo.VertexSetedBoneCount[ nowVertexID ]++;
                    if ( this._currentGeo.VertexSetedBoneCount[ nowVertexID ] > 4 ) {
                        console.log( 'warn! over 4 bone weight! :' + nowVertexID );
                    }
                }
            }

            for ( let sk = 0; sk < this._currentGeo.Materials.length; sk++ ) {
                this._currentGeo.Materials[ sk ].skinning = true;
            }

            const offsetList = [];
            for ( let bi = 0; bi < putBones.length; bi++ ) {
                if ( putBones[ bi ].OffsetMatrix ) {
                    offsetList.push( putBones[ bi ].OffsetMatrix );
                }
                else {
                    offsetList.push( new THREE.Matrix4() );
                }
            }

            const bufferGeometry = new THREE.BufferGeometry()
                .fromGeometry( this._currentGeo.Geometry );
            bufferGeometry.bones = putBones;
            mesh = new THREE.SkinnedMesh( bufferGeometry, this._currentGeo.Materials.length === 1 ? this._currentGeo.Materials[ 0 ] : this._currentGeo.Materials );
            mesh.skeleton.boneInverses = offsetList;
        }
        else {

            const bufferGeometry = new THREE.BufferGeometry()
                .fromGeometry( this._currentGeo.Geometry );
            mesh = new THREE.Mesh( bufferGeometry, this._currentGeo.Materials.length === 1 ? this._currentGeo.Materials[ 0 ] : this._currentGeo.Materials );
        }

        mesh.name = this._currentGeo.name;

        // ボーンが属すよりさらに上の階層のframeMatrixがあれば、割り当てる
        const worldBaseMx = new THREE.Matrix4();
        let currentMxFrame = this._currentGeo.baseFrame.putBone;
        if ( currentMxFrame && currentMxFrame.parent ) {
            while ( true ) {
                currentMxFrame = currentMxFrame.parent;
                if ( currentMxFrame ) {
                    worldBaseMx.multiply( currentMxFrame.FrameTransformMatrix );
                }
                else {
                    break;
                }
            }
            mesh.applyMatrix( worldBaseMx );
        }
        this.Meshes.push( mesh );
    }

    _readAnimationKey() {

        let endRead = 0;
        // １つめの[;]まで＝keyType
        let find = this._currentObject.data.indexOf( ';', endRead );
        let line = this._currentObject.data.substr( endRead, find - endRead );
        endRead = find + 1;

        let nowKeyType = parseInt( this._readLine( line ) );
        // 2つめの[;]まで＝キー数。スルー
        find = this._currentObject.data.indexOf( ';', endRead );
        endRead = find + 1;
        // 本番 [;;,] で1キーとなる
        line = this._currentObject.data.substr( endRead );
        const data = this._readLine( line.trim() )
            .split( ";;," );
        for ( let i = 0; i < data.length; i++ ) {
            //内部。さらに[;]でデータが分かれる
            const data2 = data[ i ].split( ";" );

            let keyInfo = new XKeyFrameInfo();
            keyInfo.type = nowKeyType;
            keyInfo.Frame = parseInt( data2[ 0 ] );
            keyInfo.index = this._currentAnimeFrames.keyFrames.length;
            keyInfo.time = keyInfo.Frame;

            //すでにそのキーが宣言済みでないかどうかを探す
            //要素によるキー飛ばし（回転：0&20フレーム、　移動:0&10&20フレーム　で、10フレーム時に回転キーがない等 )には対応できていない
            if ( nowKeyType != 4 ) {
                let frameFound = false;
                for ( var mm = 0; mm < this._currentAnimeFrames.keyFrames.length; mm++ ) {
                    if ( this._currentAnimeFrames.keyFrames[ mm ].Frame === keyInfo.Frame ) {
                        keyInfo = this._currentAnimeFrames.keyFrames[ mm ];
                        frameFound = true;
                        break;
                    }
                }
                const frameValue = data2[ 2 ].split( "," );
                //const frameM = new THREE.Matrix4();
                switch ( nowKeyType ) {

                    case 0:
                        keyInfo.rot = new THREE.Quaternion( parseFloat( frameValue[ 1 ] ), parseFloat( frameValue[
                            2 ] ), parseFloat( frameValue[ 3 ] ), parseFloat( frameValue[ 0 ] ) * -1 );
                        // frameM.makeRotationFromQuaternion(new THREE.Quaternion(parseFloat(frameValue[1]), parseFloat(frameValue[2]), parseFloat(frameValue[3]), parseFloat(frameValue[0])));
                        //keyInfo.matrix.multiply(frameM);
                        break;
                    case 1:
                        keyInfo.scl = new THREE.Vector3( parseFloat( frameValue[ 0 ] ), parseFloat( frameValue[ 1 ] ),
                            parseFloat( frameValue[ 2 ] ) );
                        // frameM.makeScale(parseFloat(frameValue[0]), parseFloat(frameValue[1]), parseFloat(frameValue[2]));
                        //keyInfo.matrix.multiply(frameM);
                        break;
                    case 2:
                        keyInfo.pos = new THREE.Vector3( parseFloat( frameValue[ 0 ] ), parseFloat( frameValue[ 1 ] ),
                            parseFloat( frameValue[ 2 ] ) );
                        //frameM.makeTranslation(parseFloat(frameValue[0]), parseFloat(frameValue[1]), parseFloat(frameValue[2]));
                        //keyInfo.matrix.multiply(frameM);
                        break;
                    //case 3: this.keyInfo.matrix.makeScale(parseFloat(data[0]), parseFloat(data[1]), parseFloat(data[2])); break;

                }

                if ( !frameFound ) {
                    this._currentAnimeFrames.keyFrames.push( keyInfo );
                }
            }
            else {
                keyInfo.matrix = new THREE.Matrix4();
                this._ParseMatrixData( keyInfo.matrix, data2[ 2 ].split( "," ) );
                this._currentAnimeFrames.keyFrames.push( keyInfo );
            }
        }

    }

    _makeOutputAnimation() {
        const animationObj = new XAnimationObj( this.options );
        animationObj.fps = this.animTicksPerSecond;
        animationObj.name = this._currentAnime.name;
        animationObj.make( this._currentAnime.AnimeFrames );
        this.animations.push( animationObj );
    }

    /**
     * モデルにアニメーションを割り当てます。
     * @param { THREE.Mesh } _model
     * @param { XAnimationObj } _animation
     * @param { bool  } _isBind
     */
    assignAnimation( _model, _animation, _isBind ) {
        let model = _model;
        let animation = _animation;
        let bindFlag = _isBind ? _isBind : true;
        if ( !model ) {
            model = this.Meshes[ 0 ];
        }
        if ( !animation ) {
            animation = this.animations[ 0 ];
        }
        if ( !model || !animation ) {
            return null;
        }

        const put = {};
        put.fps = animation.fps;
        put.name = animation.name;
        put.length = animation.length;
        put.hierarchy = [];
        for ( let b = 0; b < model.skeleton.bones.length; b++ ) {
            let findAnimation = false;
            for ( let i = 0; i < animation.hierarchy.length; i++ ) {
                if ( model.skeleton.bones[ b ].name === animation.hierarchy[ i ].name ) {
                    findAnimation = true;
                    const c_key = animation.hierarchy[ i ].copy();
                    c_key.parent = -1;
                    if ( model.skeleton.bones[ b ].parent && model.skeleton.bones[ b ].parent.type === "Bone" ) {
                        for ( let bb = 0; bb < put.hierarchy.length; bb++ ) {
                            if ( put.hierarchy[ bb ].name === model.skeleton.bones[ b ].parent.name ) {
                                c_key.parent = bb;
                                c_key.parentName = model.skeleton.bones[ b ].parent.name;
                            }
                        }
                    }

                    put.hierarchy.push( c_key );
                    break;
                }
            }
            if ( !findAnimation ) {
                // キーだけダミーでコピー
                const c_key = animation.hierarchy[ 0 ].copy();
                c_key.name = model.skeleton.bones[ b ].name;
                c_key.parent = -1;
                c_key.keys = [];
                for ( let k = 0; k < animation.hierarchy[ 0 ].keys.length; k++ ) {
                    const key_value = {};
                    key_value.time = animation.hierarchy[ 0 ].keys[ k ].time;
                    if ( animation.hierarchy[ 0 ].keys[ k ].pos ) {
                        key_value.pos = new THREE.Vector3();
                    }
                    if ( animation.hierarchy[ 0 ].keys[ k ].scl ) {
                        key_value.scl = new THREE.Vector3();
                        key_value.scl.set( 1, 1, 1 );
                    }
                    if ( animation.hierarchy[ 0 ].keys[ k ].rot ) {
                        key_value.rot = new THREE.Quaternion();
                        key_value.rot.set( 0, 0, 0, 1 );
                    }
                    c_key.keys.push(key_value);
                }

                put.hierarchy.push( c_key );
            }
        }

        if ( !model.geometry.animations ) {
            model.geometry.animations = [];
        }
        if ( bindFlag ) {
            model.geometry.animations.push( THREE.AnimationClip.parseAnimation( put, model.skeleton.bones ) );
            if ( !model.animationMixer ) {
                model.animationMixer = new THREE.AnimationMixer( model );
            }
        }

        return put;
    }

    _readFinalize() {
        //アニメーション情報、ボーン構造などを再構築
        //一部ソフトウェアからの出力用（DirectXとOpenGLのZ座標系の違い）に、鏡面処理を行う
        if ( this.options.zflag ) {
            for ( let i = 0; i < this.Meshes.length; i++ ) {
                this.Meshes[ i ].scale.set( -1, 1, 1 );
            }
        }
    }

    ///

    /////////////////////////////////
    _ParseMatrixData( targetMatrix, data ) {

        targetMatrix.set(
            parseFloat( data[ 0 ] ), parseFloat( data[ 4 ] ), parseFloat( data[ 8 ] ), parseFloat( data[ 12 ] ),
            parseFloat( data[ 1 ] ), parseFloat( data[ 5 ] ), parseFloat( data[ 9 ] ), parseFloat( data[ 13 ] ),
            parseFloat( data[ 2 ] ), parseFloat( data[ 6 ] ), parseFloat( data[ 10 ] ), parseFloat( data[ 14 ] ),
            parseFloat( data[ 3 ] ), parseFloat( data[ 7 ] ), parseFloat( data[ 11 ] ), parseFloat( data[ 15 ] ) );

    }

};

//endregion

module.exports={
    createX(canvas,url){
        if (!Detector.webgl) Detector.addGetWebGLMessage();
        var container, stats, controls;
        var camera, scene, renderer;
        var clock = new THREE.Clock();
        var mixers = [];
        var manager = null;
        var Texloader = null;

        var skeletonHelper = null;

        var Models = [];

        var d = new Date();
        var LastDateTime = null;

        var animates = [];
        var actions = [];
        init();

        function init() {

            LastDateTime = Date.now();

            camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 2000);
            scene = new THREE.Scene();
            scene.add(new THREE.AmbientLight(0x999999));
            // grid
            var gridHelper = new THREE.GridHelper(14, 1, 0x303030, 0x303030);
            gridHelper.position.set(0, -0.04, 0);
            scene.add(gridHelper);

            renderer = new THREE.WebGLRenderer({canvas:canvas});
            renderer.setClearColor(0x666666);

            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 2, 0);
            camera.position.set(2, 7, 28);
            camera.up.set(0, 1, 0);

            var light = new THREE.DirectionalLight(0xeeeeff, 2);
            light.position.set(10, 100, 1).normalize();
            scene.add(light);

            light = new THREE.DirectionalLight(0xaa5555);
            light.position.set(-1, -1, -1).normalize();
            scene.add(light);

            controls.update();
            animate();

            // model load
            manager = new THREE.LoadingManager();
            //manager.onProgress = function (item, loaded, total) {console.log(item, loaded, total);};
            var onProgress = function (xhr) {
                if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                }
            };
            var onError = function (xhr) {
            };

            Texloader = new THREE.TextureLoader();
            var loader = new XLoader(manager, Texloader);

            //download Model file
            loader.baseDir=path.dirname(url)+'\\';
            loader.load([url, { zflag : true } ], function (object) {
                for (var i = 0; i < object.models.length; i++) {
                    Models.push(object.models[i]);
                    scene.add(Models[i]);
                }
                object = null;
            }, onProgress, onError);

        }

        function animate() {

            if(!document.body.contains(canvas))return;
            requestAnimationFrame(animate);
            var nowTime = Date.now();
            var dulTime = nowTime - LastDateTime;
            LastDateTime = nowTime;

            if (animates != null && animates.length > 0) {
                for (var i = 0; i < animates.length; i++) {
                    animates[i].update(dulTime);
                }
            }

            if (Models != null && Models.length > 0) {
                if (skeletonHelper != null) { skeletonHelper.update(); }

            }

            render();
        }
        function render() {
            //renderer.setFaceCulling(THREE.CullFaceFront, THREE.FrontFaceDirectionCW);
            renderer.render(scene, camera);
        }
    }
};