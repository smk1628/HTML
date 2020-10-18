/*
 * @Author: your name
 * @Date: 2020-07-28 10:17:29
 * @LastEditTime: 2020-07-28 11:19:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html5\无缝轮播图\js\index.js
 */
(function () {
    var listNode = document.querySelector('.banner-list');
    var itemNodes = document.querySelectorAll('.banner-item');
    var left = 0;
    var index = 0;
    var itemLenght = itemNodes[0].offsetWidth
    listNode.appendChild(itemNodes[0].cloneNode(true));//克隆第一个节点添加至末尾
    listNode.appendChild(itemNodes[1].cloneNode(true));//克隆第一个节点添加至末尾
    setInterval(() => {
        index += 1;
        if (index === itemNodes.length + 1) {
            index = 0;
            left = 0;
            //console.log(index);
            listNode.classList.remove('transition');
            listNode.style.left = left + 'px';
            //console.log(index);
        } else {
            listNode.classList.add('transition');
            time = 4000;
        }

        left = - itemLenght * index;
        listNode.style.left = left + 'px';
        //console.log(itemNodes.length);
    }, 4000);

})()