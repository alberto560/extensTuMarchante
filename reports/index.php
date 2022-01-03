<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.js"></script>

    <link rel="stylesheet" type="text/css" href="https://unpkg.com/tableexport@5.2.0/dist/css/tableexport.min.css">



    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.4/xlsx.min.js" integrity="sha512-W/mRQs9ZSFpF14X/4aRgQss7+HRsVXsph+Y6DGLeqIqK8IpO+rQz0ISUEXkTeeKF7tivoGv+Ru7SpocS/1qahg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js" integrity="sha512-csNcFYJniKjJxRWRV1R7fvnXrycHP6qDR21mgz1ZP55xY5d+aHLfo9/FcGDQLfn2IfngbAHd8LdfsagcCqgTcQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="text/javascript" charset="utf8" src="https://unpkg.com/tableexport@5.2.0/dist/js/tableexport.min.js"></script>


    <script src="../assets/js/indexReports.js"></script>
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

    <title>TuMarchante</title>
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
        <div class="col-12 col-md-12 responsive" id="tabbleReports">
          <table class="table table-hover" id="tablaReportes">
            <thead>
              <th>Fecha Creacion</th>
              <th>Fecha Entrega</th>
              <th>Forma de Pago</th>
              <th>No. Pedido</th>
              <th>Status</th>
              <th>Cupon o Promocion</th>
              <th>Descuento %</th>
              <th>Descuento $</th>
              <th>Impuestos</th>
              <th>Ing. Netos</th>
              <th>Ing. Totales/Brutos</th>
            </thead>
            <tbody >

            </tbody>
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
