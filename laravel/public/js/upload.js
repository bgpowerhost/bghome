function replaceSymbols(value) {
	value = value.split(' ').join('_');
	value = value.split(',').join('_');
	value = value.split('\'').join('_');
	value = value.split('@').join('_');
	value = value.split('#').join('_');
	value = value.split('.').join('_');
	return value;
}

var upload_status = [0,0,true];
var file_drag = null;
var file_data = null;
var upload_files = [];

function uploadImages() {
	if(file_data == null) {
		if(file_drag == null) {
			file_data = $("#upload_images").prop("files");
		} else {
			file_data = file_drag;
		}
	}
	if(upload_status[2] == true) {
		upload_status[1] = file_data.length;
		for (i = 0; i < file_data.length; i++) {
			file_ext = file_data[i].name.split('.').pop();
			file_name = file_data[i].name.substr(0, file_data[i].name.lastIndexOf(".")) + file_ext;
			file_name = replaceSymbols(file_name);
			rand = file_name;
			$('<li style="padding: 0px 0px 11px 11px;" class="upload_li ui-sortable-handle" id="load_image_'+rand+'"><div class="listing-image" style="width: 180px;height: 140px;"><img value="-90" src="/public/images/loader.gif" alt="Listing" draggable="false" style="width: 70px;height: 70px;margin: 40px 0px -44px 55px;"><span class="processing_upload_'+rand+'" style="margin: 0px auto;display: block;text-align: center;"><b>0</b></span></div></li>').insertBefore('.button-upload-images');
		}
		$('#upload_images').attr('disabled','disabled');
		$('#tab_plans').attr('class','disabledTab');
		$('#tab_video').attr('class','disabledTab');
		upload_status[2] = false;
	}
	file = file_data[upload_status[0]];//File
	allowed_extensions = ['jpeg','jpg','png','gif'];// 
	file_ext = file.name.split('.').pop().toLowerCase();
	if(allowed_extensions.indexOf(file_ext) > -1) {
		uploadFile(file, '/upload-images', 'images')
	} else {
		
		if(file_drag.length > 1) {
			for(i = 0; i < file_drag.length; i++) {
				file_ext = file_data[i].name.split('.').pop();
				file_name = file_data[i].name.substr(0, file_data[i].name.lastIndexOf(".")) + file_ext;
				file_name = replaceSymbols(file_name);
				rand = file_name;
				$('#load_image_'+rand).remove();
			}
		} else {
			file_ext = file_data[upload_status[0]].name.split('.').pop();
			file_name = file_data[upload_status[0]].name.substr(0, file_data[upload_status[0]].name.lastIndexOf(".")) + file_ext;
			file_name = replaceSymbols(file_name);
			rand = file_name;
			$('#load_image_'+rand).remove();
		}
		upload_status = [0,0,true];
		
		file_drag = null;
		file_data = null;
	}
}

function uploadPlans() {
	if(file_data == null) {
		if(file_drag == null) {
			file_data = $("#upload_plans").prop("files");
		} else {
			file_data = file_drag;
		}
	}
	if(upload_status[2] == true) {
		upload_status[1] = file_data.length;
		for (i = 0; i < file_data.length; i++) {
			file_ext = file_data[i].name.split('.').pop();
			file_name = file_data[i].name.substr(0, file_data[i].name.lastIndexOf(".")) + file_ext;
			file_name = replaceSymbols(file_name);
			rand = file_name;
			$('<li style="padding: 0px 0px 11px 11px;" class="upload_li ui-sortable-handle" id="load_image_'+rand+'"><div class="listing-image" style="width: 180px;height: 140px;"><img value="-90" src="/public/images/loader.gif" alt="Listing" draggable="false" style="width: 70px;height: 70px;margin: 40px 0px -44px 55px;"><span class="processing_upload_'+rand+'" style="margin: 0px auto;display: block;text-align: center;"><b>0</b></span></div></li>').insertBefore('.button-upload-plans');
		}
		$('#upload_plans').attr('disabled','disabled');
		$('#tab_images').attr('class','disabledTab');
		$('#tab_video').attr('class','disabledTab');
		upload_status[2] = false;
	}
	file = file_data[upload_status[0]];//File
	allowed_extensions = ['jpeg','jpg','png','gif'];// 
	file_ext = file.name.split('.').pop().toLowerCase();
	if(allowed_extensions.indexOf(file_ext) > -1) {
		uploadFile(file, '/upload-plans', 'plans')
	} else {
		
		if(file_drag.length > 1) {
			for(i = 0; i < file_drag.length; i++) {
				file_ext = file_data[i].name.split('.').pop();
				file_name = file_data[i].name.substr(0, file_data[i].name.lastIndexOf(".")) + file_ext;
				file_name = replaceSymbols(file_name);
				rand = file_name;
				$('#load_image_'+rand).remove();
			}
		} else {
			file_ext = file_data[upload_status[0]].name.split('.').pop();
			file_name = file_data[upload_status[0]].name.substr(0, file_data[upload_status[0]].name.lastIndexOf(".")) + file_ext;
			file_name = replaceSymbols(file_name);
			rand = file_name;
			$('#load_image_'+rand).remove();
		}
		upload_status = [0,0,true];
		
		file_drag = null;
		file_data = null;
	}
}

