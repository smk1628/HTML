(function (w) {
	w.M = {}
	w.M.mac = function (imgNodes, r, imgWigth) { //img节点 辐射距离 图片宽度
		var f = imgWigth * 2;
		var size = imgWigth / r;
		document.onmousemove = function (ev) {
			ev = ev || event;
			imgNodes.forEach(function (item) {
				var a = item.getBoundingClientRect().top + (item.offsetHeight / 2) - ev.clientY;
				var b = item.getBoundingClientRect().left + (item.offsetWidth / 2) - ev.clientX;
				var c = Math.sqrt(a * a + b * b);
				if (c > r) {
					c = r;
				}
				item.style.width = (f - c * size) + "px";
			})
		}
	}
})(window)