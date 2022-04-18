/**貿易品產地 */
var origin_dropdown_html = '<select id="select_origin" class="ui dropdown">' +
                              '<option value="grana">格拉納</option>' +
                              '<option value="ancientwood">智慧的古木</option>' +
                              '<option value="epheria">艾裴利亞港</option>' +
                              '<option value="calpheon">卡爾佩恩</option>' +
                           '</select>';

$(document).ready(function(){
    $('#select_tradeitem').empty();
    $.getJSON('script/tradeitems.json', function(data){
        $.each(data, function(key, value){
            component_sentence = '<option>'+key+'</option>';
            $('#select_tradeitem').append(component_sentence);
          });
    });
});

$('button#add-item').click(function(){
    var op_tradeitems = $('#select_tradeitem option:selected');
    var op_tradeitems_val = op_tradeitems.val();
    var op_tradeitems_price;
    $.getJSON('script/tradeitems.json', function(data_tradeitems){
        op_tradeitems_price = data_tradeitems[op_tradeitems_val][0].tradeitem_price;
        $.getJSON('script/distance.json', function(data_distance){
            var op_sellto = $('#select_sellto option:selected').val();
            var op_distance = data_distance['grana'][op_sellto];
            var subtotal = op_tradeitems_price;
            var newdiv =
            '<tr class="tradeitem_row">'+
                '<td><button class="mini ui button remove" style="width:100%">x</button>' +
                '<td>' + op_tradeitems_val + '</td>' +                                                       //貿易品
                '<td>' + op_tradeitems_price + '</td>' +                                                    //單價
                '<td><input type="number" style="width:100%" value="1" min="0" class="trade_count">' + '</td>' +                          //數量
                '<td>' + origin_dropdown_html + '</td>' +                                                            //產地
                '<td>' + op_distance + '</td>' +                                                           //距離加成
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
            $('#select_origin').change(function(){
                var op_origin = $(this).val();
                var op_sellto = $('#select_sellto option:selected').val();
                var old_distance = $(this).parent().next();
                $.getJSON('script/distance.json', function(data){
                    var new_distance = data[op_origin][op_sellto];
                    old_distance.html(new_distance);
                    calculate_subtotal();
                });
            });
            calculate_total();
        });
    });

});

$('#greenbuff').change(function(){
    calculate_subtotal();
});

$('#select_sellto').change(function(){
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
        var distance = $(this).find('td:eq(5)').text();
        sub_sum = Math.round(price * count *  distance * greenbuff);
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