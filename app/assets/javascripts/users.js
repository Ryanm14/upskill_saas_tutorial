/* global $, Stripe */
//Document Ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');  
  var sumbitButton = $('#form-sumbit-btn');
  
  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
  
  //Event handler to user click
  sumbitButton.click(function(event){
     //prevent submission
    event.preventDefault();
    
    //Collect the credit card fields
    var ccNum = $('#card_number').val(), 
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
    //Send card info to stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
 
  
 
  //Stripe will return a card token
  //Inject card token as hidden field
  //Sumbit form to rails app
})