<?php
	include_once("../model/bd.php");
	include_once("../model/DataModel.php");

	class dataOrder
	{
		private $model;
		function __construct()
		{
				$this->model = new Orders();
		}

		public function getOrders(){
			$consulta = $this->model->getOrders();
			echo $consulta;
		}
		public function getSearchOrders($parametros){
			$consulta = $this->model->getSearchOrders($parametros);
			echo $consulta;
		}
		public function getDataPedido($parametros){
			$consulta = $this->model->getDataPedido($parametros);
			echo $consulta;
		}
		public function getDataConekt($parametros){
			$consulta = $this->model->getDataConekt($parametros);
			echo $consulta;
		}
		public function getDataProds($parametros){
			$consulta = $this->model->getDataProds($parametros);
			echo $consulta;
		}
		public function createPdf($parametros){
			$consulta = $this->model->createPdf($parametros);
			echo $consulta;
		}
		//*****************************
		//*****************************
		public function getDataReports($parametros){
			$consulta = $this->model->getDataReports($parametros);
			echo $consulta;
		}
		//*****************************
		//*****************************
		//*****************************
		//*****************************
		public function getSearchOrdersReports($parametros){
			$consulta = $this->model->getSearchOrdersReports($parametros);
			echo $consulta;
		}
		//*****************************
		public function dataLogin($parametros){
			$consulta = $this->model->dataLogin($parametros);
			echo $consulta;
		}
		//*****************************
		//*****************************
		public function getClientes(){
			$consulta = $this->model->getClientes();
			echo $consulta;
		}

	}

	$orders= new dataOrder();

	if(!isset($_POST['action'])) {
		print json_encode(0);
		return;
	}

	switch($_POST['action']) {
		case 'getOrders':
			$orders->getOrders();
		break;
		case 'getSearchOrders':
			$parametros = new stdClass;
			$parametros = json_decode($_POST['parametros']);
			$orders->getSearchOrders($parametros);
		break;
		//**********************
		//**********************
		case 'getDataPedido':
			$parametros = new stdClass;
			$parametros = json_decode($_POST['parametros']);
			$orders->getDataPedido($parametros);
		break;
		case 'getDataConekt':
			$parametros = new stdClass;
			$parametros = json_decode($_POST['parametros']);
			$orders->getDataConekt($parametros);
		break;
		case 'getDataProds':
			$parametros = new stdClass;
			$parametros = json_decode($_POST['parametros']);
			$orders->getDataProds($parametros);
		break;
		case 'createPdf':
			$parametros = new stdClass;
			$parametros = json_decode($_POST['parametros']);
			$orders->createPdf($parametros);
		break;
		//********************************
		//********************************
		case 'getDataReports':
			$parametros = new stdClass;
			$parametros = json_decode($_POST['parametros']);
			$orders->getDataReports($parametros);
		break;
		//********************************
		//********************************
		//********************************
		//********************************
		case 'getSearchOrdersReports':
			$parametros = new stdClass;
			$parametros = json_decode($_POST['parametros']);
			$orders->getSearchOrdersReports($parametros);
		break;
		//********************************
		//********************************
		case 'dataLogin':
			$parametros = new stdClass;
			$parametros = json_decode($_POST['parametros']);
			$orders->dataLogin($parametros);
		break;
		//********************************
		//********************************
		case 'getClientes':
			$orders->getClientes();
		break;
	}
?>
