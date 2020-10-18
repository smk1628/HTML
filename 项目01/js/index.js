/*
 * @Author: smk
 * @Date: 2020-07-25 10:48:36
 * @LastEditTime: 2020-07-29 19:09:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html5\项目01\js\index.js
 */

(function () {
    var bootMask = document.querySelector('#bootMask');
    var bootUp = document.querySelector('.boot-up');
    var bootDown = document.querySelector('.boot-down');
    var bootProgress = document.querySelector('.boot-progress');

    var imgArr = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'about1.jpg', 'about2.jpg', 'about3.jpg', 'about4.jpg', 'worksimg1.jpg', 'worksimg2.jpg', 'worksimg3.jpg', 'worksimg4.jpg', 'team.png', 'greenLine.png'];
    var loaded = 0;
    var len = imgArr.length;
    imgArr.forEach(function (item) {
        var imgNode = document.createElement('img');
        imgNode.src = './image/' + item;
        imgNode.addEventListener('load', function () {
            loaded++;
            console.log(loaded);
            bootProgress.style.width = loaded / len * 100 + '%';
        })
    })
    bootProgress.addEventListener('transitionend', function () {
        if (loaded === len) {
            bootUp.style.height = '0%';
            bootDown.style.height = '0%';
            bootProgress.remove();
        }
        console.log('ok');
    })
    bootDown.addEventListener('transitionend', function () {
        bootMask.remove();
    })
})();


/**
 * @description: 设置主题及导航栏的激活样式
 * @param {type} 
 * @return: 
 */
