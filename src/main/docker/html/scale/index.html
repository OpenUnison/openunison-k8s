<!--
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
 -->
<html ng-app="scale" lang="en">
<head >
	    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta http-equiv="cache-control" content="max-age=0" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
		<meta http-equiv="pragma" content="no-cache" />
    <title>Tremolo Security Scale</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" />
		<link href="css/angular.treeview.css" rel="stylesheet" />
		<link href="css/unison.css" rel="stylesheet" />
		<link href="css/calendar.css" rel="stylesheet" />
		<link href="css/calendar.less" rel="stylesheet/less" type="text/css" />
	<link href="css/font-awesome.min.css"
      type="text/css" rel="stylesheet" />
			<link rel="stylesheet" type="text/css" href="css/tree-control.css">
			<script type="text/javascript" src="js/less.min.js"></script>
<script type="text/javascript" src="js/underscore-min.js"></script>
		<script type="text/javascript" src="js/moment.min.js"></script>


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--
		Need to figure out how to handle
		<panelGroup rendered="${commonUiHelper.isIE9()}">
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
   </panelGroup> -->

</head>
<body ng-controller="ScaleController as scale">
	<div class="container">
		<div ng-show="! scale.isSessionLoaded() && scale.appIsError">
			<div class="navbar navbar-default" role="navigation">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
			        <span class="sr-only">Toggle navigation</span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			      </button>
			      <img class="hidden-xs" src="images/logo-desktop.png"  width="85%" alt="scale"/>
			      <img class="visible-xs img-responsive" src="images/logo-mobile.png" alt="scale" />
			    </div>
			    <div class="navbar-collapse collapse">
			      <ul class="nav navbar-nav">

						</ul>

			    </div><!--/.nav-collapse -->
			  </div><!--/.container-fluid -->
			</div>
			<div class="jumbotron">
				<div class="alert alert-info" >
					<center><h3>Contacting Unison</h3>
					<b>If this screen does not disapear please contact your system administrator</b></center>
				</div>
			</div>
		</div>
		<div ng-show="! scale.isSessionLoaded() && ! scale.appIsError">
			<div class="navbar navbar-default" role="navigation">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
			        <span class="sr-only">Toggle navigation</span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			      </button>
			      <img class="hidden-xs" src="images/logo-desktop.png"  width="85%" alt="scale"/>
			      <img class="visible-xs img-responsive" src="images/logo-mobile.png" alt="scale" />
			    </div>
			    <div class="navbar-collapse collapse">
			      <ul class="nav navbar-nav">

						</ul>

			    </div><!--/.nav-collapse -->
			  </div><!--/.container-fluid -->
			</div>
			<div class="jumbotron">
				<center><h1>Logging In</h1></center>
				<center><h1><i class="fa fa-refresh fa-spin block"></i></h1></center>
			</div>
		</div>
		<div ng-show="scale.isSessionLoaded()">

	<!-- Static navbar -->
	<div class="navbar navbar-default" role="navigation">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <img class="hidden-xs" src="images/logo-desktop.png"  width="85%" alt="scale"/>
	      <img class="visible-xs img-responsive" src="images/logo-mobile.png" alt="scale" />
	    </div>
	    <div class="navbar-collapse collapse">
	      <ul class="nav navbar-nav">
					<li  ng-class="{active:scale.isSelectedTab('user')}">
					  <a href ng-click="scale.setSelectedTab('user')" style="color:#484848"  >{{ scale.displayName() }}</a>
					</li>
					<li ng-class="{active:scale.isSelectedTab('home')}" >
						<a href ng-click="scale.setSelectedTab('home')" style="color:#484848">Home</a>
					</li>
					<li ng-class="{active:scale.isSelectedTab('requestAccess')}">
						<a href ng-click="scale.setSelectedTab('requestAccess')" style="color:#484848">Request Access</a>
					</li>
					<li ng-class="{active:scale.isSelectedTab('checkOut')}">
						<a href ng-click="scale.setSelectedTab('checkOut')" style="color:#484848">Check Out
							<span class="badge alert-danger" ng-hide="scale.isCartEmpty()">{{ scale.numItemsInCart() }}</span>
	          </a>
	        </li>
					<li ng-class="{active:scale.isSelectedTab('approvals')}" ng-show="scale.approvals.length" >
	        	<a href ng-click="scale.setSelectedTab('approvals')" style="color:#484848">Open Approvals
	            <span class="badge alert-danger">{{ scale.approvals.length }}</span></a>
	        </li>
					<li ng-class="{active:scale.isSelectedTab('reports')}" ng-show="scale.reports.length">
	        	<a href ng-click="scale.setSelectedTab('reports')" style="color:#484848">Reports</a>
	        </li>
					<li ng-class="{active:scale.isSelectedTab('logout')}">
						<a href ng-click="scale.setSelectedTab('logout')" style="color:#484848">Logout</a>
					</li>
				</ul>

	    </div><!--/.nav-collapse -->
	  </div><!--/.container-fluid -->
	</div>

	<div class="jumbotron">
		<div ng-show="scale.isSelectedTab('user')">
	  	<h2>{{ scale.displayName() + "'s Profile" }}</h2>

			<div class="row" ng-show="scale.saveUserErrors.length > 0">
				<div class="alert alert-danger" >
					<b>There was a problem saving
						{{ scale.displayName() }}'s changes:</b>
					<ul>
							<li ng-repeat="msg in scale.saveUserErrors">{{ msg }}</li>
					</ul>
				</div>
			</div>

			<div class="row" ng-show="scale.saveUserSuccess">
				<div class="alert alert-success" >
					<b>{{ scale.displayName() }}'s changes saved successfully.  The changes may not be reflected in your account immediately.</b>

				</div>
			</div>

			<div class="row">
					<div class="col-md-6">
						<h3>Attributes</h3>

						<!-- For users that can be edited -->
						<div ng-show="scale.config.canEditUser" >
							<form name="saveUserForm">
								<div class="row" ng-repeat="attributeConfig in scale.config.attributes">
										<div class="col-md-4">{{ attributeConfig.displayName}}</div>
										<div class="col-md-4" ng-hide="attributeConfig.readOnly" ><input type="text" ng-model="scale.userToSave[attributeConfig.name].value"  aria-label="{{ attributeConfig.displayName }}" /></div>
										<div class="col-md-4" ng-show="attributeConfig.readOnly"><label>{{ scale.attributes[attributeConfig.name] }}</label></div>
								</div>
								<div  class="row">
									<input type="button" ng-disabled="scale.saveUserDisabled" class="btn btn-lg btn-primary" value="Save" ng-click="scale.saveUser()" />
								</div>
							</form>
						</div>

						<!-- For users that can NOT be edited -->
						<div ng-hide="scale.config.canEditUser">
							<div class="row" ng-repeat="attributeConfig in scale.config.attributes">
									<div class="col-md-4">{{ attributeConfig.displayName}}</div>
									<div class="col-md-4"><label>{{ scale.attributes[attributeConfig.name] }}</label></div>
								</div>
						</div>
					</div>

					<div class="col-md-6">
						<h3>Roles</h3>
						<div ng-hide="scale.user.groups.length" class="alert alert-info" >{{ scale.displayName() }} has no roles assigned</div>

						<ul class="list-group" ng-show="scale.currentGroups.length">
								<li class="list-group-item" ng-repeat="groupName in scale.currentGroups">{{ groupName }}</li>
						</ul>

					</div>
			</div>

		</div>

		<div ng-show="scale.isSelectedTab('home')">
	  	<h2>{{ scale.config.frontPage.title }}</h2>
			{{ scale.config.frontPage.text }}

			<div class="row" ng-show="scale.config.showPortalOrgs">


				<treecontrol class="tree-light col-md-6"
				   tree-model="scale.portalOrgs"
				   options="scale.treeOptions"
				   on-selection="scale.selectPortalOrgs(node)"
				   selected-node="scale.portalOrgsSelectedNode"
					 expanded-nodes="scale.portalOrgsExpandedNodes">
				   {{node.name}}
				</treecontrol>

				<div class="col-md-6">
					<div class="alert alert-info " >
						<h3 >{{ scale.portalCurrentNode.name }}</h3>
						{{ scale.portalCurrentNode.description }}
					</div>
				</div>


			</div>
			<div class="row">
				<div class="col-sm-6 col-md-4" ng-repeat="url in scale.portalURLs">
					<div class="thumbnail" style="background:#eeeeee;">
						<a href="{{url.url}}" target="{{url.label}}"><img
							src="data:image/png;base64,{{url.icon}}" alt="{{url.label}}"/></a>
						<div class="caption">
							<center><h3>{{url.label}}</h3></center>
						</div>
					</div>
				</div>
			</div>

		</div>

		<div ng-show="scale.isSelectedTab('requestAccess')">
	  	<h2>Request Access to Applications</h2>
			<div class="row" ng-show="scale.loadWorkflowsErrors && scale.loadWorkflowsErrors.length > 0">
				<div class="alert alert-danger" >
					<b>There was a problem loading available requests : </b>
					<ul>
							<li ng-repeat="msg in scale.loadWorkflowsErrors">{{ msg }}</li>
					</ul>
				</div>
			</div>
			<div class="row">
				<treecontrol class="tree-light col-md-6"
				   tree-model="scale.orgs"
				   options="scale.treeOptions"
				   on-selection="scale.selectRequestAccessOrg(node)"
				   selected-node="scale.requestAccessOrgsSelectedNode"
					 expanded-nodes="scale.requestAccessOrgsExpandedNodes">
				   {{node.name}}
				</treecontrol>



				<div class="col-md-6">
					<div class="alert alert-info " >
						<h3 >{{ scale.requestAccessCurrentNode.name }}</h3>
						{{ scale.requestAccessCurrentNode.description }}
					</div>
				</div>

			</div>

			<div class="row" ng-class-odd="'row-odd'" ng-class-even="'row-even'" ng-repeat="workflow in scale.requestAccessCurentWorkflows">
				<div class="col-md-4">
					<a href ng-click="scale.toggleWorkflow(workflow)">{{ scale.cartLinkLabel(workflow) }}</a>
						<span ng-show="scale.isWorkflowCompleted(workflow.name)" class="badge alert-success">Approved</span>
				</div>
				<div class="col-md-4">
					{{workflow.label}}
				</div>
				<div class="col-md-4">
					{{workflow.description}}
				</div>
			</div>

		</div>
		<div ng-show="scale.isSelectedTab('checkOut')">
			<div class="alert alert-info" ng-show="scale.isCartEmpty()">
						{{ scale.displayName() }} does not have any open requests. Click
						"Request Access" to make requests.</div>

			<div class="row" ng-show="scale.submitRequestsErrors && scale.submitRequestsErrors.length > 0">
				<div class="alert alert-danger" >
					<b>There was a problem submitting {{ scale.displayName() }}'s requests : </b>
					<ul>
							<li ng-repeat="msg in scale.submitRequestsErrors">{{ msg }}</li>
					</ul>
				</div>
			</div>

			<div class="row" ng-show="scale.submitRequestSuccess && scale.submitRequestSuccess.length > 0">
				<div class="alert alert-success" >
					<b>There following requests were successfully submitted : </b>
					<ul>
							<li ng-repeat="msg in scale.submitRequestSuccess">{{ msg }}</li>
					</ul>
				</div>
			</div>

			<div class="row"  ng-repeat="wf in scale.cart" ng-class-odd="'row-odd'" ng-class-even="'row-even'">
				<div class="row">

					<div class="col-md-3">
					  <a href ng-click="scale.toggleWorkflow(wf)"> Remove From Cart</a>
	
					</div>
					<div class="col-md-3">{{ wf.label }}</div>
					<div class="col-md-3">{{ wf.description }}</div>
					<div class="col-md-3">
					  <input type="text" ng-model="wf.reason" placeholder="Supply Reason" required="true" aria-label="Reason for request"/>
					</div>
				</div>
				<div class="row" ng-show="wf.canDelegate">
					
					<div class="col-md-12"> <input type="checkbox" ng-model="wf.delegate" /> Request For Someone Else</div>
				</div>
				<div class="row" ng-show="wf.delegate">
					<div class="col-md-3"><b>Requesting For</b> - List each {{ scale.config.uidAttributeName }} on its own line</div>
					<div class="col-md-3"><textarea rows="4" cols="50" ng-model="wf.subject" ></textarea></div>
				</div>
				<div class="row" ng-show="wf.delegate && wf.canPreApprove">
					<div class="col-md-1"> </div>
					<div class="col-md-11"><input type="checkbox" ng-model="wf.tryPreApprove" /> Attempt Preapproval?</div>
				</div>
				<div class="row" ng-show="wf.delegate && wf.tryPreApprove && wf.canPreApprove">
					<div class="col-md-1"> </div>
					<div class="col-md-11"><input type="radio" ng-model="wf.approved" value="true" /> Approved</div>
				</div>
				<div class="row" ng-show="wf.delegate && wf.tryPreApprove && wf.canPreApprove">
					<div class="col-md-1"> </div>
					<div class="col-md-11"><input type="radio" ng-model="wf.approved" value="false" /> Denied</div>
				</div>
				<div class="row" ng-show="wf.delegate && wf.tryPreApprove && wf.canPreApprove">
					<div class="col-md-1"> </div>
					<div class="col-md-1"><b>Reason</b></div>
					<div class="col-md-10"><input type="text" ng-model="wf.approvalReason" /></div>
				</div>
				
			</div>

			<div class="row" ng-show="! scale.isCartEmpty()">
					<input type="button" ng-disabled="scale.submitRequestsDisabled" ng-click="scale.submitRequests()" class="btn btn-lg btn-primary" value="Submit Request"  />
			</div>
		</div>

		<div ng-show="scale.isSelectedTab('approvals')  && ! scale.isApprovalSub()">
			<div class="row"  ng-show="scale.isMobile()" resize>
					<div class="col-md-2"><b>Action</b></div>
					<div class="col-md-2"><b>Subject</b></div>
					<div class="col-md-3"><b>{{ scale.config.workflowName }}</b></div>
					<div class="col-md-3"><b>Request</b></div>
					<div class="col-md-2"><b>Date Opened</b></div>
			</div>
			<div class="row"  ng-repeat="approval in scale.approvals" ng-class-odd="'row-odd'" ng-class-even="'row-even'">
				<div class="col-md-2"><input type="button" class="btn btn-primary" value="Review" ng-click="scale.reviewApproval(approval)"/></div>
				<div class="col-md-2"><span  ng-show="! scale.isMobile()"><b>Subject : </b></span>{{ approval.displayName }}</div>
				<div class="col-md-3"><span  ng-show="! scale.isMobile()"><b>{{ scale.config.workflowName }} : </b></span>{{ approval.wfLabel }}</div>
				<div class="col-md-3"><span  ng-show="! scale.isMobile()"><b>Request : </b></span>{{ approval.label }}</div>
				<div class="col-md-2"><span  ng-show="! scale.isMobile()"><b>Date Opened : </b></span>{{ approval.approvalStart | date : 'short' }}</div>
			</div>
		</div>


		<!-- Approval / Denial -->
		<div ng-show="scale.isSelectedTab('approvals') && scale.isApprovalSub() && ! scale.isApprovalConfirm() ">
			<div class="row" ng-show="scale.isApprovalError()">
				<div class="alert alert-danger" >
					<b>There was a problem acting on
						{{ scale.currentApprovalDisplayName() }}'s request:</b>
					<ul>
							<li ng-repeat="msg in scale.approvalErrors">{{ msg }}</li>
					</ul>
				</div>
			</div>
			<div class="row">
				<h3>Request Details</h3>
				<div class="row">
					<div class="col-md-4">
						<b>Subject</b>
					</div>
					<div class="col-md-8">{{ scale.currentApprovalDisplayName() }}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>{{ scale.config.workflowName }}
							Name</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.wfLabel }}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>{{ scale.config.workflowName }}
							Description</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.wfDescription }}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>{{ scale.config.workflowName }}
							Request Started</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.wfStart | date : 'short'}}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>Subject's Request</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.label }}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>Subject's Request Reason</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.reason }}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>Approval Opened</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.approvalStart | date : 'short' }}</div>
				</div>

			</div>

			<div class="row">
				<h3>Subject Information</h3>
				<div class="col-md-6">
					<h4>Attributes</h4>




					<div class="row" ng-repeat="attr in scale.currentApproval.userObj.attribs">

							<div class="col-md-4">
								<b>{{ attr.name }}</b>
							</div>
							<div class="col-md-4">{{ attr.values[0] }}</div>

					</div>

				</div>




				<div class="col-md-6">
					<h4>Current Roles</h4>
					<div ng-show="scale.currentApproval.userObj.groups.length == 0">
						<div class="alert alert-info" >{{ scale.currentApproval.userObj.attribs[scale.config.displayNameAttribute].values[0] }}
							has no roles assigned</div>
					</div>
					<div ng-show="scale.currentApproval.userObj.groups.length > 0">
						<ul class="list-group">
								<li class="list-group-item" ng-repeat="groupName in scale.currentApproval.userObj.groups">{{ groupName }}</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="row">
				<h3>Act on Request</h3>

					<div class="row">
						<div class="col-md-4">
							<b>Justification</b>
						</div>

						<div class="col-md-8">
							<input type="text" ng-model="scale.currentApproval.justification" />
						</div>
					</div>
					<div class="row">
						<br />
					</div>
					<div class="row">
						<div class="col-md-3"></div>
						<div class="col-md-3">

							<input type="button" class="btn btn-lg btn-success btn-block"
								value="Approve Request" ng-click="scale.confirmApproval()" />

						</div>
						<div class="col-md-3">
							<input type="button" class="btn btn-lg btn-danger btn-block"
								value="Deny Request" ng-click="scale.confirmDenial()"  />
						</div>

					</div>
			</div>

		</div>

		<!-- Confirm Approval/Denial -->
		<div ng-show="scale.isSelectedTab('approvals') && scale.isApprovalSub() && scale.isApprovalConfirm()">
			<div class="row">
				<h3>Request Details</h3>

				<div class="row" ng-show="scale.approvalFailure">
					<div class="alert alert-danger" >
						<b>There was a problem acting on
							{{ scale.currentApprovalDisplayName() }}'s request, please try again later or contact a system administrator</b>
					</div>
				</div>

				<div class="row" ng-show="scale.approvalSuccess">
					<div class="alert alert-success" >
						<b>Your {{ scale.getConfirmLabel() }} of {{ scale.currentApprovalDisplayName() }}'s request was successfully submitted</b>
					</div>
				</div>



				<div class="row">
					<div class="col-md-4">
						<b>Subject</b>
					</div>
					<div class="col-md-8">{{ scale.currentApprovalDisplayName() }}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>{{ scale.config.workflowName }}
							Name</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.wfLabel }}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>{{ scale.config.workflowName }}
							Description</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.wfDescription }}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>{{ scale.config.workflowName }}
							Request Started</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.wfStart | date : 'short'}}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>Subject's Request</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.label }}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>Subject's Request Reason</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.reason }}</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<b>Approval Opened</b>
					</div>
					<div class="col-md-8">{{ scale.currentApproval.approvalStart | date : 'short' }}</div>
				</div>

			</div>

			<div class="row">
				<h3>Subject Information</h3>
				<div class="col-md-6">
					<h4>Attributes</h4>




					<div class="row" ng-repeat="attr in scale.currentApproval.userObj.attribs">

							<div class="col-md-4">
								<b>{{ attr.name }}</b>
							</div>
							<div class="col-md-4">{{ attr.values[0] }}</div>

					</div>

				</div>




				<div class="col-md-6">
					<h4>Roles</h4>
					<div ng-show="scale.currentApproval.userObj.groups.length == 0">
						<div class="alert alert-info" >{{ scale.currentApproval.userObj.attribs[scale.config.displayNameAttribute].values[0] }}
							has no roles assigned</div>
					</div>
					<div ng-show="scale.currentApproval.userObj.groups.length > 0">
						<ul class="list-group">
								<li class="list-group-item" ng-repeat="groupName in scale.currentApproval.userObj.groups">{{ groupName }}</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="row">
				<h3>Act on Request</h3>

					<div class="row">
						<div class="col-md-4">
							<b>Justification</b>
						</div>

						<div class="col-md-8">
							{{ scale.currentApproval.justification }}
						</div>
					</div>
					<div class="row">
						<br />
					</div>
					<div class="row">
						<div class="col-md-3"></div>
						<div class="col-md-3">

							<input type="button" class="btn btn-lg btn-info btn-block"
								value="Confirm {{ scale.getConfirmLabel() }}" ng-hide="scale.approvalConfirmDisabled" ng-click="scale.finishApproval()"/>

						</div>
						<div class="col-md-3">
							<input type="button" class="btn btn-lg btn-warning btn-block"
								value="Cancel {{ scale.getConfirmLabel() }}" ng-hide="scale.approvalConfirmDisabled" ng-click="scale.cancelApproval()"/>
						</div>

					</div>
			</div>

		</div>

		<!-- reports -->
		<div ng-show="scale.isSelectedTab('reports')">
			<div ng-show="scale.reportsShowMain" >
				<h2>View Reports</h2>
				<div class="row" ng-show="scale.loadReportsErrors.lngth > 0">
					<div class="alert alert-danger" >
						<b>There was a problem loading available reports : </b>
						<ul>
								<li ng-repeat="msg in scale.loadReportsErrors">{{ msg }}</li>
						</ul>
					</div>
				</div>
				<div class="row">


					<treecontrol class="tree-light col-md-6"
					   tree-model="scale.reportOrgs"
					   options="scale.treeOptions"
					   on-selection="scale.selectReportOrg(node)"
					   selected-node="scale.reportOrgsSelectedNode"
						 expanded-nodes="scale.reportOrgsExpandedNodes">
					   {{node.name}}
					</treecontrol>

					<div class="col-md-6">
						<div class="alert alert-info " >
							<h3 >{{ scale.reportCurrentNode.name }}</h3>
							{{ scale.reportCurrentNode.description }}
						</div>
					</div>

				</div>

				<div class="row" ng-class-odd="'row-odd'" ng-class-even="'row-even'" ng-repeat="report in scale.reportCurrentReports">
					<div class="col-md-4">
						<a href ng-click="scale.runReport(report)">{{ report.name }}</a>

					</div>
					<div class="col-md-4">
						<a href ng-click="scale.runReport(report)">{{ report.description }}</a>
					</div>

				</div>
		</div>
		<div ng-show="scale.reportsShowParams">
			<h3>Parameters for {{ scale.currentReport.name }}</h3>


			<div ng-show="scale.currentReport.parameters.indexOf('userKey') >= 0">
				<div class="row">
						<div class="col-md-4">User</div>
						<div class="col-md-8">
							<input type="text" ng-model="scale.currentReport.paramVals.userKey" aria-label="User"/>
						</div>
					</div>
			</div>
			<div class="row" ng-show="scale.currentReport.parameters.indexOf('beginDate') >= 0">
				<div class="col-md-2">Begin Date</div>
				<div class="col-md-2">{{ scale.currentReport.paramVals.beginDate.format('MMMM Do, YYYY')  }}</div>
				<div class="col-md-1"> </div>
				<div class="col-md-7"> <calendar selected="scale.currentReport.paramVals.beginDate"></calendar></div>
			</div>
			<div class="row" ng-show="scale.currentReport.parameters.indexOf('endDate') >= 0">
				<div class="col-md-2">End Date</div>
				<div class="col-md-2">{{ scale.currentReport.paramVals.endDate.format('MMMM Do, YYYY')  }}</div>
				<div class="col-md-1"> </div>
				<div class="col-md-7"> <calendar selected="scale.currentReport.paramVals.endDate"></calendar></div>

			</div>

			<div class="row" >
				<input type="button" class="btn btn-lg btn-primary btn-block"
					value="Run Report" ng-hide="! scale.paramsEntered()" ng-click="scale.loadReport()"/>
			</div>

		</div>
		<div ng-show="scale.reportsShowReport">
			<div class="row" ng-show="scale.reportErrors.length > 0">
				<div class="alert alert-danger" >
					<b>There was a problem loading the report : </b>
					<ul>
							<li ng-repeat="msg in scale.reportErrors">{{ msg }}</li>
					</ul>
				</div>
			</div>
			<div class="row" ng-show="scale.reportErrors.length == 0">
				<div class="row">
						<h3>{{ scale.reportData.data.name }}</h3>
						{{ scale.reportData.data.description }}
					</div>
					<div class="row">
						{{ scale.reportData.when.format('MMMM Do, YYYY h:mm:ss a') }}
					</div>
					<div class="row">
						<a href="" ng-click="scale.loadReportExcel()">Export to Excel</a>
					</div>
					<div ng-repeat="grouping in scale.reportData.data.grouping">
						<table class="table">
							<tr ng-repeat="header in scale.reportData.data.headerFields">
								<th scope="row">{{ header }}</th>
								<td>{{ grouping.header[header] }}
							</tr>
						</table>

						<table class="table table-striped">
							<tr>
								<th scope="col" ng-repeat="header in scale.reportData.data.dataFields">{{ header }}</th>
							</tr>
							<tr ng-repeat="row in grouping.data">
								<td ng-repeat="field in scale.reportData.data.dataFields">{{ row[field] }}</td>

							</tr>

						</table>
					</div>
			</div>
			<div class="row" ng-show="scale.reportData.grouping.length == 0">

					<div class="alert alert-info" >
						No data was returned for this report.  Please check your parameters and try again.
					</div>

				</div>
		</div>
		<div class="row">

		</div>
	</div>
	<!-- reports -->
	<div ng-show="scale.isSelectedTab('logout')">
		<div class="alert alert-danger" >
						<b>There are still items in your cart.  Don't forget to check them out to complete the requests.</b><br />
						<a href="" ng-click="scale.finishLogout()">Continue to logout</a>
					</div>
	</div>

	</div>

	<modal title="Processing" visible="scale.showModal">
		 <center><h1>{{ scale.modalMessage }}</h1>
     <h1><i class="fa fa-refresh fa-spin block"></i></h1></center>
   </modal>

</div>

	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="js/jquery.min.js"></script>
	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="js/bootstrap.min.js"></script>

	<script src="js/angular.min.js"></script>

	<script type="text/javascript" src="js/angular-tree-control.js"></script>




<script src="js/scale.js"></script>

</body>
</html>
