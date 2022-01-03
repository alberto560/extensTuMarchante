<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <script src="../assets/js/dashboard.js"></script>
    <title>TuMarchante</title>
    <style>
      a,a:hover, a:focus, a:active {
         text-decoration: none;
         color: inherit;
      }
    </style>
    <style media="screen">
    .Absolute-Center {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: 1s all;
        opacity: 0;
        opacity: 1;
    }
    </style>
  </head>
  <body>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <img src="../assets/images/l_tumarchante.png" alt="">
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-12 col-md-4">
          <h5>- ELIGE UN RANGO DE FECHAS -</h5>
        </div>
      </div>
      <br>
      <div class="row justify-content-center" style="display:flex;align-items:Center;">
        <div class="col-6 col-md-3">
          <label for="dateStart">De: </label>
          <input type="date" class="form-control" name="dateStart" id="dateStart">
        </div>
        <div class="col-6 col-md-3">
          <label for="dateFinal">Hasta: </label>
          <input type="date" class="form-control" name="dateFinal" id="dateFinal">
        </div>
        <div class="col-6 col-md-3">
          <label for="selectStatus">Ordenar Por</label>
          <select class="form-select" name="selectStatus" id="selectStatus">
            <option value="any">Todos</option>
            <option value="completed">Completados</option>
            <option value="entregado">Entregados</option>
            <option value="cancelled">Cancelados</option>
            <option value="processing">Procesando</option>
            <option value="on-hold">En Espera</option>
          </select>
        </div>
        <div class="col-6 col-md-3 d-grid gap-2 col-6 mx-auto">
          <button type="button" name="btnDataSearch" id="btnDataSearch" class="btn btn-primary">Enviar</button>
        </div>
      </div>
      <br>
      <div class="row justify-content-center">
        <div class="col-12 col-md-12 responsive">
          <table class="table table-hover" id="tableOrders">

          </table>
        </div>
      </div>

    </div>
    <div class="Absolute-Center" style="display:none" id="spinnerLoad">
      <div class="spinner-grow text-danger" role="status">
      </div>
      <div class="spinner-grow text-warning" role="status">
      </div>
      <div class="spinner-grow text-info" role="status">
      </div>
    </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>

  </body>
</html>
