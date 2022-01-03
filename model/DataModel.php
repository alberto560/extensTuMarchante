<?php

    require '../vendor/autoload.php';
    require_once("../assets/php/conekta-php/lib/Conekta.php");
    use Automattic\WooCommerce\Client;
    // reference the Dompdf namespace
    use Dompdf\Dompdf;

    $woocommerce = new Client(
      'https://tumarchante.mx',
      'ck_26296d3d60aaa31c32ff9134564491a7b3608e19',
      'cs_734ae1d4c08e0208f4c29e146b039f1fdc5b8203',
      [
          'version' => 'wc/v3',
      ]
    );

    //$GLOBALS['arrayProds'] = [];
    class Orders extends BD{
        function getOrders(){

          $woocommerce = new Client(
            'https://tumarchante.mx',
            'ck_26296d3d60aaa31c32ff9134564491a7b3608e19',
            'cs_734ae1d4c08e0208f4c29e146b039f1fdc5b8203',
            [
                'version' => 'wc/v3',
            ]
          );
          //$date = '2021-05-01T00:00:00';
          //$date2 = '2021-05-05T00:00:00';
          $data = $woocommerce->get('orders');
          //$data = $woocommerce->get('orders', array( 'after' => $date, 'before' => $date2) );
          return json_encode($data);
        }

        function getSearchOrders($parametros){

          $woocommerce = new Client(
            'https://tumarchante.mx',
            'ck_26296d3d60aaa31c32ff9134564491a7b3608e19',
            'cs_734ae1d4c08e0208f4c29e146b039f1fdc5b8203',
            [
                'version' => 'wc/v3',
            ]
          );

          $date = implode(array($parametros->dateStart)).'T00:00:00';
          $date2 = implode(array($parametros->dateFinal)).'T00:00:00';
          $status = implode(array($parametros->status));

          $param = [
              'per_page' => 100,
              'after' => $date,
              'before' => $date2,
              'status' => $status,
          ];

          $data = $woocommerce->get('orders', $param);
          return json_encode($data);
        }

        //$arrayProductos = [''];
        function getDataPedido($parametros){
          $arrayProductos = [];
          $arrayGral = [];
          $woocommerce = new Client(
            'https://tumarchante.mx',
            'ck_26296d3d60aaa31c32ff9134564491a7b3608e19',
            'cs_734ae1d4c08e0208f4c29e146b039f1fdc5b8203',
            [
                'version' => 'wc/v3',
            ]
          );

          $idPedido = implode(array($parametros->idPedido));
          $param = 'orders/'.$idPedido;
          $data = $woocommerce->get($param);

          $arrayData = (array) $data;
          for ($q=0; $q < count($arrayData['line_items']); $q++) {
            $idProduct = $arrayData['line_items'][$q]->product_id;
            array_push($arrayProductos,$idProduct);
          }
          //$GLOBALS['arrayProds'] = $arrayProductos;

          array_push($arrayGral,$data,$arrayProductos);
          return json_encode($arrayGral);

        }

        function getDataConekt($parametros){
          $idOrderConek = implode(array($parametros->idOrderConek));
          \Conekta\Conekta::setApiKey("key_Xxzxs1zrwxv1q5otBtVQEA");
          \Conekta\Conekta::setApiVersion("2.0.0");
          $order = \Conekta\Order::find($idOrderConek);
          //var_dump($order);
          return json_encode($order['charges'][0]['payment_method']);
        }

        function getDataProds($parametros){
          $idsProds = implode(array($parametros->idsProds));
          $idsProdsArray = explode(",", $idsProds);
          //var_dump($idsProdsArray);


          //return json_encode($data);
          $arrayGralTaxonomy = [];
          for ($q=0;$q<count($idsProdsArray);$q++) {

            $woocommerce = new Client(
              'https://tumarchante.mx',
              'ck_26296d3d60aaa31c32ff9134564491a7b3608e19',
              'cs_734ae1d4c08e0208f4c29e146b039f1fdc5b8203',
              [
                  'version' => 'wc/v3',
              ]
            );

            $idProd = $idsProdsArray[$q];

            $prodData = 'products/'.$idProd;
            $data = $woocommerce->get($prodData);
            //$prodData = 'products/4194';
            //$data = $woocommerce->get($prodData);
            $arrayTaxonomy = $data->categories;
            array_push($arrayGralTaxonomy,$arrayTaxonomy);
          }
          return json_encode($arrayGralTaxonomy);
        }

        /*
        \Conekta\Conekta::setApiKey("key_Xxzxs1zrwxv1q5otBtVQEA");
        \Conekta\Conekta::setApiVersion("2.0.0");
        $order = \Conekta\Order::find("ord_2qeeF8nS4BMPsfrUz");
        //$order->capture();
        //var_dump($order);
        return json_encode($order);
        */
        function createPdf($parametros){
          /*
          $dirupload = '../assets';
          $idPedido = implode(array($parametros->idPedido));

          $mpdf = new \Mpdf\Mpdf();
    			$mpdf->keep_table_proportions = true;
    			$mpdf->shrink_tables_to_fit=1;
    			$html = file_get_contents('http://localhost/extensTuMarchante/details/?pedId='.$idPedido.'?TuMarchante&18552?whetWpo');
          //sleep(10);
    			$mpdf->WriteHTML($html);
    			$mpdf->Output($dirupload.'/'.$idPedido.'.pdf');
          return json_encode("/assets/'.$idPedido.'.pdf");
          */

          ob_start();
          //$html = implode(array($parametros->codeHtml));
          //echo $html;
          // instantiate and use the dompdf class
          $idPedido = implode(array($parametros->idPedido));
          $dompdf = new Dompdf();
          $html = file_get_contents('http://localhost/extensTuMarchante/details/?pedId='.$idPedido.'?TuMarchante&18552?whetWpo');
          sleep(10);
          $dompdf->loadHtml($html);

          // (Optional) Setup the paper size and orientation
          $dompdf->setPaper('letter', 'portrait');

          // Render the HTML as PDF
          $dompdf->render();

          // Output the generated PDF to Browser
          //return $dompdf->stream();
          $pdf=$dompdf->output();
          file_put_contents("../assets/nombreTest.pdf", $pdf);
          return json_encode("/assets/nombreTest.pdf");




          /*
          ob_start();
          include("../details/index.php");
          $html = ob_get_contents();
          $dompdf = new Dompdf();
          $dompdf->loadHtml($html);
          $dompdf->setPaper('letter', 'landscape');
          $dompdf->render();
          $pdf=$dompdf->output();
          file_put_contents("../assets/nombreTest2.pdf", $pdf);
          return json_encode("/assets/nombreTest2.pdf");
          ob_get_clean();
          */

          /*
          ob_start();

          require_once("../details/index.php");

          $template = ob_get_clean();
          $dompdf = new Dompdf();

          $dompdf->loadHtml($template);

          $dompdf->setPaper('A4', 'landscape');

          $dompdf->render();
          $pdf=$dompdf->output();
          file_put_contents("../assets/nombreTest2.pdf", $pdf);
          return json_encode("/assets/nombreTest2.pdf");
          */
        }

        function getDataReports($parametros){
          $woocommerce = new Client(
            'https://tumarchante.mx',
            'ck_26296d3d60aaa31c32ff9134564491a7b3608e19',
            'cs_734ae1d4c08e0208f4c29e146b039f1fdc5b8203',
            [
                'version' => 'wc/v3',
            ]
          );

          $date = implode(array($parametros->dateStart));
          $date2 = implode(array($parametros->dateFinal));

          $query = [
              'date_min' => $date,
              'date_max' => $date2
          ];

          $data = $woocommerce->get('reports/sales', $query);
          return json_encode($data);
        }

        function getSearchOrdersReports($parametros){

          $woocommerce = new Client(
            'https://tumarchante.mx',
            'ck_26296d3d60aaa31c32ff9134564491a7b3608e19',
            'cs_734ae1d4c08e0208f4c29e146b039f1fdc5b8203',
            [
                'version' => 'wc/v3',
            ]
          );

          $date = implode(array($parametros->dateStart)).'T00:00:00';
          $date2 = implode(array($parametros->dateFinal)).'T00:00:00';
          $status = implode(array($parametros->status));

          $param = [
              'per_page' => 100,
              'after' => $date,
              'before' => $date2,
              'status' => $status,
          ];

          $data = $woocommerce->get('orders', $param);

          $idOrderConek = '';
          //echo $idOrderConek.'***********1';
          for ($q=0; $q < count($data); $q++) {
            //echo 'Start';
            $metaData = $data[$q]->meta_data;
            //echo gettype($metaData), "\n";
            //var_dump($metaData);

            for ($i=0; $i <count($metaData) ; $i++) {
              $tag = $metaData[$i]->key;
              //echo '>>>>>>>'.$tag.'<<<<<<<|';
              if ($tag == "conekta-order-id") {
                //echo $tag.'------2';
                $idOrderConek = $metaData[$i]->value;
                //echo $idOrderConek.'------3';
              }
            }
            //echo '___________________________';
            //echo $idOrderConek;

            if ($idOrderConek != '') {
              \Conekta\Conekta::setApiKey("key_Xxzxs1zrwxv1q5otBtVQEA");
              \Conekta\Conekta::setApiVersion("2.0.0");
              $order = \Conekta\Order::find($idOrderConek);
              $dataBank = $order['charges'][0]['payment_method']['issuer'];

              $data[$q]->DataBank = $dataBank;
            }else {

              $data[$q]->DataBank = "NoDataBank";

            }

          }

          return json_encode($data);
        }


        function getClientes(){
          $sentencia = $this->ConsultaSimple("SELECT tbUsers.id,tbUsers.display_name,tbUsers.user_email from tm_users tbUsers;");
          return json_encode($sentencia);
        }

        function dataLogin($parametros){
          session_start();
          $pass = implode(array($parametros->pass));
          $pwd = 'tumarchante2021';

          if($pass == $pwd){
            return 1;
            //die();
          }else{
            return 0;
          }
        }

    }
?>
