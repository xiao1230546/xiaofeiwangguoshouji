//过滤文件
fis.set('project.ignore', [
	'fis-conf.js'
])

fis.set('nowDateTime', Date.now());

//加载js css组件 开发时
fis.match('::packager', {
	postpackager: [fis.plugin('loadrequires')]
})
//添加查询字符串(保证发布缓存刷新)
fis.match('**.{vue,js,css,png,ico,jpg,mp4,json,html}', {
    query: '?_t=' + fis.get('nowDateTime')
})
//过滤首页html
fis.match('{index.html}', {
    query: ''
})

//设置所有文件产出位置
.match('**', { //解决VS中可访问
	useSameNameRequire:true,
    deploy: [ 
    	//过滤打包掉的文件
     	fis.plugin('skip-packed', {
	      skipPackedToPkg:false
	    }),
	    fis.plugin('local-deliver', {
	        to: '../release'
	    })
    ]
})

/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
//选中文件不适用文件指纹
fis.match('jquery.min.js', {
    useHash: false
});

fis.match('hoaj.js', {
    useHash: false
});
/************************************************测试模式***************************************************/

fis.media("test")
.match('**.{js,css,png}', {
  useHash: false, 
  useSprite: false,
  optimizer: null
})
//加载js css组件 并优化
.match('::packager', { 
	postpackager: fis.plugin('loader', {
		resourceType : "mod"
	})
})
//设置所有文件产出位置
.match('**', { //解决VS中可访问
	useSameNameRequire:true,
    deploy: [ 
    	//过滤打包掉的文件
     	fis.plugin('skip-packed', {
	      skipPackedToPkg:true
	    }),
	    fis.plugin('local-deliver', {
	        to: '../release'
	    })
    ]
})

/************************************************正式服务***************************************************/
fis.media("pro")
//加载js css组件 并优化
.match('::packager', { 
	postpackager: fis.plugin('loader', {
		resourceType : "mod"
	})
})
//设置所有文件产出位置
.match('**', { //解决VS中可访问
	useSameNameRequire:true,
    deploy: [ 
    	//过滤打包掉的文件
     	fis.plugin('skip-packed', {
	      skipPackedToPkg:true
	    }),
	    fis.plugin('local-deliver', {
	        to: '../release'
	    })
    ]
})



