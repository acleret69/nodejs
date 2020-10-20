
$(function(){
  var i = 0;
  
  $('#btn').on('click',function(){
    if($(this).attr('data-click-state') == 1) {
        $(this).attr('data-click-state', 0);
        $('#btn').text('Compteur'+i)
        $('#myModal').find('.modal-body h5').text ("Compteur "+i)
      }
    else {
      $(this).attr('data-click-state', 1);
      $('#btn').text('Compteur'+i)
      $('#myModal').find('.modal-body h5').text ("Compteur "+i)
    }
  });

  $('#myModal').on('show.bs.modal', function(){
    i=i+1
  });

  $('#ajax').on('click',function(){
    
    $.ajax({
      url :'http://localhost:8080/ajax',
      type : 'GET',
      dataType : 'json',
      success : function(code_JSON, statut){
        console.log('Success'),
        console.log(statut)
        console.log(code_JSON.message);
        $('#myModal').find('.modal-body h4').text(code_JSON.message)
      },

      error : function(resultat,statut , erreur){
        console.log('Error'),
        console.log(resultat),
        console.log(statut);
      }
    });  
  });

  $('#BDD').on('click',function(){
    
    $.ajax({
      url :'http://localhost:8080/user',
      type : 'GET',
      dataType : 'json',
      success : function(code_JSON, statut){
        console.log('Success'),
        console.log(statut)
        console.log(code_JSON);
       //('#myModal').find('.modal-body table').append(JSON.stringify(code_JSON))

          var user_data = '';
          var i = 0;
          $.each(code_JSON,function(key,value){
            if (i==0)
            {
              user_data += '<tr>';
              user_data += '<td>'+'Id'+'</td>';
              user_data += '<td>'+'Name'+'</td>';
              user_data += '<td>'+'Age'+'</td>';
              user_data += '<td>'+'Prénom'+'</td>';
              user_data += '</tr>';
              i++
            }
          })
          $.each(code_JSON, function(key, value){
            user_data += '<tr>';
            user_data += '<td>'+value.id+'</td>';
            user_data += '<td>'+value.Name+'</td>';
            user_data += '<td>'+value.Age+'</td>';
            user_data += '<td>'+value.Prénom+'</td>';
            user_data += '</tr>';   
          });
          $('#myModal').find('.modal-body #tdata').append(user_data);

      },

      error : function(resultat,statut , erreur){
        console.log('Error'),
        console.log(resultat),
        console.log(statut);
      }
    });

  });
  $('#btn_data').on('click',function(){

    $.ajax({
      url :'http://localhost:8080/user',
      type : 'GET',
      dataType : 'json',
      success : function(code_JSON,statut){
        console.log('Success'),
        console.log(statut)
        console.log(code_JSON)
        $('#table_data2').dataTable({ 
          data : code_JSON,
          columns:[
            {data : 'id'},
            {data : 'Name'},
            {data : 'Age'},
            {data : 'Prénom'}
          ]
        })

      },

      error : function(resultat,statut , erreur){
        console.log('Error'),
        console.log(resultat),
        console.log(statut);
      }
    });
  });

});


    