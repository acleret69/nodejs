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

  //$('#myModal').on('show.bs.modal', function (event) {
  // var button = $(event.relatedTarget)
  // var recipient = "Compteur "
   // var modal = $(this)
  // modal.find('.modal-body h5').text (recipient+i)
 // })


});


    