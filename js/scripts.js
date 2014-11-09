$(function(){
    var db = openDatabase('mydbss', '1.0', 'Test DB', 2 * 1024 * 1024);
    $('.allotted').on('click',function(){
        $(this).toggleClass('free');
        $(this).toggleClass('allotted');
        insertData($(this).find('h1').text(),$(this).attr('class'));
   });
    $('.free').on('click',function(){
        $(this).toggleClass('free');
        $(this).toggleClass('allotted');
        insertData($(this).find('h1').text(),$(this).attr('class'));
    });
    function insertData(data,state){
        if(state=='allotted'){
            var status='IN';
        }else{
            var status='OUT';
        }
        db.transaction(function (tx) {
            //var currentTime=new Date().getTime();
            var currentTime=Date();
            tx.executeSql('CREATE TABLE IF NOT EXISTS ParkingLOG (log, time, status)');
            tx.executeSql('INSERT INTO ParkingLOG (log, time, status) VALUES ("'+data+'","'+currentTime+'","'+status+'")');
        });
        getData();
    }
    getData();
    function getData(){
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM ParkingLOG', [], function (tx, results) {
                var len = results.rows.length, i;
                $('tbody').empty();
                for (i = 0; i < len; i++){
                    var str='<tr><td>'+i+'</td><td>'+results.rows.item(i).log+'</td><td>'+results.rows.item(i).time+'</td><td>'+results.rows.item(i).status+'</td></tr>';
                    $('tbody').append(str);
                }
            }, null);
        });
    }
});