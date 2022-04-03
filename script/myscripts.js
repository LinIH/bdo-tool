$(document).ready(function(){
    $.getJSON('script/data.json', function(data){
        $.each(data, function(i, field){
            console.log(field);
          });
    }) 
});

$('button#add-item').click(function(){
    var option = $('#select_tradeitem option:selected');
    var option_val = option.val();
    var newdiv =
    '<div class="ui fluid card '+option_val+'">'+
        '<div style="margin:5px;">'+
            option_val+
            '<button id="'+option_val+'" class="mini ui button remove" style="float:right;">刪</button>'+
        '</div>'+
    '</div>';

    $("#content").append(newdiv);
    console.log($('button#add-item'));
    console.log($('button.remove'));
    console.log($('button.remove').parent());
    //$('button.remove').parent().parent().remove();
    $('button.remove').click(function(){
        $(this).parent().parent().remove();
    });
});

$('button.remove').click(function(){
    $('button.remove').parent().parent().remove();
});

$("button#calculate").click(function(){

});

function connectdatabase(){
    var db = openDatabase('src/database/dbodba.db', '1.0', '測試', 2*1024*1024);
    return db;
}

$('#select_tradeitem').html(function(){
    $('#select_tradeitem').empty();
    var database = connectdatabase();
    sql_sentence = 'select * from tradeitems order by tradeitems_class, tradeitems_no;'
    sql_sentence_count = 'select count(*) from tradeitems;';
    database.transaction(function(tx){
        console.log('connect DB succesful!');
        //執行sql
        tx.executeSql(sql_sentence,[],
            function(tx, result){
                for(var i=0; i<result.rows.length; i++){
                    //console.log(result.rows.item(i).tradeitems_name+' '+result.rows.item(i).tradeitems_price);
                    component_sentence = '<option>'+result.rows.item(i).tradeitems_name+'</option>';
                    $('#select_tradeitem').append(component_sentence);
                }
            });
        /*tx.executeSql(sql_sentence_count,[],function(tx,result){
            console.log(result.rows.item(0))
        });*/

    }, null);
});