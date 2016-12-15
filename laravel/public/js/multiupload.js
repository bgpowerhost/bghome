window.count = 0;

(function ( $ ) {
 
    $.fn.karupload = function( options ) {

	var settings = $.extend({
		
		karupload       		  : true,
		karupload_path  		  : 'karupload/',
		karupload_main_path       : 'files/',
		karupload_thumbnail_path  : 'files/tn/',
		karupload_resize_to       : 'files/',
		karupload_thumbnail_size  : 'files/tn/',
		karupload_file_delete     :  "",
		karupload_field_name      : 'karupload',
		karupload_main_changed    : "",
		karupload_finished		  : "",
		karupload_picture_deleted : "",
		karupload_maximum_uploads : 100,
		karupload_max_exceeded 	  : ""
		
	}, options);
		
	var holdername = this;
	
	jQuery.data(holdername, 'already_uploaded', 1);
	
	$(holdername).sortable({
		update: function(event, ui) {
			changeMain(holdername, settings);
		}
	});
	
	$(holdername).disableSelection();
	
	$(document).on("change", "."+$(holdername).attr("id")+"Input", function() {
		karuploadHandle(this.files,holdername,settings);
	});
	
	$(holdername).on("click", ".picture_delete", function() {

		jQuery.data(holdername, "already_uploaded", jQuery.data(holdername, "already_uploaded")-1);
		
		$.ajax({
			url: settings.karupload_path+"karupload.php?delete="+$(this).parent().attr('filename')+"&resize_to="+settings.karupload_resize_to+"&thumbnail_size="+settings.karupload_thumbnail_size+"&main_path="+settings.karupload_main_path+"&thumbnail_path="+settings.karupload_thumbnail_path
		});			
		
		$(this).parent().fadeOut("slow", function() {
			$(this).remove();
			changeMain(holdername, settings);
		});
		
		if (typeof settings.karupload_picture_deleted == 'function') { 
			settings.karupload_picture_deleted($(this).parent().attr('filename'));
		}
	});

	//DRAG AND DROP FUNCTION ========================================
	
	var holder = document.getElementById($(holdername).attr("id")+"DDArea");
	holder.ondragover = function () { $(".uploadButton").addClass("DragAndDropHover"); return false; };
	holder.ondragend  = function () { $(".uploadButton").removeClass("DragAndDropHover"); return false; };
	
	holder.ondrop = function (e) {
		$(".uploadButton").removeClass("DragAndDropHover");
		e.preventDefault();
		karuploadHandle(e.dataTransfer.files,holdername,settings);
	} 
	
    };

	function changeMain(holder, settings) {
		$(holder).find(".multibox").removeClass("main");
		$(holder).find(".multibox").first().addClass("main");
		
		if (typeof settings.karupload_main_changed == 'function') {
			settings.karupload_main_changed($(holder).find(".multibox").first().attr('filename'));
		}
	}
	
	function karuploadHandle(files,holder,settings) {
		var i = 0;
		
		for(i=0;i<files.length;i++)
		{
			if(jQuery.data(holder, "already_uploaded") > settings.karupload_maximum_uploads && (typeof settings.karupload_max_exceeded == 'function')) {
				settings.karupload_max_exceeded();
			}
			var re = /(?:\.([^.]+))?$/;
			var ext = re.exec(files[i].name)[1].toLowerCase();
			
			if((ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif') &&  jQuery.data(holder, "already_uploaded") <= settings.karupload_maximum_uploads)
			{
				var clone = $("#to_clone").find(".multibox").clone();
				
				$(holder).append($(clone));
				upload(files[i], clone, i, holder, settings); 
				jQuery.data(holder, "already_uploaded", jQuery.data(holder, "already_uploaded")+1);
				window.count++;
			}
		}
	}	
		
	function upload(file, clone, place, holder, settings)
	{
		var xhr = new XMLHttpRequest();
		xhr.open("POST", settings.karupload_path+"karupload.php?filename="+file.name+"&resize_to="+settings.karupload_resize_to+"&thumbnail_size="+settings.karupload_thumbnail_size+"&main_path="+settings.karupload_main_path+"&thumbnail_path="+settings.karupload_thumbnail_path, true);
		xhr.send(file);
		xhr.onreadystatechange = function() 
		{
			if (xhr.readyState == 4) 
			{
				$(clone).html("<div class='picture_delete'>"+settings.karupload_file_delete+"</div><img src='"+settings.karupload_thumbnail_path+"/"+xhr.responseText+"' alt='' class='picture_uploaded'/> <input type='hidden' value='"+xhr.responseText+"' name='"+settings.karupload_field_name+"[]' />");
				$(clone).attr('id', xhr.responseText);
				$(clone).attr('filename', xhr.responseText);
				if(window.count == parseInt(place)+1) 
				{
					changeMain(holder, settings);
					if (typeof settings.karupload_finished == 'function') { 
						settings.karupload_finished();
					}
				}
			}
		}
	}
 
}( jQuery ));

window.initialized = 0;

function karuploadLoad(name) {
	$('.'+$(name).attr("id")+'Input').click();
	window.count = 0;
	window.initialized++;
}


jQuery.extend({
	

    createUploadIframe: function(id, uri)
	{
			//create frame
            var frameId = 'jUploadFrame' + id;
            var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
			if(window.ActiveXObject)
			{
                if(typeof uri== 'boolean'){
					iframeHtml += ' src="' + 'javascript:false' + '"';

                }
                else if(typeof uri== 'string'){
					iframeHtml += ' src="' + uri + '"';

                }	
			}
			iframeHtml += ' />';
			jQuery(iframeHtml).appendTo(document.body);

            return jQuery('#' + frameId).get(0);			
    },
    createUploadForm: function(id, fileElementId, data)
	{
		//create form	
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');	
		if(data)
		{
			for(var i in data)
			{
				jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
			}			
		}		
		var oldElement = jQuery('#' + fileElementId);
		var newElement = jQuery(oldElement).clone();
		jQuery(oldElement).attr('id', fileId);
		jQuery(oldElement).before(newElement);
		jQuery(oldElement).appendTo(form);


		
		//set attributes
		jQuery(form).css('position', 'absolute');
		jQuery(form).css('top', '-1200px');
		jQuery(form).css('left', '-1200px');
		jQuery(form).appendTo('body');		
		return form;
    },

    ajaxFileUpload: function(s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()        
		var form = jQuery.createUploadForm(id, s.fileElementId, (typeof(s.data)=='undefined'?false:s.data));
		var io = jQuery.createUploadIframe(id, s.secureuri);
		var frameId = 'jUploadFrame' + id;
		var formId = 'jUploadForm' + id;		
        // Watch for a new set of requests
        if ( s.global && ! jQuery.active++ )
		{
			jQuery.event.trigger( "ajaxStart" );
		}            
        var requestDone = false;
        // Create the request object
        var xml = {}   
        if ( s.global )
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back
        var uploadCallback = function(isTimeout)
		{			
			var io = document.getElementById(frameId);
            try 
			{				
				if(io.contentWindow)
				{
					 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
                	 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
					 
				}else if(io.contentDocument)
				{
					 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
                	xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}						
            }catch(e)
			{
				jQuery.handleError(s, xml, null, e);
			}
            if ( xml || isTimeout == "timeout") 
			{				
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                    if ( status != "error" )
					{
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData( xml, s.dataType );    
                        // If a local callback was specified, fire it and pass it the data
                        if ( s.success )
                            s.success( data, status );
    
                        // Fire the global callback
                        if( s.global )
                            jQuery.event.trigger( "ajaxSuccess", [xml, s] );
                    } else
                        jQuery.handleError(s, xml, status);
                } catch(e) 
				{
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed
                if( s.global )
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );

                // Handle the global AJAX counter
                if ( s.global && ! --jQuery.active )
                    jQuery.event.trigger( "ajaxStop" );

                // Process result
                if ( s.complete )
                    s.complete(xml, status);

                jQuery(io).unbind()

                setTimeout(function()
									{	try 
										{
											jQuery(io).remove();
											jQuery(form).remove();	
											
										} catch(e) 
										{
											jQuery.handleError(s, xml, null, e);
										}									

									}, 100)

                xml = null

            }
        }
        // Timeout checker
        if ( s.timeout > 0 ) 
		{
            setTimeout(function(){
                // Check to see if the request is still happening
                if( !requestDone ) uploadCallback( "timeout" );
            }, s.timeout);
        }
        try 
		{

			var form = jQuery('#' + formId);
			jQuery(form).attr('action', s.url);
			jQuery(form).attr('method', 'POST');
			jQuery(form).attr('target', frameId);
            if(form.encoding)
			{
				jQuery(form).attr('encoding', 'multipart/form-data');      			
            }
            else
			{	
				jQuery(form).attr('enctype', 'multipart/form-data');			
            }			
            jQuery(form).submit();

        } catch(e) 
		{			
            jQuery.handleError(s, xml, null, e);
        }
		
		jQuery('#' + frameId).load(uploadCallback	);
        return {abort: function () {}};	

    },

    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if ( type == "script" )
            jQuery.globalEval( data );
        // Get the JavaScript object, if JSON is used.
        if ( type == "json" )
            eval( "data = " + data );
        // evaluate scripts within html
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();

        return data;
    }
})