function uploadDocuments() {
	if(file_data == null) {
		if(file_drag == null) {
			file_data = $("#upload_documents").prop("files");
		} else {
			file_data = file_drag;
		}
	}
	
	//console.log(file_data);
	
	if(upload_status[2] == true) {
		upload_status[1] = file_data.length;
		for (i = 0; i < file_data.length; i++) {
			file_ext = file_data[i].name.split('.').pop();
			file_name = file_data[i].name.substr(0, file_data[i].name.lastIndexOf(".")) + file_ext;
			file_name = replaceSymbols(file_name);
			rand = file_name;
			$('<li style="padding: 0px 0px 11px 11px;" class="upload_li ui-sortable-handle" id="load_image_'+rand+'"><div class="listing-image" style="width: 180px;height: 140px;"><img value="-90" src="/public/images/loader.gif" alt="Listing" draggable="false" style="width: 70px;height: 70px;margin: 40px 0px -44px 55px;"><span class="processing_upload_'+rand+'" style="margin: 0px auto;display: block;text-align: center;"><b>0</b></span></div></li>').insertBefore('.button-upload-documents');
		}
		$('#tab_images').attr('class','disabledTab');
		$('#tab_images').attr('class','disabledTab');
		$('#tab_video').attr('class','disabledTab');
		upload_status[2] = false;
	}
	file = file_data[upload_status[0]];//File
	allowed_extensions = ['jpeg','jpg','png','gif', 'doc', 'xls', 'pdf', 'ppt', 'txt'];// 
	file_ext = file.name.split('.').pop().toLowerCase();
	if(allowed_extensions.indexOf(file_ext) > -1) {
		uploadFile(file, '/upload-documents', 'documents');
	} else {
		
		if(file_drag.length > 1) {
			for(i = 0; i < file_drag.length; i++) {
				file_ext = file_data[i].name.split('.').pop();
				file_name = file_data[i].name.substr(0, file_data[i].name.lastIndexOf(".")) + file_ext;
				file_name = replaceSymbols(file_name);
				rand = file_name;
				$('#load_image_'+rand).remove();
			}
		} else {
			file_ext = file_data[upload_status[0]].name.split('.').pop();
			file_name = file_data[upload_status[0]].name.substr(0, file_data[upload_status[0]].name.lastIndexOf(".")) + file_ext;
			file_name = replaceSymbols(file_name);
			rand = file_name;
			$('#load_image_'+rand).remove();
		}
		upload_status = [0,0,true];
		
		file_drag = null;
		file_data = null;
	}
}

