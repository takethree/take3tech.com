/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs 
  */
$(function() {

 $("#demo-request input, #demo-request select, #demo-request textarea").jqBootstrapValidation(
    {
     preventSubmit: true,
     submitError: function($form, event, errors) {
      // something to have when submit produces an error ?
      // Not decided if I need it yet
     },
     submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
       // get values from FORM
       var name = $("input#name2").val();  
       var email = $("input#email2").val();
       var tel = $("input#tel2").val();
       var subject = $("select#subject").val();
       var firstName = name; // For Success/Failure Message
           // Check for white space in name for Success/Fail message
       if (firstName.indexOf(' ') >= 0) {
     firstName = name.split(' ').slice(0, -1).join(' ');
         }        
   $.ajax({
              url: "./PHP/contact_demoRequest.php",
              type: "POST",
              data: {name: name, email: email, subject: subject, tel: tel},
              cache: false,
              success: function() {  
              // Success message
                $('#success2').html("<div class='alert alert-success'>");
                $('#success2 > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append( "</button>");
                $('#success2 > .alert-success')
                .append("<strong>Your message has been sent. Thanks!</strong>");
                $('#success2 > .alert-success')
                .append('</div>');
                
      //clear all fields
      $('#demoForm').trigger("reset");
        },
     error: function() {    
    // Fail message
     $('#success2').html("<div class='alert alert-danger'>");
              $('#success2 > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
               .append( "</button>");
              $('#success2 > .alert-danger').append("<strong>Sorry "+firstName+" it seems that our mail server is not responding...</strong> Could you please email us directly to <a href='mailto:support@take3tech.com?Subject=Please Contact "+firstName+" - Take 3 Support'>support@take3tech.com</a>? Sorry for the inconvenience!");
          $('#success2 > .alert-danger').append('</div>');
    //clear all fields
    $('#demoForm').trigger("reset");
      },
           })
         },
         filter: function() {
                   return $(this).is(":visible");
         },
       });

      $("a[data-toggle=\"tab\"]").click(function(e) {
                    e.preventDefault();
                    $(this).tab("show");
        });
  });
 

/*When clicking on Full hide fail/success boxes */ 
$('#name2').focus(function() {
     $('#success2').html('');
  });
