var origin_dropdown_html = '<select class="ui dropdown">' +
                              '<option value="gelana">格拉納</option>' +
                              '<option value="smartwood">智慧的古木</option>' +
                              '<option value="valencia">瓦倫西亞</option>' +
                           '</select>';


$(document).ready(function(){
    $('#select_tradeitem').empty();
    $.getJSON('script/tradeitems.json', function(data){
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
    $.getJSON('script/tradeitems.json', function(data){
        option_price = data[0].tradeitem_price;
        console.log('option_price=' + option_price);
        var subtotal = option_price;
        var newdiv =
        '<tr class="tradeitem_row">'+
            '<td><button class="mini ui button remove" style="width:100%">x</button>' +
            '<td>' + option_val + '</td>' +                                                       //貿易品
            '<td>' + option_price + '</td>' +                                                    //單價
            '<td><input type="number" style="width:100%" value="1" min="0" class="trade_count">' + '</td>' +                          //數量
            '<td>' + origin_dropdown_html + '</td>' +                                                            //產地
            '<td>' + '</td>' +                                                           //距離加成
            '<td class="trade_subtotal">' + subtotal + '</td>' +                          //小計
        '</tr>';

        $("#trade_body").append(newdiv);
        calculate_subtotal();
        $('button.remove').click(function(){
            $(this).parent().parent().remove();
            calculate_total();
        });
        $('.trade_count').bind('input', 'input', function(){
            calculate_subtotal();
        });
        calculate_total();
    });

});

$('#greenbuff').change(function(){
    calculate_subtotal();
});

function calculate_subtotal(){
    var sub_sum = 0;
    var greenbuff;
    if($('#greenbuff').prop('checked')){
        greenbuff = 1.5;
    }
    else{
        greenbuff = 1;
    }
    $('tr.tradeitem_row').each(function(){
        var price = $(this).find('td:eq(2)').text();
        var count = $(this).find('td:eq(3) input').val();
        sub_sum = price * count * greenbuff;
        $(this).find('td:eq(6)').html(sub_sum);
    });
    
    calculate_total();
}

function calculate_total(){
    var sum = 0;
    $('td.trade_subtotal').each(function(){
        sum += parseFloat($(this).text());
    });
    $('#total').html(sum.toLocaleString());
}