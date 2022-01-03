var pedidoId;
$(document).ready(function(){
  $('#spinnerLoad').show()
  let idPedido = getParameterByName('pedId');
  pedidoId = idPedido;
  getDataPedido(idPedido)
})

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getDataPedido(idPedido){
  console.log(idPedido)
  let dataPedido = new Object();
      dataPedido.idPedido = idPedido

  let dataPedidoJson = JSON.stringify(dataPedido)

  $.post('../controller/dataController.php',
    {
      action:'getDataPedido',
      parametros: dataPedidoJson
    },
      function(data,textStatus) {
        renderDetails(data);
        //console.log(data)
      },
    "json"
  );
}

function getDataOrderTrans(idOrderConek) {
  //console.log(idOrderConek)
  let dataConekt = new Object();
      dataConekt.idOrderConek = idOrderConek

  let dataConektJson = JSON.stringify(dataConekt)

  $.post('../controller/dataController.php',
    {
      action:'getDataConekt',
      parametros: dataConektJson
    },
      function(data,textStatus) {
        renderDetailsConekt(data);
      },
    "json"
  );
}

function renderDetailsConekt(jsonData) {
  //console.log(jsonData)

  let bank = jsonData.issuer;
  let bill = jsonData.last4;
  let type = jsonData.type;
  $('#bank').text(bank.toUpperCase())
  $('#tipeCard').text(type.toUpperCase()+'O')
  $('#bill').text('**** **** **** '+bill)
}

function renderDetails(jsonData) {

  console.log(jsonData[0])
  let auxMetaData = jsonData[0].meta_data;
  //console.log(auxMetaData)

  let idOrderConek = '';
  for(let q=0;q<auxMetaData.length;q++){
    let tag = auxMetaData[q].key;
    if(tag == 'conekta-order-id'){
      idOrderConek = auxMetaData[q].value;
    }else{
      if(tag == 'Payment type'){
        idOrderConek = 'Paypal'
      }
    }
  }

  if(idOrderConek != ''){
    if(idOrderConek != 'Paypal'){
      getDataOrderTrans(idOrderConek);
      $('.withCard').show()
    }else{
      $('.withPaypal').show()
    }
  }else{
    $('.withOutCard').show()
  }

  //console.log(jsonData.id)
  $('#numVenta').text(jsonData[0].id)
  let auxDateCreate = jsonData[0].date_created.split('T')
  let dateCreate = auxDateCreate[0]+' '+auxDateCreate[1]+' hrs' ;
  $('#dateCreate').text(dateCreate)

  let auxBilling = jsonData[0].billing;
  let billing = auxBilling.first_name +' '+auxBilling.last_name
  $('#nomCliente').text(billing)

  let auxShipping = jsonData[0].shipping;
  let shipping = auxShipping.first_name +' '+auxShipping.last_name
  $('#nomRecibe').text(shipping)

  let auxPhone = jsonData[0].billing;
  let phone = auxPhone.phone;
  $('#numTel').text(phone)


  let deliveryDate = '';
  for(let q=0;q<auxMetaData.length;q++){
    let tag = auxMetaData[q].key;
    if(tag == '_delivery_date'){
      deliveryDate = auxMetaData[q].value;
    }
  }
  $('#dateDelivery').text(deliveryDate)

  let deliveryTime = '';
  let deliveryTimeFinish = '';
  for(let q=0;q<auxMetaData.length;q++){
    let tag = auxMetaData[q].key;
    if(tag == '_delivery_time_frame'){
      deliveryTime = auxMetaData[q].value.time_from;
      deliveryTimeFinish = auxMetaData[q].value.time_to;
    }
  }
  $('#timeDelivery').text(deliveryTime+' / '+deliveryTimeFinish)

  //direccion
  let numExt = '';
  for(let q=0;q<auxMetaData.length;q++){
    let tag = auxMetaData[q].key;
    if(tag == '_billing_num_ext'){
      numExt = auxMetaData[q].value;
    }
  }

  let numInt = 'N/A';
  for(let q=0;q<auxMetaData.length;q++){
    let tag = auxMetaData[q].key;
    if(tag == '_billing_num_int'){
      numInt = auxMetaData[q].value;
    }
  }

  let auxDireccion = jsonData[0].shipping;
  let direccion = 'Calle: '+auxDireccion.address_1+', '+'Num. Ext: '+numExt+', '+'Num. Int: '+numInt+', Col.  '+auxDireccion.address_2+', Del. '+auxDireccion.city+', '+auxDireccion.state+', CP. '+auxDireccion.postcode;
  $('#direccion').text(direccion)

  //divDataDelivery

  let references = 'N/A';
  for(let q=0;q<auxMetaData.length;q++){
    let tag = auxMetaData[q].key;
    if(tag == 'billing_references'){
      //console.log(tag)
      references = auxMetaData[q].value;
    }
  }

  let comments = 'N/A'
  if(jsonData.customer_note){
    comments = jsonData.customer_note;
  }

  $('#references').text(references)
  $('#comments').text(comments)


  let emailOrder = auxBilling.email
  $('#emailOrder').text(emailOrder)

  getTaxonomy(jsonData[0],jsonData[0].line_items , jsonData[1])
}

