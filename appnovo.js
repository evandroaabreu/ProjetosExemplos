var app=angular.module('myApp', []);


app.controller('MyCtrl', ['$scope','$http', '$filter', function ($scope,$http, $filter) {
    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.data = [];
    $scope.datanovo = [];
    $scope.q = '';
    $scope.listamaquinas = [];
    $scope.listamaquinasnova = [];
    $scope.listaoperador = [];
    $scope.listacc = [];
    
    $scope.mostraTagCC = false;
    $scope.mostraTagMaquina = false;
    $scope.mostraTagOperador = false;   
    $scope.mostraLabelTopo= false;
    $scope.mostraArvore = false;
    $scope.heightCard = "height: 54px";
    $scope.lblMaquina = null;
    $scope.lblMaquinaApt = null;
    $scope.showPaginacao= false;
    
    
    
     getScreen = function(){
        $scope.telaWidth = window.innerWidth;    
         
         if ($scope.telaWidth > 1000) {
             $scope.mostraLabelTopo= true;
         } else {
             $scope.mostraLabelTopo= false;
         }
        
    }
       
    getScreen();
    
    $scope.mostraCardAberto = function(){
        $scope.heightCard = "height: 679px";
        $scope.showPaginacao= true;
        
    }
    
    $scope.mostraCardFechado = function(){
        $scope.heightCard = "height: 54px";
        
    }
    

    $scope.buscaFiltro = function(){
        
    }   
    
   $scope.setClickedEscondeArvore = function(){  //function that sets the value of selectedRow to current index
         $scope.mostraArvore = false;
    }  
    
    $scope.setClickedEstab = function(){  //function that sets the value of selectedRow to current index
         $scope.mostraArvore = true;
    }  
    
    
    $scope.setClickedRowApt = function(item){  //function that sets the value of selectedRow to current index
         $scope.listacc = item;
    }   
    
    openModal= function(){ 
         $('#openModalMaquinas').openModal();
    }
    
    $scope.setClickedRowAptCentroCusto = function(item,index){  //function that sets the value of selectedRow to current index
        $scope.listamaquinasnova = item;
        $scope.showOperador = false;
        $scope.showMaquinas = true;        
        $scope.showOrdem = false;
        $scope.lblMaquina =   null;        
        $scope.lblMaquinaApt = null;   
        $scope.lblOperadorApto = null;
        $scope.lblcc = null;
        $scope.lbltotalapont = null;
        $scope.lbltotalprev = null;
        $scope.lblcc = item.cc;
        $scope.lbltotalapont = item.totalapont;
        $scope.lbltotalprev = item.totalprev;        

        openModal();
    }    
    

    
    
    
    $scope.setClickedRow = function(item,index){  //function that sets the value of selectedRow to current index     
         $scope.listamaquinas = item;
         $scope.lblMaquina =   null;        
         $scope.lblMaquinaApt = null;    
         $scope.mostraTagCC = true;
         $scope.mostraTagMaquina = false;
         $scope.showOperador = false;
         
    }   
    
    
    $scope.setClickedRowOperador = function(item) {
        $scope.listaordem = item;
        $scope.showOperador = false;        
        $scope.showOrdem = true;
        
        $scope.lblOperadorApto = item.nome+" : "+item.totalapont;

    }
    
    $scope.setClickedRowMaquinas = function(item) {
		$scope.listaoperador = item;
        $scope.lblMaquina =   item.nomeMaquina;
        $scope.lblMaquinaApt = item.totalapont;
        $scope.lblMaquinaeApto = item.nomeMaquina+" : "+item.totalapont;
        $scope.mostraTagMaquina = true;
        $scope.showOperador = true;
        $scope.showMaquinas = false;
	}
    
    $scope.voltarMaquinas = function() {
        $scope.showMaquinas = true;
        $scope.showOperador = false;
        $scope.lblMaquinaeApto = "";
        $scope.lblOperadorApto = "";
    }
    
    $scope.voltarOperador = function() {
        $scope.showMaquinas = false;
        $scope.showOperador = true;
        $scope.showOrdem = false;
        $scope.lblOperadorApto = "";
        
    }
    
    


    $http.get("apt.json").success(function(data) {
		$scope.datanova = data;
	})
    
    
    $http.get("apontamentos.json").success(function(data) {
		$scope.data = data;
	})

    
    $scope.getData = function () {
      // needed for the pagination calc
      // https://docs.angularjs.org/api/ng/filter/filter
      return $filter('filter')($scope.data, $scope.q)
     
    }
    
    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }
    
/*    for (var i=0; i<65; i++) {
        $scope.data.push("Item "+i);
    }*/
  // A watch to bring us back to the 
  // first pagination after each 
  // filtering
$scope.$watch('q', function(newValue,oldValue){             if(oldValue!=newValue){
	  $scope.currentPage = 0;
  }
},true);
}]).controller('AptCtr', ['$scope','$http', '$filter', function ($scope,$http, $filter) {
    $scope.mostraBotoes = true;
    $scope.mostraInicioOrdem = false;
    $scope.mostraFimOrdem = false;    
    $scope.operador= null;
    $scope.nomeOperador=null;
    $scope.habilitarConfirmarDados=null;
    $scope.nroOrdem = null;
    $scope.operacao = null;
    $scope.refugo = null;
    $scope.produzido = null;
    $scope.totalProduzido = null;
    
    
    $scope.finalizarOrdem = function() {
       $scope.habilitarConfirmarDados = false;          
       $scope.mostraBotoes = false; 
       $scope.mostraFimOrdem = true;
       $scope.operador= null;
       $scope.nomeOperador=null;
       $scope.nroOrdem = null;
       $scope.operacao = null;
       $scope.refugo = null;
       $scope.produzido = null;
       $scope.totalProduzido = null;               
        
    }
    
    
    $scope.inicioOrdem = function () {
       $scope.mostraBotoes = false;
       $scope.mostraInicioOrdem = true;
       $scope.habilitarConfirmarDados = false;    
       $scope.operador= null;
       $scope.nomeOperador=null;
       $scope.nroOrdem = null;
       $scope.operacao = null;
       $scope.refugo = null;
       $scope.produzido = null;
       $scope.totalProduzido = null;        
        
    }
    
    
    $scope.pesquisaOperador= function (tpTela) {            
        if ($scope.operador != null){
          $scope.nomeOperador = "José Aparecido Ramires";    
        }      
        $scope.validaBotao(tpTela);
    }
    
    $scope.pesquisaOrdem= function (tpTela) {            
        $scope.validaBotao(tpTela);
    }
    
    
    $scope.pesquisaOperacao= function (tpTela) {            
        $scope.validaBotao(tpTela);
    }
    
    $scope.pesquisaRefugo= function (tpTela) {  
        $scope.totalProduzido = $scope.produzido-$scope.refugo;
        $scope.validaBotao(tpTela);
    }    
    
    $scope.pesquisaProduzido= function (tpTela) {            
        $scope.totalProduzido = $scope.produzido-$scope.refugo;
       
        $scope.validaBotao(tpTela);
    }       
    
        
    $scope.validaBotao= function (tpTela) {         
        if (tpTela == 0) {
            if (($scope.operador != null) && ($scope.nroOrdem != null) && 
                ($scope.operacao != null)){
              $scope.habilitarConfirmarDados = true;    
            }                         
        }
        
        if (tpTela == 1) {        
            if (($scope.operador != null) && ($scope.nroOrdem != null) && 
                ($scope.operacao != null) && ($scope.refugo != null) && ( $scope.produzido != null)){
              $scope.habilitarConfirmarDados = true;    
            }                                     
            
        }     
    }   
    
    
    $scope.voltarPagina= function (tpTela) {  
        
        if (tpTela == 0) {
           $scope.mostraBotoes = true;
           $scope.mostraInicioOrdem = false;
        }
        if (tpTela == 1) {
           $scope.mostraBotoes = true;
           $scope.mostraFimOrdem = false;
        }        
        
    }   
    
    $scope.consultaOrdem = function() {
       window.location.href="indexnovo.html"    
        
    }
    
    
    
    
}]);

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
