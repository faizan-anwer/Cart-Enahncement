$(document).ready(function () {
	(function () {
		$('.form-start').wrap('<form id="shoppingCart" action="http://portals.austin.360training.com/360training.com/360CartPages/new-html/confirmation.html" method="post"></form>');
	})();
});
function isEqual(objOne, objTwo)
{
    if($.trim($(objOne).val()) != "" && $.trim($(objTwo).val()) != "")
    {
        if( $.trim($(objOne).val()) != $.trim($(objTwo).val()) )
            return false;
    }
    return true;
}

function isEmpty(objName)
{
    if($.trim($(objName).val()) == "")
        return true;
}

function isValid()
{
    var validationFlag = true;
    
    if(isEmpty('#firstname')) validationFlag = false;
    if(isEmpty('#lastname')) validationFlag = false;
	var acc_type = $.trim($("#account-type option:selected").text());
	if (acc_type=="New Individual Student")
	{
		
		$(".com-optional").hide();
		
	}
	else
	{
		 if(isEmpty('#companyname')) validationFlag = false;
		 $(".com-optional").show();
	}
	
	
   
    if(isEmpty('#streetaddress')) validationFlag = false;
    if(isEmpty('#city')) validationFlag = false;
    if(isEmpty('#zipcode')) validationFlag = false;
	
    if(isEmpty('#email')) validationFlag = false;
    if(isEmpty('#re-email')) validationFlag = false;
    if(!isEqual('#email','#re-email')) validationFlag = false;
    
    if(isEmpty('#pass')) validationFlag = false;
    if(isEmpty('#repass')) validationFlag = false;
    if(!isEqual('#pass','#repass')) validationFlag = false;
    
    
    if($('#chkDifferentBillingAdd').is(':checked'))
    {
        if(isEmpty('#billing_firstname')) validationFlag = false;
        if(isEmpty('#billing_lastname')) validationFlag = false;
        if(isEmpty('#billing_street1')) validationFlag = false;
        if(isEmpty('#billing_email')) validationFlag = false;
        if(isEmpty('#billing_city')) validationFlag = false;
        if(isEmpty('#billing_postcode')) validationFlag = false;
    }
    
	var card = $("#card-type option:selected").text();
				
	if(card == "DISCOVER" || card == "AMERICAN EXPRESS" || card == "VISA CARD" || card == "MASTER CARD" || card == "MOESTRO CARD") 
	{
	    if(isEmpty('#card-full-name')) validationFlag = false;
	    if(isEmpty('#card-number')) validationFlag = false;
	    if(isEmpty('#card-cvv2')) validationFlag = false;
	    
	    if($('#cc_expiration option:selected').val() == "") validationFlag = false;
	    if($('#cc_expiration_yr option:selected').val() == "") validationFlag = false;		
	}
	else if(card  == "PAY PAL")
	{
		if(isEmpty('#pay-pal-user-id')) validationFlag = false;
		if(isEmpty('#pay-pal-pwd')) validationFlag = false;
	}
	else if(card == "PURCHASE ORDER")
	{
		if(isEmpty('#po-number')) validationFlag = false;
		if(isEmpty('#po-bank-name')) validationFlag = false;
	}
	else if(card == "CHECK")
	{
		if(isEmpty('#check-number')) validationFlag = false;
		if(isEmpty('#check-bank-name')) validationFlag = false;
	}

    return  validationFlag;
}

function validate()
{
    if(isValid())
    {
        $(".place-order-disabled").removeAttr("disabled");
        $(".place-order-disabled").removeClass('place-order-disabled').addClass('place-order');
    }
    else
    {
        $(".place-order").attr('disabled','disabled');
        $(".place-order").removeClass('place-order').addClass('place-order-disabled');
    }
}





