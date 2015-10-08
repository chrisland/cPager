

<!-- Start src/cPager.js -->

## cPager

Easy JS one-Page system framework with template files

Version: 0.1.0

Author: Christian Marienfeld post@chrisand.de 

### Examples:

	var myPager = new cPager({
		container: 'page',
		start: 'home',
		tasks: {
			'myTask': function () {
				
				alert('myTask before');
			
				return function () {
					alert('myTask after');
				};
			}
		}
	});

	myPager.switch('myPage');

	myPager.switch('myFolder/myPage'); // will open ./tmpl/myFolder/myPage.tpl



### Return:

* **Object** cPager Object

###--------------------------------

## switch([pageId=undefined], [pageTask=undefined], [pageContent=undefined])

Manual Switch Page

### Examples:

	var myPager = new cPager()

	myPager.switch('home');

	var myPager = new cPager({
		tasks: {
			'myTask': function (pageId, pageContent, event, dom) {
				
				alert('myTask before edit Dom');
			
				return function () {
					alert('myTask after insert into Dom');
				};
			}
		}
	})
	myPager.switch('home','myTask'); // fires myTask()

	myPager.switch('home','myTask','testContent'); // fires myTask() with Content-Data

Version: 0.1.0

### Params:

* **String** *[pageId=undefined]* The Name or Path from template-file
* **String** *[pageTask=undefined]* The Name of the function set with init options
* **String** *[pageContent=undefined]* Optional Parameter for data

### Return:

* **Object** cPager object

###--------------------------------

## events()

Set the click-events for all buttons inside the DOM
(the click event will not fire if: the active site is still open )
(the click event will not fire if: the button has offButton class )

### Examples:

	var myPager = new cPager()

	myPager.events();

Version: 0.1.0

### Return:

* **Boolean** true or false

###--------------------------------

## getHistory()

Return global History

### Examples:

	var myPager = new cPager()

	myPager.getHistory();

Version: 0.1.0

### Return:

* **Array** History array

###--------------------------------

## removeHistory()

Remove x Items from global History

### Examples:

	var myPager = new cPager()

	myPager.removeHistory(2); // remove the last

Version: 0.1.0

### Return:

* **Boolean** true

<!-- End src/cPager.js -->

