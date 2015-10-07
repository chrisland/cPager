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
	
	var task = changeContent( null, pageTask, pageContent, pageId);
	if (task) {
/*
		fadePageDom(pageId, function () {
			if (typeof(task) === "function") {
				task();
			}
			addBtnEventListener();
			addPageHistory(pageId,pageTask,pageContent);
		});
		return true;
		*/
	}

	//addBtnEventListener();
	
	return false;
	
	
};


function changeContent (e, task, content, pageId) {
	
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
}





