function LPL(vArg){
    //首先这里要创建要给数组，把查找的元素节点存贮起来 所以我们封装的这个库 其实返回的是一个this.elements的数组 在这个数组中进行遍历 来达到我们的要求 我们所有的操作都是围绕这个this.elements[i]来进行的操作
    this.elements = [];
    switch(typeof vArg){
        case "function":
            addEvent(window,"load",vArg);
            break;
        case "string":
        switch(vArg[0]){
            case ".":
            var nodes = elementsByClassName(document, vArg.substring(1));
            this.elements = nodes;
            break;
            case "#":
            var node = document.getElementById(vArg.substring(1));//不能让一个数组等于一个变量 所以在这里要把这个push进去
            // alert(vArg.substring(1));
            this.elements.push(node);
            break;
            default:
                var nodes = document.getElementsByTagName(vArg);
                this.elements = nodes;
                break;
        }
        break;
        case "object":
            this.elements.push(vArg);
            break;
        default:
            alert("error");
            break;
    }
}
function $(vArg){
    return new LPL(vArg);
}
LPL.prototype.hover = function(funcOver,funcOut){
    for(var i = 0 ; i < this.elements.length ; i++){
        addEvent(this.elements[i],"mouseover",funcOver);
        addEvent(this.elements[i],"mouseout",funcOut);
    }
}
LPL.prototype.click = function(func){
    for(var i = 0 ; i < this.elements.length; i++){
        addEvent(this.elements[i],"click",func);
    }
}

//封装css方法，作用是 当只传入一个参数的时候 可以获取值  当传入两个参数的时候 后面一个参数的意思是把前面的参数的值改变成后一个参数  而最后 也可以用json对象的方式传入参数来改变css中某个属性的值

//下面，我们来封装LPL.css方法
LPL.prototype.css = function(){
    switch (arguments.length){
        case 2 :
            for(var i = 0 ; i < this.elements.length ; i++){
                this.elements[i].style[arguments[0]] = arguments[1];
            }//进行这个循环的原因是 这个构造函数在最开始的时候构造的就不是一个对象而是一个数组
//有一个问题 这里为什么是this.elements[i].style[arguments[0]]而不是this.elements[i].style.arguments[0]***因为找不到后面的【0】****************************************************************************************************************************************
            break;
        case 1 :
            if(typeof arguments[0] == "string"){
                return getStyle(this.elements[0],arguments[0])//如果这里不做特殊说明多个变量的话则自动返回第一个变量的值
            }else{
                //json对象的方式传参。
                var json = arguments[0];
                for(var i = 0 ; i < this.elements.length ; i++){
                    //这种形式看起来很别扭 所以我们用json来表示这个arguments【0】
                    // for(var attr in arguments[0]){
                    //     this.elements[0].style[attr] = arguments[0][attr];
                    // }
                    for(var attr in json){
                        this.elements[i].style[attr] = json[attr]//我在这里用的是this.elements[i]，老师用的是this.elements[0] 我能更改符合条件所有的lpl对象 而老师的方法是默认更改第一个对象
                    }
                }
            }
    }
}
LPL.prototype.on = function(){
    //给一个对象添加事件
    switch(arguments.length){
        case 1:
        //如果有一个的情况下 则说明我是通过对象来传入参数的 通过对象来传入参数的时候 首先要把这个对象给拿出来 拿出来了以后通过遍历这个对象 遍历以后得到的东西就是里面的attr  这个attr有一个值 这个值就是json[attr]通过让这个对象的attr 等于 这个对象的json[attr] 来得到最后的结果  这里重点还是addevent
            var json = arguments[0];
            for(var i = 0 ; i < this.elements.length ; i++){
                for( var attr in json){
                    addEvent(this.elements[i],attr,json[attr]);
                    //json[attr]的意思是json对象中 attr这个东西的值
                }
            }
        case 2:
         //如果有两个参数的情况下 则说明直接给这个构造函数new出来的东西添加函数 这个时候添加函数就有可能有很多的事件可以来添加，这个事件添加的时候就会用空格来分割开来 所以我们在添加事件的时候首先要用空格 split这个东西来把每个事件单独挑出来 单独拿出来了以后把这些事件组成一个新的数组，新的数组里面就可以通过遍历来添加每个事件的属性了，添加的时候要注意永远把握  对象 事件类型 事件的顺序来添加函数
            var eventAttr = arguments[0].split(" ");
            for(var i = 0 ; i < this.elements.length ; i++){
                for(var j = 0 ; j < eventAttr.length; j++){
                    addEvent(this.elements[i], eventAttr[j],arguments[1]);
                }
            }
            break;
        case 3:
        //如果有三个参数的情况下 则就是考虑到时间委托的情况 第一个参数意思是事件对象，第二个参数的意思是需要触发事件的对象 这里要注意target的处理 第三个是需要执行的函数
         var func = arguments[2];
         var targetThing = arguments[1];
         for(var i = 0 ; i < this.elements.length ; i++){
            addEvent(this.elements[i] , arguments[0],function(ev){
                var e = ev || window.event;
                var target = e.target || window.event.srcElement;
                if(target.nodeName.toLowerCase() == targetThing){
                    func.call(target);
                }
            })
         }
         break;
         default:
            alert("error");
            break;
    }
}
//那么接下来我们来添加一个新的方法：off方法
LPL.prototype.off = function(event,func){
    switch (arguments.length){
        case 1:
            for(var j = 0 ; i < this.elements.length ; i++){
                var str = arguments[0];
                this.elements[i]["on" + str] = " "
            }
        break;


        case 2 :
            for(var i = 0 ; i < this.elements.length ; i++){
                removeEvent(this.elements[i],event,func);
            }
        break;
    }

}

//index 1.找到兄弟节点 2.找到下标
LPL.prototype.toggle = function(){
    for(var i = 0 ; i < this.elements.length ; i++){
        // var count = 0 ;
        var _arguments = arguments;
        addToggle(this.elements[i]);

    }
    function addToggle(obj){
        var count = 0 ;
        addEvent(obj,"click",function(){
            _arguments[count++ % _arguments.length].call(obj);
        })
    }
    //这种方法只能添加上第一个函数 后面的函数添加不上了
}














function getStyle(elem, attr){
    return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem)[attr];
}

function elementsByClassName(parentNode, className){
    //<1>查找parentNode下所有的子节点
    var nodes = parentNode.getElementsByTagName("*");
    var arr = [];
    for(var i = 0; i < nodes.length; i++){
        if(nodes[i].className == className){
            arr.push(nodes[i]);
        }
    }
    return arr;
}


function addEvent(obj, eventType, func){
    if(obj.addEventListener){
        obj.addEventListener(eventType, func, false);
    }else{
        obj.attachEvent("on" + eventType, func);
    }
}
function removeEvent(obj, eventType, func){
    if(obj.removeEventListener){
        obj.removeEventListener(eventType, func);
    }else{
        obj.detachEvent("on" + eventType, func);
    }
}