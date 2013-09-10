(function($){
	$(function(){
		var refreshMessages = function() {
			$.get("/get", function(data) {
				$('.messages').html('');
				for(var i =0; i < data.length; i++) {
					$('.messages').append(
						$('<li><span class="author">' 
							+ data[i].author
						+ '</span> '
						+ '<span class="message">'
							+ data[i].message
						+ '</span></li>'
						)
					);
				}
				$('.messages').scrollTop(100000);
			});
		}
		var sanitizeFormField = function(s) {
			return s.replace('/', '');
		}

		$('.chat-form').submit(function(event){
			event.preventDefault();

			var a = sanitizeFormField($('#author').val());
			var m = sanitizeFormField($('#message').val());

			if(a && m) {
				$.post("/post/" + a + "/" + m,
					function() {
						// nothing to do
					}
				);
				$('#message').val('').focus();
				refreshMessages();
			}
		});

		refreshMessages();

		setInterval(refreshMessages, 2000);
	});
})(jQuery);
