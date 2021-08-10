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
					<li>
					  <a href="">{{ scale.displayName }}</a>
					</li>
					<li ng-class="{active:scale.isSelectedTab('home')}" >
						<a href ng-click="scale.setSelectedTab('home')" style="color:#484848">Home</a>
					</li>
					<li ng-class="{active:scale.isSelectedTab('logout')}">
						<a href ng-click="scale.setSelectedTab('logout')" style="color:#484848">Logout</a>
					</li>
				</ul>

	    </div><!--/.nav-collapse -->
	  </div><!--/.container-fluid -->
	</div>

	<div class="jumbotron">


		<div ng-show="scale.isSelectedTab('home')">
	  	<h2>{{ scale.config.frontPage.title }}</h2>
			{{ scale.config.frontPage.text }}


			<div class="row" ng-repeat="(name,value) in scale.token">
				<div class="col-md-1"><button ng-click-copy="{{value}}"><i class="fa fa-copy"  ></i></button></div>
				<div class="col-md-4"><label>{{name}}</label></div>

				<div class="col-md-7"><pre>{{value}}</pre></div>
			</div>

			<div class="row" ng-show="scale.config.qrCodeAttribute && scale.token[scale.config.qrCodeAttribute]">
				<div class="col-md-4"><label>QR Code</label></div>
				<div class="col-md-8"><qrcode version="10" error-correction-level="H" size="200" data="{{ scale.token[scale.config.qrCodeAttribute] }}"></qrcode></div>
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

<script type="text/javascript" src="js/qrcode.js"></script>
<script type="text/javascript" src="js/qrcode_UTF8.js"></script>
<script type="text/javascript" src="js/angular-qrcode.js"></script>
<script type="text/javascript" src="js/ngClickCopy.js"></script>

<script src="js/scale.js"></script>

</body>
</html>
