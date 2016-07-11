

/**
* Easy JS one-Page system framework with template files
*
* @class cPager
* @version 0.3.0
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

	"use strict";

	this._page;
	this._open = 0;
	this._lastopen = 0;
	this._history = [];
	this._pageClass = '';
	this._bodyClass = '';
	this.animate = false;

	this._opt = {
		handler: 'pageBtn',
		tmplPath: 'tmpl',
		offButton: 'pageBtnOffline',
		container: 'page',
		start: false,
		startTask: false,
		startContent: false,
		startParam: {history: true},
		preCache: [],

		animate: false,
		direction: 'left',
		duration: 2
	};

	if (param) {
		for (var i in param) {
			if(param.hasOwnProperty(i)){
				this._opt[i] = param[i];
			}
		}
	}

	// LOAD EXTERNAL JS TASK FILES
	if (this._opt.controller && this._opt.controller.length > 0) {
		for (var i = 0; i < this._opt.controller.length; i++) {
			this._h.loadScript(this._opt.controller[i]);
		}
	}

	// LOAD AJAX TPL PAGES
	this.ajaxCache = {};
	if (this._opt.preCache.length > 0) {
		this._h.cache(this, this._opt.preCache);
	}

	// INIT
	this._page = document.getElementById(this._opt.container);
	if (!this._page) {
		throw new Error("missing main container #"+this._opt.container);
		return false;
	}
	this._pageClass = this._page.className || '';
	this._bodyClass = document.body.className || '';

	// START
	if ( this._lastopen ) {
		this.switch(this._lastopen);
	} else {
		if (this._opt.start) {
			this.switch(this._opt.start,this._opt.startTask, this._opt.startContent, this._opt.startParam);
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

	//console.log('this.switch.task - '+pageId+' - '+pageTask+' - '+pageContent);

	//console.log(['_switch', pageId, pageTask, pageContent]);

	//console.log(this.get());
	//console.log('switch', pageId, pageTask, pageContent);
	var event = null;
	if (param && param.event) {
		event = param.event;
	}
	this.switch.task = this._h.changeContent( event, pageTask, pageContent, pageId, this, param);
	//console.log(['_switch, task:', this.switch.task, pageId, pageTask, pageContent, param]);

	if (this.switch.task) {

		var ret = this._h.switchDom(this, pageId, pageTask, pageContent, param);
		if (!ret && typeof this.switch.task === 'function') {
			this.switch.task();
		}
	}


	//console.log(['----------------------------------', pageId, pageTask]);
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
		if (that.animate) {
			return false;
		}

		var pageId = this.getAttribute('data-page'),
			pageTask = this.getAttribute('data-task'),
			pageContent = this.getAttribute('data-content'),
			pageContainer = this.getAttribute('data-container') || false,
			pageAnimate = this.getAttribute('data-animate') || that._opt.animate,
			pageDuration = this.getAttribute('data-duration') || false,
			pageDirection = this.getAttribute('data-direction') || false,
			pageForce = this.getAttribute('data-force') || false,
			history = this.getAttribute('data-history') || true;

		//console.log('clickHandler', pageId, pageTask, pageContent, param);

		if ( pageId || pageTask ) {
			if (that._open == pageId && !pageForce) {
				return false;
			}
			//console.log('- do click');
      var param = {
				event: e,
				history: history,
				animate: pageAnimate,
				duration: pageDuration,
				direction: pageDirection
			};
			if (pageContainer) {
				param.container = pageContainer;
			}
			// console.log(pageId);
			// console.log(pageTask);
			// console.log(pageContent);
			// console.log(param);

			that.switch(pageId, pageTask, pageContent, param);
		}
	};

	var pageBtns = document.getElementsByClassName(this._opt.handler);
	for(var i = 0; i < pageBtns.length; i++) {
		pageBtns[i].style.curser = 'pointer';  // IOS BUG
		//pageBtns[i].addEventListener('click',clickHandler);
		if (!pageBtns[i].onclick) {
			pageBtns[i].onclick = clickHandler;
		}

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







cPager.prototype.addHistory = function (pageId, pageTask, pageContent, pageParam) {

	if (pageId) {
		var obj = {
			id: pageId,
			task: pageTask,
			content: pageContent,
			param: pageParam
		};
		this._history.push(obj);
		return true;
	}
	return false;
};





/**
* Add task functions scopes
*
* ### Examples:
*
*	var myPager = new cPager()
*
*	myPager.addTask('scopeName', {
*		func1: function () {
*			console.log('---> func1');
* 		return true;
*		},
*		func2: function () {
*			console.log('---> func2');
* 		return function () {};
*		}
*	});
*
*
* @function addTask
* @version 0.1.6
*
* @return {Boolean} true
*
* @api public
*/


