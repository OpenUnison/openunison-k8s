/*
Copyright 2015, 2016 Tremolo Security, Inc.

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


function InputOptions( arr ) {
    for ( var i = 0; i < arr.length; i += 1 ) {
        this[i] = arr[i];
    }

    // length is readonly
    Object.defineProperty( this, 'length', {
        get: function () {
            return arr.length;
        }
    });

    // a HTMLCollection is immutable
    Object.freeze( this );
}

InputOptions.prototype = {
    item: function ( i ) {
        return this[i] != null ? this[i] : null;
    },
    namedItem: function ( name ) {
        for ( var i = 0; i < this.length; i += 1 ) {
            if ( this[i].id === name || this[i].name === name ) {
                return this[i];
            }
        }
        return null;
    }
};


(function(){
  var app = angular.module('scale',['treeControl','ngSanitize']);





    app.controller('ScaleController',['$compile', '$scope','$window','$http','$interval',function($compile, $scope, $window, $http,$interval){


      this.appIsError = false;
      this.sessionLoaded = false;
      this.config = {};
      this.currentTab = 'home';
      this.displayName = 'No User Loaded';
      this.showModal = false;

      this.modalTitle;
      this.modalMessage;

      this.newUser = {};
      this.attributeConfigs = [];
      this.showForm = true;






      //Methods
      this.finishLogout = function() {
          window.location = this.config.logoutURL;
      };


      this.saveUser = function() {
        this.modalMessage = "Submitting Registration...";
        this.showModal = true;
        $scope.scale.saveUserDisabled = true;
        $scope.scale.saveUserSuccess = false;

        if ($scope.scale.config.requireReCaptcha) {
        	$scope.scale.newUser.reCaptchaCode = grecaptcha.getResponse();
        	grecaptcha.reset();
        }

        for (var i in $scope.scale.config.attributes) {
          if ($scope.scale.config.attributes[i].type == 'list') {

              if (typeof $scope.scale.newUser.attributes[$scope.scale.config.attributes[i].name] == 'undefined') {
                $scope.scale.newUser.attributes[$scope.scale.config.attributes[i].name] = "";
              } else {
                $scope.scale.newUser.attributes[$scope.scale.config.attributes[i].name] = $scope.scale.newUser.attributes[$scope.scale.config.attributes[i].name].value;
              }


          }
        }

        $http.post('register/submit',this.newUser).then(
          function(response) {
            $scope.scale.showModal = false;
            $scope.scale.saveUserDisabled = false;
            $scope.scale.newUser = {};
            $scope.scale.newUser.attributes = {};

            for (var i in $scope.scale.config.attributes) {
              $scope.scale.newUser.attributes[$scope.scale.config.attributes[i].name] = '';
            };

            $scope.scale.saveUserSuccess = true;
            $scope.scale.saveUserErrors = [];
            
            $scope.scale.showForm = response.addNewUsers;
            
          },
          function(response) {
            $scope.scale.saveUserErrors = response.data.errors;
            $scope.scale.showModal = false;
            $scope.scale.saveUserDisabled = false;
            $scope.scale.saveUserSuccess = false;
            $scope.scale.showForm = true;
          }
        );
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
      
      

      this.change_text_control = function(attr_cfg) {
    	  
    	  if (attr_cfg != null) {
    		  $http.get('register/values?name=' + attr_cfg.name + '&search=' + $scope.scale.newUser.attributes[attr_cfg.name]).then(
    				  function(response) {
    					  
    					  attr_cfg.values = response.data;
    					  
    					  this.edit_event(attr_cfg);
    					  
    				  },
    				  function(response) {
    					  
    				  }
    				  
    		  );
    	  }
      
      
      }
      
      this.edit_event = function(attr_cfg) {
        
      	if ('editJavaScriptFunction' in attr_cfg) {
      		eval(attr_cfg.editJavaScriptFunction);
      	}
      	
      }

      angular.element(document).ready(function () {



        $http.get('register/config').then(
          function(response) {
            $scope.scale.config = response.data;
            $scope.scale.displayName = '';
            $scope.scale.newUser.attributes = {};

            $scope.scale.attributeConfigs = [];
            
            
            for (var i in $scope.scale.config.attributeNameList) {
              $scope.scale.newUser.attributes[$scope.scale.config.attributeNameList[i]] = '';
              //$scope.scale.config.attributes[$scope.scale.config.attributeNameList[i]].show = true;
              $scope.scale.attributeConfigs.push($scope.scale.config.attributes[$scope.scale.config.attributeNameList[i]]);
            };

            $scope.scale.setSessionLoadedComplete();
            $scope.scale.appIsError = false;


            if ($scope.scale.config.requireReCaptcha) {
            	if (typeof grecaptcha != "undefined") {
	            	grecaptcha.render('recaptcha', {
	                    'sitekey' : $scope.scale.config.rcSiteKey
	                  });
            	} else {


            		$interval(function() {
            			if (captchaloaded == true) {

            				grecaptcha.render('recaptcha', {
        	                    'sitekey' : $scope.scale.config.rcSiteKey
        	                  });

            				captchaloaded = false;
            			}
            		},1000,10);




            	}
            }




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