function getTaxonomy(dataOrder,dataProductos, dataProds) {
  let prods = new Object();
      prods.idsProds = dataProds.toString()

  let prodsJson = JSON.stringify(prods);

  $.post('../controller/dataController.php',
    {
      action:'getDataProds',
      parametros: prodsJson
    },
      function(data,textStatus) {
        //console.log(data)
        renderProds(dataOrder,dataProductos, data)
      },
    "json"
  );
}

function dosDecimales(n) {
  let t=n.toString();
  let regex=/(\d*.\d{0,2})/;
  return t.match(regex)[0];
}


function renderProds(dataOrder,dataProductos, dataTaxonomy) {
  console.log(dataProductos);
  //console.log(dataTaxonomy);

  let taxonomies = ['Frutas','Verduras','A Granel','Pescados y Mariscos','Carne Roja','Pollo','Salchichoneria','Lácteos','Flores'];
  //Frutas , Verduras = Frutas y Verduras
  //carne roja , pollo = Carnes y Pollo
  let forTaxonomy = [{
                    "Frutas_y_Verduras":[],
                    "A_Granel":[],
                    "Pescados_y_Mariscos":[],
                    "Carnes_y_Pollo":[],
                    "Salchichoneria":[],
                    "Lácteos":[],
                    "Flores":[],
                    "Despensa":[]
                    }];
  let arrayAux = [];
  for (let q= 0; q<dataTaxonomy.length;q++) {
    let taxonomyAux = dataTaxonomy[q];
    let flag = 0;
    for(let i=0;i<taxonomyAux.length;i++){
      let taxonomy = taxonomyAux[i].name;
      //console.log(taxonomy)
      if(taxonomies.includes(taxonomy)){
        flag = 1;
        arrayAux.push(q)
        switch (taxonomy) {
          case 'Frutas':
            forTaxonomy[0].Frutas_y_Verduras.push(q)
            break;
          case 'Verduras':
            forTaxonomy[0].Frutas_y_Verduras.push(q)
            break;
          case 'A Granel':
            forTaxonomy[0].A_Granel.push(q)
            break;
          case 'Pescados y Mariscos':
            forTaxonomy[0].Pescados_y_Mariscos.push(q)
            break;
          case 'Carne Roja':
            forTaxonomy[0].Carnes_y_Pollo.push(q)
            break;
          case 'Pollo':
            forTaxonomy[0].Carnes_y_Pollo.push(q)
            break;
          case 'Salchichoneria':
            forTaxonomy[0].Salchichoneria.push(q)
            break;
          case 'Lácteos':
            forTaxonomy[0].Lácteos.push(q)
            break;
          case 'Flores':
            forTaxonomy[0].Flores.push(q)
            break;
          default:
        }
      }else{
        if(i == taxonomyAux.length - 1 && flag != 1){
          //if(!arrayAux.includes(q)){
            forTaxonomy[0].Despensa.push(q)
          //}
        }
      }
    }
    //console.log('****')
  }

  //console.log(forTaxonomy);

  let arrayGralTaxonomy = [];
  if(forTaxonomy[0]['Frutas_y_Verduras'].length != 0){
    let arrayTemp = forTaxonomy[0]['Frutas_y_Verduras'];
        arrayTemp.unshift('Frutas_y_Verduras')
    arrayGralTaxonomy.push(arrayTemp)
  }
  if(forTaxonomy[0]['A_Granel'].length != 0){
    let arrayTemp = forTaxonomy[0]['A_Granel'];
        arrayTemp.unshift('A_Granel')
    arrayGralTaxonomy.push(forTaxonomy[0]['A_Granel'])
  }
  if(forTaxonomy[0]['Pescados_y_Mariscos'].length != 0){
    let arrayTemp = forTaxonomy[0]['Pescados_y_Mariscos'];
        arrayTemp.unshift('Pescados_y_Mariscos')
    arrayGralTaxonomy.push(forTaxonomy[0]['Pescados_y_Mariscos'])
  }
  if(forTaxonomy[0]['Carnes_y_Pollo'].length != 0){
    let arrayTemp = forTaxonomy[0]['Carnes_y_Pollo'];
        arrayTemp.unshift('Carnes_y_Pollo')
    arrayGralTaxonomy.push(forTaxonomy[0]['Carnes_y_Pollo'])
  }
  if(forTaxonomy[0]['Salchichoneria'].length != 0){
    let arrayTemp = forTaxonomy[0]['Salchichoneria'];
        arrayTemp.unshift('Salchichoneria')
    arrayGralTaxonomy.push(forTaxonomy[0]['Salchichoneria'])
  }
  if(forTaxonomy[0]['Lácteos'].length != 0){
    let arrayTemp = forTaxonomy[0]['Lácteos'];
        arrayTemp.unshift('Lácteos')
    arrayGralTaxonomy.push(forTaxonomy[0]['Lácteos'])
  }
  if(forTaxonomy[0]['Flores'].length != 0){
    let arrayTemp = forTaxonomy[0]['Flores'];
        arrayTemp.unshift('Flores')
    arrayGralTaxonomy.push(forTaxonomy[0]['Flores'])
  }
  if(forTaxonomy[0]['Despensa'].length != 0){
    let arrayTemp = forTaxonomy[0]['Despensa'];
        arrayTemp.unshift('Despensa')
    arrayGralTaxonomy.push(forTaxonomy[0]['Despensa'])
  }

  console.log(arrayGralTaxonomy);
  //prodsContent
  let table ='';
  let contadorPartidas = 0;
  let contadorProductos = 0;
  let contadorSubtotal = 0;
  for(let q=0;q<arrayGralTaxonomy.length;q++){
    let arrayAux = arrayGralTaxonomy[q];

    if(q==0){
      let depto = arrayAux[0].replaceAll('_', ' ');
      table += '<div class="row"><div class="col-3 col-md-3"><strong>'+depto+'</strong></div></div>';
      table += '<div class="row justify-content-center"><div class="col-12 col-md-12 responsive"><table class="table"><thead><th></th><th>Clave Interna</th><th>Descripción</th><th>Cantidad</th><th></th><th>Unitario</th><th>Total</th></thead>'
    }
    if(q!=0){
      let depto = arrayAux[0].replaceAll('_', ' ');
      table += '<tr><td><strong>'+depto+'</strong></td></tr>'
    }

    for(let i=1;i<arrayAux.length;i++){
      let idProdArray = arrayAux[i];
      let dataProd = dataProductos[idProdArray];
      contadorPartidas++;
      contadorProductos = contadorProductos + parseInt(dataProd.quantity);
      contadorSubtotal = contadorSubtotal + parseFloat(dataProd.subtotal);
      console.log(contadorSubtotal);
      table += '<tr>'
      table += '<td>'+contadorPartidas+'</td>'
      table += '<td>'+dataProd.sku+'</td>'
      table += '<td>'+dataProd.name+'</td>'
      table += '<td>'+dataProd.quantity+'</td>'
      table += '<td style="border: 1px solid black"></td>'

      /*
      if(dataProd.name == 'Chips de Betabel enchilado 250 g'){
        console.log(parseFloat(dataProd.price))
        console.log(parseFloat(parseFloat(dataProd.total_tax))
        console.log(parseInt(dataProd.quantity))
      }
      */

      table += '<td>$'+((parseFloat(dataProd.subtotal) + (parseFloat(dataProd.subtotal_tax))) / parseInt(dataProd.quantity)).toFixed(2)+'</td>'
      table += '<td>$'+(parseFloat(dataProd.subtotal) + parseFloat(dataProd.subtotal_tax)).toFixed(2)+'</td>'
      table += '</tr>'
    }
  }
  table +='</table></div></div>';
  $('#contentProds').html(table);

  $('#numPartidas').text(contadorPartidas)
  $('#totalArticulos').text(contadorProductos)

  let methodPay = dataOrder.payment_method;
  if(methodPay == 'cod' ){
    methodPay = 'Contra Entrega'
  }else{
    if(methodPay == 'conektacard'){
      methodPay = 'Conekta'
    }
  }
  $('#methodPay').text(methodPay);

  let totalFinal = dataOrder.total
  let totalImpuestos = dataOrder.total_tax
  let subtotal = parseFloat(totalFinal) - parseFloat(totalImpuestos)
  $('#subtotal').text('$'+contadorSubtotal.toFixed(2))
  $('#impuestos').text('$'+totalImpuestos);
  $('#totalFinal').text('$'+totalFinal);

  $('#totalCompra').text('$'+totalFinal);


  //***************************************************************
  let flagCoupon;
  let dataCupon = dataOrder.coupon_lines;
  if(dataCupon.length == 0){
    $('#descuento').text('$0.00');
    $('#coupon').text('N/A');
    flagCoupon = 0;
  }else{
    let cupon = dataCupon[0].code.toUpperCase();
    $('#coupon').text(cupon);
    flagCoupon = 1;

    let descuento = dataCupon[0].discount;
    $('#descuento').text('$'+descuento);
  }

  let feeLines = dataOrder.fee_lines; //Ahora ayuda con el descuento por banco
  if(feeLines.length != 0){
    $('#coupon').text('*Descuento por Banco Participante*');
    let mountDesc = feeLines[0].amount;
    $('#descuento').text('$'+mountDesc);
  }
  $('#spinnerLoad').hide()
  //***************************************************************
}

