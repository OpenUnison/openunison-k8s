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
  var app = angular.module('scale',['treeControl','ngSanitize']);





    app.controller('ScaleController',['$compile', '$scope','$window','$http','$interval',function($compile, $scope, $window, $http,$interval){


      this.appIsError = false;
      this.sessionLoaded = true;
      this.config = {};
      this.search_base = "";
      this.currentTab = 'home';
      this.displayName = 'No User Loaded';
      this.showModal = false;

      this.searchResults = [];
      this.testSearchResults = [
        {
          "uid":"mmolsey",
          "givenname":"Matt",
          "sn":"Mosley",
          "mail":"marc+1111@tremolo.io",
          "picked":false,
          "canEdit":true,
          "groups":["tax","cpan"],
          "locked":"0"
        },
        {
          "uid":"jjackson",
          "givenname":"Jennifer",
          "sn":"Jackson",
          "mail":"jjackson@tremolo.io",
          "picked":false,
          "canEdit":true,
          "groups":["tax"],
          "locked":"1"
        },
        {
          "uid":"rrobinson",
          "givenname":"Robert",
          "sn":"Robinson",
          "mail":"rrobinson@tremolo.io",
          "picked":false,
          "canEdit":false,
          "groups":["cpan"],
          "locked":"1"
        }
      ];


      this.modalTitle;
      this.modalMessage;

      this.newUser = {};
      this.attributeConfigs = [];
      this.showForm = true;
      this.showUser = false;
      this.searchDisabled = false;

      this.treeOptions = {
        nodeChildren: "subOrgs",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            //liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            //labelSelected: "a8"
        }
    };

      //this.portalOrgs = [{"id":"687da09f-8ec1-48ac-b035-f2f182b9bd1e","name":"MyOrg","description":"MyOrg Enterprise Applications","subOrgs":[{"id":"fc8799cf-b947-4626-94bd-1ddda226bc16","name":"Auditors","description":"Reports for auditors","subOrgs":[]},{"id":"138d5182-c08d-41d5-bc42-6a4f406cf81b","name":"Users","description":"Tools for County users","subOrgs":[]},{"id":"0647d570-eb9c-482c-b0db-872fffd9c1b3","name":"Application Owners","description":"Tools for application owners","subOrgs":[]},{"id":"1dcf8354-03bd-416a-b613-50515bab38f2","name":"Operators","description":"For day-to-day operators","subOrgs":[]},{"id":"1e1f2a6b-b52d-4f23-84ce-dc0b2c9b46a8","name":"CPAN","description":"Workflows and Reports Specific to CPAN","subOrgs":[]}]}];
      //this.workflows = [{"name":"unlock-county-user","description":"Unlock county users that are locked","label":"Unlock County User","uuid":"4d3b5375-60c4-439f-8529-6e4d64f2ba03"},{"name":"unlock-portal-user","description":"Unlock External (Portal) users that are locked","label":"Unlock External User","uuid":"453aefec-a800-4f35-b826-3e333218af53"},{"name":"send-password-reset","description":"Initialize a password reset for the user","label":"Send Password Reset","uuid":"659a5810-3aff-4e29-b993-6b0320fbaade"}];
      this.workflows = {};
      this.wfMetaData = {"canDelegate":false,"canPreApprove":false,"uuid":""};



      //Methods

      this.isWorkflowBeingRun = function() {
        return (typeof this.workflowToRun !== 'undefined') || (this.workflowToRun != null);
      }

      this.submitWorkflow = function() {
        this.submitRequestsDisabled = true;
        this.submitRequestsErrors = [];
        $scope.scale.submitRequestSuccess = [];
        this.modalMessage = "Submitting Requests...";
        this.showModal = true;

        wfRequests = [];

        wfRequest = JSON.parse(JSON.stringify(this.workflowToRun));
        
        wfRequest.subjects = [];

        for (user of this.searchResults) {
          if (user.picked) {
            wfRequest.subjects.push(user[this.main_config.uidAttributeName]);
          }
        }

        wfRequests.push(wfRequest);

        $http.put(this.config.scaleJsMainUri + "/workflows",wfRequests).
          then(function(response) {
            $scope.scale.submitRequestsErrors = [];
            $scope.scale.submitRequestSuccess = [];

            for (wfuuid in  response.data) {
              if (response.data[wfuuid] === "success") {
                $scope.scale.submitRequestSuccess.push($scope.scale.workflowToRun.label);
                
              } else {
                msg = $scope.scale.workflowToRun.label + ' - ' + response.data[wfuuid];
                $scope.scale.submitRequestsErrors.push(msg);
              }
            }

            $scope.scale.showModal = false;
            $scope.scale.submitRequestsDisabled = false;
          },
          function(response) {
            $scope.scale.submitRequestsErrors = response.data.errors;
            $scope.scale.showModal = false;
            $scope.scale.submitRequestsDisabled = false;
          }
        );

      

      }

      this.executeWorkflow = function(wf) {
        $scope.scale.submitRequestsErrors = [];
        $scope.scale.submitRequestSuccess = [];
        this.workflowToRun = wf;

        $http.get(this.config.scaleJsMainUri + '/workflows/candelegate?workflowName=' + wf.name + '&uuid=' + wf.uuid).
          then(function(response) {
            $scope.scale.wfMetaData = response.data;

          },
          function(response) {
            //do nothing
          }
        );
        //alert(this.wfMetaData.canDelegate && this.wfMetaData.canPreApprove);
      }
      this.isUsersSelected = function() {
        if (this.searchResults.length == 0) {
          return false;
        } else {
          thereIsAPick = false;
          
          this.searchResults.forEach(function(value) {thereIsAPick = thereIsAPick || value.picked});
          return thereIsAPick;
        }
      }
      this.finishLogout = function() {
          window.location = this.config.logoutURL;
      };


      this.saveUser = function() {
        this.saveUserDisabled = true;
        this.modalMessage = "Saving User...";
        this.showModal = true;
        saveUserData = {
          "dn":this.currentUser.dn,
          "reason":this.currentUser.changeReason,
          "attributes":[]
        };

        for (attr of this.currentUser.attributes) {
          if (! this.currentUser.metaData[attr.name].readOnly) {
            saveUserData.attributes.push(attr);
          }
        }

        this.saveUserSuccess = false;
        this.saveUserErrors = [];

        $http.post('ops/user',saveUserData).then(
          function(response) {
            $scope.scale.saveUserDisabled = false;
            $scope.scale.showModal = false;
            $scope.scale.saveUserSuccess = true;
            $scope.scale.saveUserErrors = [];
          },
          function(response) {
            $scope.scale.saveUserDisabled = false;
            $scope.scale.showModal = false;
            $scope.scale.saveUserErrors = response.data.errors;
          }
        );


      }

      this.viewUser = function(userObj) {
        this.showForm = false;
        this.showUser = true;

        this.modalMessage = "Loading User...";
        this.showModal = true;

        user_dn = userObj['dn'];

        $http.get('ops/user?dn=' + encodeURIComponent(user_dn)).then(
          function(response) {
            $scope.scale.currentUser = response.data;
            this.showForm = false;
            this.showUser = true;
            $scope.scale.showModal = false;
    
          },
          function(response) {
            //TODO error handling
          }
        );
        
        
      }

      this.viewSearch = function(userObj) {
        this.showForm = true;
        this.showUser = false;

        

        
      }

      this.search = function() {
        this.modalMessage = "Submitting Search...";
        this.showModal = true;
        $scope.scale.searchDisabled = true;
        $scope.scale.searchSuccess = false;

        search_data = {
          "base" : $scope.scale.search_base,
          "toSearch" : $scope.scale.config.searchableAttributes
        };

        $http.put('ops/search',search_data).then(
          function(response) {
            $scope.scale.searchResults = response.data;
            $scope.scale.showModal = false;
            $scope.scale.searchDisabled = false;
            $scope.scale.searchSuccess = true;

          },
          function(response) {
            //TODO add error handling
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
          window.location = this.config.homeUrl;
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

      this.selectRequestAccessOrg = function(node) {
        this.requestAccessCurrentNode = node;
        this.loadWorkflowsErrors = [];

        $http.get(this.config.scaleJsMainUri + '/workflows/org/' + this.requestAccessCurrentNode.id).
          then(function(response) {
            $scope.scale.workflows[$scope.scale.requestAccessCurrentNode.id] = response.data;
            $scope.scale.requestAccessCurentWorkflows = $scope.scale.workflows[$scope.scale.requestAccessCurrentNode.id];
          },
          function(response) {
            $scope.scale.loadWorkflowsErrors = response.data.errors;
            $scope.scale.requestAccessCurentWorkflows = [];

          }
        );



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
    							
    							
    							if ($scope.scale.minsLeft <= $scope.scale.main_config.warnMinutesLeft) {
	    							$scope.scale.modalTitle = "Inactive Session";
	    							$scope.scale.modalMessage = response.data.minsLeft + " minutes until your session ends.  Click OK to continue your session.";
	    							$scope.scale.modalOKFunction = function() {
	    								$http.get('sessioncheck').then(
	    										function(response) {
	    											$http.get('ops/config').then(
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


        $scope.scale.displayName = '';
            

            
        $scope.scale.setSessionLoadedComplete();
        $scope.scale.appIsError = false;
        $scope.scale.config = {};
        
        $http.get('ops/config').then(
          function(response) {
            $scope.scale.config = response.data;
            $scope.scale.search_base = $scope.scale.config.searchBases[0];

            $http.get($scope.scale.config.scaleJsMainUri + '/config').then(
              function(response) {
                $scope.scale.main_config = response.data;
                

                $http.get($scope.scale.config.scaleJsMainUri + '/user').then(
                  function(response) {
                    $scope.scale.main_user = response.data;

                    for (var i in  $scope.scale.main_user.attributes) {
                      if ($scope.scale.main_user.attributes[i].values.length > 0 && $scope.scale.main_user.attributes[i].name === $scope.scale.main_config.displayNameAttribute) {
                        $scope.scale.displayName = $scope.scale.main_user.attributes[i].values[0];
                      }
                    }

                    $http.get($scope.scale.config.scaleJsMainUri + '/orgs').then(
                      function(response) {
                        $scope.scale.orgs = [response.data];
                        $scope.scale.requestAccessOrgsSelectedNode = $scope.scale.orgs[0];
                        $scope.scale.requestAccessOrgsExpandedNodes =[$scope.scale.orgs[0]];
                        $scope.scale.selectRequestAccessOrg($scope.scale.orgs[0]);
                      },
                      function(response) {
                        $scope.scale.appIsError = true;
                      }
                    );
                    
                  },
                  function(response) {
                    $scope.scale.appIsError = true;
                  }
    
                );
              },
              function(response) {
                $scope.scale.appIsError = true;
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
