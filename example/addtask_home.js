
myPager.addTask('home', {

  init: function () {
    console.log('---> init');
    return function () {
      console.log('---> init after');
    };
  },

  make: function () {
    console.log('---> make');
  }

});
