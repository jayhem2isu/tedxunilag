(function() {

    var width, height, canvas, ctx, largeHeader, target, animateHeader, square, shapes = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('top');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('top-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        shapes = [];
        for(var i = 0; i < Math.ceil(width/150); i++){
            var s = new Square();
            shapes.push(s);
        }  

        animate(); 
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }
    

    function animate() {
        // if(animateHeader) {
        //     ctx.clearRect(0,0,width,height);
        //     square.draw();
        // }
        ctx.clearRect(0,0,width,height);
        for(var o in shapes){
            shapes[o].draw();
        }
        requestAnimationFrame(animate);
    }


    function Square(){

        var _this = this;
        var Colors = {
            red: 'red',
            blue: 'blue',
            green: 'green'
        };

        // constructor
        (function(){
            _this.pos = {};
            init();
        })();

        function selectColor(){
            var seed = Math.floor(Math.random() * 3);

            if(seed == 0) return Colors.red;
            else if(seed == 1) return Colors.blue;
            if(seed == 2) return Colors.green;
        }


        function init(){
            _this.maxAlpha = 0.13;
            _this.alpha = 0.0005;
            _this.alphaSteps = Math.random() * 0.0004 + 0.0005;
            _this.velocity = Math.random() * 0.15 + 0.05;
            _this.alphaIsIncreasing = true;
            _this.size = Math.random() * width/20 + 15; 
            _this.strokeColor = Colors.red;
            _this.pos.x = Math.random() * (width - _this.size) + _this.size/2;
            _this.pos.y = Math.random() * (height - _this.size) + _this.size/2; 
            _this.lineWidth = Math.floor(_this.size * 0.05) + 1;
            
            console.log(_this);
        }

        function getStrokeStyle(strokeColor, alpha){
            if(strokeColor == Colors.red) return 'rgba(255, 0, 0,'+alpha+')';
            else if(strokeColor == Colors.green) return 'rgba(0, 255, 0,'+alpha+')';
            else if(strokeColor == Colors.blue) return 'rgba(0, 0, 255,'+alpha+')';
            else return 'rgba(0, 0, 0, 0.5)'; //return black as default
        }

        this.draw = function(){
            console.log('called draw()');
            if(_this.alpha <= 0)
                init();
            
            if(_this.alpha >= _this.maxAlpha)
                _this.alphaIsIncreasing = false;
            

            ctx.lineWidth = _this.lineWidth;
            ctx.strokeStyle = getStrokeStyle(_this.strokeColor, _this.alpha);
            ctx.strokeRect(_this.pos.x, _this.pos.y, _this.size, _this.size);

            console.log('alpha == ' + _this.alpha + 'line == ' + _this.lineWidth);

            if(_this.alphaIsIncreasing) _this.alpha += _this.alphaSteps;
            else _this.alpha -= _this.alphaSteps;
            _this.pos.y -= _this.velocity;

        }
    }

})();