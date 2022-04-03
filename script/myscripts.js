$(document).ready(function(){
    $('#select_tradeitem').empty();
    console.log('html');
    $.getJSON('script/data.json', function(data){
        $.each(data, function(key, value){
            console.log('key=' + key);
            component_sentence = '<option id="'+key+'</option>';
            $('#select_tradeitem').append(component_sentence);
          });
    })
});

$('button#add-item').click(function(){
    var option = $('#select_tradeitem option:selected');
    var option_val = option.val();
    var option_price = $.getJSON('script/data.json').option_val[1];
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
