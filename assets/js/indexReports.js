
$(function() {
  $('#btnDataSearch').click(function() {
    $('#spinnerLoad').show()
    getDataReports()
  })
})

function getDataReports() {
  let auxDateFinal = $('#dateFinal').val()
  let endMonth = ['Comodin',31,28,31,30,31,30,31,31,30,31,30,31];
  let aux = auxDateFinal.split('-');
  let day = parseInt(aux[2]);
  let month = parseInt(aux[1]);
  let year = parseInt(aux[0]);
  if(endMonth.includes(day)){
    day = '01';
    month = month + 1;
  }else{
    day = day + 1;
    if(day < 10){
      day = '0'+day
    }
  }
  if (month < 10) {
    month = '0'+month
  }
  //********************************************
  //********************************************
  let auxDateStart = $('#dateStart').val()
  let auxStart = auxDateStart.split('-');
  let dayStart = auxStart[2];
  let monthStart = auxStart[1];
  let yearStart = auxStart[0];
  let dateStart = yearStart+'-'+monthStart+'-'+dayStart
  let dateFinal = year+'-'+month+'-'+day

  let lapsoUnoStart;
  let lapsoUnoFinal;
  let lapsoDosStart;
  let lapsoDosFinal;
  if(parseInt(monthStart) == parseInt(month)){
    let diferencia = Math.trunc((parseInt(day) - parseInt(dayStart))/2)
    let auxDia = (parseInt(dayStart) + diferencia) + 1;
    if(auxDia < 10){
      auxDia = '0'+auxDia;
    }
    lapsoUnoStart = yearStart+'-'+monthStart+'-'+dayStart
    lapsoUnoFinal = year+'-'+month+'-'+auxDia

    lapsoDosStart = year+'-'+month+'-'+auxDia
    lapsoDosFinal = year+'-'+month+'-'+day
  }else{
    let dayFinalsMonth = endMonth[parseInt(monthStart)];
    let daysAfterEndMonth = day;


    let diferencia = Math.trunc((parseInt(dayFinalsMonth) - parseInt(dayStart))/2)
    let auxDia = (parseInt(dayStart) + diferencia)+1;
    if(auxDia < 10){
      auxDia = '0'+auxDia;
    }
    lapsoUnoStart = yearStart+'-'+monthStart+'-'+dayStart
    lapsoUnoFinal = year+'-'+monthStart+'-'+auxDia

    lapsoDosStart = year+'-'+monthStart+'-'+auxDia
    lapsoDosFinal = year+'-'+month+'-'+daysAfterEndMonth

  }
  var dataLapUno;
  let dataSearch = new Object();
      dataSearch.dateStart = lapsoUnoStart
      dataSearch.dateFinal = lapsoUnoFinal
      dataSearch.status = $('#selectStatus').val()

  let dataSearchJson = JSON.stringify(dataSearch)


  $.post('../controller/dataController.php',
    {
      action:'getSearchOrdersReports',
      parametros: dataSearchJson
    },
      function(dataUno,textStatus) {
        dataLapUno=dataUno;

        var dataLapDos;
        let dataSearch2 = new Object();
            dataSearch2.dateStart = lapsoDosStart
            dataSearch2.dateFinal = lapsoDosFinal
            dataSearch2.status = $('#selectStatus').val()



        let dataSearchJson2 = JSON.stringify(dataSearch2)

        $.post('../controller/dataController.php',
          {
            action:'getSearchOrdersReports',
            parametros: dataSearchJson2
          },
            function(data,textStatus) {
              console.log(data)
              dataLapDos = data;
              let auxDataLapDos = dataLapDos

              for(let q=0;q<dataLapUno.length;q++){
                let dato = dataLapUno[q]
                auxDataLapDos.push(dato)
              }
              setTimeout(function() {
                console.log(auxDataLapDos)
                renderReport(auxDataLapDos)
              },1000)
            },
          "json"
        );

      },
    "json"
  );

}

