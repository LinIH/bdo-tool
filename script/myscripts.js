$(document).ready(function(){
    $('#select_tradeitem').empty();
    console.log('html');
    $.getJSON('script/data.json', function(data){
        $.each(data, function(key, value){
            //console.log('key=' + key);
            //console.log('value.tradeitem_name=' + value[0].tradeitem_name);
            component_sentence = '<option>'+value[0].tradeitem_name+'</option>';
            $('#select_tradeitem').append(component_sentence);
          });
    })
});

/*function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}*/

$('button#add-item').click(function(){
    var option = $('#select_tradeitem option:selected');
    var option_val = option.val();
    var option_price;
    $.getJSON('script/data.json', function(data){
        option_price = data[option_val][0].tradeitem_price;
        /*var newdiv =
        '<div class="ui fluid card '+option_val+'">'+
            '<div style="margin:5px;">'+
                option_val + '  單價：$' + option_price +
                '<button id="'+option_val+'" class="mini ui button remove" style="float:right;">刪</button>'+
                
            '</div>'+
        '</div>';*/
        var newdiv =
        '<tr>'+
            '<td>' + option_val + '</td>' +             //貿易品
            '<td>' + option_price + '</td>' +           //單價
            '<td><input type="number">' + '</td>' +                          //數量
            '<td>' + '</td>' +                          //產地
            '<td>' + '</td>' +                          //距離加成
            '<td>' + '</td>' +                          //小計
        '</tr>';

        $("#trade_body").append(newdiv);
        $('button.remove').click(function(){
            $(this).parent().parent().remove();
        });
    });

});

/*$('button.remove').click(function(){
    $('button.remove').parent().parent().remove();
});*/

$("button#calculate").click(function(){

});
