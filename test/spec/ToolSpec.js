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

			expect(pager._lastopen).toBe(false);
		
		});
		
		it("init should return this if default container was found in dom", function() {
		
			var pager = new cPager();

			expect(pager).toEqual(new cPager());
		
		});
		
		
		
		it("init should have set default param (_page) not to be empty", function() {
		
			var pager = new cPager();

			expect(pager._page).not.toBe();
		
		});
		
	
		
			
	
		

		
	
	});
	
	
	/*

	describe("open start page", function() {
		
		var pageId = 'page';
		var pager;
		
		beforeEach(function() {
			
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
			
			pager = new cPager({
				start: 'home'
			});
			
			
			spyOn(pager, 'changePageById');
			
		});
		
		
		afterEach(function() {
			
			document.getElementById(pageId).remove();
		});
	
		
		
		
		
		it("init fire changePageById if opt.start is set and no _lastopen ", function() {
		
			

			expect().toHaveBeenCalled();
		
		});
	});
	
	
*/


	describe("changePageById() spyOn", function() {
		
		var pageId = 'page';
		var myPager;
		
		beforeEach(function() {
			
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
			
			myPager = new cPager({
				start: 'home'
			});
			
			
			spyOn(myPager, 'changePageById');
			
		});
		
		
		afterEach(function() {
			myPager = undefined;
			document.getElementById(pageId).remove();
		});

		

		
		it("changePageById() should be called ", function() {
		
			//console.log('----hier');
			
			myPager.changePageById();

			expect(myPager.changePageById).toHaveBeenCalled();
		
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

		

		
		it("changePageById() should be called _h.changeContent() ", function() {
		
			//console.log('----hier');
			
			myPager.changePageById();

			expect(myPager._h.changeContent).toHaveBeenCalled();
		
		});
		
		
		
	});
	
	
	
	describe("changePageById()", function() {
		
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

		

		
		it("changePageById() should return this", function() {
			
			var ret = myPager.changePageById();

			//console.log(myPager);
			//console.log(ret);
			
			expect(ret).toBe(myPager);
		
		});
		
		
		
		it("changePageById() should set task", function() {
			
			var ret = myPager.changePageById();

			//console.log(myPager);
			//console.log(ret.changePageById.task);
			
			expect(ret.changePageById.task).not.toBe();
		
		});
		
		
		it("changePageById() load tmpl default home.tpl", function() {
			
			var ret = myPager.changePageById();

			//console.log(myPager);
			//console.log(ret.changePageById.task);
			
			expect(ret.changePageById.task).not.toBe();
		
		});
		


		
		
		
		
		
	});




	describe("fadePageDom() spyOn", function() {
		
		var pageId = 'page';
		var myPager;
		
		beforeEach(function() {
			
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
			
			myPager = new cPager({
				start: 'home'
			});
			
			
			spyOn(myPager._h, 'fadePageDom');
			
		});
		
		
		afterEach(function() {
			myPager = undefined;
			document.getElementById(pageId).remove();
		});

		

		
		it("changePageById() should  called _h.fadePageDom()  ", function() {
		
			//console.log('----hier');
			
			myPager.changePageById();

			expect(myPager._h.fadePageDom).toHaveBeenCalled();
		
		});
		
		
		
	});
	
	



	describe("addBtnEventListener() spyOn", function() {
		
		var pageId = 'page';
		var myPager;
		
		beforeEach(function() {
			
			
			var newDiv = document.createElement("div"); 
			newDiv.id = pageId;
			
			document.body.appendChild(newDiv); 
			
			
			myPager = new cPager({
				start: 'home'
			});
			
			
			spyOn(myPager._h, 'addBtnEventListener');
			
		});
		
		
		afterEach(function() {
			myPager = undefined;
			document.getElementById(pageId).remove();
		});

		

		
		it("changePageById() should allways called _h.addBtnEventListener()  ", function() {
		
			//console.log('----hier');
			
			myPager.changePageById();

			expect(myPager._h.addBtnEventListener).toHaveBeenCalled();
		
		});
		
		
		
	});








});