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
    })
    console.log(option_price);
    var newdiv =
    '<div class="ui fluid card '+option_val+'">'+
        '<div style="margin:5px;">'+
            option_val+
            '<button id="'+option_val+'" class="mini ui button remove" style="float:right;">刪</button>'+
            '<div>'+ option_price +'</div>'
        '</div>'+
    '</div>';

    $("#content").append(newdiv);
    $('button.remove').click(function(){
        $(this).parent().parent().remove();
    });
});

$('button.remove').click(function(){
    $('button.remove').parent().parent().remove();
});

$("button#calculate").click(function(){

});
