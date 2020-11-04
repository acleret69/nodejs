$(function(){
  var i = 0;
  var table ;
  
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
        console.log('Success',statut),
        console.log(code_JSON);
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

     function recuperation_donnee(){
    $.ajax({
      url :'http://localhost:8080/user',
      type : 'GET',
      dataType : 'json',
      success : function(code_JSON,statut){
        console.log('Success', statut),
        console.log(code_JSON)
        table = $('#table_data2').DataTable({ 
          data : code_JSON,
          // dom :'Bfrtip',
          // buttons:[
          //   {extend :'Create User',className :'create_user'}
          // ],
          columns:[
            {data : 'id'},
            {data : 'Name'},
            {data : 'Age'},
            {data : 'Prénom'},
            {data : null,
             defaultContent: '<div class="btn-group"> <button type="button" id="btn-sup" class="btn-sup"> Supprimer </button></div>'
            }
          ]
        })
      },

      error : function(resultat,statut , erreur){
        console.log('Error'),
        console.log(resultat),
        console.log(statut);
      }
    });
  }
  
  $('#btn_data').on('click',function(){
      
    recuperation_donnee();

  });

   $('#table_data2').on('click','.btn-sup', function() {
     var user_id = table.row( $(this).parents('tr') ).data();
     console.log(user_id['id']);
     user_id=user_id['id'];
   $.ajax({
           url :'http://localhost:8080/user_delete',
           type : 'DELETE',
           data:{user_id},
           dataType : 'json',
           success : function(data){ 
             console.log('Success'),
             console.log(data);
              table.destroy();
             recuperation_donnee();   
           },
     
           error : function(resultat,statut , erreur){
             console.log('Error'),
             console.log(resultat),
             console.log(statut);
           }
          });
 });

 $('.btn-create').on('click', function() {
   user_id = 70;
   var  user_name="Cleret";
   var user_age=20;
   var user_prenom="Aldrick"
   console.log(user_id , user_name,user_age,user_prenom);
$.ajax({
        url :'http://localhost:8080/user_create',
        type : 'POST',
        data:{user_id,user_name,user_age,user_prenom},
        dataType : 'json',
        success : function(data){ 
          console.log('Success'),
          console.log(data);
           table.destroy();
          recuperation_donnee();   
        },
  
        error : function(resultat,statut , erreur){
          console.log('Error'),
          console.log(resultat),
          console.log(statut);
        }
       });
});


});


    