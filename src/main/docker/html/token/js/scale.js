/*
Copyright 2015 Tremolo Security, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
(function(){
  var app = angular.module('scale',['treeControl','monospaced.qrcode','ngClickCopy']);





    app.controller('ScaleController',['$compile', '$scope','$window','$http','$interval',function($compile, $scope, $window, $http,$interval){


      this.appIsError = false;
      this.sessionLoaded = false;
      this.config = {};
      this.currentTab = 'home';
      this.displayName = 'No User Loaded';
      this.showModal = false;

      this.modalTitle;
      this.modalMessage;








      //Methods
      this.finishLogout = function() {
          window.location = this.config.logoutURL;
      };



      this.reloadSession = function() {
    	  $scope.scale.modalTitle = "Session Expired";
			$scope.scale.modalMessage = "Your session has expired.  Click OK to login again or refresh your page";
			$scope.scale.modalOKFunction = function() {
				location.reload(true);
			};
			$scope.scale.modalShowFooter = true;
			$scope.scale.showModal = true;
			$scope.scale.showModal = true;

      };



      this.isSelectedTab = function(val) {
        return val == this.currentTab;
      };

      this.setSelectedTab = function(val) {
        if (val === 'logout') {
            this.finishLogout();
        } else if (val === 'home') {
          window.location = this.config.homeURL;
        } else {
          this.currentTab = val;
        }



      };

      this.isSessionLoaded = function() {
        return this.sessionLoaded;
      }

      this.setSessionLoadedComplete = function() {
        this.sessionLoaded = true;

      }

      this.isMobile = function() {
        var ow = $window.outerWidth;
        var mobile = (ow <= 991);
        return ! mobile;
      };



      angular.element(document).ready(function () {

    	  $http.get('sessioncheck').
	  	  	then(function(response) {

	  	  	},

	  	  	function(response) {
	  	  		location.reload(true);
	  	  	}

	  	  );

    	  $interval(
      			function() {
      				$http.get('sessioncheck')
      					.then(
      						function(response) {
      							$scope.scale.minsLeft = response.data.minsLeft;


      							if ($scope.scale.minsLeft <= $scope.scale.config.warnMinutesLeft) {
  	    							$scope.scale.modalTitle = "Inactive Session";
  	    							$scope.scale.modalMessage = response.data.minsLeft + " minutes until your session ends.  Click OK to continue your session.";
  	    							$scope.scale.modalOKFunction = function() {
  	    								$http.get('sessioncheck').then(
  	    										function(response) {
  	    											$http.get('token/config').then(
  	    		    										function(response) {
  	    		    											$scope.scale.showModal = false;
  	    		    										},
  	    		    										function(response) {
  	    		    											$scope.scale.showModal = false;
  	    		    											$scope.scale.reloadSession();
  	    		    										}
  	    		    								);
  	    										},
  	    										function(response) {
  	    											$scope.scale.showModal = false;
  	    											$scope.scale.reloadSession();
  	    										}

  	    								);

  	    							};
  	    							$scope.scale.showModal = true;
  	    							$scope.scale.modalShowFooter = true;
      							}
      						},
      						function(response) {
      							$scope.scale.showModal = false;
  								$scope.scale.reloadSession();
      						}

      					);
      			}, 1000 * 60
      	);

        $http.get('token/config').then(
          function(response) {
            $scope.scale.config = response.data;

            try {
            	JSON.parse(JSON.stringify(response.data));
            } catch (e) {
            	location.reload(true);
            }

            $http.get('token/user').then(
              function(response) {
                $scope.scale.displayName = response.data.displayName;
                $scope.scale.token = response.data.token;




                $scope.scale.setSessionLoadedComplete();
                $scope.scale.appIsError = false;
                //$scope.$apply();
              },
              function(response) {
                $scope.scale.appIsError = true;
                //$scope.$apply();
              }
            );


          },
          function(response) {
            $scope.scale.appIsError = true;
            //$scope.$apply();
          }

        );




      });

    }







    ]);

    app.directive('modal', function () {
        return {
          template: '<div class="modal fade">' +
              '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                  '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                    '<h4 class="modal-title">{{ title }}</h4>' +
                  '</div>' +
                  '<div class="modal-body" ng-transclude></div>' +
'<div class="modal-footer" ng-show="scale.modalShowFooter">' +

                  '<button type="button" class="btn-primary btn-lg" ng-click="scale.modalOKFunction()" >OK</button>' +
                '</div>' +
              '</div>' +
            '</div>',
          restrict: 'E',
          transclude: true,
          replace:true,
          scope:true,
          link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value){
              if(value == true)
                $(element).modal('show');
              else
                $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
              scope.$apply(function(){
                scope.$parent[attrs.visible] = true;
              });
            });

            $(element).on('hidden.bs.modal', function(){
              scope.$apply(function(){
                scope.$parent[attrs.visible] = false;
              });
            });
          }
        };
      });

      app.directive("calendar", function() {
          return {
              restrict: "E",
              templateUrl: "templates/calendar.html",
              scope: {
                  selected: "="
              },
              link: function(scope) {
                  scope.selected = _removeTime(scope.selected || moment());
                  scope.month = scope.selected.clone();

                  var start = scope.selected.clone();
                  start.date(1);
                  _removeTime(start.day(0));

                  _buildMonth(scope, start, scope.month);

                  scope.select = function(day) {
                      scope.selected = day.date;
                  };

                  scope.next = function() {
                      var next = scope.month.clone();
                      _removeTime(next.month(next.month()+1).date(1));
                      scope.month.month(scope.month.month()+1);
                      _buildMonth(scope, next, scope.month);
                  };

                  scope.previous = function() {
                      var previous = scope.month.clone();
                      _removeTime(previous.month(previous.month()-1).date(1));
                      scope.month.month(scope.month.month()-1);
                      _buildMonth(scope, previous, scope.month);
                  };
              }
          };

          function _removeTime(date) {
              return date.day(0).hour(0).minute(0).second(0).millisecond(0);
          }

          function _buildMonth(scope, start, month) {
              scope.weeks = [];
              var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
              while (!done) {
                  scope.weeks.push({ days: _buildWeek(date.clone(), month) });
                  date.add(1, "w");
                  done = count++ > 2 && monthIndex !== date.month();
                  monthIndex = date.month();
              }
          }

          function _buildWeek(date, month) {
              var days = [];
              for (var i = 0; i < 7; i++) {
                  days.push({
                      name: date.format("dd").substring(0, 1),
                      number: date.date(),
                      isCurrentMonth: date.month() === month.month(),
                      isToday: date.isSame(new Date(), "day"),
                      date: date
                  });
                  date = date.clone();
                  date.add(1, "d");
              }
              return days;
          }
      });

})();