//*********************************************
//*********************************************
$(function(){
  $('#btnPdf').click(function(){
    createPdf()
  })
})

function createPdf() {
  /*
  //let html = $("#contentGral").html();
  let idDataPedido = new Object();
      idDataPedido.idPedido = pedidoId;

  let idDataPedidoJson = JSON.stringify(idDataPedido);

  $.post('../controller/dataController.php',
    {
      action:'createPdf',
      parametros: idDataPedidoJson
    },
      function(data,textStatus) {
        console.log(data)
        //renderProds(dataOrder,dataProductos, data)
      },
    "json"
  );
  */
  /*
  let html = $("#contentGral").html();
  let dataHtml = new Object();
      dataHtml.codeHtml = html;

  let dataHtmlJson = JSON.stringify(dataHtml);

  $.post('../controller/dataController.php',
    {
      action:'createPdf',
      parametros: dataHtmlJson
    },
      function(data,textStatus) {
        console.log(data)
        //renderProds(dataOrder,dataProductos, data)
      },
    "json"
  );
  */
  /*
  var doc = new jsPDF();
  doc.fromHTML($('#contentTest')[0], 5, 5, {

   }, function() {
      doc.save('sample-file.pdf');
   });
   *///215.9/216 x 279.4
   /*
   const { jsPDF } = window.jspdf;
 	var pdf = new jsPDF('p', 'mm', [216, 279]);
 	var pdfjs = document.querySelector('#contentGral');
 	pdf.html(pdfjs, {
 		callback: function(pdf) {
 			pdf.save("output.pdf");
 		},
 		x: 10,
 		y: 10
 	});
  */

  window.jsPDF = window.jspdf.jsPDF;
  var imgData;
  var doc = new jsPDF('p', 'mm');
  html2canvas(document.querySelector("#contentGral")).then(canvas => {
      //document.body.appendChild(canvas)
      imgData = canvas.toDataURL(
          'image/png');

      let imgAux = canvas.toDataURL(
          'image/png').split(',')[1];
      let dimensions = getPngDimensions(imgAux)
      //console.log(dimensions)
      let widthImagen = dimensions.width
      let heightImagen = dimensions.height


      let widthDoc = doc.internal.pageSize.getWidth(); //ancho
      let heightDoc = doc.internal.pageSize.getHeight(); // alto

      console.log('medidas documento: Ancho='+widthDoc+' Alto='+heightDoc)
      console.log('medidas imagen: Ancho='+widthImagen+' Alto='+heightImagen)

      let width;
      let height;
      let heightImagenAux = (getSizeInCM(heightImagen) * 10);
      console.log('nuevas medidas imagen: Ancho='+widthImagen+' Alto='+heightImagenAux)

      if(heightImagenAux <= heightDoc){
        height = heightImagen;
        console.log('es menor')
        doc.addImage(imgData, 'PNG', 0, 0, widthDoc, heightImagenAux);
      }else{
        height = heightDoc;
        console.log('es mayor')
        doc.addImage(imgData, 'PNG', 0, 0, widthDoc, heightDoc);
      }

  });

  setTimeout(function(){
    var imgData2;
    html2canvas(document.querySelector("#contentFirm")).then(canvas => {
        //document.body.appendChild(canvas)
        imgData2 = canvas.toDataURL(
            'image/png');

        let width2 = doc.internal.pageSize.getWidth();//ancho
        let height = imgData2.height;//alto
        doc.addPage();
        doc.addImage(imgData2, 'PNG', 0, 10, width2, 100);
        doc.save('sample-file.pdf');
    });
  },2000)

  /*
  html2canvas($("#contentGral"), {
            onrendered: function(canvas) {
                var imgData = canvas.toDataURL(
                    'image/png');
                var doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save('sample-file.pdf');
            }
        });
        */
}


function getSizeInCM(sizeInPX) {
  return sizeInPX * 2.54 / (96 * window.devicePixelRatio)
};

function getPngDimensions(base64) {
  const header = atob(base64.slice(0, 50)).slice(16,24)
  const uint8 = Uint8Array.from(header, c => c.charCodeAt(0))
  const dataView = new DataView(uint8.buffer)

  return {
      width: dataView.getInt32(0),
      height: dataView.getInt32(4)
    }
}
