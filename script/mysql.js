$('button#sql').click(function(){
    var db = openDatabase('src/database/dbodba.db', '1.0', '測試', 2*1024*1024);
    /*create table**/
    var sql_instruction_create = 'create table tradeitems'
     + '(tradeitems_class, tradeitems_no, tradeitems_name, tradeitems_price,'
     + ' UNIQUE(tradeitems_class, tradeitems_no) ON CONFLICT REPLACE);';
     /*drop table*/
    var sql_instruction_drop = 'drop table tradeitems;';
    /*insert data*/
    var sql_instruction_insert = 'insert into tradeitems values'
     + ' ("A_wood", "a0017", "環節樹原木箱子", 2850);';
    

    var sql_instruction_delete = 'delete from tradeitems;';

    //console.log(sql_instruction_drop);

    db.transaction(function(tx){
        console.log('connect DB succesful!');
        //執行sql
        //tx.executeSql(sql_instruction_insert);
        /*tx.executeSql('select * from tradeitems order by tradeitems_class, tradeitems_no;',[],
            function(tx, result){
                for(var i=0; i<result.rows.length; i++){
                    console.log(result.rows.item(i).tradeitems_name+' '+result.rows.item(i).tradeitems_price);
                }
            });*/


    }, null);
});



/*********************table schema********************/
/*------------character-------------*/
/*--id--+--name--+--jobs--+--level--*/

/*------------tradeitems-----------*/
/*create table if not exists tradeitems
  (tradeitems_class, tradeitems_no, tradeitems_name, tradeitems_price);*/

