/**
* Easy JS One-Page System Framework
*
* @class cPager
* @version 0.1.0
* @license MIT
*
* @author Christian Marienfeld post@chrisand.de
*
* ### Examples:
*
*
* @return {Object} cPager Object
*
* @api public
*/
 
 
function cPager(param) {
	
	this._page;
	this._lastopen = false;
	this._opt = {
		handler: 'pageBtn',
		tmplPath: 'tmpl',
		displayStyle: 'block',
		offButton: 'pageBtnOffline',
		container: 'page',
		start: false
	}
	
	if (param) {
		for (var i in param) {
			if(param.hasOwnProperty(i)){
				this._opt[i] = param[i];
			}
		}
	}

	this._page = document.getElementById(this._opt.container);
	
	if (!this._page) {
		throw new Error("missing main container #"+this._opt.container);
		return false
	}
	

	
	if ( this._lastopen ) {
		//this.changePageById(this._lastopen);
	} else {
		if (this._opt.start) {
			this.changePageById(this._opt.start);
		}
	}

	
	return this;
}



cPager.prototype.changePageById = function (pageId, pageTask, pageContent) {
	

	
	console.log('changePageById', pageId, pageTask, pageContent);
	
	this.changePageById.task = this._h.changeContent( null, pageTask, pageContent, pageId);
	if (this.changePageById.task) {

		this._h.fadePageDom(pageId, function () {
/*
			if (typeof(task) === "function") {
				task();
			}
			this._h.addBtnEventListener();
			addPageHistory(pageId,pageTask,pageContent);
*/

			
		});
		
	}

	this._h.addBtnEventListener();
	
	return this;
	
	
};




cPager.prototype._h = {
	
	 changeContent : function (e, task, content, pageId) {
		
		console.log('changeContent', e, task, content, pageId);
		
		/*
		if (task == 'back') {
			var history = getPageHistory();
			var last = history[history.length-2];
			if (!last) {
				return false;
			}
			if (last.pageId) {
				APS.page.changePageById(last.pageId,last.pageTask,last.pageContent);				
				kickLastPageHistory(2);
			}
			return true;	
		} else if (APS.task && APS.task[task]) {
			return APS.task[task](pageId,content,e,$_page);
		}
		*/
		return true;
	},
	ajax: function (path, success ) {
		
		console.log(location.pathname);
		
		var arr = location.pathname.split('/');
		arr = arr.slice(1,arr.length-1).join('/');
		
		
		var r = new XMLHttpRequest();
		r.open("POST", 'file:///'+arr+'/'+path, true);
		r.onreadystatechange = function () {
		  if (r.readyState != 4 || r.status != 200) return;
		  //alert("Success: " + r.responseText);
		  if (typeof success === 'function') {
			  success(r.responseText);
		  }
		};
		r.send();
		
	},
	fadePageDom : function (pageId, callback) {
		
		console.log('changeContent', pageId);
		
		if (pageId) {
			this.ajax( 'tmpl/'+pageId+'.tpl' , function (response) {
				console.log('response',response);
			});
		}
		
/*
		if (pageId) {
			jQuery.ajax({
		      url: 'tmpl/'+pageId+'.tpl',
		      dataType: 'html',
		      cache: false,
		      success: function(data, status, response) {
		        
		        var $_page = document.getElementById(options.container);
		        $_page.innerHTML = data;
		        
				if (options.mockup[pageId]) {
				    var wrap = makeMockupBtn(options.mockup[pageId], pageId);
				    $_page.appendChild(wrap);
			    }
				lastopen = open;
				open = pageId;
				
				if (callback) {
					callback();
				}
		      }
		    });
		    			
		}
*/
		return false;
	},
	addBtnEventListener: function () {
		
		console.log('addBtnEventListener');
		
	}
	
	
};





