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
      url :'http://localhost:8080/User',
      type : 'GET',
      dataType : 'json',
      success : function(code_JSON, statut){
        console.log('Success'),
        console.log(statut)
        console.log(code_JSON);

        //$('#myModal').find('.modal-body table').text(JSON.stringify(code_JSON))
        // var JSON = code_JSON
        // $.getJSON(JSON,function(data){
        //   var user_data = '';
        //   $.each(data, function(key, value){
        //     user_data += '<tr>';
        //     user_data += '<td>'+value.id+'</tr>';
        //     user_data += '<td>'+value.Name+'</tr>';
        //     user_data += '<td>'+value.Age+'</tr>';
        //     user_data += '<td>'+value.Prénom+'</tr>';
        //     user_data += '</tr>';
        //   });
        //   $('#myModal').find('.modal-body table').append(user_data);

        // });

        // buildTable(code_JSON)
        // function buildTable(data){
        //   var table = document.getElementById('#myModal tdata')
      
        //   for (var i = 0; i < data.length; i++){
        //     var row = `<tr>
        //             <td>${data[i].id}</td>
        //             <td>${data[i].Name}</td>
        //             <td>${data[i].Age}</td>
        //             <td>${data[i].Prénom}</td>
        //           </tr>`
        //     table.innerHTML += row
      
      
        //   }
        // }


      },

      error : function(resultat,statut , erreur){
        console.log('Error'),
        console.log(resultat),
        console.log(statut);
      }
    });

  });

});


    