function renderReport(jsonData) {

  let table = '<table class="table table-hover" id="tablaReportes"><thead><th>Fecha Creacion</th><th>Fecha Entrega</th><th>Forma de Pago</th><th>No. Pedido</th><th>Status</th><th>Cupon o Promocion</th><th>Descuento %</th><th>Descuento $</th><th>Impuestos</th><th>Ing. Netos</th><th>Ing. Totales/Brutos</th></thead><tbody>';

  for(let q=0;q<jsonData.length;q++){

    let status = '';
    switch (jsonData[q].status) {
      case 'completed':
          status = 'Completados';
        break;
      case 'entregado':
          status = 'Entregados';
        break;
      case 'cancelled':
          status = 'Cancelados';
        break;
      case 'processing':
          status = 'Procesando';
        break;
      case 'pending':
          status = 'Pendiente';
        break;
      case 'hold':
          status = 'En Espera';
        break;
      default:

    }

    let aux = jsonData[q].date_created.split('T');
    let dateOrder = aux[0];


    //***************************************************************
    let cuponProm;
    let descuentoPorc;
    let descuento = 0;

    let dataCupon = jsonData[q].coupon_lines;

    if(dataCupon.length == 0){
      descuento = 0.00
      cuponProm = 'N/A'
      descuentoPorc = 'N/A'
    }else{

      let descuentoVar = dataCupon[0].discount;
      descuento = descuentoVar

      let cupon = dataCupon[0].code.toUpperCase();
      cuponProm = cupon

      let porcCupon = dataCupon[0].meta_data[0].display_value['amount'];
      descuentoPorc = porcCupon
    }

    let feeLines = jsonData[q].fee_lines; //Ahora ayuda con el descuento por banco
    if(feeLines.length != 0){
      cuponProm = '*Desc. por Banco*';

      let mountDesc = feeLines[0].amount;
      descuento = mountDesc * -1;
      let nomBank = jsonData[q].DataBank;

      let descPorcBank;
      if(nomBank =! 'citibanamex'){
        descPorcBank = '10%'
      }else{
        descPorcBank = '15%'
      }

      descuentoPorc = descPorcBank

    }
    //***************************************************************
    let auxMetaData = jsonData[q].meta_data
    let deliveryDate = '';
    for(let q=0;q<auxMetaData.length;q++){
      let tag = auxMetaData[q].key;
      if(tag == '_delivery_date'){
        deliveryDate = auxMetaData[q].value;
      }
    }
    //***************************************************************
    let formaPago;
    if(jsonData[q].payment_method == 'cod'){
      formaPago = 'Contra Entrega'
    }else{
      if(jsonData[q].payment_method == 'conektacard'){
        formaPago = 'Conekta'
      }else{
        formaPago = 'Paypal'
      }
    }

    table += '<tr>'
    table += '<td>'+dateOrder+'</td>' //fecha creacion
    table += '<td>'+deliveryDate+'</td>' //Fecha entrega
    table += '<td>'+formaPago+'</td>' //forma de pago
    table += '<td>'+jsonData[q].id+'</td>' //no pedido
    table += '<td>'+status+'</td>' //status
    table += '<td>'+cuponProm+'</td>' //cupon o promocion
    table += '<td>'+descuentoPorc+'</td>' //descuento porcentaje
    table += '<td>$ '+descuento+'</td>' //descuento $
    table += '<td>$ '+jsonData[q].total_tax+'</td>' //Impuestos
    table += '<td>$ '+jsonData[q].total+'</td>' // ingresos netos
    table += '<td>$ '+(parseFloat(jsonData[q].total) + parseFloat(descuento)).toFixed(2)+'</td>' //ingresos brutos
    table += '<tr>'
  }
  table += '</tbody></table>';

  $('#tabbleReports').html(table);


  setTimeout(function() {
    //$('#tablaReportes').DataTable();
    $("#tablaReportes").tableExport();
    setTimeout(function() {
      $('.xlsx').hide()
      $('.txt').hide()
      $('.csv').text('Descargar Excel');
      $('.csv').addClass('btn btn-primary text-white');
      $('#spinnerLoad').hide()
    },500)
  },1000)

}

$(function() {
  $('#btnExport').click(function(){
    let fechaInicial = $('#dateStart').val()
    let fechaFinal = $('#dateFinal').val()
    let nameFileExcel = 'Reporte '+fechaInicial+' _ '+fechaFinal;
    //exportTableToExcel('tablaReportes',nameFileExcel)
  })
})


function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}
