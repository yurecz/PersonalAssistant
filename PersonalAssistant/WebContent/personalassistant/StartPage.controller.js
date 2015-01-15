sap.ui.controller("personalassistant.StartPage", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf personalassistant.StartPage
	 */
	onInit : function() {
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(this.data);

		sap.ui.getCore().setModel(oModel);
		// this.setModel(oModel);
		this.initRecognition();
	},

	data : {
		text : "",
		status : false,
		speech : {
			status : false,
			fullstop : false
		}
	},

	recognition : {},

	initRecognition : function() {
		if ('webkitSpeechRecognition' in window) {
			recognition = new webkitSpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.lang = 'ru-RU';
			recognition.onresult = function(event) {
				var interim_transcript = '';
				var final_transcript = '';

				// for (var i = 0; i < event.results.length ; ++i ) {
				// if ( event.results[i].isFinal = false ) {
				// interim_transcript += event.results[i][0].transcript;
				// }
				// }

				var result = event.results[event.results.length - 1];
				final_transcript = result[0].transcript;
				final_transcript = final_transcript + ' ' + result.isFinal;
				sap.ui.getCore().getModel().setData({
					text : final_transcript
				}, true);
			};
			recognition.onstart = function(event) {
				 sap.ui.getCore().getModel().setData({
				 status : true
				 }, true);
				
			};
			recognition.onend = function(event) {
				var model = sap.ui.getCore().getModel();
				var fullstop = model.oData.speech.fullstop;

				if (fullstop == false) {
					sap.ui.getCore().getModel().setData({
						text : "Перезапускаю",
						status: false
					}, true);
					recognition.start();
				} else {
					 sap.ui.getCore().getModel().setData({
						 status : false,
						 speech : { fullstop: false }
						 }, true);
				}

			};
			recognition.onerror = function(event) {
				var model = sap.ui.getCore().getModel();
				model.setData({
					text : "Error Type: " + event.error,
					status : false
				}, true);

			};
		}
		else {
			var model = sap.ui.getCore().getModel();
			model.setData({
				text : "Browser does not support Google Speech API" ,
				status : false
			}, true);			
		}

	},

	startSpeechRecognition : function() {
		recognition.start();
	},

	stopSpeechRecognition : function() {
		var model = sap.ui.getCore().getModel();
		 sap.ui.getCore().getModel().setData({
			 speech : { fullstop: true }
			 }, true);		
		 recognition.stop();
	}

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf personalassistant.StartPage
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf personalassistant.StartPage
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf personalassistant.StartPage
 */
// onExit: function() {
//
// }
});