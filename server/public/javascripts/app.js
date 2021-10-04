$(function(){

    $("#fetchdata").on('click', function(){
        $.get( "/fetchdata", function( data ) {
            var products = data['data'];
            $("#trdata").html('');
            $("#message").hide();
            var string = '';
            $.each(products, function(index, product ) {
                string += '<tr><td>'+(index+1)+'</td><td>'+product['program_identifier']+
                '</td><td>'+product['data_source']+
                '</td><td>'+product['card_name']+
                '</td><td>'+product['member_id']+
                '</td><td>'+product['first_name']+
                '</td><td>'+product['last_name']+
                '</td><td>'+product['date_of_birth']+
                '</td><td>'+product['address_2']+
                '</td><td>'+product['city']+
                '</td><td>'+product['state']+
                '</td><td>'+product['zip']+
                '</td><td>'+product['telephone']+
                '</td><td>'+product['email']+
                '</td><td>'+product['consent']+
                '</td><td>'+product['mobile_phone']+'</td></tr>';
            });

            $("#trdata").html(string);
        });
    });
 
    $("#importdata").on('click', function(){
        $.get( "/import", function( data ) {
            $("#message").show().html(data['success']);
        });
    });


}); 