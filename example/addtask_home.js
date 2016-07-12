
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


    //console.log('------------------------> init animate: before dom');
    document.body.style.backgroundColor = 'red';

    return function () {
      //console.log('---> init animate: after dom');
      document.body.style.backgroundColor = 'blue';

      return function () {
        //console.log('---> init animate: after animate');
        document.body.style.backgroundColor = 'green';
      }

    }

  },
  page1: function () {


    //console.log('------------------------> init animate: before dom');
    document.body.style.backgroundColor = 'rgb(1, 190, 209)';

    return function () {
      //console.log('---> init animate: after dom');
      document.body.style.backgroundColor = 'rgb(14, 123, 134)';

      return function () {
        //console.log('---> init animate: after animate');
        document.body.style.backgroundColor = 'rgb(16, 54, 57)';
      }

    }

  },
  page2: function () {


    //console.log('------------------------> init animate: before dom');
    document.body.style.backgroundColor = 'rgb(198, 212, 132)';

    return function () {
      //console.log('---> init animate: after dom');
      document.body.style.backgroundColor = 'rgb(174, 209, 1)';

      return function () {
        //console.log('---> init animate: after animate');
        document.body.style.backgroundColor = 'rgb(86, 209, 1)';
      }

    }

  }

});