(function () {
    //获取节点
    var navItemNodes = document.querySelectorAll('.nav .nav-item');
    var arrowNode = document.querySelector('.arrow');
    var containtItemNodes = document.querySelectorAll('.containt-item');
    var containtListNode = document.querySelector('.containt-list');
    var headerNode = document.querySelector('#header');
    var mainNode = document.querySelector('#main');
    var navMenuItemNodes = document.querySelectorAll('.menu-item');

    //定义出入场动画
    var animation = [
        {
            //第一屏
            inAnimation: function () {
                var playListNode = document.querySelector('.play-list');
                var iconListNode = document.querySelector('.icon-list');
                playListNode.style.transform = 'translateY(0)';
                iconListNode.style.transform = 'translate(-50%,0)';
            },
            outAnimation: function () {
                var playListNode = document.querySelector('.play-list');
                var iconListNode = document.querySelector('.icon-list');
                playListNode.style.transform = 'translateY(-200px)';
                iconListNode.style.transform = 'translate(-50%,200px)';
            }
        }, {
            //第二屏
            inAnimation: function () {
                var plane1 = document.querySelector('.plane1');
                var plane2 = document.querySelector('.plane2');
                var plane3 = document.querySelector('.plane3');
                plane1.style.transform = 'translate(0,0)';
                plane2.style.transform = 'translate(0,0)';
                plane3.style.transform = 'translate(0,0)';
            },
            outAnimation: function () {
                var plane1 = document.querySelector('.plane1');
                var plane2 = document.querySelector('.plane2');
                var plane3 = document.querySelector('.plane3');
                plane1.style.transform = 'translate(-200px,-200px)';
                plane2.style.transform = 'translate(-200px,200px)';
                plane3.style.transform = 'translate(200px,-200px)';
            }
        }, {
            //第三屏
            inAnimation: function () {
                var pencel1 = document.querySelector('.pencel1');
                var pencel2 = document.querySelector('.pencel2');
                var pencel3 = document.querySelector('.pencel3');
                pencel1.style.transform = 'translate(0,0)';
                pencel2.style.transform = 'translate(0,0)';
                pencel3.style.transform = 'translate(0,0)';
            },
            outAnimation: function () {
                var pencel1 = document.querySelector('.pencel1');
                var pencel2 = document.querySelector('.pencel2');
                var pencel3 = document.querySelector('.pencel3');
                pencel1.style.transform = 'translate(0,-200px)';
                pencel2.style.transform = 'translate(0,200px)';
                pencel3.style.transform = 'translate(200px,-200px)';
            }
        }, {
            //第四屏
            inAnimation: function () {
                var aboutItem1 = document.querySelectorAll('.img-item')[0];
                var aboutItem2 = document.querySelectorAll('.img-item')[1];
                aboutItem1.style.transform = 'rotate(0deg)';
                aboutItem2.style.transform = 'rotate(0deg)';
            },
            outAnimation: function () {
                var aboutItem1 = document.querySelectorAll('.img-item')[0];
                var aboutItem2 = document.querySelectorAll('.img-item')[1];
                aboutItem1.style.transform = 'rotate(45deg)';
                aboutItem2.style.transform = 'rotate(-45deg)';
            }
        }, {
            //第五屏
            inAnimation: function () {
                var teamTitle = document.querySelector('.team .title');
                var teamText = document.querySelector('.team .text');
                teamTitle.style.transform = 'translate(0,0)';
                teamText.style.transform = 'translate(0,0)';
            },
            outAnimation: function () {
                var teamTitle = document.querySelector('.team .title');
                var teamText = document.querySelector('.team .text');
                teamTitle.style.transform = 'translate(-200px,0)';
                teamText.style.transform = 'translate(200px,0)';
            }
        }

    ];
    console.log(animation);
    /*全局变量 */
    //规定当前被激活nav-item的索引值
    var index = 0;
    var preIndex = 0;
    //规定定时器句柄
    var tiemId = null;
    //规定主体高度
    var containtHight = window.innerHeight - headerNode.offsetHeight;
    //设置主体高度
    setContaintHeight();
    //初始化页面
    window.addEventListener('load', () => {
        setActive(index);
    })
    //window的视口改变时执行
    window.addEventListener('resize', function () {
        //重新计算主体高度
        containtHight = window.innerHeight - headerNode.offsetHeight;
        setContaintHeight();
        setActive(index, false);

    })
    //循环设置离场动画
    animation.forEach(function (item) {
        item.outAnimation();
    })

    //循环给navItemNode 添加点击事件
    for (var i = 0; i < navItemNodes.length; i++) {
        navItemNodes[i].index = i;
        navMenuItemNodes[i].index = i;
        navItemNodes[i].addEventListener('click', function () {
            index = this.index;
            setActive(index);
        })
        navMenuItemNodes[i].addEventListener('click', function () {
            index = this.index;
            setActive(index);
        })
    }
    //添加滚轮事件
    //IE,Chrome
    document.addEventListener('mousewheel', showContaintItem);
    //firefox
    document.addEventListener('DOMMouseScroll', showContaintItem);
    /**
     * @description: setContaintHeight() 设置主体高度
     * @param {type}
     * @return:
     */
    function setContaintHeight() {
        //设置主体内容高度
        mainNode.style.height = containtHight + 'px';
        //循环设置containt-item高度
        containtItemNodes.forEach(function (item) {
            item.style.height = containtHight + 'px';
        })
    }
    /**
     * @description: 展示与激活标题对应的主体内容
     * @param {type}
     * @return:
     */
    function showContaintItem(event) {
        if (tiemId !== null) {
            clearTimeout(tiemId);
        }
        tiemId = setTimeout(function () {
            //浏览器兼容
            if (event.wheelDelta) {
                //Chrome滑轮上滚
                if (event.wheelDelta > 0) {
                    index--;
                } else { //下滚
                    index++;
                }
            } else if (event.detail) {
                //火狐滑轮上滚
                if (event.detail < 0) {
                    index--;
                } else { //下滚
                    index++;
                }
            }
            //限定index范围
            if (index < 0) {
                index = 0;
            } else if (index > navItemNodes.length - 1) {
                index = navItemNodes.length - 1;
            }
            //给元素设置激活样式
            setActive(index);
        }, 200)

    }
    /**
      * @description: 设置激活样式函数
      * @param {number} index 要激活元素的索引值
      * @param {booler} flag 是否开启主体过渡
      * @return:
      */
    function setActive(index, flag = true) {

        //循环清除未被选中元素的激活样式
        navItemNodes.forEach(function (item, index) {
            item.classList.remove('active');
            navMenuItemNodes[index].classList.remove('active');
        })
        //给点击的元素添加激活样式
        navItemNodes[index].classList.add('active');
        navMenuItemNodes[index].classList.add('active');
        //移动arrow到被选中的元素
        //计算arrow应移动的位置
        var left = navItemNodes[index].offsetLeft + (navItemNodes[index].offsetWidth - arrowNode.offsetWidth) / 2;
        arrowNode.style.left = left + 'px';
        //移动到标题相应的主体内容
        //是否开启主体内容过渡
        if (flag) {
            containtListNode.classList.add('transition');
        } else {
            containtListNode.classList.remove('transition');
        }
        containtListNode.style.top = -(mainNode.offsetHeight) * index + 'px';
        //设置离场动画
        animation[preIndex].outAnimation();
        //设置入场动画
        animation[index].inAnimation();

        preIndex = index;
    }


})();

/**
 * @description: 设置第一屏轮播图
 * @param {type} 
 * @return: 
 */
