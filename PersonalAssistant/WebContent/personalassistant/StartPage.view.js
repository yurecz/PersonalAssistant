sap.ui.jsview("personalassistant.StartPage", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf personalassistant.StartPage
	 */
	getControllerName : function() {
		return "personalassistant.StartPage";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf personalassistant.StartPage
	 */
	createContent : function(oController) {
		var page = new sap.m.Page("pageMain");
		var button = new sap.m.Button({
			id : "btnStartListen", // sap.ui.core.ID
			text : "Микрофон1", // string
			press : function() {
				var model = sap.ui.getCore().getModel();
				var status = model.oData["status"];
				if (status == false) {
					oController.startSpeechRecognition();
				} else {
					oController.stopSpeechRecognition();
				}
			}
		});
		var text = new sap.m.Text({
			text : "{/text}"
		});
		var label = new sap.m.Label({
			id : "lbl_status",
			text : {
				path : "/status",
				formatter : function(status) {
					return ((status == true) ? 'Включенo' : "Выключено")
				}
			}
		});

		page.addContent(button);
		page.addContent(label);
		page.addContent(text);
		return page;
	}

});