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

<head>
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

	<link href="css/font-awesome.min.css" type="text/css" rel="stylesheet" />
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
						<img class="hidden-xs" src="images/logo-desktop.png" width="85%" alt="scale" />
						<img class="visible-xs img-responsive" src="images/logo-mobile.png" alt="scale" />
					</div>
					<div class="navbar-collapse collapse">
						<ul class="nav navbar-nav">

						</ul>

					</div>
					<!--/.nav-collapse -->
				</div>
				<!--/.container-fluid -->
			</div>
			<div class="jumbotron">
				<div class="alert alert-info">
					<center>
						<h3>Contacting Unison</h3>
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
						<img class="hidden-xs" src="images/logo-desktop.png" width="85%" alt="scale" />
						<img class="visible-xs img-responsive" src="images/logo-mobile.png" alt="scale" />
					</div>
					<div class="navbar-collapse collapse">
						<ul class="nav navbar-nav">

						</ul>

					</div>
					<!--/.nav-collapse -->
				</div>
				<!--/.container-fluid -->
			</div>
			<div class="jumbotron">
				<center>
					<h1>Loading Operators View</h1>
				</center>
				<center>
					<h1><i class="fa fa-refresh fa-spin block"></i></h1>
				</center>
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
						<img class="hidden-xs" src="images/logo-desktop.png" width="85%" alt="scale" />
						<img class="visible-xs img-responsive" src="images/logo-mobile.png" alt="scale" />
					</div>
					<div class="navbar-collapse collapse">
						<ul class="nav navbar-nav">
							<li>
								<a href="">{{ scale.displayName }}</a>
							</li>
							<li ng-class="{active:scale.isSelectedTab('home')}">
								<a href ng-click="scale.setSelectedTab('home')" style="color:#484848">Home</a>
							</li>
							<li ng-class="{active:scale.isSelectedTab('logout')}">
								<a href ng-click="scale.setSelectedTab('logout')" style="color:#484848">Logout</a>
							</li>
						</ul>

					</div>
					<!--/.nav-collapse -->
				</div>
				<!--/.container-fluid -->
			</div>

			<div class="jumbotron">


				<div ng-show="scale.isSelectedTab('home')">
					<h2>{{ scale.config.frontPage.title }}</h2>
					{{ scale.config.frontPage.text }}

					

					<!-- Edit user -->
					<div ng-show="scale.showUser">
						<div class="row" ng-show="scale.saveUserErrors.length > 0">
							<div class="alert alert-danger" >
								<b>There was a problem saving changes:</b>
								<ul>
										<li ng-repeat="msg in scale.saveUserErrors">{{ msg }}</li>
								</ul>
							</div>
						</div>
			
						<div class="row" ng-show="scale.saveUserSuccess">
							<div class="alert alert-success" >
								<b>Changes saved successfully.  The changes may not be available immediately.</b>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<h3>Attributes</h3>
								<!-- For users that can be edited -->
								<div ng-show="scale.currentUser.canEditUser">
									<form name="saveUserForm">
										<div class="row" ng-repeat="attr in scale.currentUser.attributes">
											<div class="col-md-4">{{ scale.currentUser.metaData[attr.name].displayName }}</div>
											<div class="col-md-4" ng-hide="scale.currentUser.metaData[attr.name].readOnly">
												<input type="text" ng-show="! scale.currentUser.metaData[attr.name].type" ng-model="attr.values[0]"
												 aria-label="{{ scale.currentUser.metaData[attr.name].displayName }}" />
												<input type="text" ng-show="scale.currentUser.metaData[attr.name].type == 'text'" ng-model="attr.values[0]"
												 aria-label="{{ scale.currentUser.metaData[attr.name].displayName }}" />
												<textarea rows="10" cols="30" ng-show="scale.currentUser.metaData[attr.name].type == 'textarea'" ng-model="attr.values[0]"
												 aria-label="{{ scale.currentUser.metaData[attr.name].displayName }}">{{attr.values[0]}}</textarea>
												<select ng-show="scale.currentUser.metaData[attr.name].type == 'list'" ng-model="attr.values[0]" aria-label="{{ scale.currentUser.metaData[attr.name].displayName }}"
												 ng-options="option.value as option.name for option in scale.currentUser.metaData[attr.name].values"></select>
											</div>
											<div class="col-md-4" ng-show="scale.currentUser.metaData[attr.name].readOnly"><label>{{ attr.values[0] }}</label></div>
										</div>
										<div class="row">
											<div class="col-md-4">Reason For Update</div>
											<div class="col-md-4"><input type="text" aria-label="Reason For Update" ng-model="scale.currentUser.changeReason" /></div>
										</div>
										<div class="row">
											<input type="button" ng-disabled="scale.saveUserDisabled" class="btn btn-lg btn-primary" value="Save" ng-click="scale.saveUser()"/>
										</div>
									</form>
								</div>

								<!-- For users that can NOT be edited -->
								<div ng-hide="scale.currentUser.canEditUser">
									<div class="row" ng-repeat="attr in scale.currentUser.attributes">
										<div class="col-md-4">{{ scale.currentUser.metaData[attr.name].displayName }}</div>
										<div class="col-md-4"><label>{{ attr.values[0] }}</label></div>
									</div>
								</div>

							</div>

							<div class="col-md-6">
								<h3>Roles</h3>
								<div ng-hide="scale.currentUser.groups.length" class="alert alert-info">{{ scale.currentUser[scale.config.displayNameAttribute]
									}} has no roles assigned</div>

								<ul class="list-group" ng-show="scale.currentUser.groups.length">
									<li class="list-group-item" ng-repeat="groupName in scale.currentUser.groups">{{ groupName }}</li>
								</ul>

							</div>
						</div>
						<div class="row">
							<input type="button" class="btn btn-lg btn-primary btn-block" value="Return To Search" ng-click="scale.viewSearch()" />
						</div>
					</div>

					<!-- For users that can be edited -->
					<div ng-show="scale.showForm">
						<form name="saveUserForm">
							<div class="row">
								<div class="col-md-3">
									Search Base
								</div>
								<div class="col-md-6">
									<select ng-model="scale.search_base" aria-label="Search Base" ng-options="o as o for o in scale.config.searchBases" convert-to-string></select>
								</div>
							</div>

							<!-- Search Attributes -->

							<div class="row">
								<div class="col-md-3" ng-repeat="attrcfg in scale.config.searchableAttributes">
									<input type="checkbox" ng-model="attrcfg.picked" /> {{attrcfg.label}} <input type="text" ng-model="attrcfg.value"
									/>

								</div>
							</div>

							<div class="col-md-3">
							</div>
							<div class="col-md-6">
								<input type="button" ng-disabled="scale.searchDisabled" class="btn btn-lg btn-primary btn-block" value="Search" ng-click="scale.search()"
								/>
							</div>

						</form>


						<div>
							<table class="table table-striped">
								<tr>
									<th>Select</th>
									<th scope="col" ng-repeat="header in scale.config.resultsAttributes">{{ header.label }}</th>
								</tr>
								<tr ng-repeat="userObj in scale.searchResults">
									<td><input type="checkbox" ng-model="userObj.picked" /></td>
									<td ng-repeat="header in scale.config.resultsAttributes">
										<a href="" ng-click="scale.viewUser(userObj)">
											{{ userObj[header.name] }}
										</a>
									</td>

								</tr>

							</table>
						</div>
						<div class="row" ng-show="scale.isUsersSelected()">
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
						<div class="row" ng-show="scale.isUsersSelected()">
								<div class="row" ng-class-odd="'row-odd'" ng-class-even="'row-even'" ng-repeat="workflow in scale.requestAccessCurentWorkflows">
									<div class="col-md-4">
										<a href ng-click="scale.executeWorkflow(workflow)">Run</a>
									</div>
									<div class="col-md-4">
										{{workflow.label}}
									</div>
									<div class="col-md-4">
										{{workflow.description}}
									</div>
								</div>
							</div>
		
							<div ng-show="scale.isWorkflowBeingRun()">
								<div class="row">
									<h4>Run {{scale.workflowToRun.name}} For Selected Users</h4>
								</div>
								<div class="row" ng-show="scale.submitRequestsErrors && scale.submitRequestsErrors.length > 0">
									<div class="alert alert-danger" >
										<b>There was a problem submitting the request : </b>
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
								<div class="row">
									<div class="col-md-2">
										<b>Reason For Request</b>
									</div>
									<div class="col-md-10">
										<input type="text" ng-model="scale.workflowToRun.reason" required="true" aria-label="Reason for request" />
									</div>
		
								</div>
								<div class="row" ng-show="scale.wfMetaData.canDelegate && scale.wfMetaData.canPreApprove">
									<div class="col-md-12"><input type="checkbox" ng-model="scale.workflowToRun.doPreApproval" /> Attempt Preapproval?</div>
								</div>
								<div class="row" ng-show="scale.wfMetaData.canDelegate && scale.workflowToRun.doPreApproval && scale.wfMetaData.canPreApprove">
									<div class="col-md-12"><input type="radio" ng-model="scale.workflowToRun.approved" value="true" /> Approved</div>
								</div>
								<div class="row" ng-show="scale.wfMetaData.canDelegate && scale.workflowToRun.doPreApproval && scale.wfMetaData.canPreApprove">
									<div class="col-md-12"><input type="radio" ng-model="scale.workflowToRun.approved" value="false" /> Denied</div>
								</div>
								<div class="row" ng-show="scale.wfMetaData.canDelegate && scale.workflowToRun.doPreApproval && scale.wfMetaData.canPreApprove">
									<div class="col-md-1"><b>Reason</b></div>
									<div class="col-md-11"><input type="text" ng-model="scale.workflowToRun.approvalReason" /></div>
								</div>
								<div class="row">
									<div class="col-md-3"></div>
									<div class="col-md-6">
										<input type="button" ng-disabled="scale.submitDisabled" class="btn btn-lg btn-primary btn-block" value="Submit Workflow"
										 ng-click="scale.submitWorkflow()" />
									</div>
								</div>
							</div>
					</div>
					

				</div>





			</div>

			<modal title="Processing" visible="scale.showModal">
				<center>
					<h1>{{ scale.modalMessage }}</h1>
					<h1><i class="fa fa-refresh fa-spin block"></i></h1>
				</center>
			</modal>

		</div>

		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="js/jquery.min.js"></script>
		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="js/bootstrap.min.js"></script>

		<script src="js/angular.min.js"></script>

		<script type="text/javascript" src="js/angular-tree-control.js"></script>
		<script type="text/javascript" src="js/angular-sanitize.min.js"></script>



		<script src="js/scale.js"></script>

</body>

</html>