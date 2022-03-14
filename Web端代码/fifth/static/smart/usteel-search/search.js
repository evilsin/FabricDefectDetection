$(".sl-b-multiple").click(function(){
	$(".sl-ext").css("visibility","");
	$(this).closest(".sl-ext").css("visibility","hidden");
	$(".usteel-search").removeClass("multiple");
	$(this).closest(".usteel-search").addClass("multiple");
	
	let sel_size = 0;
	let liArray = $(this).parents(".usteel-search").find("li");
	let btnPrimary = $(this).parents(".usteel-search").find(".btn-primary");
	
	liArray.each(function(){
		if($(this).attr("class") != "selected"){
			sel_size++;
		}
	});
	
	(liArray.length == sel_size)?btnPrimary.addClass("disabled"):btnPrimary.removeClass("disabled");
	
	$(".usteel-search").find("li.selected").removeClass("selected");
	
});
	/*******组合索引跳转*********/
$(".usteel-search .sl-value .sl-btns a[class*='btn-primary']").on("click",function(){
	
	var $_thisClass = $(this).attr("class");
	var $_thisParents = $(this).parents(".usteel-search.multiple").attr("data_type");
	var $_thisParentsFindSelected = $(this).parents(".usteel-search.multiple").find("li.selected");
	var urlData = "";
	if($_thisClass.indexOf("disabled") >= 0){
		layer.msg("请先选择类别");
		return false;
	}else {
//			console.log("********************************");
//			console.log("父级数据类型："+$_thisParents);
		urlData += $_thisParents+"=";
		$_thisParentsFindSelected.each(function(i,e){
//				console.log("下标"+i+"\tdomID："+$(e).attr("data_id"));
			urlData += $(e).attr("data_id")+",";
		});
		urlData = urlData.substring(0,urlData.length-1);
	}
//		console.log("传值:"+urlData);
	locationHref(urlData);
});

function locationHref(goUrlParameter,domId,page){
	
//	console.log("接受:"+goUrlParameter);
//	console.log("domId:"+domId);
//	console.log("page:"+page);
//	var load = layer.load(2, {shade: [0.1,'#000']});
	
	var locationSearch = window.location.search;
	var locationDomId = window.location.hash;
	var urlHref = "?";
	var locationSearchArray;
	var usrJson = [];
	var goUrl_array = goUrlParameter.split("&");
	var goUrl_json = [];
//	console.log(goUrl_array[1]);
	var type = 0;
	if(locationSearch != ""){
		type = 1;
		locationSearch = locationSearch.substr(1,locationSearch.length);
//		console.log(locationSearch);
		locationSearchArray = locationSearch.split("&");
//		console.log(locationSearchArray);
		for(let i=0 ; i<locationSearchArray.length ; i++){
//			console.log(locationSearchArray[i]);
			let arrayAll = locationSearchArray[i].split("=");
			usrJson.push([arrayAll[0],arrayAll[1]]);
		}
//		console.log(usrJson);
		
		if(goUrl_array[1] != undefined){
			for (let i=0; i<goUrl_array.length ; i++) {
				let arrayAll = goUrl_array[i].split("=");
				goUrl_json.push([arrayAll[0],arrayAll[1]]);
//				console.log(goUrl_json);
			}
			for (let i=0; i<usrJson.length; i++) {
				for (let j=0; j<goUrl_json.length; j++) {
//					console.log(usrJson[i][0]+"@@"+goUrl_json[j][0]);
					if(usrJson[i][0] == goUrl_json[j][0]){
						type = 2;
						usrJson[i][1] = goUrl_json[j][1];
//						console.log(usrJson[i][1]+"##"+goUrl_json[j][1]);
					}
					if(page == undefined){
						if(usrJson[i][0] == "page"){
							usrJson[i][1] = "1";
						}else if (usrJson[i][0] == "limit"){
							usrJson[i][1] = "10";
						}
					}
				}
				urlHref += usrJson[i][0]+"="+usrJson[i][1]+"&";
			}
			urlHref = urlHref.substring(0,urlHref.length-1);
		}else {
//			console.log(domId);
			goUrl_array = goUrlParameter.split("=");
//			console.log(goUrl_array);
			for(let i=0 ; i<usrJson.length ; i++){
//				console.log(usrJson[i][0]+"@@"+goUrl_array[0]);
				if(usrJson[i][0] == goUrl_array[0]){
					type = 2;
					usrJson[i][1] = goUrl_array[1];
				}
				if(page == undefined){
					if(usrJson[i][0] == "page"){
						usrJson[i][1] = "1";
					}else if (usrJson[i][0] == "limit"){
						usrJson[i][1] = "10";
					}
				}
//				console.log(usrJson[i][0]+"##"+usrJson[i][1]);
				urlHref += usrJson[i][0]+"="+usrJson[i][1]+"&";
			}
	//		console.log(usrJson);
			urlHref = urlHref.substring(0,urlHref.length-1);
		}
	}
//	console.log("type:"+type);
	if(type == 0){
		urlHref += goUrlParameter;
	}else if (type == 1){
		urlHref += "&"+goUrlParameter;
	}
//	console.log(locationDomId);
	urlHref += (domId != undefined)?domId:(locationDomId != ""?locationDomId:"#usteel-condition");
	layer.msg("跳转到当前界面下:"+urlHref);
	console.log("跳转到当前界面下:"+urlHref);
//	window.location.href = urlHref;
	return false;
}

