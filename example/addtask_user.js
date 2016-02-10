
myPager.addTask('user', {

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