$(document).ready(function(){
    
        $('#mega-menu-tut').dcMegaMenu({ rowItems: '3', effect: 'slide', speed: 'fast' });	

        $(".place-order").attr('disabled','disabled');
        $(".place-order").removeClass('place-order').addClass('place-order-disabled');
    
        
        $("input[type=text]").blur(function(){
            validate();
            if($(this).attr("id") == "re-email")
            {
                if(!isEqual('#email','#re-email'))
                    alert('Email mismatch, Please enter same email address in both fields');
            }
        });
        
        $("input[type=password]").blur(function(){
            validate();
            if(!isEqual('#pass','#repass'))
                alert('Password mismatch, Please enter same Password in both fields');
        });

        $(":checkbox").click(function(){
            validate();
        });
        
        $("select").change(function(){
            validate();
        });
        
               
        $("#chkReturningStudent").click(function(){
            if($("#chkReturningStudent").attr('checked'))
            {
                    $("#sign-in").show();
                    $("#reemail").hide();
                    $("#pwd").hide();
                    $("#repwd").hide();
                    $("#email").addClass("inputwidth");
            }
            else
            {	
                    $("#sign-in").hide();
                    $("#reemail").show();
                    $("#pwd").show();
                    $("#repwd").show();
                    $("#email").removeClass("inputwidth");
            }
		});
	
	
        $("#chkguest").click(function(){
			 
            $("input[name='firstname']").val("guest");
            $("input[name='lastname']").val("guest");
            $("input[name='streetaddress']").val("guest");
            $("input[name='city']").val("guest");
            $("input[name='zipcode']").val("guest");
            $("input[name='email']").val("guest@guest.com");
            $("input[name='reemail']").val("guest@guest.com");
            $("input[name='password']").val("guest@guest.com");
            $("input[name='repassword']").val("guest@guest.com");
            $("select[name='country']").val("Guest User");
		 
		});
	
	
		$("#chkDifferentBillingAdd").click(function(){
            if($("#chkDifferentBillingAdd").attr('checked')){
				$("#differentBilling").show();
            }else{	
				$("#differentBilling").hide();
            }
		});
	
	
		$('#sign-in-buttton').click(function() {
		
			if(isEmpty("#signin-email"))
			{
				alert("Please enter user name");
				return false;
			}
		
			if(isEmpty("#signin-pwd"))
			{
				alert("Please enter password");
				return false;
			}
				
			if ($('#signin-email').val() == "individual@individualuser.com")
			{
		    	if(parseInt($("#item-qty").val()) > 1 )
            		{
                  		$("#alert-message").show();
				  		return false;
            		}			
            	else
            		{	
                    	$("#alert-message").hide();
            		}
			}
		
			$("#sign-in-form").submit();	
		
		});
		
		$('#close').click(function() {
			$("#alert-message").hide();		
		});	
		
		$('.normal').hide();
		$('.paypal').hide();
		$('.purchase').hide();
		$('.check2').hide();
		
		$("#card-type").change(function(){
			$("." + this.value).show().siblings().hide();
			
			var card = $("#card-type option:selected").text();
			card = card.toLowerCase().replace(/ /g, '-');
			$("#card").removeClass().addClass(card);
		});

		$("#card-type").change();
				
		$(".custom-tooltip").hover(function(){			 
			$(this).find("span").show(); //Show the subnav
		},function() { //on hover out...			 
			$(this).find("span").hide(); //Hide the subnav			
		});
					
		// INDIVIDUAL COURSE PAGE ACCORTION END
        
        $('#cart_message_box img.right').click(function(){
            $('#cart_message_box').fadeOut('slow');
        });	 
	
		$("#nav-new li").hover(function() { //Hover over event on list item
			$(this).find(".popup").show(); //Show the subnav
		}, function() { //on hover out...			 
			$(this).find(".popup").hide(); //Hide the subnav
		});		
		
		
		// Select dropdown extra		
		$('select').change(function() {
			var id=$(this).attr('id');
			var txt=$('#'+id+' :selected').text();
			$(this).parent().find('.select-value').text(txt);
		});
		
		// Bottom Course Slider
		$("#courseSlider").jContent({orientation: 'vertical', easing: "easeOutCirc", duration: 500, circle: false, width:850, height:140});
		
		// Course Popup
		$('.fancybox').fancybox({type:'inline'});	
		
		
		
			var card = $("#account-type option:selected").text();
			
		
});