$(".sl-value .sl-v-list ul li a").click(function (){
	let sel_size = 0;
	let liArray = $(this).parents(".usteel-search.multiple").find("li");
	let btnPrimary = $(this).parents(".usteel-search.multiple").find(".btn-primary");
//	console.log(liArray);
//	console.log(btnPrimary)
	let $_this = $(this).closest("li");
	if (liArray.length != 0 && btnPrimary.length != 0){
		$_this.attr("class")?$_this.attr("class",""):$_this.attr("class","selected");
	
		liArray.each(function(){
			if($(this).attr("class") != "selected"){
				sel_size++;
			}
		});
		
		(liArray.length == sel_size)?btnPrimary.addClass("disabled"):btnPrimary.removeClass("disabled");
	}else {
		var dataKey = $(this).parents("[class='usteel-search']").attr("data_type");
		var dataVal = $(this).parents("li").attr("data_id");
//		layer.msg("key:"+dataKey+"@"+"val:"+dataVal);
		locationHref(dataKey+"="+dataVal);
	}
});


$(".sl-btns .btn-default").click(function (){
	$(this).closest(".usteel-search").find(".sl-ext").css("visibility","");
	$(this).closest(".usteel-search").find("li").removeClass("selected");
	$(this).closest(".usteel-search").removeClass("multiple");
	$(this).parents(".usteel-search").find(".btn-primary").addClass("disabled");
});

$("._search").on("click",function(){
	var inputArray = $(this).parents(".search-bottom").find("input");
	var searchUrl = "";
	inputArray.each(function(i,e){
		searchUrl += $(e).attr("id")+"="+$(e).val()+"&";
	});
	searchUrl = searchUrl.substring(0,searchUrl.length-1);
	console.log(searchUrl);
	locationHref(searchUrl);
});

$("._reset").on("click",function(){
	layer.load(2, {shade: [0.1,'#000']});
	window.location.href = ""+window.location.pathname;
});

$(".title strong").on("click",function(){
	var windowHref = window.location.search;
	var hrefArray = (windowHref.substr(1,windowHref.length)).split("&");
	var thisVal = $(this).attr("data_val");
	var thisDataVla = "";
	console.log("清除当前界面链接:"+thisDataVla);
//	console.log(windowHref);
	if(thisVal != undefined){
		for (let i=0; i<hrefArray.length; i++) {
			if(hrefArray[i] == thisVal){
				hrefArray[i] = "";
			}
			if(hrefArray[i] != ""){
				thisDataVla += hrefArray[i]+"&";
			}
		}
		thisDataVla = "?"+thisDataVla.substring(0,thisDataVla.length-1);
		if(windowHref != thisDataVla){
			console.log("跳转到当前界面下:"+thisDataVla);
			layer.msg("跳转到当前界面下:"+thisDataVla);
//			window.location.href = thisDataVla+window.location.hash;
		}else {
			layer.msg("请求错误");
		}
	}else {
		layer.msg("请求错误");
		return false;
	}
});

