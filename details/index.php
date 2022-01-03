
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <div id="contentTest">
  <head>
    <meta charset="utf-8">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

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
      <br>
      <div class="row">
        <div class="col-3 col-md-3">
          <button type="button" name="btnPdf" id="btnPdf"class="btn btn-primary">Generar PDF</button>
        </div>
      </div>
    </div>
    <div id="contentGral">
      <div class="container">
        <br>
        <div class="row justify-content-center" style="align-items:center">
          <div class="col-4 col-md-4">
            <img src="../assets/images/l_tumarchante.png" alt="" height="50px">
          </div>
          <div class="col-4 col-md-4">
            <h4>Orden de Venta</h4>
          </div>
          <div class="col-4 col-md-4">
              <p> Num. Venta <strong> <span id="numVenta"></span> </strong></p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-3 col-md-3">
            <strong>Datos del cliente</strong>
          </div>
        </div>
        <div class="row">
          <div class="col-3 col-md-3">
            <p style="margin-bottom: 0px;"> <strong>Fecha de Solicitud</strong> </p>
            <p id="dateCreate"></p>
          </div>
          <div class="col-6 col-md-6">
            <p style="margin-bottom: 0px;"> <strong>Nombre del cliente: </strong> <span id="nomCliente"></span> </p>
            <p> <strong>Nombre de quien recibe: </strong> <span id="nomRecibe"></span> </p>
          </div>
          <div class="col-3 col-md-3">
            <p style="margin-bottom: 0px;"> <strong>Número Telefónico</strong> </p>
            <p id="numTel"></p>
          </div>
        </div>
        <div class="row ">
          <div class="col-3 col-md-3">
            <p style="margin-bottom: 0px;"> <strong>Fecha de Entrega</strong> </p>
            <p style="margin-bottom: 0px;" id="dateDelivery"></p>
            <p id="timeDelivery"></p>
          </div>
          <div class="col-9 col-md-9">
            <p style="margin-bottom: 0px;"> <strong>Dirección de entrega: </strong> <span id="direccion"></span> </p>
          </div>
        </div>
        <div class="row" >
          <div class="col-3 col-md-3">
            <p style="margin-bottom: 0px;"> <strong>Costo de envío</strong> </p>
            <p>$0.00</p>
          </div>
          <div class="col-6 col-md-6">
            <p style="margin-bottom: 0px;"> <strong>Referencia: </strong> <span id="references"></span> </p>
            <p> <strong>Comentarios: </strong> <strong> <span id="comments"></span> </strong> </p>
          </div>
          <div class="col-3 col-md-3">
            <p style="margin-bottom: 0px;"> <strong>Corréo Electrónico</strong> </p>
            <p id="emailOrder"></p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-3 col-md-3">
            <strong>Método de pago</strong>
          </div>
        </div>
        <div class="row">
          <div class="col-2 col-md-2 withCard" style="display:none">
            <p> <strong>Banco: </strong> <span id="bank"></span> </p>
          </div>
          <div class="col-2 col-md-2 withCard" style="display:none">
            <p> <strong>Tipo: </strong> <span id="tipeCard"></span> </p>
          </div>
          <div class="col-3 col-md-3 withCard" style="display:none">
            <p> <strong>Cuenta: </strong> <span id="bill"></span> </p>
          </div>
          <div class="col-6 col-md-6 withOutCard" style="display:none">
            <center>
              <p> <strong>Contra entrega</strong> </p>
            </center>
          </div>
          <div class="col-6 col-md-6 withPaypal" style="display:none">
            <center>
              <p> <strong>Paypal</strong> </p>
            </center>
          </div>
          <div class="col-3 col-md-3">
            <p> <strong>Total de la compra: </strong> <span id="totalCompra"></span> </p>
          </div>
          <div class="col-2 col-md-2">
            <p> <strong>Cupón: </strong> <span id="coupon"></span> </p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-3 col-md-3">
            <strong>Detalles de Compra</strong>
          </div>
        </div>
        <div class="row justify-content-start">
          <div class="col-3 col-md-3">
            <strong>Departamento</strong>
          </div>
        </div>
        <div id="contentProds">

        </div>
        <div class="row justify-content-end">
          <div class="col-3 col-md-3">
            <strong>Metodo de pago: </strong><span id="methodPay"></span>
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="col-3 col-md-3">
            <span>Número de partidas: </span><span id="numPartidas"></span>
          </div>
          <div class="col-3 col-md-3">
            <strong>Subtotal: </strong><span id="subtotal"></span>
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="col-3 col-md-3">
            <span>Total de articulos: </span><span id="totalArticulos"></span>
          </div>
          <div class="col-3 col-md-3">
            <strong>Impuestos: </strong><span id="impuestos"></span>
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="col-3 col-md-3">
            <span>Total de contenedores: </span>
          </div>
          <div class="col-3 col-md-3">
            <strong>Descuento: </strong><span id="descuento"></span>
          </div>
        </div>
        <div class="row justify-content-end">
          <div class="col-3 col-md-3">
            <strong>Total: </strong><span id="totalFinal"></span>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div >
      <div class="container" id="contentFirm">
        <div class="row justify-content-center">
          <div class="col-10 col-md-10" style="border-style: solid;">

            <div class="row justify-content-center">
              <div class="col-3 col-md-3">
                <p>Recibí completa la mercancía</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-12">
                <p>Nombre: ________________________________________________________</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-12">
                <p>Tipo de Identificación: ________________________________________________________</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-12">
                <p>Fecha y Hora de Entrega: ________________________________________________________</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6 col-md-6">
                <p>Firma de conformidad del cliente</p>
                <p>_________________________________________________</p>
              </div>
              <div class="col-6 col-md-6">
                <p>Firma del repartidor</p>
                <p>_________________________________________________</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-12">
                <p>Comentarios</p>
                <br>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-10 col-md-10">
            <p style="margin-bottom: 0px;">Bebidas alcohólicas. La Empresa únicamente venderá bebidas alcohólicas a mayores de dieciocho (18) años. El repartidor asociado a la Empresa tendrá la facultad de cerciorarse de que la persona que reciba el Pedido sea mayor de edad, por medio de la solicitud de un medio de identificación oficial. De lo contrario, deberá devolver el Pedido a la Empresa</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-10 col-md-10">
            <p style="margin-bottom: 0px;">El personal de reparto no está autorizado a brindar  algún servicio adicional  ni a distribuir productos que no se ofrecen en  la página web.</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-10 col-md-10">
            <p>El personal de entrega  no está autorizado a entregar mercancía, dentro del domicilio., en caso de que lo solicite el cliente “TU MARCHANTE » se deslinda de cualquier responsabilidad.</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-3 col-md-3">
            <strong>Para uso personal Tu Marchante</strong>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-5 col-md-5">
            <p>Repartidor: _________________________________________</p>
          </div>
          <div class="col-2 col-md-2">
            <p>Nota de Venta: ________</p>
          </div>
          <div class="col-2 col-md-2">
            <p>Salida: __________</p>
          </div>
          <div class="col-2 col-md-2">
            <p>Regreso: ________</p>
          </div>
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

    <script src="../assets/utilJs/jspdf.umd.min.js"></script>
    <script src="../assets/utilJs/html2canvas.min.js"></script>
    <script src="../assets/js/indexDetails.js"></script>
  </body>
  </div>
</html>