function uploadFile(file,url,type) {
	var fd = new FormData();
	fd.append("file", file);
	// These extra params aren't necessary but show that you can include other data.
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	
	xhr.upload.onprogress = function(e) {
		if (e.lengthComputable) {
			var percentComplete = (e.loaded / e.total) * 100;
			//console.log(percentComplete);
			file_ext = file_data[upload_status[0]].name.split('.').pop();
			file_name = file_data[upload_status[0]].name.substr(0, file_data[upload_status[0]].name.lastIndexOf(".")) + file_ext;
			file_name = replaceSymbols(file_name);
			rand = file_name;
			$('.processing_upload_'+rand).html('<b>'+parseInt(percentComplete)+'</b>');
		}
	};
	
	xhr.onload = function() {
	if (this.status == 200) {
		upload_status[0]++;
		obj = JSON.parse(this.response);
		rand = obj.rand_id;
		if(type == 'images') {
			input = '<input type="hidden" name="images[]" value="'+obj.name+'">';
		} else {
			if(type == 'plans') {
				input = '<input type="hidden" name="plans[]" value="'+obj.name+'">';
			} else {
				if(type == 'documents') {
					input = '<input type="hidden" name="documents[]" value="'+obj.name+'">';
				}
			}
		}
		
		if(type == 'plans' || type =='images') {
			$('<li style="cursor:move" class="upload_li" id="rm_id_'+rand+'"><div class="listing-image"><img value="-90" id="rm_db_id_'+rand+'" src="'+obj.path+obj.name+'" alt="Listing" draggable="false"><div class="image-links" style="top: 55%;" ><div style="cursor:pointer;cursor:pointer;width: 45px;height: 0px;margin: 0px 5px;"  onclick="rotateImage(\''+obj.name+'\',\'-90\',\'rm_db_id_'+rand+'\', \''+type+'\')" class="left"><a class="inner" ><i class="fa fa-repeat"></i></a></div><div style="cursor:pointer;width: 45px;height: 0px;margin: 0px 5px;" onclick="removeImage(\''+obj.name+'\',\'rm_id_'+rand+'\',  \''+type+'\')" class="right"><a class="inner"><i class="fa fa-times"></i></a></div>'+input+'</div></div></li>').insertBefore('#load_image_'+rand);
		} else {
			$('<li style="cursor:move" class="upload_li" id="rm_id_'+rand+'"><div class="listing-image"><img id="rm_db_id_'+rand+'" src="/public/images/doc.png" alt="Listing" draggable="false"><div class="image-links" style="top: 55%;" >'+input+'</div></div></li>').insertBefore('#load_image_'+rand);
		}
		
		//console.log(file);
		$('#load_image_'+rand).remove();
		if(upload_status[0] == upload_status[1]) {
			upload_status = [0,0,true];
			file_drag = null;
			file_data = null;
			if(type == 'images') {
				$('#upload_images').removeAttr('disabled');
				$('#tab_plans').attr('class','');
				$('#tab_video').attr('class','');
			} else {
				if(type == 'plans') {
					$('#upload_plans').removeAttr('disabled');
					$('#tab_images').attr('class','');
					$('#tab_video').attr('class','');
				}
			}
			console.log('Готово');
		} else {
			console.log('Има още снимки');
			if(type == 'images') {
				uploadImages();
			} else {
				if(type == 'plans') {
					uploadPlans();
				} else {
					if(type == 'documents') {
						uploadDocuments();
					}
				}
			}
		}
	}
		};
	xhr.send(fd);
}

function removeImage(name,rm_id, type) {
	if(type == 'images') {
		type = 'estates';
	}
	$.ajax({
		type: 'POST',
		url: "/remove-images",
		data: {filename: name, type: type}
	 }).done(function(e){
		$('#'+rm_id).remove();
	 });
}

function rotateImage(name, rotate, rand_id, type) {
	rotate_val = document.getElementById(rand_id).getAttribute('value');
	$.ajax({
		type: 'POST',
		url: "/rotate-image",
		data: {filename: name,rotate:rotate_val, type: type}
	 }).done(function(res){
		
		 document.getElementById(rand_id).src='/public/images/'+res+'/'+name+ '?time='+ new Date();;
	 });
}
$(document).ready(function()
{
var obj = $(".photos_uploaded");
obj.on('dragenter', function (e) 
{
	e.stopPropagation();
	e.preventDefault();
	//$(this).css('border', '2px solid #0B85A1');
});
obj.on('dragover', function (e) 
{
	 e.stopPropagation();
	 e.preventDefault();
});
obj.on('drop', function (e) 
{
	 //$(this).css('border', '2px dotted #0B85A1');
	 e.preventDefault();
	 var files = e.originalEvent.dataTransfer.files;
	 if(file_data == null) {
		file_drag = files;
		uploadImages(); 
	 }
});
$(document).on('dragenter', function (e) 
{
	e.stopPropagation();
	e.preventDefault();
});
$(document).on('dragover', function (e) 
{
  e.stopPropagation();
  e.preventDefault();
 // obj.css('border', '2px dotted #0B85A1');
});
$(document).on('drop', function (e) 
{
	e.stopPropagation();
	e.preventDefault();
});

});