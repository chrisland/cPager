/*
beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    }
  });
});
*/


beforeEach(function () {
  jasmine.addMatchers({
    toBeObject: function () {
      return {
        compare: function (actual, expected) {
          //var player = actual;

		  //console.log(actual, expected);
		  
		  if (typeof actual === 'object') {
			  return {
	            pass: true
	          };
		  } else {
			  return {
	            pass: false
	          };
		  }
		  
          
        }
      };
    },
    toBeString: function () {
      return {
        compare: function (actual, expected) {
          //var player = actual;

		  //console.log(actual, expected);
		  
		  if (typeof actual === 'string') {
			  return {
	            pass: true
	          };
		  } else {
			  return {
	            pass: false
	          };
		  }
		  
          
        }
      };
    },
    toBeNumber: function () {
      return {
        compare: function (actual, expected) {
          //var player = actual;

		  //console.log(actual, expected);
		  
		  if (typeof actual === 'number') {
			  return {
	            pass: true
	          };
		  } else {
			  return {
	            pass: false
	          };
		  }
		  
          
        }
      };
    }
  });
});