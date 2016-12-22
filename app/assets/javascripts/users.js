/* global $, Stripe */
//Document Ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');  
  var sumbitButton = $('#form-signup-btn');
  
  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
  
  //Event handler to user click
  sumbitButton.click(function(event){
     //prevent submission
    event.preventDefault();
    sumbitButton.val("Proccessing").prop('disabled', true);
    
    //Collect the credit card fields
    var ccNum = $('#card_number').val(), 
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
    //Use Stripe to check for card errors
    var error = false;
    if(!Stripe.card.validateCardNumber(ccNum)){
      error = true;
      alert('The credit card number appears to be invalid')
    }
    
    if(!Stripe.card.validateCVC(cvcNum)){
      error = true;
      alert('The CVC Number appears to be invalid')
    }
    
    if(!Stripe.card.validateExpiry(expMonth, expYear)){
      error = true;
      alert('The expiration date appears to be invalid')
    }
      
    //Send card info to stripe
    if(error){
      //If there are card errors
      sumbitButton.prop('disabled',false).val("Sign Up");
    } else {
      Stripe.createToken({
          number: ccNum,
          cvc: cvcNum,
          exp_month: expMonth,
          exp_year: expYear
      }, stripeResponseHandler);
    }
    
    return false;
  });
  
  //Stripe will return a card token
 function stripeResponseHandler(status, response) {
    //Get the token from the response.
    var token = response.id;
    //Inject the card token in a hidden field.
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    //Submit form to our Rails app.
    theForm.get(0).submit();
  }
});