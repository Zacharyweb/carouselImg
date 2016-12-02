# 仿旋转木马图片展示组件

## 组件说明

一款源生javaScript编写的仿旋转木马式、用于图片轮播展示的组件。
[效果展示](http://www.zjresume.com/project/carouselImg/demo.html)

## 浏览器支持

* 支持IE6+、Firefox、Opera 、Safari 、Chrome浏览器。

## 使用方法

### 使用步骤

1.引入`carouselImg.css`和`carouselImg.js`文件。   

2.实例化一个新的carouselImg组件对象。
  ```javascript
  var newObj = new carouselImg();
  ```
3.设置组件相关参数。
  ```javascript
  newObj.data = {
    //图片链接
    picSrc:['img/jp01.jpg','img/jp02.jpg','img/jp03.jpg','img/jp04.jpg','img/jp05.jpg'],
    //随图片展示的文字内容
    picText:['titleText','titleText','titleText','titleText','titleText'],
    //图片超链接
    picHref:['javascript:;','javascript:;','javascript:;','javascript:;','javascript:;'],
    //主图宽度
    MainPicWidth:800,
    //主图高度
    MainPicHeight:500,
  };
  ```
4.组件初始化。
  ```javascript
  //init()方法需要传入的参数为存放组件的容器的id，字符串格式。
  newObj.init(id);
  ```
5.组件开始运行。
  ```javascript
  //组件开始运行
  newObj.action();
  ```

### 举个栗子

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>carouselImgModule</title>
    <link rel="stylesheet" href="carouselImg.css">
</head>
<body>
    <div id="go-round-module"></div>
</body>
</html>
<script src="carouselImg.js"></script>
<script>
    //创建组件对象
    var carouselimg = new carouselImg();
    //设置组件参数
    carouselimg.data = {
        picSrc:['img/jp01.jpg','img/jp02.jpg','img/jp03.jpg','img/jp04.jpg','img/jp05.jpg'],//Array
        picText:['titleText','titleText','titleText','titleText','titleText'],//Array
        picHref:['javascript:;','javascript:;','javascript:;','javascript:;','javascript:;'],//Array
        MainPicWidth:800, //Number 以px为单位。
        MainPicHeight:500,//Number 以px为单位。
        playSpeed:3000,//Number 以ms为单位 默认2000。
        showController:true,//Boolean 默认true。
        showText:true,//Boolean 默认true。
        showOuterBorder:true//Boolean 默认true。
    };
    //组件初始化
    carouselimg.init('go-round-module');
    //组件开始运行
    carouselimg.action();
</script>
```

### 相关说明

* __newObj.data__相关参数   
   newObj.data对象__必须设置值__的属性有__picSrc__、__MainPicWidth__、__MainPicWidth__三项。   
   newObj.data对象__强烈建议设置值__的属性有__picText__、__picHref__两项。   
   newObj.data对象__可以选择设置值__的属性有__playSpeed__、__showController__、__showText__、__showOuterBorder__四项。   
   __各属性值的数据类型请参见举例中的标注说明。__

* __newObj.init()__方法   
   newObj.init()需要传入参数(字符串格式传入),即传入存放组件的容器的id值，__html中需要事先存在相应的标签__。

* __newObj.action()__方法   
   newObj.action()需要在前面的设置都完成后在执行，需要放置在最后，顺序不可颠倒。




