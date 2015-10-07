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



	describe("changePageById()", function() {
		
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

		
		
		it("changePageById sould get be called ", function() {
		
			pager.changePageById();

			expect(pager.changePageById).toHaveBeenCalled();
		
		});
		
		
	});











});