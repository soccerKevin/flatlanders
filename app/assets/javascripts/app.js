(function() {
  var app = angular.module('gemStore', ['templates', 'store-directives']);

  app.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');
  }]);

  app.controller('StoreController', ['$http', '$scope', function($http, $scope){
    $scope.products = [];
    $scope.jewel = {};

    $http.get('/jewels')
      .success(function(data){
        $scope.products = data;
      });

    $scope.create = function(crud){
      $http.post('/jewels', $scope.jewel)
        .success(function(data){
          $scope.products.push(data)
          $scope.jewel = {};
          crud.setTab(crud.INDEX);
        });
    };

    $scope.update = function(product, index, jewel, tab){
      $http.patch('/jewels/' + product.id, jewel)
        .success(function(data){
          $scope.products[index] = data;
          tab.setTab(tab.DESCRIPTION);
        });
    };

    $scope.destroy = function(product, index){
      $http.delete('/jewels/' + product.id)
      .success(function(){
        $scope.products.splice(index, 1)
      });
    };

  }]);

  app.controller('ReviewController', function() {
    this.review = {};

    this.addReview = function(product) {
      product.reviews.push(this.review);

      this.review = {};
    };
  });
})();
