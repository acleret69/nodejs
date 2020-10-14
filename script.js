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


  var myData={};
  myData.title = this.MessageInput.value;
  $('#ajax').on('click',function(){
    
    $.ajax({
      url :'http://localhost:8080/ajax',
      type : 'GET',
      dataType : 'JSON',
      success : function(code_JSON, statut){
        console.log('Success')
        console.log(statut)
        console.log(code_JSON)
        $(code_JSON).appendTo('#result')
      },

      error : function(resultat,statut , erreur){
        console.log('Error')
        console.log(resultat)
        console.log(statut)


      }


    });
    
  });



});


    