(function () {
    var playItemNodes = document.querySelectorAll('.play-item');
    var iconItemNodes = document.querySelectorAll('.icon-item');
    //设置初始轮播的项目
    var playIndex = 0;
    //记录上一次轮播项目的索引值
    var oldPlayIndex = playIndex;
    //记录动画的执行状态
    var isAnimation = false;
    //页面加载完毕后执行初始化
    window.addEventListener('load', () => {
        setPlayActive(playIndex, oldPlayIndex);

    })
    //给icon-item添加点击事件
    for (var i = 0; i < iconItemNodes.length; i++) {
        iconItemNodes[i].index = i;
        iconItemNodes[i].addEventListener('click', function () {
            //判断动画是否在执行中，如果在执行即跳出此函数
            if (isAnimation) {
                return;
            }
            //设置新索引
            playIndex = this.index;
            //设置激活状态及动画
            setPlayActive(playIndex, oldPlayIndex);
        })
    }
    //设置play-item轮播
    setInterval(() => {
        //判断动画是否在执行中，如果在执行即跳出此函数
        if (isAnimation) {
            return;
        }
        //设置新索引自增
        playIndex++;

        if (playIndex > playItemNodes.length - 1) {
            playIndex = 0;
        }
        //设置激活状态及动画
        setPlayActive(playIndex, oldPlayIndex, false);
    }, 4000);
    /**
     * @description: 设置play和icon的激活状态
     * @param {number} index 当前索引
     * @param {number} oldIndex 之前索引
     * @param {booler} flag 默认true 轮播图模式调为false
     * @return: 
     */
    function setPlayActive(index, oldIndex, flag = true) {
        //设置点击时动画在执行
        isAnimation = true;
        //清除所有激活和动画样式
        playItemNodes.forEach(function (item) {
            item.classList.remove('active', 'left-hidden', 'left-show', 'right-hidden', 'right-show');
        })
        iconItemNodes.forEach(function (item) {
            item.classList.remove('active');
        })
        //给相应play-item设置切换动画
        if (index > oldIndex) {
            playItemNodes[index].classList.add('right-show');
            playItemNodes[oldIndex].classList.add('left-hidden');
        } else if (flag && index < oldIndex) {
            playItemNodes[index].classList.add('left-show');
            playItemNodes[oldIndex].classList.add('right-hidden');
        } else if (!flag) {
            playItemNodes[index].classList.add('right-show');
            playItemNodes[oldIndex].classList.add('left-hidden');
        }
        //给相应索引元素加入激活样式
        playItemNodes[index].classList.add('active');
        iconItemNodes[index].classList.add('active');

        //设置旧索引
        oldPlayIndex = playIndex;
        //延时到动画执行完成后结束在执行状态
        setTimeout(function () {
            isAnimation = false;
        }, 2000);
    }
})();

/**
 * @description: 设置第五屏canvas动画
 * @param {type} 
 * @return: 
 */
(function () {
    var itemNodes = document.querySelectorAll('.team .item');
    var canvas = creatCanvas(236, 448);
    itemNodes.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            item.appendChild(canvas);
        })
        item.addEventListener('mouseleave', function () {
            item.removeChild(canvas);
        })
    })

    /**
     * @description: 创建canvas动画
     * @param {num}  w 宽 
     * @param {num}  h 高
     * @return: canvas对象
     */
    function creatCanvas(w, h) {
        var canvasNode = document.createElement('canvas');
        var ctx = canvasNode.getContext('2d');
        //设置画布尺寸
        canvasNode.width = w;
        canvasNode.height = h;
        //储存生成的圆的数据
        var circleList = [];
        //绘制图形
        setInterval(() => {
            //清空画布
            ctx.clearRect(0, 0, canvasNode.width, canvasNode.height);
            for (var i = 0; i < circleList.length; i++) {
                //y轴运动的增量
                circleList[i].deg += .05;
                //y轴加速运动
                circleList[i].y -= circleList[i].deg;
                //x轴曲线摆动
                var x = circleList[i].x + Math.sin(circleList[i].y / 180 * circleList[i].run) * circleList[i].scale;
                if (circleList[i].y < -40) {
                    circleList.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(x, circleList[i].y, circleList[i].r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + circleList[i].red + ',' + circleList[i].green + ',' + circleList[i].blue + ',' + circleList[i].opcity + ')';
                ctx.fill();
            }
        }, 17)
        setInterval(() => {
            var circle = {};
            circle.x = Math.floor(Math.random() * canvasNode.width + 1);
            circle.y = canvasNode.height;
            circle.r = Math.floor(Math.random() * 10) + 4;
            circle.red = Math.floor(Math.random() * 256);
            circle.green = Math.floor(Math.random() * 256);
            circle.blue = Math.floor(Math.random() * 256);
            circle.opcity = 1; //(Math.floor(Math.random() * 10) + 1) / 10;
            circle.deg = 0; //增量
            circle.scale = Math.floor(Math.random() * 6) + 10; //摆动幅度
            circle.run = Math.floor(Math.random() * 4) + 1; //轨道数
            circleList.push(circle);
            //console.log(circleList);
        }, 50);

        return canvasNode;
    }
})();
/**
 * @description: 背景音乐
 * @param {type} 
 * @return: 
 */
(function () {
    var audioBtn = document.querySelector('.audio');
    var audioNode = document.querySelector('audio');

    audioBtn.addEventListener('click', function () {
        if (audioNode.paused) {
            audioNode.play();
            audioBtn.classList.add('active');

        } else {
            audioNode.pause();
            audioBtn.classList.remove('active');
        }
    })
})();