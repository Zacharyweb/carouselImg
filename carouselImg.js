// carouselImg for showing pictures
// Author: Zachary <Email : zhujian1993918@163.com>
function carouselImg(){};
carouselImg.prototype = {
    outerWrap:null,
    imgWrap:null,
    controllerWarp:null,
    ul:null,
    lis:null,
    data:{},
    sign:true,
    timer:null,
    json:[],
    setJson:function(){
        var $this = this;
        $this.json =[
            {  
                width:$this.data.MainPicWidth*0.5,
                height:parseInt($this.data.MainPicHeight*0.5),
                top:10,
                left:parseInt($this.data.MainPicWidth /16),
                opacity:40,
                z:2
            },
            {  
                width:$this.data.MainPicWidth*0.75,
                height:parseInt($this.data.MainPicHeight*0.75),
                top:40,
                left:0,
                opacity:90,
                z:3
            },
            {  
                width:$this.data.MainPicWidth,
                height:$this.data.MainPicHeight,
                top:70,
                left:parseInt($this.data.MainPicWidth / 4),
                opacity:100,
                z:4
            },
            { 
                width:$this.data.MainPicWidth*0.75,
                height:parseInt($this.data.MainPicHeight*0.75),
                top:40,
                left:parseInt($this.data.MainPicWidth*0.75),
                opacity:90,
                z:3
            },
            {   
                width:$this.data.MainPicWidth*0.5,
                height:parseInt($this.data.MainPicHeight*0.5),
                top:10,
                left:parseInt($this.data.MainPicWidth*15/16),
                opacity:40,
                z:2
            }
        ];
    },
    setDefaultParam:function(a){
       a = (a === false ? false : true);
       return a;
    },
    checkParam:function(){
        this.data.showController = this.setDefaultParam(this.data.showController);
        this.data.showText = this.setDefaultParam(this.data.showText);
        this.data.showOuterBorder = this.setDefaultParam(this.data.showOuterBorder);
        this.data.playSpeed = this.data.playSpeed ? this.data.playSpeed : 2000;
        if(this.data.picSrc.length != 5 || !this.data.picSrc){
             alert('请放入5张展示图。');
        }
        if(!this.data.MainPicWidth || !this.data.MainPicHeight){
            alert('请设置图片宽度或高度');
        }
        if(!this.data.picText){
            this.data.picText = ['titleText','titleText','titleText','titleText','titleText'];
        }
        if(!this.data.picHref){
            this.data.picHref = ['#','#','#','#','#'];
        }
    },
    animate:function(obj,json,fn) {
        var $this = this;
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var flag = true;  
            for(var attr in json){  
                var current = 0;
                if(attr == "opacity"){
                    current = Math.round(parseInt($this.getStyle(obj,attr)*100)) || 0;
                }
                else{
                    current = parseInt($this.getStyle(obj,attr)); 
                }
                var step = ( json[attr] - current) / 10;  
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if(attr == "opacity"){
                    if("opacity" in obj.style){
                        obj.style.opacity = (current + step) /100;
                    }
                    else{ 
                        obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                    }
                }
                else if(attr == "zIndex"){
                    obj.style.zIndex = json[attr];
                }
                else{
                    obj.style[attr] = current  + step + "px" ;
                }
                if(current != json[attr]){
                    flag =  false;
                }
            }
            if(flag)  
            {
                clearInterval(obj.timer);
                if(fn)  
                {
                    fn(); 
                }
            }
        },10)
    },
    getStyle: function(obj,attr) {  
        if(obj.currentStyle){
            return obj.currentStyle[attr];  
        }
        else{
            return window.getComputedStyle(obj,null)[attr];  
        }
    },
    cleanSelection:function(){
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    },
    //初始化
    createDoms:function(id){
         var module = document.getElementById(id);
         var template = '';
         template += '<div class="carouselImg-outerWrap">';
         template += '<div class="carouselImg-imgWrap">';
         template += '<ul>';
         template += '</ul>';
         if(this.data.showController){
             template += '<div class="carouselImg-controllerWarp">';
             template += '<span class="carouselImg-prev"><</span>';
             template += '<span class="carouselImg-next">></span>';
             template += '</div>';
         }
         template += '</div>';
         template += '</div>';
         module.innerHTML = template;
    },
    init: function(id){
        this.setJson();
        this.checkParam()
        this.createDoms(id);
        this.ul = document.getElementById(id).getElementsByTagName('ul')[0];
        for (var i = 0; i < 5; i++) {
           var li = document.createElement('li');
           var str = '';
           str += '<a href="'+ this.data.picHref[i] +'" target="_blank">';
           if(this.data.showText){
                 str += '<span>'+ this.data.picText[i] +'</span>';
           };
           str += '<img src="'+ this.data.picSrc[i] +'">';
           str += '</a>';
           li.innerHTML = str ;
           this.ul.appendChild(li);
        }
        this.lis = this.ul.children;
        this.outerWrap = this.ul.parentNode.parentNode;
        this.imgWrap = this.ul.parentNode;
        this.controllerWarp = this.imgWrap.children[1];
        this.outerWrap.style.width = this.data.MainPicWidth*0.75 + this.json[3].left + 'px';
        this.imgWrap.style.height = this.data.MainPicHeight + this.json[2].top + 10 + 'px'; 
        if(!this.data.showOuterBorder){
             this.outerWrap.style.border = 'none';
        }  
    },
    changeJson: function(fn){
        var $this = this;
        for(var i = 0 ; i < $this.json.length; i++){
            $this.animate($this.lis[i],{
                width:$this.json[i].width,
                height:$this.json[i].height,
                left:$this.json[i].left,
                top:$this.json[i].top,
                opacity:$this.json[i].opacity,
                zIndex:$this.json[i].z
            },fn)
        }
    },
    imgChange: function(flag){
        var $this = this;
        if(flag){
            $this.json.unshift($this.json.pop());
        }
        else{
            $this.json.push($this.json.shift());
        }
        $this.changeJson(function(){$this.sign=true;});
        if($this.data.showText){
            $this.cleanAllText();
            if(flag){
                $this.showNextText();
            }
            else{
                $this.showPrevText();
            }
        }
    },
    cleanAllText: function(){
        var $this = this;
        for(var j=0;j<$this.lis.length;j++){
            $this.lis[j].children[0].getElementsByTagName('span')[0].style.display = "none";
        }  
    },
    showPrevText: function(){
        var $this = this;
        for(var j=0;j<$this.lis.length;j++){
            if(parseInt($this.lis[j].style.width) > $this.data.MainPicWidth-10){
                var num = j - 1;
                num < 0 ? num = 4:num;
                $this.lis[num].children[0].getElementsByTagName('span')[0].style.display="block";
            }
        }
    },
    showNextText: function(){
         var $this = this;
         for(var j = 0; j < $this.lis.length;j++){
            if(parseInt($this.lis[j].style.width) > $this.data.MainPicWidth-10){
                var num = j + 1;
                num > 4 ? num = 0 : num; 
                $this.lis[num].children[0].getElementsByTagName('span')[0].style.display="block";
            }
        }
    },
    autoplay:function(){
        var $this = this;
        clearInterval($this.timer);
        $this.timer = setInterval(function(){
             $this.json.unshift($this.json.pop());
             $this.changeJson(null);
            if($this.data.showText){
                  $this.cleanAllText();
                  $this.showNextText();
            }
        },$this.data.playSpeed);
    },
    pause:function(){
        var $this = this;
        clearInterval($this.timer);
    },
    clickController:function(){
        var $this = this;
        var btns = this.controllerWarp.children;
        for(var k in btns){
            btns[k].onclick = function(){
                $this.cleanSelection();
                if(this.className == "carouselImg-prev"){
                    if($this.sign == true){
                        $this.imgChange(false);
                        $this.sign = false;
                    }
                }    
                else{
                     if($this.sign == true){
                        $this.imgChange(true);
                        $this.sign = false;
                     }
                }
            }
        }
    },
    mouseEvent:function(){
        var $this = this;
        this.outerWrap.onmouseover = function(){
            $this.pause();
            $this.animate($this.controllerWarp,{'opacity':100});
        };
        this.outerWrap.onmouseout = function(){
            $this.autoplay();
            $this.animate($this.controllerWarp,{'opacity':50});
        };

    },
    action:function(){
        this.imgChange();
        if(this.data.showText){
            this.lis[1].children[0].getElementsByTagName('span')[0].style.display = "block"; 
        };
        this.autoplay();
        this.clickController();
        this.mouseEvent();
    }
};


