/**
* Initial Landing Page Java Script Functionality
*/
"use strict";
(function () {
	
 	//API Configuration details
	const API_PATH = '/api/v1';
    const API_END_POINT = "http://localhost/sunrise-backend" + API_PATH;
    const Config = {
        API: {
            SAVE_SUBCRIBE_DATA : API_END_POINT + '/save-subscriber-data'
        }
    };

	var landingObj = {
		initialize: function() {
			$("#email").focus();
		},
		validateEmail: function (email) {
			if(!email) {
				return null;
			}

	        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		return re.test(String(email).toLowerCase());
    	},
		validate: function () {
            var email = $("#email").val();

            if (!email) {
            	$("#cspio-privacy-policy-txt").text('Please enter your email');
            	return false;
            } else if (this.validateEmail(email) === false) {
            	$("#cspio-privacy-policy-txt").text("Invalid email address");
            	return false;
            } else {
            	$("#cspio-privacy-policy-txt").text("");
            	return true;
            }
        },
		saveSubscriberData : function() { 
			var email  = $("#email").val();

			if (!email) {
				return false;
			}

			$.ajax({
	            type: "POST",
	            url: Config.API.SAVE_SUBCRIBE_DATA,
	            data: {
	                email: email
	            },
	            dataType: "json",
	            success: function (data) {
	                if (data.ack === "Success") {
	                    alert("Thank you for subscribing to our website");
	                    $("#cspio-privacy-policy-txt").text("");
	                    $("#email").val("").focus();
	                    return true;
	                } else {
	                	$("#cspio-privacy-policy-txt").text(data.status.message);
	                	return false;
	                }
	            }
	        });
		}
	};

	$(document).ready(function(){
		$("#cspio-subscribe-btn").on("click", function() {  
			var validate = landingObj.validate();
			
			if (validate) {
				landingObj.saveSubscriberData();
			}
		});

		/**
		* Initialize function
		*/
		landingObj.initialize();
	});
})();
