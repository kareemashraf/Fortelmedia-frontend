

$(document).ready(function(){	


    $( "#read" ).one( "click", function() {
        
	    	$.ajax({
	                      type: 'GET',
	                      url: 'http://127.0.0.1:8000/api/clients/',
	                      // dataType: 'text/html',
	                      success: function(result) {

					            $.each(result, function(idx, item){

					            	for (var i = 0; i < item.clientcontact.length; i++) { 
									 
					      						var $tr = $('<tr>').append(
										            $('<td>').text(item.first_name),
										            $('<td>').text(item.last_name),
										            $('<td>').html('<input type="text" value="'+item.email+'" class="email'+item.id+'" />'),
										            $('<td>').text(item.clientcontact[i].address),
										            $('<td>').text(item.clientcontact[i].post_code),
										            $('<td>').html('<button value='+item.id+' type="button" class="btn btn-warning update">update</button> <button value='+item.id+' type="button" class="btn btn-danger delete">delete</button>')
										        ).appendTo('#records_table');
									}
					            })
						   }		        
	    	});

	});

	// for Delete
	$(document).on('click', '.delete', function(){
		var obj = $(this);
		var id = $(this).attr('value')
	    

		$.ajax({
	                      type: 'DELETE',
	                      url: 'http://localhost:8000/api/clients/'+id,
	                      // data: {id: id},
	                      success: function(result) {
	                      		
					             //   $(obj).closest("tr").remove(); // You can remove row like this
					          $('#records_table').html('');
					          myFunction();
					          alert('deleted')
						   }		        
	    	});
	});




	// for Update
	$(document).on('click', '.update', function(){
		
		var id = $(this).attr('value')
	    
		var email = $(this).closest("tr")   // Finds the closest row <tr> 
                       .find(".email"+id).val();  //find the value with of the mentioned class name


			$.ajax({
	                      type: 'PUT',
	                      url: 'http://localhost:8000/api/clients/'+id,
	                      data: {email: email},
	                      success: function(result) {
					          alert('updated')
					          $('#records_table').html('');
					          myFunction();
						   }		        
	    	});
	});



		// for CREATE
	$( "#create" ).click(function() {
		
	var first_name 	= $('#first_name').val()
	var last_name 	= $('#last_name').val()
	var email 		= $('#email').val()
	var address 	= $('#address').val()
	var post_code 	= $('#post_code').val()

	if (first_name != '' || last_name != '' || email !='' || address != '' || post_code != '') {

		$.ajax({
	                      type: 'POST',
	                      url: 'http://localhost:8000/api/clients/',
	                      data: {first_name: first_name,last_name: last_name,email: email,address: address,post_code: post_code},
	                      success: function(result) {
					          alert('inserted')
					          $('#records_table').html('');
					          myFunction();
						   }		        
	    	});

	}else{
		$("#error").html('<i class="error" style="color: red;"> missing form data </i>')
	}
			
	})



	function myFunction(){  
             $.ajax({
	                      type: 'GET',
	                      url: 'http://127.0.0.1:8000/api/clients/',
	                      // dataType: 'text/html',
	                      success: function(result) {

					            $.each(result, function(idx, item){

					            	for (var i = 0; i < item.clientcontact.length; i++) { 
									 
					      						var $tr = $('<tr>').append(
										            $('<td>').text(item.first_name),
										            $('<td>').text(item.last_name),
										            $('<td>').html('<input type="text" value="'+item.email+'" class="email'+item.id+'" />'),
										            $('<td>').text(item.clientcontact[i].address),
										            $('<td>').text(item.clientcontact[i].post_code),
										            $('<td>').html('<button value='+item.id+' type="button" class="btn btn-warning update">update</button> <button value='+item.id+' type="button" class="btn btn-danger delete">delete</button>')
										        ).appendTo('#records_table');
									}
					            })
						   }		        
	    	});
        }

	
});



