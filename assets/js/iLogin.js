
$(function() {
  $('#btnLogin').click(function() {
    loginFunction()
  })
})

function loginFunction() {
  let pass = $('#pass').val();
  let dataLogin = new Object();
      dataLogin.pass = pass

  let dataLoginJson = JSON.stringify(dataLogin)

  $.post('controller/dataController.php',
    {
      action:'dataLogin',
      parametros: dataLoginJson
    },
      function(data,textStatus) {
        
        if(data != 1){
          alert('Datos Incorrectos')
        }else{
          window.location.replace("../extensTuMarchante/dashboard/");
        }
      },
    "json"
  );
}
