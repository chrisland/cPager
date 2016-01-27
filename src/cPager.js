/**
* Easy JS one-Page system framework with template files
*
* @class cPager
* @version 0.1.5
* @license MIT
*
* @author Christian Marienfeld post@chrisand.de
*
* ### Examples:
*
*	var myPager = new cPager({
*		container: 'page',
*		start: 'home',
*		tasks: {
*			'myTask': function (pageId, pageContent, event, dom) {
*
*				alert('myTask before');
*
*				return function () {
*					alert('myTask after');
*				};
*			}
*		}
*	});
*
*	myPager.switch('myPage');
*
*	myPager.switch('myPage','myTask','testContent');
*
*	myPager.switch('myFolder/myPage'); // will open ./tmpl/myFolder/myPage.tpl
*
*
* @return {Object} cPager Object
*
* @api public
*/



function cPager(param) {

	this._page;
	this._open = 0;
	this._lastopen = 0;
	this._history = []

	this._opt = {
		handler: 'pageBtn',
		tmplPath: 'tmpl',
		displayStyle: 'block',
		offButton: 'pageBtnOffline',
		container: 'page',
		start: false,
		startTask: false,
		startContent: false,
		preCache: []
	}

	if (param) {
		for (var i in param) {
			if(param.hasOwnProperty(i)){
				this._opt[i] = param[i];
			}
		}
	}


	// INIT

	this._page = document.getElementById(this._opt.container);

	if (!this._page) {
		throw new Error("missing main container #"+this._opt.container);
		return false
	}

	this.ajaxCache = {};
	if (this._opt.preCache.length > 0) {
		this._h.cache(this, this._opt.preCache);
	}



	// START

	if ( this._lastopen ) {
		this.switch(this._lastopen);
	} else {
		if (this._opt.start) {
			this.switch(this._opt.start,this._opt.startTask, this._opt.startContent);
		}
	}


	return this;
}



/**
* Manual Switch Page
*
* ### Examples:
*
*	var myPager = new cPager()
*
*	myPager.switch('home');
*
*
*
*	var myPager = new cPager({
*		tasks: {
*			'myTask': function (pageId, pageContent, event, dom) {
*
*				alert('myTask before edit Dom');
*
*				return function () {
*					alert('myTask after insert into Dom');
*				};
*			}
*		}
*	})
*	myPager.switch('home','myTask'); // fires myTask()
*
*	myPager.switch('home','myTask','testContent'); // fires myTask() with Content-Data
*
*
* @function switch
* @version 0.1.5
*
* @param {String} [pageId=undefined] The Name or Path from template-file
* @param {String} [pageTask=undefined] The Name of the function set with init options
* @param {String} [pageContent=undefined] Optional Parameter for data
*
* @return {Object} cPager object
*
* @api public
*/


cPager.prototype.switch = function (pageId, pageTask, pageContent, param) {

	//console.log(this.get());
	//console.log('switch', pageId, pageTask, pageContent);
	var event = null;
	if (param && param.event) {
		event = param.event;
	}
	this.switch.task = this._h.changeContent( event, pageTask, pageContent, pageId, this);

	if (this.switch.task) {
		this._h.switchDom(this, pageId, pageTask, pageContent, param);
	}
	return this;
};



/**
* Set the click-events for all buttons inside the DOM
* (the click event will not fire if: the active site is still open )
* (the click event will not fire if: the button has offButton class )
*
* ### Examples:
*
*	var myPager = new cPager()
*
*	myPager.events();
*
*
* @function events
* @version 0.1.0
*

* @return {Boolean} true or false
*
* @api public
*/


cPager.prototype.events = function () {

	//console.log('events');

	var that = this;
	var clickHandler = function (e) {

		if (this.classList.contains(that._opt.offButton)) {
			return false;
		}

		var pageId = this.getAttribute('data-page'),
			pageTask = this.getAttribute('data-task'),
			pageContent = this.getAttribute('data-content'),
      pageContainer = this.getAttribute('data-container') || false;

		//console.log('clickHandler', pageId, pageTask, pageContent);

		if ( pageId || pageTask ) {
			if (that._open == pageId) {
				return false;
			}
			//console.log('- do click');
      var param = {
				event: e
			};
      if (pageContainer) {
        param.container = pageContainer;
      };
			that.switch(pageId, pageTask, pageContent, param);
		}
	};

	var pageBtns = document.getElementsByClassName(this._opt.handler);
	for(var i = 0; i < pageBtns.length; i++) {
		pageBtns[i].style.curser = 'pointer';  // IOS BUG
		pageBtns[i].addEventListener('click',clickHandler);
	}
	return true;
};








