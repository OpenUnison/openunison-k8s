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
(function(){
  var app = angular.module('scale',['treeControl']);

  var config;

  var user =
    {
      "uid":"",
      "dn":"",
      "attributes":
        [
          {"values":[""],"name":"uid"},

        ],
      "groups":[""]
    };

    var openApprovals =
        [
          {
            "workflow":1,
            "approval":1,
            "label":"Approve Access to LDAP",
            "user":"testsaml10",
            "wfStart":1392512787000,
            "approvalStart":1392512788000,
            "wfName":"testApproval",
            "wfDescription":"Select this workflow if you don\u0027t have access to the portal",
            "wfLabel":"Gain access to the portal",
            "reason":"this is a test workflow webservice"
          }
        ];

    var approvalDetails =
        {
          "userObj":
            {
              "userID":"testsaml10",
              "displayName":"Test Saml 10",
              "groups":['Role 1','Role 2'],
              "resync":false,
              "keepExternalAttrs":false,
              "JitAddToAuditDB":true,
              "requestReason":"this is a test workflow webservice",
              "attribs":
                {
                  "uid":
                    {
                      "values":["testsaml10"],
                      "name":"uid",
                      "label":"User Name"
                    },
                  "l":
                    {
                      "values":["Boston"],
                      "name":"l",
                      "label":"Location"
                    },
                  "sn":
                    {
                      "values":["SAML5"],
                      "name":"sn",
                      "label":"Last Name"
                    },
                  "cn":
                    {
                      "values":["Test SAML5"],
                      "name":"cn",
                      "label":"Full Name"
                    }
                }
            },
            "workflow":1,
            "approval":1,
            "label":"Approve Access to LDAP",
            "user":"testsaml10",
            "wfStart":1392513182000,
            "approvalStart":1392513182000,
            "wfName":"testApproval",
            "wfDescription":"Select this workflow if you don\u0027t have access to the portal",
            "wfLabel":"Gain access to the portal",
            "reason":"this is a test workflow webservice",
            "justification":""
        };

    var wfSubject =
        {
          "uid":"testsaml10",
          "dn":"uid\u003dtestsaml10,ou\u003dinternal,ou\u003dGenericLDAP,o\u003dTremolo",
          "attributes":
            [
              {"values":["testsaml10"],"name":"uid"},
              {"values":["Boston"],"name":"l"},
              {"values":["SAML10"],"name":"sn"},
              {"values":["Test SAML10"],"name":"cn"},
              {"values":["inetOrgPerson"],"name":"objectClass"}
            ],
          "groups":["linkedSAMLUsers"]
        };

    var orgs =
    {
      id:"{123-456-7890123SDF}",
      name:"Root",
      description:"Root of all organizations",
      subOrgs:
        [
          {
            "id":"{123-456-7890123SDFx}",
            "name":"Org1",
            "description":"First organization",
            "subOrgs":[]
          },
          {
            "id":"{123-456-7890123SDFy}",
            "name":"Org2",
            "description":"Second organization",
            "subOrgs":[]
          }

        ]
    };

    var workflows = {};
/*
    {
      "{123-456-7890123SDF}": [
        {
        "name":"wf1",
        "label":"Application 1",
        "description":"Workflow to request application1",
        inCart:false
        },
        {
          "name":"wf2",
          "label":"Application 2",
          "description":"Workflow to request application2",
          inCart:false
        }
      ],

      "{123-456-7890123SDFx}": [
        {
        "name":"wf3",
        "label":"Application 3",
        "description":"Workflow to request application3",
        inCart:false
        }
      ]
    };
*/

    app.controller('ScaleController',['$compile', '$scope','$window','$http','$interval',function($compile, $scope, $window, $http,$interval){


      this.appIsError = false;
      this.sessionLoaded = false;
      this.config = config;
      this.attributes = {};
      this.currentTab = 'home';
      this.cart = {};
      this.approvals = openApprovals;
      this.reports = [""];
      this.user = user;
      this.orgs = [orgs];
      this.reportOrgs;
      this.completedWorkflows = ['wf1','wf3'];
      this.workflows = workflows;
      this.approvalSub = false;
      this.approvalConfirm = false;
      this.userToSave = {};
      this.currentGroups;
      this.showModal = false;
      this.saveUserDisabled = false;
      this.requestAccessCurrentNode = this.orgs[0];
      this.requestAccessCurentWorkflows = this.workflows[this.requestAccessCurrentNode.id];
      this.modalTitle;
      this.modalMessage;
      this.saveUserErrors = [];
      this.saveUserSuccess = false;
      this.submitRequestsDisabled = false;


      this.reportsShowMain = true;
      this.reportsShowParams = false;
      this.reportsShowReport = false;
      this.currentReport = {};
      this.reportData = {};
      this.portalOrgs = [];


      this.rowNumber = 0;
      this.currentApproval = approvalDetails;

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

      //Initialize the attributes
      //for (var i in user.attributes) {
      //  this.attributes[user.attributes[i].name] = user.attributes[i].values[0];
      //}


      //Methods
      this.finishLogout = function() {
          window.location = this.config.logoutURL;
      };

      this.loadReportExcel = function() {
        var url = 'main/reports/' + encodeURIComponent(this.currentReport.name);
        var params = '?excel=true';

        for (p in this.currentReport.paramVals) {
          if (params === '') {
            params = '?';
          } else {
            params += '&';
          }

          params += p + '=' + this.currentReport.paramVals[p];

        }

        url += params;

        this.modalMessage = "Running Report...";
        this.showModal = true;
        this.reportErrors = [];


        $http.get(url).then(
          function(response) {

            var uri = 'main/reports/excel/' + encodeURIComponent(response.data.reportid) + '/' + encodeURIComponent($scope.scale.currentReport.name) + '.xlsx';

            $scope.scale.reportsShowParams = false;
            $scope.scale.reportsShowMain = false;
            $scope.scale.reportsShowReport = true;
            $scope.scale.reportErrors = [];
            $scope.scale.showModal = false;

            window.location = uri;

          },
          function (response) {
            $scope.scale.reportsShowParams = false;
            $scope.scale.reportsShowMain = false;
            $scope.scale.reportsShowReport = true;
            $scope.scale.showModal = false;
          }
        )

      };


      this.loadReport = function() {
        var url = 'main/reports/' + encodeURIComponent(this.currentReport.name);
        var params = '';

        for (p in this.currentReport.paramVals) {
          if (params === '') {
            params = '?';
          } else {
            params += '&';
          }

          params += p + '=' + this.currentReport.paramVals[p];

        }

        url += params;

        this.modalMessage = "Running Report...";
        this.showModal = true;
        this.reportErrors = [];
        this.reportData.when = moment();

        $http.get(url).then(
          function(response) {

            $scope.scale.reportData.data = response.data;

            $scope.scale.reportsShowParams = false;
            $scope.scale.reportsShowMain = false;
            $scope.scale.reportsShowReport = true;
            $scope.scale.reportErrors = [];
            $scope.scale.showModal = false;



          },
          function (response) {

            $scope.scale.reportErrors = response.data.errors;

            $scope.scale.reportsShowParams = false;
            $scope.scale.reportsShowMain = false;
            $scope.scale.reportsShowReport = true;
            $scope.scale.showModal = false;
          }
        )

      };

      this.paramsEntered = function () {

        var ok = true;
        if (this.currentReport.parameters) {
          if (this.currentReport.parameters.indexOf('beginDate') >= 0) {
            ok = ok && (this.currentReport.paramVals && this.currentReport.paramVals.beginDate);
          }

          if (this.currentReport.parameters.indexOf('endDate') >= 0) {
            ok = ok && (this.currentReport.paramVals && this.currentReport.paramVals.endDate);
          }

          if (this.currentReport.parameters.indexOf('userKey') >= 0) {
            ok = ok && (this.currentReport.paramVals && this.currentReport.paramVals.userKey);

          }
        }

        return ok;



      }

      this.debugme = function() {
        alert(this.currentReport.paramVals.beginDate.format('MMMM Do YYYY'));
      }

      this.submitRequests = function() {
        this.submitRequestsDisabled = true;
        this.submitRequestsErrors = [];
        $scope.scale.submitRequestSuccess = [];
        this.modalMessage = "Submitting Requests...";
        this.showModal = true;

        wfRequests = [];

        for (wfuuid in this.cart) {
          wfrequest = {};
          wfrequest.uuid = wfuuid;
          wfrequest.name = this.cart[wfuuid].name;
          wfrequest.reason = this.cart[wfuuid].reason;
          wfrequest.encryptedParams = this.cart[wfuuid].encryptedParams;
          
          //if this is a delegated request
          if (this.cart[wfuuid].delegate) {
        	  wfrequest.subjects = this.cart[wfuuid].subject.split('\n');
        	  if (this.cart[wfuuid].tryPreApprove) {
        		  wfrequest.approved = this.cart[wfuuid].approved;
        		  wfrequest.approvalReason = this.cart[wfuuid].approvalReason;
        		  wfrequest.doPreApproval = true;
        	  }
          }
          
          
          wfRequests.push(wfrequest);
        }

        $http.put("main/workflows",wfRequests).
          then(function(response) {
            $scope.scale.submitRequestsErrors = [];
            $scope.scale.submitRequestSuccess = [];

            for (wfuuid in  response.data) {
              if (response.data[wfuuid] === "success") {
                $scope.scale.submitRequestSuccess.push($scope.scale.cart[wfuuid].label);
                delete $scope.scale.cart[wfuuid];
              } else {
                msg = $scope.scale.cart[wfuuid].label + ' - ' + response.data[wfuuid];
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
        )

      }

      this.loadSaveAttributes = function() {
        for (var i in this.user.attributes) {
          this.userToSave[this.user.attributes[i].name] = {
            name : this.user.attributes[i].name,
            value : this.user.attributes[i].values[0]
          };
        };
      } ;

      this.loadAttributes = function() {
        this.currentGroups = [];
        for (var i in this.user.attributes) {
          if (this.user.attributes[i].values.length > 0) {
            this.attributes[this.user.attributes[i].name] = this.user.attributes[i].values[0];
          }

          if (this.config.roleAttribute) {
            if (this.user.attributes[i].name === this.config.roleAttribute) {
              this.currentGroups = this.user.attributes[i].values;
            }
          }
        }

        if (! this.config.roleAttribute) {
          this.currentGroups = this.user.groups;
        }

        this.loadSaveAttributes();
      };

      this.displayName = function() {
        if (this.config) {
          val = this.attributes[this.config.displayNameAttribute];
          if (val == null) {
            return "No User Loaded";
          } else {
            return val;
          }
        } else {
          return "No User Loaded";
        }
      };

      this.currentApprovalDisplayName = function() {
        val = this.currentApproval.userObj.userID;
        if (val == null) {
          return "No User Loaded";
        } else {
          return val;
        }
      };

      this.isSelectedTab = function(val) {
        return val == this.currentTab;
      };

      this.setSelectedTab = function(val) {
        if (val === 'logout') {
          if (this.cart && _.isEmpty(this.cart)) {
            app = {};
            this.finishLogout();
          } else {
            this.currentTab = val;
          }
        } else {
          this.currentTab = val;
          this.rowNumber = 0;
          this.approvalSub = false;

          this.reportsShowMain = true;
          this.reportsShowReport = false;
          this.reportsShowParams = false;
        }



      };

      this.selectPortalOrgs = function(node) {
        this.portalCurrentNode = node;

        $http.get('main/urls/org/' + encodeURIComponent(node.id)).then(
          function(response) {
            $scope.scale.portalURLs = response.data;

          },
          function(response) {

          }
        );

      };

      this.selectRequestAccessOrg = function(node) {
        this.requestAccessCurrentNode = node;
        this.loadWorkflowsErrors = [];

        $http.get('main/workflows/org/' + this.requestAccessCurrentNode.id).
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

      this.selectReportOrg = function(node) {
        this.reportCurrentNode = node;
        this.loadReportsErrors = [];


        $http.get('main/reports/org/' + this.reportCurrentNode.id).
          then(function(response) {
            $scope.scale.reports[$scope.scale.reportCurrentNode.id] = response.data.reports;
            $scope.scale.reportCurrentReports = $scope.scale.reports[$scope.scale.reportCurrentNode.id];

          },
          function(response) {
            $scope.scale.loadReportsErrors = response.data.errors;
            $scope.scale.reportCurrentReports = [];

          }
        );

      }

      this.runReport = function(report) {
        this.currentReport = report;
        if (report.parameters && report.parameters.length > 0) {
          this.reportsShowReport = false;
          this.reportsShowMain = false;
          this.reportsShowParams = true;
        } else {
          this.loadReport();
        }
      };

      this.isWorkflowCompleted = function(name) {
        if(typeof Array.prototype.indexOf === 'function') {
          indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function(name) {
                var i = -1, index = -1;

                for(i = 0; i < this.length; i++) {
                    if(this[i] === name) {
                        index = i;
                        break;
                    }
                }

                return index;
            };
        }

        return indexOf.call(this.completedWorkflows, name) > -1;
      };

      this.toggleWorkflow = function(workflow) {
        if (workflow.inCart) {
          workflow.inCart = false;
          workflow.reason = "";
          delete this.cart[workflow.uuid];
        } else {
          workflow.inCart = true;
          this.cart[workflow.uuid] = workflow;
          this.cart[workflow.uuid].reason = "";
          this.cart[workflow.uuid].delegate = false;
          this.cart[workflow.uuid].tryPreApprove = false;
          this.cart[workflow.uuid].approved = "false";
          this.cart[workflow.uuid].approvalReason = "";
          this.cart[workflow.uuid].canPreApprove = false;
          this.cart[workflow.uuid].canDelegate = false;
          
          
          $http.get('main/workflows/candelegate?workflowName=' + workflow.name + '&uuid=' + workflow.uuid).
          then(function(response) {
            $scope.scale.cart[response.data['uuid']].canPreApprove = response.data.canPreApprove;
            $scope.scale.cart[response.data['uuid']].canDelegate = response.data.canDelegate;

          },
          function(response) {
            //do nothing
          }
        );
          
          
          
        }
      };

      this.cartLinkLabel = function(workflow) {
        if (workflow.inCart) {
          return "Remove From Cart";
        } else {
          return "Add To Cart";
        }
      };

      this.isCartEmpty = function() {
        return this.numItemsInCart() == 0;
      };

      this.numItemsInCart = function() {
        i = 0;
        for(var key in this.cart) {
          if (this.cart.hasOwnProperty(key)) {
             i++;
          }
         }
         return i;
      };

      this.getRowColor = function() {
        if (this.rowNumber % 2 == 0) {
          this.rowNumber++;
          return "#eee";
        } else {
          this.rowNumber++;
          return "#f9f9f9";
        }
      };

      this.isMobile = function() {
        var ow = $window.outerWidth;
        var mobile = (ow <= 991);
        return ! mobile;
      };

      this.reviewApproval = function(approval) {


        this.currentApproval = {};
        this.modalMessage = "Loading Approval...";
        this.showModal = true;

        this.approvalConfirmDisabled = false;
        this.approvalSuccess = false;
        this.approvalFailure = false;

        $http.get('main/approvals/' + approval.approval).
          then(function(response) {
            $scope.scale.currentApproval = response.data;
            $scope.scale.approvalSub = true;
            $scope.scale.approvalConfirm = false;
            $scope.scale.approvalError = false;
            $scope.scale.approvalErrors = [];
            $scope.scale.showModal = false;

          },
          function(response) {
            alert(response.data);
          }
        );


      };

      this.isApprovalSub = function() {
        return this.approvalSub;
      };

      this.isApprovalConfirm = function() {
        return this.approvalConfirm;
      };

      this.checkApprovalRequest = function() {
        if (! this.currentApproval.justification || this.currentApproval.justification === "") {
          this.approvalError = true;
          this.approvalErrors = [];
          this.approvalErrors.push("Justification is required");
          return false;
        } else {
          this.approvalError = false;
          this.approvalErrors = [];
          return true;
        }
      }

      this.confirmApproval = function() {

        if (this.checkApprovalRequest()) {
          this.approvalConfirm = true;
          this.currentApproval.isApproved = true;
        }
      }

      this.confirmDenial = function() {
        if (this.checkApprovalRequest()) {
          this.approvalConfirm = true;
          this.currentApproval.isApproved = false;
        }
      }

      this.cancelApproval = function() {
        this.approvalConfirm = false;
        this.approvalError = false;
        this.approvalErrors = [];
      }



      this.finishApproval = function() {
        var approvalData = {};
        approvalData.reason = this.currentApproval.justification;
        approvalData.approved = this.currentApproval.isApproved;
        this.approvalConfirmDisabled = true;
        this.approvalSuccess = false;
        this.approvalFailure = false;

        this.modalMessage = "Submitting Decision...";
        this.showModal = true;

        $http.put('main/approvals/' + this.currentApproval.approval,approvalData).
          then(function(response){
            //don't care about the response as long as its 200
            $http.get('main/approvals').
              then(function(response) {
                  $scope.scale.approvals = response.data.approvals;

                  $scope.scale.approvalConfirmDisabled = true;
                  $scope.scale.approvalSuccess = true;
                  $scope.scale.approvalFailure = false;
                  $scope.scale.showModal = false;
              },
              function(response) {
                $scope.scale.approvalConfirmDisabled = false;
                $scope.scale.approvalSuccess = false;
                $scope.scale.approvalFailure = true;
                $scope.scale.showModal = false;
              }
            );
          },
          function (response) {
            $scope.scale.approvalConfirmDisabled = false;
            $scope.scale.approvalSuccess = false;
            $scope.scale.approvalFailure = true;
            $scope.scale.showModal = false;
          }
        );
      }

      this.isApprovalError = function() {
        return this.approvalError;
      }

      this.getConfirmLabel = function() {
        if (this.currentApproval.isApproved) {
          return "Approval";
        } else {
          return "Denial";
        }
      }

      this.isSessionLoaded = function() {
        return this.sessionLoaded;
      }

      this.setSessionLoadedComplete = function() {
        this.sessionLoaded = true;
      }

      this.toggleModal = function(){
          this.showModal = ! this.showModal;
      };

      this.saveUser = function() {
        this.saveUserDisabled = true;
        this.modalTitle = "Saving...";
        this.modalMessage = "Updating your account...";
        this.saveUserErrors = [];
        $scope.scale.saveUserSuccess = false;

        var payload = {};

        for (var attrName in this.userToSave) {
          if (attrName in this.config.attributes &&  ! this.config.attributes[attrName].readOnly) {
            payload[attrName] = this.userToSave[attrName];
          }
        }


        $http.put('main/user',payload).
          then(function(response){
            $scope.scale.user = response.data;
            $scope.scale.loadAttributes();

            $scope.scale.saveUserSuccess = true;
            $scope.scale.saveUserDisabled = false;
            $scope.scale.showModal = false;

          },
          function(response) {
            $scope.scale.saveUserErrors = response.data.errors;
            $scope.scale.saveUserDisabled = false;
            $scope.scale.showModal = false;


          }
        );


        this.toggleModal();

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
      
      this.cleanPortalOrgs = function(org) {
    	  var to_keep = [];
    	  for (var i=0;i<org.subOrgs.length;i++) {
    		  if (org.subOrgs[i].showInPortal) {
    			  to_keep.push(org.subOrgs[i]);
    			  $scope.scale.cleanPortalOrgs(org.subOrgs[i]);
    		  } 
    	  }
    	  
    	  org.subOrgs = to_keep;
    	  
    	  return org;
    	  
      };
      
      this.cleanRequestOrgs = function(org) {
    	  var to_keep = [];
    	  for (var i=0;i<org.subOrgs.length;i++) {
    		  if (org.subOrgs[i].showInRequest) {
    			  to_keep.push(org.subOrgs[i]);
    			  $scope.scale.cleanRequestOrgs(org.subOrgs[i]);
    		  } 
    	  }
    	  
    	  org.subOrgs = to_keep;
    	  
    	  return org;
    	  
      };
      
      this.cleanReportOrgs = function(org) {
    	  var to_keep = [];
    	  for (var i=0;i<org.subOrgs.length;i++) {
    		  if (org.subOrgs[i].showInReports) {
    			  to_keep.push(org.subOrgs[i]);
    			  $scope.scale.cleanReportOrgs(org.subOrgs[i]);
    		  } 
    	  }
    	  
    	  org.subOrgs = to_keep;
    	  
    	  return org;
    	  
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
	    											$http.get('main/config').then(
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
    	  
        $http.get('main/config').
          then(function(response){
            $scope.scale.config = response.data;
            

            $http.get('main/user').
              then(function(response) {
                $scope.scale.user = response.data;
                $scope.scale.loadAttributes();

                $http.get('main/orgs').
                  then(function(response) {
                    $scope.scale.orgs = [$scope.scale.cleanRequestOrgs(JSON.parse(JSON.stringify(response.data)))];
                    $scope.scale.requestAccessOrgsSelectedNode = $scope.scale.orgs[0];
                    $scope.scale.requestAccessOrgsExpandedNodes =[$scope.scale.orgs[0]];
                    $scope.scale.selectRequestAccessOrg($scope.scale.orgs[0]);

                    $scope.scale.reportOrgs = [$scope.scale.cleanReportOrgs(JSON.parse(JSON.stringify(response.data)))];
                    $scope.scale.reportOrgsSelectedNode = $scope.scale.reportOrgs[0];
                    $scope.scale.reportOrgsExpandedNodes = [$scope.scale.reportOrgs[0]];
                    $scope.scale.selectReportOrg($scope.scale.reportOrgsSelectedNode);

                    if ($scope.scale.config.showPortalOrgs) {
                      $scope.scale.portalOrgs = [$scope.scale.cleanPortalOrgs(JSON.parse(JSON.stringify(response.data)))];
                      $scope.scale.portalOrgsSelectedNode = $scope.scale.portalOrgs[0];
                      $scope.scale.portalOrgsExpandedNodes = [$scope.scale.portalOrgs[0]];
                      $scope.scale.selectPortalOrgs($scope.scale.portalOrgsSelectedNode);

                    }

                    $http.get('main/approvals').
                      then(function(response) {
                          $scope.scale.approvals = response.data.approvals;


                          if (! $scope.scale.config.showPortalOrgs) {
                            $http.get('main/urls').then(
                              function(response) {
                                $scope.scale.portalURLs = response.data;

                                $scope.scale.setSessionLoadedComplete();
                                //$scope.$apply();

                              },
                              function(response) {
                                $scope.scale.setSessionLoadedComplete();
                                //$scope.$apply();
                              }
                            );
                          } else {
                            $scope.scale.setSessionLoadedComplete();
                            //$scope.$apply();
                          }

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
                )


              },function(response){
                $scope.scale.appIsError = true;
                //$scope.$apply();
              });
          },function(response){
            $scope.scale.appIsError = true;
            //$scope.$apply();
          });




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
                  
                  '<button type="button" class="btn-primary btn-lg" ng-click="scale.modalOKFunction()" >OK</button>'
                  
                  + '</div>' +
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
