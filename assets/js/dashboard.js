$(document).ready(function(){
  $('#spinnerLoad').show()
  getDataOrders()
})

function getDataOrders() {
  $.post('../controller/dataController.php',
    {
      action:'getOrders'
    },
      function(data,textStatus) {
        console.log(data)
        console.log('*')
        renderDataOrders(data)
      },
    "json"
  );
}

function renderDataOrders(jsonData) {
  console.log('***********')
  console.log(jsonData)
  let options= '<thead><th>No. Pedido</th><th>Status</th><th>Dia Entrega</th><th>Creación del Pedido</th><th>Detalle</th></thead>';
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

    let auxMetaData = jsonData[q].meta_data;

    let deliveryDate = '';
    for(let q=0;q<auxMetaData.length;q++){
      let tag = auxMetaData[q].key;
      if(tag == '_delivery_date'){
        deliveryDate = auxMetaData[q].value;
      }
    }

    options += '<tr>';
    options += '<td>'+jsonData[q].id+'</td>';
    options += '<td>'+status+'</td>';
    options += '<td>'+deliveryDate+'</td>';
    options += '<td>'+dateOrder+'</td>';
    options += '<td><a id="toDetails" idPedido="'+jsonData[q].id+'"><i class="large material-icons">remove_red_eye</i></a></td>';
    options += '</tr>';

  }

  $('#tableOrders').html(options)
  $('#spinnerLoad').hide()
}

//********************************************************
//********************************************************

$(function(){
  $('#btnDataSearch').click(function(){
      $('#spinnerLoad').show()
      getDataSearch();
  })
})

function getDataSearch() {
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
  console.log(typeof dayStart,typeof monthStart ,typeof yearStart)
  let dateStart = yearStart+'-'+monthStart+'-'+dayStart
  let dateFinal = year+'-'+month+'-'+day
  console.log(dateFinal)
  console.log(typeof day,typeof month ,typeof year)

  let lapsoUnoStart;
  let lapsoUnoFinal;
  let lapsoDosStart;
  let lapsoDosFinal;
  if(parseInt(monthStart) == parseInt(month)){
    let diferencia = Math.trunc((parseInt(day) - parseInt(dayStart))/2)
    console.log(diferencia)
    let auxDia = (parseInt(dayStart) + diferencia) + 1;
    if(auxDia < 10){
      auxDia = '0'+auxDia;
    }
    lapsoUnoStart = yearStart+'-'+monthStart+'-'+dayStart
    lapsoUnoFinal = year+'-'+month+'-'+auxDia

    /*
    let auxDiaLapDos = parseInt(auxDia) + 1
    if(auxDiaLapDos < 10){
      auxDiaLapDos = '0'+auxDiaLapDos;
    }
    */
    lapsoDosStart = year+'-'+month+'-'+auxDia
    lapsoDosFinal = year+'-'+month+'-'+day
  }else{
    //monthStart
    //month
    console.log('no es el mismo mes')
    let dayFinalsMonth = endMonth[parseInt(monthStart)];
    let daysAfterEndMonth = day;


    let diferencia = Math.trunc((parseInt(dayFinalsMonth) - parseInt(dayStart))/2)
    let auxDia = (parseInt(dayStart) + diferencia)+1;
    if(auxDia < 10){
      auxDia = '0'+auxDia;
    }
    lapsoUnoStart = yearStart+'-'+monthStart+'-'+dayStart
    lapsoUnoFinal = year+'-'+monthStart+'-'+auxDia
    /*
    let auxDiaLapDos = parseInt(auxDia) + 1
    if(auxDiaLapDos < 10){
      auxDiaLapDos = '0'+auxDiaLapDos;
    }
    */
    lapsoDosStart = year+'-'+monthStart+'-'+auxDia
    lapsoDosFinal = year+'-'+month+'-'+daysAfterEndMonth

  }

  console.log(lapsoUnoStart+' - '+lapsoUnoFinal)
  console.log(lapsoDosStart+' - '+lapsoDosFinal)

  var dataLapUno;
  let dataSearch = new Object();
      dataSearch.dateStart = lapsoUnoStart
      dataSearch.dateFinal = lapsoUnoFinal
      dataSearch.status = $('#selectStatus').val()

  let dataSearchJson = JSON.stringify(dataSearch)
  //console.log(dataSearchJson)

  $.post('../controller/dataController.php',
    {
      action:'getSearchOrders',
      parametros: dataSearchJson
    },
      function(data,textStatus) {
        //renderDataOrders(data)
        //console.log(data)
        dataLapUno=data;
      },
    "json"
  );

  var dataLapDos;
  let dataSearch2 = new Object();
      dataSearch2.dateStart = lapsoDosStart
      dataSearch2.dateFinal = lapsoDosFinal
      dataSearch2.status = $('#selectStatus').val()

  let dataSearchJson2 = JSON.stringify(dataSearch2)
  //console.log(dataSearchJson)

  $.post('../controller/dataController.php',
    {
      action:'getSearchOrders',
      parametros: dataSearchJson2
    },
      function(data,textStatus) {
        //renderDataOrders(data)
        //console.log(data)
        dataLapDos = data;
      },
    "json"
  );

  setTimeout(function() {
    console.log(dataLapUno)
    let auxDataLapDos = dataLapDos
    console.log(dataLapDos)

    for(let q=0;q<dataLapUno.length;q++){
      let dato = dataLapUno[q]
      auxDataLapDos.push(dato)
    }
    setTimeout(function() {
      console.log(auxDataLapDos.length)
      renderDataOrders(auxDataLapDos)
    },1000)
  },7000)

}
//**************************************
//**************************************
$(function(){
  $('body').on('click','#toDetails',function(){
    let idPedido = $(this).attr('idPedido');
    toDetailsRedirect(idPedido)
  })
})

function toDetailsRedirect(idPedido) {
  location.href ="../../extensTuMarchante/details/?pedId="+idPedido+'&?TuMarchante&18552?whetWpo';
}
