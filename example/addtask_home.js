
myPager.addTask('home', {

  globalValue: 'str',

  init: function (a,b,c,d,e) {
    console.log('---> init', a,b,c,d,e,e.globalValue);


    return function () {
      console.log('---> init after');
    };
  },

  make: function () {
    console.log('---> make');
  },

  animate: function () {

    console.log('---> init animate: before dom');

    return function () {
      console.log('---> init animate: after dom');

      return function () {
        console.log('---> init animate: after animate');
      }

    }

  }

});
