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
      url :'http://localhost:8080/ajax1',
      type : 'GET',
      dataType : 'json',
      success : function(code_JSON, statut){
        console.log('Success'),
        console.log(statut)
        console.log(code_JSON);
        $('#myModal').find('.modal-body p').text(JSON.stringify(code_JSON))
      },

      error : function(resultat,statut , erreur){
        console.log('Error'),
        console.log(resultat),
        console.log(statut);
      }
    });  
  });

});


    