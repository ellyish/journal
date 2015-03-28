$(document).ready(function  () {
	

	$("#textarea").click(function  () {
		this.contentEditable = true;
	})
	$("#textarea").keydown(function  (event) {

			// if (event.which == 17) {
			// 	this.contentEditable = false;
			// } else {
			// 	this.contentEditable = true;
			// };


			if(event.which == 32) {
			$.ajax({
			  url: 'https://access.alchemyapi.com/calls/text/TextGetRankedNamedEntities',
			  dataType: 'jsonp',
			  jsonp: 'jsonp',
			  type: "post",
			  data: { apikey: '5230c560b344d1c16b4b14e38e45241e40dc161e', text: $("#textarea").text(), outputMode: 'json' },
			  success: function(res){
			    if (res["status"] === "OK") {
			       console.log(res.entities)

			       for (var i = 0; i < res.entities.length; i++) {
			       				$.ajax({
								  url: 'https://access.alchemyapi.com/calls/url/URLGetText',
								  dataType: 'jsonp',
								  jsonp: 'jsonp',
								  type: "post",
								  data: { apikey: '5230c560b344d1c16b4b14e38e45241e40dc161e', url: res.entities[i].disambiguated.dbpedia , outputMode: 'json' },
								  success: function(res){
								    if (res["status"] === "OK") {


								    }
								    else if (res["status"] === "ERROR") {
								      //Do something bad
								    }
								  },
								  error: function(jqxhr) {
								    //console.log(jqxhr);
								  }
					
								});



			       	var src_str = $("#textarea").html();
					var term = res.entities[i].text;
					term = term.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
					var pattern = new RegExp("("+term+")", "gi");

					src_str = src_str.replace(pattern, "<a class='tooltip' data-title='tooltip text here!' href='#'>$1</a>");
					src_str = src_str.replace(/(<a class='tooltip' data-title='tooltip text here!' href="#">[^<>]*)((<[^>]+>)+)([^<>]*<\/a>)/,"$1</a>$2<a class='tooltip' data-title='tooltip text here!' href='#''>$4");

					$("#textarea").html(src_str);
			      	placeCaretAtEnd( document.getElementById("textarea") );

			       };

			    }
			    else if (res["status"] === "ERROR") {
			      //Do something bad
			    }
			  },
			  error: function(jqxhr) {
			    //console.log(jqxhr);
			  }
			});

			}
	})


	function placeCaretAtEnd(el) {
	    el.focus();
	    if (typeof window.getSelection != "undefined"
	            && typeof document.createRange != "undefined") {
	        var range = document.createRange();
	        range.selectNodeContents(el);
	        range.collapse(false);
	        var sel = window.getSelection();
	        sel.removeAllRanges();
	        sel.addRange(range);
	    } else if (typeof document.body.createTextRange != "undefined") {
	        var textRange = document.body.createTextRange();
	        textRange.moveToElementText(el);
	        textRange.collapse(false);
	        textRange.select();
	    }
	}

	placeCaretAtEnd( document.getElementById("content") );

})