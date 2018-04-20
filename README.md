

<!-- Start src/cPager.js -->

# cPager

Easy JS one-Page system framework with template files and controller
Make easy Prototypes, Mobile App or App with with Phonegap.

Version: 0.4.x



## How To Use:

*HTML:*

	<script src="./cPager.js"></script>

*JavaScript:*

	var myPager = new cPager({
		container: 'page',
		start: {
			page: 'home'
		},
		tasks: {
			'myTask': function (e) {

				alert('myTask before DOM changed');

				return function (dom) {
					alert('myTask after DOM changed');

					return function () {
						alert('myTask after DOM was animated');
					};
				};
			}
		}
	});

	myPager.switch('myPage');

	myPager.switch('myPage','myTask','testContent');

	myPager.switch('myFolder/myPage'); // will open ./tmpl/myFolder/myPage.tpl


*Template Home File:*

	<div class="all">
		<h1>Home</h1>

		<button class="pageBtn" data-page="kontakt">Example Button</button>
		<button class="pageBtn" data-page="users/list" data-task="myTask">Example Button</button>

	</div>


### Folder Structure:

##### Default/Suggestion:

- index.html
- js/
	- cPager.js
- task/
	- \*.js
	- ... external controller files, see ctrl()
- tmpl/
	- \*.tpl
	- ... html templates files as \*.tpl

##### Example:

- index.html
- js/
	- cPager.js
	- app.js
- task/
	- media.js
	- users.js
	- databse.js
- tmpl/
	- init.tpl
	- home.tpl
	- kontakt.tpl
	- user/
		- list.tpl
		- details.tpl
		- form.tpl



## Initialize Parameters:

	var myPager = new cPager({

		debug: false, // boolean

	    container: 'page', // string; dom node ID

	    handler: 'pageBtn', // string; dom node class name
	    handlerOff: 'pageBtnOff', // string; dom node class name

	    tmpl: [], // array; tpl file names for precache
	    tmplPath: 'tmpl', // string; folder name

	    ctrl: [], // array; controller/js file names for precache
	    ctrlPath: '', // string; folder name

	    tasks: [], // array; global task functions

	    start: {
	      page: false, // string; start with tpl file
	      task: false, // string; start with this global task
	      content: false, // string; start with this content for task
	      param: {
	        history: true // boolean; switch page and add to history?
	      }
	    },

	    animate: {
	      timing: false, // string; css animate easing function
	      direction: 'left', // string; direction
	      duration: 2 // integer; duration in seconds
	    },

	    onReady: false // function;
		onSuccess: false // function;

	});
-
## Methods:



### switch([page], [task], [content])

Manual Switch Page

###### Examples:

	var myPager = new cPager({
		tasks: {
			'myTask': function (e) {

				alert('myTask before edit Dom');

				return function (dom) {
					alert('myTask after insert into Dom');
				};
			}
		}
	})
	myPager.switch('home','myTask'); // fires myTask()

	myPager.switch('home','myTask','testContent'); // fires myTask() with Content-Data


###### Params:

* **String** *[page=undefined]* The Name or Path from template-file
* **String** *[task=undefined]* The Name of the function set with init options
* **String** *[content=undefined]* Optional Parameter for data
* **String** *[param=undefined]* Optional Parameters

###### Return:

* **Object** cPager object

-

### events()

Set the click-events for all buttons inside the DOM
(the click event will not fire if: the active site is still open )
(the click event will not fire if: the button has offButton class )

###### Examples:

	var myPager = new cPager(param);

	myPager.events();


###### Return:

* **Boolean** true or false

-

### ctrl()

Add Controller/Tasks to the global Framework to use inside the HTML and after events() function.

###### Examples:

*index.html:*

	var myPager = new cPager({
		container: 'page',
		start: {
			page: 'home'
		},
		ctrlPath: './tasks',
		ctrl: ['myController']
	});

*myController.js:*

	myPager.ctrl('user', {

	  get: function () {
	    console.log('---> get');
	    return function () {
	      console.log('---> get after');
	    };
	  },

	  set: function () {
	    console.log('---> set');
	  }

	});



###### Return:

* **Boolean** true

-


### getHistory()

Return global History

###### Examples:

	var myPager = new cPager()

	myPager.getHistory();


###### Return:

* **Array** History array

-

### removeHistory()

Remove x Items from global History

###### Examples:

	var myPager = new cPager()

	myPager.removeHistory(2); // remove the last

###### Return:

* **Boolean** true


-
-

Author: Christian Marienfeld  - *post@chrisand.de*
<!-- End src/cPager.js -->
