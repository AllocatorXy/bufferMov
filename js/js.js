window.onload = function () 
{
	var oDivMov = document.getElementById('move');
	var oDivMov2 = document.getElementById('move2');
	var iTarget1 = oDivMov.offsetLeft+oDivMov.offsetWidth;
	var iTarget2 = oDivMov2.offsetLeft;
	var oBody = document.getElementsByTagName('body')[0];
	var arr = [0,0];var arr2 = [1,0];

	function act(obj,flag,defTar,timerId) //用外部变量保存target不用动态计算的原因是：
	{									 //这样狂点也不会因为在未完成位移的情况下飘移
		clearInterval(timerId);
		var oTarLeft = null;
		if (flag === 0) 
		{
			oTarLeft = defTar;
			flag = 1;
		}
		else
		{
			oTarLeft = defTar-obj.offsetWidth;
			flag = 0;
		}
		timerId = setInterval(function () {
				var speed = (oTarLeft - obj.offsetLeft)/10;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				obj.style.left = obj.offsetLeft+speed+'px';
			}, 15);	
		var arr = [flag,timerId]; 
		return arr;
		//clearInterval的参数是1~n的正整数id，而js传参是传值，所以不能直接传递timer。
		//需要把定时器的id传出去再赋给timer本身然后才能做到异步清除定时器且不混乱。
	}

	/*这里有一个小问题，前两次点击有一个块不会同步运动，待解决*/
	oDivMov.onclick = function () 
	{
		arr = act(oDivMov,arr[0],iTarget1,arr[1]);
		arr2 = act(oDivMov2,arr2[0],iTarget2,arr2[1]);
	};
	oDivMov2.onclick = function () 
	{
		arr2 = act(oDivMov2,arr2[0],iTarget2,arr2[1]);
		arr = act(oDivMov,arr[0],iTarget1,arr[1]);
	};
};