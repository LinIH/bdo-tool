$(document).ready(function(){
    $('#select_tradeitem').empty();
    console.log('html');
    $.getJSON('script/data.json', function(data){
        $.each(data, function(key, value){
            component_sentence = '<option>'+value[0].tradeitem_name+'</option>';
            $('#select_tradeitem').append(component_sentence);
          });
    })
});

$('button#add-item').click(function(){
    var option = $('#select_tradeitem option:selected');
    var option_val = option.val();
    var option_price;
    $.getJSON('script/data.json', function(data){
        option_price = data[option_val][0].tradeitem_price;
        var subtotal = option_price;
        var newdiv =
        '<tr>'+
            '<td><button class="mini ui button remove" style="width:100%">x</button>' +
            '<td>' + option_val + '</td>' +                                                       //貿易品
            '<td>' + option_price + '</td>' +                                                    //單價
            '<td><input type="number" style="width:100%" value="1" min="0" class="trade_count">' + '</td>' +                          //數量
            '<td>' + '</td>' +                                                            //產地
            '<td>' + '</td>' +                                                           //距離加成
            '<td class="trade_subtotal">' + subtotal + '</td>' +                          //小計
        '</tr>';

        $("#trade_body").append(newdiv);
        $('button.remove').click(function(){
            $(this).parent().parent().remove();
        });
        $('.trade_count').bind('input', 'input', function(){
            subtotal =  $(this).parent().prev().text() * $(this).val();
            var sum = 0;
            $(this).parent().next().next().next().html(subtotal);
            $(this).parent().next().next().next().each(function(){
                sum += parseFloat($(this).text());
            })
            $('#total').html(sum);
        });
    });

});

/*$('button.remove').click(function(){
    $('button.remove').parent().parent().remove();
});*/

$("button#calculate").click(function(){

});
