(function() {

  var app = angular.module('chirpy', []);

  app.controller('LogInController', function() {

    var self = this;

    self.signUp = function() {

      console.log('Hello');

      console.log(self.email);
      console.log(self.password);


    };



  });


}());

