
var timestamp = 0;
var url = 'ajaxpush.php';
var noerror = true;

function connect() {
	$.ajax(url, {
		type : 'get',
		data : {
			'timestamp' : timestamp
		},
		success : function(transport) {
			var valid = (transport.substr(1, 1) == '{');
			// handle the server response
			if (valid) {
				eval('var response = ' + transport);
				timestamp = response['timestamp'];
				handleResponse(response);
			}
			noerror = true;
		},
		complete : function(transport) {
			// send a new ajax request when this request is finished
			if (!noerror)
				// if a connection problem occurs, try to reconnect each 5
				// seconds
				setTimeout(function() {
					connect()
				}, 5000);
			else
				connect();
			noerror = false;
		}
	});
}

function handleResponse(response) {
	$('#content').append('<div>' + response['msg'] + '</div>');
}

function send(form) {
	var msg = $('#user', form).val() + ": " + $('#word', form).val()
	$('#word', form).val('');
	$.ajax(url, {
		type : 'get',
		data : {
			'msg' : msg
		}
	});
	return false;
}

$(document).ready(function() {
	connect();
});
