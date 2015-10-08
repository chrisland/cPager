

describe("cPager", function() {
		
	
	it("init should throw error if the div main container was not found (opt.container has default value)", function() {
		
		expect(function () {
			var pager = new cPager();
		}).toThrow(new Error("missing main container #page"));
	
	});
	
	
	it("init should throw error if the div main container was not found (opt.container has set value)", function() {
		
		var newContainername = 'error';
		expect(function () {
			var pager = new cPager({
				container: newContainername
			});
		}).toThrow(new Error("missing main container #"+newContainername));
	
	});
	
		
		
		
	
	
	describe("init with dom", function() {
		
		var pageId = 'page';
		
		beforeEach(function() {
			
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
		});
		
		
		afterEach(function() {
			
			document.getElementById(pageId).remove();
		});
	
		
		
		
		
		it("init should have set default options param (handler)", function() {
		
			var pager = new cPager();

			expect(pager._opt.handler).toBe('pageBtn');
		
		});
		
		
		it("init should have set default options param (tmplPath)", function() {
		
			var pager = new cPager();

			expect(pager._opt.tmplPath).toBe('tmpl');
		
		});
		
		it("init should have set default options param (displayStyle)", function() {
		
			var pager = new cPager();

			expect(pager._opt.displayStyle).toBe('block');
		
		});
		
		it("init should have set default options param (offButton)", function() {
		
			var pager = new cPager();

			expect(pager._opt.offButton).toBe('pageBtnOffline');
		
		});
		
		it("init should have set default options param (container)", function() {
		
			var pager = new cPager();

			expect(pager._opt.container).toBe('page');
		
		});
		
		it("init should have set default options param (start)", function() {
		
			var pager = new cPager();

			expect(pager._opt.start).toBe(false);
		
		});
		
		
		
		it("init should set given init-param-obj ( {test:'test'} )", function() {
		
			var pager = new cPager({
				test: 'test'
			});

			expect(pager._opt.test).toBe('test');
		
		});
		
		it("init should set given init-param-obj ( {handler:'test'} )", function() {
		
			var pager = new cPager({
				handler: 'test'
			});

			expect(pager._opt.handler).toBe('test');
		
		});
	


		
		
		it("init should trow error if the main container is not correct (opt.container is wrong)", function() {
			
			var newContainername = 'paGe';
			expect(function () {
				var pager = new cPager({
					container: newContainername
				});
			}).toThrow(new Error("missing main container #"+newContainername));
		
		});
		
		
		
		it("init should have set default param (_lastopen) to false", function() {
		
			var pager = new cPager();

			expect(pager._lastopen).toBe(0);
		
		});
		
		it("init should return this if default container was found in dom", function() {
		
			var pager = new cPager();

			expect(pager).toBeObject();
		
		});
		
		
		
		it("init should have set default param (_page) not to be empty", function() {
		
			var pager = new cPager();

			expect(pager._page).not.toBe();
		
		});
		
	
		
			
	
		

		
	
	});
	
	



	describe("switch() spyOn", function() {
		
		var pageId = 'page';
		var myPager;
		
		beforeEach(function() {
			
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
			
			myPager = new cPager({
				start: 'home'
			});
			
			
			spyOn(myPager, 'switch');
			
		});
		
		
		afterEach(function() {
			myPager = undefined;
			document.getElementById(pageId).remove();
		});

		

		
		it("switch() should be called ", function() {
		
			//console.log('----hier');
			
			myPager.switch();

			expect(myPager.switch).toHaveBeenCalled();
		
		});
		
		
		
	});
	

	describe("changeContent() spyOn", function() {
		
		var pageId = 'page';
		var myPager;
		
		beforeEach(function() {
			
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
			
			myPager = new cPager({
				start: 'home'
			});
			
			
			spyOn(myPager._h, 'changeContent');
			
		});
		
		
		afterEach(function() {
			myPager = undefined;
			document.getElementById(pageId).remove();
		});

		

		
		it("switch() should be called _h.changeContent() ", function() {
		
			//console.log('----hier');
			
			myPager.switch();

			expect(myPager._h.changeContent).toHaveBeenCalled();
		
		});
		
		
		
	});
	
	
	
	describe("switch()", function() {
		
		var pageId = 'page';
		var myPager;
		
		beforeEach(function() {
			
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
			
			myPager = new cPager({
				start: 'home',
				tmplPath: '../test/tmpl'
			});
			
			
		});
		
		
		afterEach(function() {
			myPager = undefined;
			document.getElementById(pageId).remove();
		});

		

		
		it("switch() should return this", function() {
			
			var ret = myPager.switch();

			//console.log(myPager);
			//console.log(ret);
			
			expect(ret).toBe(myPager);
		
		});
		
		
		
		it("switch() should set task", function() {
			
			var ret = myPager.switch();

			//console.log(myPager);
			//console.log(ret.switch.task);
			
			expect(ret.switch.task).not.toBe();
		
		});
		
		
		it("switch() load tmpl default home.tpl", function() {
			
			var ret = myPager.switch();

			//console.log(myPager);
			//console.log(ret.switch.task);
			
			expect(ret.switch.task).not.toBe();
		
		});
		
		

		


		
		
		
		
		
	});




	describe("switchDom() spyOn", function() {
		
		var pageId = 'page';
		var myPager;
		
		beforeEach(function() {
			
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
			
			myPager = new cPager({
				start: 'home'
			});
			
			
			spyOn(myPager._h, 'switchDom');
			
		});
		
		
		afterEach(function() {
			myPager = undefined;
			document.getElementById(pageId).remove();
		});

		

		
		it("switch() should  called _h.switchDom()  ", function() {
		
			//console.log('----hier');
			
			myPager.switch();

			expect(myPager._h.switchDom).toHaveBeenCalled();
		
		});
		
		
		
	});
	
	



	describe("events() spyOn", function() {
		
		var pageId = 'page';
		var myPager;
		
		beforeEach(function() {
			
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
			
			myPager = new cPager({
				start: 'home'
			});
			
			
			spyOn(myPager, 'events');
			
		});
		
		
		afterEach(function() {
			myPager = undefined;
			document.getElementById(pageId).remove();
		});

		

		
		it("switch() should allways called events()  ", function() {
		
			//console.log('----hier');
			
			myPager.switch();

			//expect(myPager.events).toHaveBeenCalled();
		
		});
		
		
		
	});
	

	describe("ajax() spyOn", function() {
		
		var pageId = 'page';
		var myPager;
		
		beforeEach(function() {
			
			//jasmine.Ajax.install();
			
			//console.log('-before');
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
			
			myPager = new cPager({
				start: 'home'
			});
			
			
			spyOn(myPager._h, 'ajax');
			
			spyOn(myPager._h, 'ajaxSuccess');
			
		});
		
		
		afterEach(function() {
			myPager = undefined;
			document.getElementById(pageId).remove();
		});

		

		
		it("switch() should allways called _h.ajax() if task is true ", function() {
		
			//console.log('----hier');
			
			myPager.switch('home');

			expect(myPager.switch.task).toBe(true);
			
			expect(myPager._h.ajax).toHaveBeenCalled();
					
		});
		
		
		
		it("switch() should set response if task is true ", function() {
		
			//console.log('----hier');
			
			myPager.switch('home');

			expect(myPager.switch.task).toBe(true);
			
			expect(myPager._h.ajax).toHaveBeenCalled();
		
			expect(myPager._h.switchDom.response).toEqual('<div>home</div>');
			
		});
		
		


		
		


		
	});


	
	

	
	describe("ajax() set url", function() {
		
		var pageId = 'page';
		var myPager;
		
		beforeEach(function() {
			
			
			
			//console.log('-before');
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
			
			myPager = new cPager({
				start: 'home'
			});
			
			
			
			jasmine.Ajax.install();
			
			//spyOn(myPager._h, 'ajax');
			
		});
		
		
		afterEach(function() {
			jasmine.Ajax.uninstall();
			myPager = undefined;
			document.getElementById(pageId).remove();
		});

		

		
		it("switch() should set default ajax url  ", function() {
		
			//console.log('----hier');
			
			myPager.switch('home');

			expect(jasmine.Ajax.requests.mostRecent().url).toBe('tmpl/home.tpl');
					
		});
		
		
		it("switch() should set ajax url  ", function() {
		
			//console.log('----hier');
			
			myPager.switch('meinTest');

			expect(jasmine.Ajax.requests.mostRecent().url).toBe('tmpl/meinTest.tpl');
					
		});
		
		
		
		

		
		
		
	});
	


	describe("addHistory()", function() {
		
		var pageId = 'page';
		
		beforeEach(function() {
			
			
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
		});
		
		
		afterEach(function() {
						
			document.getElementById(pageId).remove();
		});

		

		
		it("addHistory() should add History if pageId is set", function() {
			
			//console.log('-anf');
			
			var myPager = new cPager();
			var ret = myPager.addHistory('home');
			
			//console.log(myPager);
			
			expect(ret).toBe(true);
			expect(myPager._history).toEqual([{id:'home', task: undefined, content: undefined}]);

			
		
		});
		
		it("addHistory() should NOT add History if pageId is unset", function() {
			
			var myPager = new cPager();
			var ret = myPager.addHistory();
		
			expect(ret).toBe(false);
			expect(myPager._history).toEqual([]);

		});
		
		it("addHistory() should add History with params", function() {
			
			//console.log('-anf');
			
			var myPager = new cPager();
			var ret = myPager.addHistory('home','myTask','myContent');
			
			//console.log(myPager);
			
			expect(ret).toBe(true);
			expect(myPager._history).toEqual([{id:'home', task: 'myTask', content: 'myContent'}]);

			
		
		});
		
		
		it("addHistory() should add 2 History entries", function() {
			
			//console.log('-anf');
			
			var myPager = new cPager();
			var ret = myPager.addHistory('home','myTask','myContent');
			var ret = myPager.addHistory('index','myTask2');
			
			//console.log(myPager);
			
			expect(ret).toBe(true);
			expect(myPager._history).toEqual([{id:'home', task: 'myTask', content: 'myContent'},{id:'index', task: 'myTask2', content: undefined}]);

			
		
		});
		
		
		

		


		
		
		
		
		
	});



});