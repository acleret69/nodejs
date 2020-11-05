$(function(){
  var i = 0;
  var table ;
  var Url = 'http://localhost:8080/user'
  

    function erreur (){
      console.log('Error'),
      console.log(resultat),
      console.log(statut);
    }
     function recuperation_donnee(){
    $.ajax({
      url :Url,
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
           url :Url,
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
   var  user_name=$('#name').val();
   var user_age=$('#age').val();
   var user_prenom=$('#prenom').val();
   console.log(user_name,user_age,user_prenom);
$.ajax({
        url :Url,
        type : 'POST',
        data:{user_name,user_age,user_prenom},
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


    