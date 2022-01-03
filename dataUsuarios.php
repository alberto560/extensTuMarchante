<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <table id="tableUsuarioss">

    </table>
  </body>
  <script type="text/javascript">
    $(document).ready(function() {
      getClientes();
    })
    function getClientes() {
      $.post('controller/dataController.php',
        {
          action:'getClientes'
        },
          function(data,textStatus) {
            console.log(data)
          },
        "json"
      );
    }
  </script>
</html>
