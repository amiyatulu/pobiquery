var myApp = angular.module('myApp', ['ngRoute']);
myApp.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
};
}]);

myApp.config(function($routeProvider){
    $routeProvider

    .when('/',{

        templateUrl:'pages/questions.html',
        controller:'mainController'

    })  .when('/savejson',{

        templateUrl:'pages/savejson.html',
        controller:'mainController'

    });
  

});

myApp.controller('mainController', ['$scope', '$log','$http',
function($scope, $log, $http) {
    $scope.questions = "";
    $http.get('data/questions.json').success(function(data) {
      $scope.questions = data;
    }).error(function(err) {
      $scope.markdownData = "# Error occured";
    });
        $scope.name = "";
        $scope.email = "";
        $scope.rollno = "";
        $scope.answer  = {};
       $scope.saveJSON = function () {
            $scope.toJSON = '';
            data = [];

            $scope.toJSON = angular.toJson(data);
            var blob = new Blob([$scope.toJSON], { type:"application/json;charset=utf-8;" });           
            var downloadLink = angular.element('<a></a>');
                        downloadLink.attr('href',window.URL.createObjectURL(blob));
                        downloadLink.attr('download', $scope.rollno+'.json');
            downloadLink[0].click();
        };
        $scope.renderJson = function(){

        data = [];
        data.push({"rollno":$scope.rollno});
        data.push({"name": $scope.name});
        data.push({"email": $scope.email});
        data.push($scope.answer);
        return angular.toJson(data);
    };


}]);
// myApp.controller('secondController', ['$scope', '$log', '$routeParams','$http',
// function($scope, $log, $routeParams, $http) {
 
//         $scope.name = "";
//         $scope.num = $routeParams.num;

// }]);