/**
* Return global History
*
* ### Examples:
*
*	var myPager = new cPager()
*
*	myPager.getHistory();
*
*
* @function getHistory
* @version 0.1.0
*
* @return {Array} History array
*
* @api public
*/


cPager.prototype.getHistory = function () {

	if (this._history) {
		return this._history;
	}
	return false;
};


/**
* Remove x Items from global History
*
* ### Examples:
*
*	var myPager = new cPager()
*
*	myPager.removeHistory(2); // remove the last
*
*
* @function removeHistory
* @version 0.1.0
*
* @return {Boolean} true
*
* @api public
*/


cPager.prototype.removeHistory = function (anz) {

	if (anz && !isNaN(anz) && this._history.length > 0) {
		this._history = this._history.slice(0, this._history.length -anz);
	}
	return true;
};







cPager.prototype.addHistory = function (pageId, pageTask, pageContent) {

	if (pageId) {
		var obj = {
			id: pageId,
			task: pageTask,
			content: pageContent
		};
		this._history.push(obj);
		return true;
	}
	return false;
};

cPager.prototype._h = {

	changeContent : function (e, task, content, pageId, that) {

		//console.log('changeContent', e, task, content, pageId);
		//console.log(that._opt.tasks);

		if (task == 'back') {
			var anz = 2;
			var history = that.getHistory();
			var last = history[history.length -anz];
			if (!last) { return false; }
			if (last.id) {
				that.switch(last.id,last.task,last.content);
				that.removeHistory(anz);
			}
			return true;

		} else if (that._opt.tasks && that._opt.tasks[task]) {
			return that._opt.tasks[task](pageId,content,e,that._page);
		}
		return true;
	},
	switchSuccess: function (that, pageId, pageTask, pageContent) {

		//console.log(that.switch.task);
		//console.log('switchDom ajaxSuccess');

		if (typeof that.switch.task === "function") {
			that.switch.task();
		}
		that.events();
		that.addHistory(pageId, pageTask, pageContent);
	},
	ajaxSuccess: function (response, pageId, pageTask, pageContent, that, param) {

		//console.log('ajaxSuccess',response);

		this.switchDom.response = response;

    if (param && param.container) {
      var temp_page = document.getElementById(param.container);

    	if (!temp_page) {
    		throw new Error("missing container #"+this._opt.container);
    		return false
    	}

      temp_page.innerHTML = response;
    } else {
      that._page.innerHTML = response;
    }

		that._lastopen = that._open;
		that._open = pageId;
		this.switchSuccess(that, pageId, pageTask, pageContent);
	},
	ajax: function (that, path, pageId, pageTask, pageContent, param ) {

		var thatAjax = this;
		if ( that.ajaxCache[path] ) {
			thatAjax.ajaxSuccess(that.ajaxCache[path], pageId, pageTask, pageContent, that, param);
		} else {
			this.sendRequest(path,function (req) {
				that.ajaxCache[path] = req.responseText;
				thatAjax.ajaxSuccess(req.responseText, pageId, pageTask, pageContent, that, param);
			});
		}
	},
	cache: function (that, arr) {

		for (var i=0;i<arr.length;i++) {
			var path = './'+that._opt.tmplPath+'/'+arr[i]+'.tpl';
			//console.log(path);
			this.sendRequest(path,function (req, url) {
				//console.log(req.responseText);
				that.ajaxCache[url] = req.responseText;
				//console.log(url, that.ajaxCache);
			});
		}
	},
	switchDom : function (that, pageId, pageTask, pageContent, param) {

		//console.log('switchDom', pageId);
		if (pageId) {
			this.ajax( that, './'+that._opt.tmplPath+'/'+pageId+'.tpl', pageId, pageTask, pageContent, param);
		}
		return false;
	},
	sendRequest: function (url,callback,postData) {

		var XMLHttpFactories = [
		    function () {return new XMLHttpRequest()},
		    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
		    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
		    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
		];

		function createXMLHTTPObject() {
		    var xmlhttp = false;
		    for (var i=0;i<XMLHttpFactories.length;i++) {
		        try {
		            xmlhttp = XMLHttpFactories[i]();
		        }
		        catch (e) {
		            continue;
		        }
		        break;
		    }
		    return xmlhttp;
		}


	    var req = createXMLHTTPObject();
	    if (!req) return;
	    var method = (postData) ? "POST" : "GET";
	    req.open(method,url,true);
	    req.setRequestHeader('User-Agent','XMLHTTP/1.0');
	    if (postData)
	        req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	    req.onreadystatechange = function () {
	        if (req.readyState != 4) return;
	        if (req.status != 200 && req.status != 304) {
			//          alert('HTTP error ' + req.status);
	            return;
	        }
	        callback(req, url);
	    }
	    if (req.readyState == 4) return;
	    req.send(postData);
	}


};