cPager.prototype.addTask = function (key, obj) {

	if (!key || typeof key !== 'string' || !obj || typeof obj !== 'object') {
		return false;
	}

	if (!this._opt.tasks[key] || typeof this._opt.tasks[key] !== 'object') {
		this._opt.tasks[key] = {};
	}

	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			this._opt.tasks[key][prop] = obj[prop];
		}
  }

	return true;
};






cPager.prototype._h = {

	changeContent : function (e, task, content, pageId, that, param) {

		//console.log(['changeContent', task, content, pageId, that._opt.tasks]);
		//console.log(content);

		if (task == 'back') {
			//console.log(['_changeContent, back!!!!']);

			if (!param) {
				param = {};
			}

			var anz = 2;
			var history = that.getHistory();
			var last = history[history.length -anz];

			//console.log(['_back', history, param]);
			if (!last) { return false; }
			if (last.id) {

				that.switch(last.id,last.task,last.content, param);
				that.removeHistory(anz);
			}
			return true;

		} else if (that._opt.tasks && task) {
			var t = task.split('.');
			//console.log(['_changeContent, task', task, t[0], t[1]]);
			//console.log(t);
			if (t.length > 0) {
				if ( t[0] && t[1] && that._opt.tasks[t[0]] && that._opt.tasks[t[0]][t[1]] ) {
					//console.log('deep');
					var func = that._opt.tasks[t[0]][t[1]];
					var scope = that._opt.tasks[t[0]];
				} else if ( t[0] && that._opt.tasks[t[0]] ) {
					var func = that._opt.tasks[t[0]];
					var scope = that._opt.tasks;
				}
				//console.log(that._opt.tasks);
				//console.log(['_changeContent, func', func]);
				if (func) {
					//console.log(['_changeContent, return func!!!']);
					return func(pageId,content,e,that._page,scope);
				}
			}
		} else {
			return true;
		}
		//return true;
	},
	switchSuccess: function (that, pageId, pageTask, pageContent, param, dom) {

		//console.log(['_switchSuccess, that.switch.task', that.switch.task, pageId, pageTask, pageContent, dom, param]);
		if (typeof that.switch.task === "function") {
			//console.log('--- 1. return');
			that.switch.afterAnimate = that.switch.task(dom || that._page)
		}
		if (!param.animate) {
			that.events();
		}

		if ( param && String(param.history) != 'false') {
			that.addHistory(pageId, pageTask, pageContent, param);
		}

	},
	animateSuccess: function (that, pageId, pageTask, pageContent, param, newPage) {

		that.animate = false;

		if (typeof that.switch.afterAnimate === "function") {
			//console.log('--- 2. return');
			that.switch.afterAnimate();
		}
		that.events();

	},
	ajaxSuccess: function (response, pageId, pageTask, pageContent, that, param) {

		//console.log(['_ajaxSuccess', pageId, pageTask, pageContent, param]);
		var oldPage = that._page;

    if (param && param.container) {
       oldPage = document.getElementById(param.container);

    	if (!oldPage) {
    		throw new Error("missing container #"+this._opt.container);
    		return false;
    	}
    }
		var newClass = pageId.replace(/\//ig, '-');
		//console.log('------'+param.animate+' - '+param.duration+' - '+param.direction);
		if (param && param.animate) {

			that.animate = true;

			if (!param.duration) {
				param.duration = that._opt.duration;
			}
			if (!param.direction) {
				param.direction = that._opt.direction;
			}

			//oldPage.parentNode.style.overflow = 'hidden';
			oldPage.id = that._opt.container+'Temp';
			oldPage.style.width = oldPage.clientWidth+'px';
			oldPage.style.height = oldPage.clientHeight+'px';
			oldPage.style.position = 'fixed';
			oldPage.style.transform = 'translate3d(0,0,0)';
			oldPage.style.transition = 'transform '+param.duration+'s '+param.animate;

			var newPage = document.createElement('div');
			newPage.id = that._opt.container;
			newPage.className = that._pageClass+' ' || '';
			newPage.className += 'cPager-'+newClass;
			newPage.innerHTML = response;
			newPage.style.position = 'fixed';

			newPage.style.width = oldPage.clientWidth+'px';
			newPage.style.height = oldPage.clientHeight+'px';

			switch (param.direction) {
				case 'left':
				default:
					newPage.style.transform = 'translate3d('+oldPage.style.width+',0,0)';
					break;
				case 'right':
					newPage.style.transform = 'translate3d(-'+oldPage.style.width+',0,0)';
					break;
				case 'top':
					newPage.style.transform = 'translate3d(0,'+oldPage.style.height+',0)';
					break;
				case 'bottom':
					newPage.style.transform = 'translate3d(0,-'+oldPage.style.height+',0)';
					break;
			}

			newPage.style.transition = 'transform '+param.duration+'s '+param.animate;

			document.body.insertBefore(newPage, oldPage.nextSibling);

			setTimeout(function() {


				switch (param.direction) {
					case 'left':
					default:
						oldPage.style.transform = 'translate3d(-'+oldPage.style.width+',0,0)';
						break;
					case 'right':
						oldPage.style.transform = 'translate3d('+oldPage.style.width+',0,0)';
						break;
					case 'top':
						oldPage.style.transform = 'translate3d(0,-'+oldPage.style.height+',0)';
						break;
					case 'bottom':
						oldPage.style.transform = 'translate3d(0,'+oldPage.style.height+',0)';
						break;
				}
				newPage.style.transform = 'translate3d(0,0,0)';

				//console.log(that);
				that._lastopen = that._open;
				that._open = pageId;
				that._page = newPage;
				that._h.switchSuccess(that, pageId, pageTask, pageContent, param, newPage);


			}, 100);


			setTimeout(function () {
				//console.log('--ende', oldPage, that._page, that);

				oldPage.remove();
				that._h.animateSuccess(that, pageId, pageTask, pageContent, param, newPage);

				oldPage.style.transition = '';
				newPage.style.transition = '';

			}, (param.duration*1000)+100 );

    } else { // no animation
			//console.log('- no ani');
			oldPage.innerHTML = response;
			oldPage.className = that._pageClass+' ' || '';
			oldPage.className += 'cPager-'+newClass;

			that._lastopen = that._open;
			that._open = pageId;
			this.switchSuccess(that, pageId, pageTask, pageContent, param, that._page);
		}

		document.body.className = that._bodyClass+' ' || '';
		document.body.className+= 'cPager-body-'+newClass;



	},
	ajax: function (that, path, pageId, pageTask, pageContent, param ) {

		var thatAjax = this;
		if ( that.ajaxCache[path] ) {
			thatAjax.ajaxSuccess(that.ajaxCache[path], pageId, pageTask, pageContent, that, param);
		} else {
			this.sendRequest(path,function (req) {
				that.ajaxCache[path] = req;
				thatAjax.ajaxSuccess(req, pageId, pageTask, pageContent, that, param);
			});
		}
	},
	cache: function (that, arr) {

		for (var i=0;i<arr.length;i++) {
			var path = './'+that._opt.tmplPath+'/'+arr[i]+'.tpl';
			//console.log(path);
			this.sendRequest(path,function (req, url) {
				//console.log(req.responseText);
				that.ajaxCache[url] = req;
				//console.log(url, that.ajaxCache);
			});
		}
	},
	switchDom : function (that, pageId, pageTask, pageContent, param) {

		//console.log(['_switchDom', pageId, pageTask, pageContent]);
		if (pageId) {
			this.ajax( that, './'+that._opt.tmplPath+'/'+pageId+'.tpl', pageId, pageTask, pageContent, param);
		}
		return false;
	},
	sendRequest: function (url,callback,postData) {

		jQuery.ajax({
		      url: url,
		      dataType: 'html',
		      cache: false

		})
		.done(function(data) {
			//console.log( "done", data );
			callback(data, url);
		})
		.fail(function(e) {
			console.log( "error", e );
		});
		/*
		var XMLHttpFactories = [
		    function () {return new XMLHttpRequest();},
		    function () {return new ActiveXObject("Msxml2.XMLHTTP");},
		    function () {return new ActiveXObject("Msxml3.XMLHTTP");},
		    function () {return new ActiveXObject("Microsoft.XMLHTTP");}
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
	    req.open(method,'file://'+url,true);
	    req.setRequestHeader('User-Agent','XMLHTTP/1.0');
	    if (postData)
	        req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	    req.onreadystatechange = function () {
	        if (req.readyState != 4) return;
	        if (req.status != 200 && req.status != 304) {
			//          alert('HTTP error ' + req.status);
	            return;
	        }
					console.log(req);
					console.log(method, url);
	        callback(req.responseText, url);
	    }

	    if (req.readyState == 4) return;
	    req.send(postData);
*/
	},
	loadScript: function(url, callback) {
	    // Adding the script tag to the head as suggested before
	    var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url+'.js';

	    // Then bind the event to the callback function.
	    // There are several events for cross browser compatibility.
	    script.onreadystatechange = callback;
	    script.onload = callback;

	    // Fire the loading
	    head.appendChild(script);
	}

};
