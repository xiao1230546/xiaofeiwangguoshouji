//�����ļ�
fis.set('project.ignore', [
	'fis-conf.js'
])

fis.set('nowDateTime', Date.now());

//����js css��� ����ʱ
fis.match('::packager', {
	postpackager: [fis.plugin('loadrequires')]
})
//��Ӳ�ѯ�ַ���(��֤��������ˢ��)
fis.match('**.{vue,js,css,png,ico,jpg,mp4,json,html}', {
    query: '?_t=' + fis.get('nowDateTime')
})
//������ҳhtml
fis.match('{index.html}', {
    query: ''
})

//���������ļ�����λ��
.match('**', { //���VS�пɷ���
	useSameNameRequire:true,
    deploy: [ 
    	//���˴�������ļ�
     	fis.plugin('skip-packed', {
	      skipPackedToPkg:false
	    }),
	    fis.plugin('local-deliver', {
	        to: '../release'
	    })
    ]
})

/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
//ѡ���ļ��������ļ�ָ��
fis.match('jquery.min.js', {
    useHash: false
});

fis.match('hoaj.js', {
    useHash: false
});
/************************************************����ģʽ***************************************************/

fis.media("test")
.match('**.{js,css,png}', {
  useHash: false, 
  useSprite: false,
  optimizer: null
})
//����js css��� ���Ż�
.match('::packager', { 
	postpackager: fis.plugin('loader', {
		resourceType : "mod"
	})
})
//���������ļ�����λ��
.match('**', { //���VS�пɷ���
	useSameNameRequire:true,
    deploy: [ 
    	//���˴�������ļ�
     	fis.plugin('skip-packed', {
	      skipPackedToPkg:true
	    }),
	    fis.plugin('local-deliver', {
	        to: '../release'
	    })
    ]
})

/************************************************��ʽ����***************************************************/
fis.media("pro")
//����js css��� ���Ż�
.match('::packager', { 
	postpackager: fis.plugin('loader', {
		resourceType : "mod"
	})
})
//���������ļ�����λ��
.match('**', { //���VS�пɷ���
	useSameNameRequire:true,
    deploy: [ 
    	//���˴�������ļ�
     	fis.plugin('skip-packed', {
	      skipPackedToPkg:true
	    }),
	    fis.plugin('local-deliver', {
	        to: '../release'
	    })
    ]
})



