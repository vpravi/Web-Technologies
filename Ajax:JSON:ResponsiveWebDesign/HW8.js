
var src = '';
    function formatdate(date){
      month = date.substring(5,7);
      day = date.substring(8,10);
      year = date.substring(0,4);
      formatted = month+'/'+day+'/'+year;
      return formatted;
    }

    function loadhistgraph(price,dates,value){
      // var lastrefreshed = formatdate(t);
      var ints= price.map(parseFloat).reverse();
      var date = dates.reverse();
      var inputarray = [];
      for (var l=0;l<ints.length;l++){
        time=Date.parse(dates[l]);
        inputarray.push([time,ints[l]]);
      }
      $("#histprogress").css("display","none");
      // Create the chart
        Highcharts.stockChart('historical_subcontainer', {
            rangeSelector: {
                allButtonsEnabled:true,
                selected: 0,
                buttons:[{
                  type:'week',
                  count:1,
                  text:'1w'
                },
                {
                  type:'month',
                  count:1,
                  text:'1m'
                },
                {
                  type:'month',
                  count:3,
                  text:'6m'
                },{
                  type:'ytd',
                  text:'YTD'
                },{
                  type:'year',
                  count:1,
                  text:'1y'
                },{
                  type:'all',
                  text:'ALL'
                }]
            },
            title: {
              text: 'Stock Value',
            },
            subtitle: {
              text: '<a href=" https://www.alphavantage.co/." style="color:blue">Source: Alpha Vantage</a>'
            },
            yAxis: [{
              title: {
                  text:'Stock Value'
              }
          }],
            series: [{
                type:"area",
                name: value,
                data: inputarray,
                tooltip: {
                  formatter: function () {
                    return 'The value for <b>' + this.x +'</b> is <b>' + this.y + '</b>';
                  }
                }
            }]
        });
    }
    // DateFormat: '%Y-%m-%d',
                    // valueDecimals: 2,
    function loadgraph(price,volume,dates,value,t){
      var lastrefreshed = formatdate(t);
      var ints= price.map(parseFloat).reverse();
      var vols = volume.map(parseFloat).reverse();
      var date = dates.reverse();
         var chart = Highcharts.chart('graph', {
          title: {
              text: value+' Stock Price and Volume'
          },
          chart:{
              zoomType:'x',
              panning:true,
              pankey:'shift'
          },
          subtitle: {
              text: '<a href=" https://www.alphavantage.co/." style="color:blue">Source: Alpha Vantage</a>'
          },
          xAxis: {
              categories:date,
              tickInterval:5
          },
          yAxis: [{
              title: {
                  text:'Stock Price'
              },
              tickInterval: 3.75,
              min:0
          },
          {
           title: {
                  text: 'Volume'
              },
              tickInterval: 30000000,
              opposite: true
          }],
          plotOptions: {
              series : {
                 stacking: 'normal'
              },
              area: {
                  lineWidth: 3,
                  threshold: null
              }
          },

          series: [{
              type: 'area',
              name: 'Price',
              lineColor:'blue',
              data: ints,
              color:'blue',
              fillColor: {
              linearGradient: [0, 0, 0, 3],
               stops: [
                          [0, '#E6E6FF']
                          // [1, '#ff6666']
                      ]
          }
          },{
           type: 'column',
              name:'Volume',
              yAxis: 1,
              data: vols,
              color:'#ff471a',
              fillColor: {
              linearGradient: [0, 0, 0, 1],
              stops: [
                  [0, '#ff471a']
                  // [1, '#ffffff']
              ]
           }
          }]
      });
      
  }


function onelinegraphs(value,api_indicator,indicator,tickinterval,json_obj){
      var heading = json_obj['Meta Data']['2: Indicator'];
      var temp = 'Technical Analysis: '+indicator;
      var substring = json_obj[temp];
      var y_data = [];
      var x_date =[];
      for (item in substring){
        month = item.substring(5,7);
        day = item.substring(8,10);
        formatted = month+'/'+day;
        x_date.push(formatted);
        y = substring[item][indicator]
        y_data.push(y);
      }
      var a = y_data.slice(0,120);
      var b = x_date.slice(0,120);
      var ints = a.map(parseFloat).reverse();
      var dates = b.reverse();
      Highcharts.chart('graph', {
            title: {
                text:heading
            },
            subtitle: {
                text: '<a href=" https://www.alphavantage.co/." style="color:blue">Source: Alpha Vantage</a>'
            },
            xAxis: {
                categories:dates,
                tickInterval:5
            },
            yAxis:{
                title: {
                    text:indicator
                },
                tickInterval:tickinterval,
            },
            plotOptions: {
                line: {
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series:[{
                type: 'line',
                name:value,
                data: ints,
                pointInterval:1,
                color:'#ff471a',
                fillColor: {
                linearGradient: [0, 0, 0, 3],
                 stops: [
                            [0, '#ff6666'],
                            [1, '#ff6666']
                        ]
              }
            }],
        });
      }
function twolinegraphs(value,api_indicator,indicator,json_obj){
      var heading = json_obj['Meta Data']['2: Indicator'];
      var temp = 'Technical Analysis: '+indicator;
      var substring = json_obj[temp];
      var y_data1 = [];
      var y_data2 = [];
      var x_date =[];
      for (item in substring){
        month = item.substring(5,7);
        day = item.substring(8,10);
        formatted = month+'/'+day;
        x_date.push(formatted);
        y1 = substring[item]['SlowK']
        y2 = substring[item]['SlowD']
        y_data1.push(y1);
        y_data2.push(y2);
      }
      var a1 = y_data1.slice(0,120);
      var a2 = y_data2.slice(0,120);
      var b = x_date.slice(0,120);
      var ints1 = a1.map(parseFloat).reverse();
      var ints2 = a2.map(parseFloat).reverse();
      var dates = b.reverse();
      Highcharts.chart('graph', {
            title: {
                text:heading
            },
            chart:{
              zoomType:'x',
              panning:true,
              pankey:'shift'
            },
            subtitle: {
                text: '<a href=" https://www.alphavantage.co/." style="color:blue">Source: Alpha Vantage</a>'
            },
            xAxis: {
                categories:dates,
                tickInterval:5
            },
            yAxis:{
                title: {
                    text:indicator
                },
                tickInterval: 10
            },
            plotOptions: {
                line: {
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'line',
                name: value+': SlowK',
                data: ints1,
                color:'#ff471a',
                fillColor: {
                linearGradient: [0, 0, 0, 3],
                 stops: [
                            [0, '#ff6666'],
                            [1, '#ff6666']
                        ]
            }
            },{
             type: 'line',
              name: value+': SlowD',
                data:ints2,
                color:'#000066',
                fillColor: {
                linearGradient: [0, 0, 0, 1],
                stops: [
                    [0, '#000066'],
                    [1, '#000066']
                ]
             }
            }]
        });
    }
function macdgraph(value,json_obj){
      var heading = json_obj['Meta Data']['2: Indicator'];
      var substring = json_obj['Technical Analysis: MACD'];
      var y_data1 = [];
      var y_data2 = [];
      var y_data3 = [];
      var x_date =[];
      for (item in substring){
        month = item.substring(5,7);
        day = item.substring(8,10);
        formatted = month+'/'+day;
        x_date.push(formatted);
        y1 = substring[item]['MACD'];
        y2 = substring[item]['MACD_Hist'];
        y3 = substring[item]['MACD_Signal'];
        y_data1.push(y1);
        y_data2.push(y2);
        y_data3.push(y3);
      }
      var a1 = y_data1.slice(0,120);
      var a2 = y_data2.slice(0,120);
      var a3 = y_data3.slice(0,120);
      var b = x_date.slice(0,120);
      var ints1 = a1.map(parseFloat).reverse();
      var ints2 = a2.map(parseFloat).reverse();
      var ints3 = a3.map(parseFloat).reverse();
      var dates = b.reverse();
      Highcharts.chart('graph', {
            title: {
                text:heading
            },
            chart:{
              zoomType:'x',
              panning:true,
              pankey:'shift'
            },
            subtitle: {
                text: '<a href=" https://www.alphavantage.co/." style="color:blue">Source: Alpha Vantage</a>'
            },
            xAxis: {
                categories:dates,
                tickInterval:5
            },
            yAxis: [{
                title: {
                    text: 'MACD'
                }
            }],
            plotOptions: {
                line: {
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1
                }
            },
            series: [
              {
                type: 'line',
                  name: value+': MACD',
                  data: ints1,
                  color:'#ff471a',
                  fillColor: {
                  linearGradient: [0, 0, 0, 3],
                   stops: [
                              [0, '#ff6666'],
                              [1, '#ff6666']
                          ]
                  }
              },{
                type: 'line',
                name: value+': MACD_Hist',
                  data:ints2,
                  color:'#ffcc00',
                  fillColor: {
                  linearGradient: [0, 0, 0, 1],
                  stops: [
                      [0, '#ffcc00'],
                      [1, '#ffcc00']
                  ]
               }
              },{
                type: 'line',
                name: value+': MACD_Signal',
                  data:ints3,
                  color:'#9999ff',
                  fillColor: {
                  linearGradient: [0, 0, 0, 1],
                  stops: [
                        [0, '#9999ff'],
                        [1, '#9999ff']
                    ]
                }
            }]
          });
      }

  function bbandsgraph(value,json_obj){
      var heading = json_obj['Meta Data']['2: Indicator'];
      var substring = json_obj['Technical Analysis: BBANDS'];
      var y_data1 = [];
      var y_data2 = [];
      var y_data3 = [];
      var x_date =[];
      for (item in substring){
        month = item.substring(5,7);
        day = item.substring(8,10);
        formatted = month+'/'+day;
        x_date.push(formatted);
        y1 = substring[item]['Real Middle Band'];
        y2 = substring[item]['Real Lower Band'];
        y3 = substring[item]['Real Upper Band'];
        y_data1.push(y1);
        y_data2.push(y2);
        y_data3.push(y3);
      }
      var a1 = y_data1.slice(0,120);
      var a2 = y_data2.slice(0,120);
      var a3 = y_data3.slice(0,120);
      var b = x_date.slice(0,120);
      var ints1 = a1.map(parseFloat).reverse();
      var ints2 = a2.map(parseFloat).reverse();
      var ints3 = a3.map(parseFloat).reverse();
      var dates = b.reverse();
      Highcharts.chart('graph', {
            title: {
                text:heading
            },
            chart:{
              zoomType:'x',
              panning:true,
              pankey:'shift'
            },
            subtitle: {
                text: '<a href=" https://www.alphavantage.co/." style="color:blue">Source: Alpha Vantage</a>'
            },
            xAxis: {
                categories:dates,
                tickInterval:5
            },
            yAxis: [{
                title: {
                    text: 'BBANDS'
                }
            }],
            plotOptions: {
                line: {
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [
              {
                  type: 'line',
                  name: value+': Real Middle Band',
                  data: ints1,
                  color:'#ff471a',
                  fillColor: {
                  linearGradient: [0, 0, 0, 3],
                  stops: [
                              [0, '#ff6666'],
                              [1, '#ff6666']
                          ]
                 }
              },{
                type: 'line',
                name: value+': Real Upper Band',
                data:ints3,
                color:'#99d6ff',
                fillColor: {
                linearGradient: [0, 0, 0, 1],
                stops: [
                        [0, '#99d6ff'],
                        [1, '#99d6ff']
                    ]
                }
              },{
                type: 'line',
                name: value+': Real Lower Band',
                data:ints2,
                color:'#000000',
                fillColor: {
                linearGradient: [0, 0, 0, 1],
                stops: [
                        [0, '#000000'],
                        [1, '#000000']
                    ]
                }
            }]
          });
      }


  function removeval(z){
      $('#'+z).remove();
      localStorage.removeItem(z);
      var order = $('[ng-controller="fetchCtrl"]').scope().order;
      order.splice( $.inArray(z, order), 1 );
      $('[ng-controller="fetchCtrl"]').scope().checkfav();

  }

  function showmain(){
        var scope = angular.element(document.getElementById("controller")).scope();
        scope.$apply(function () {
        scope.showmain();
      });
      }




var fetch = angular.module('my-app', ["ngAnimate"]);

fetch.controller('fetchCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.myValue=true;
  $scope.slideval=false;
  $scope.order = [];

  $scope.resetform = function(){
    $scope.myform.$setPristine();
    $scope.myform.$setUntouched();
    $scope.searchText = "";
    $("#table").html(null);
    $("#graph").html(null);
    $(".main-container").css("display","none");
    $("#favourites_container").css("display","block");
    $("#enablebtn").prop("disabled", true );
    $scope.myValue=true;
    $scope.slideval=false;
    
  }

  $scope.disable = function(){
    if($scope.searchText == null){
      $("#enablebtn").prop("disabled", true );
    }
  }
  $scope.enable = function(){
    if($scope.searchText != null){
      $("#enablebtn").prop("disabled", false );
    }
  }

  $scope.fetchSuggestions = function(){
    $http.get(
      'index.php?searchText='+$scope.searchText+'',
    ).then(function successCallback(response) {
     $scope.searchResult = response.data;
    });
  }
    
  $scope.setValue = function(index){
    $scope.searchText = $scope.searchResult[index].Symbol;
    $scope.searchResult = {};
  }

  $scope.checkfav = function(){
      var el = $scope.searchText;
      var or = $scope.order;
      if ($.inArray(el,or) >= 0){
        $("#star").attr("class","glyphicon glyphicon-star");
        $("#star").css("color","#ecec0e"); 
        }
        else{
        $("#star").attr("class","glyphicon glyphicon-star-empty");
        $("#star").css("color","black");
        }
    }

 $scope.fetchsymbol = function(){
    $(".main-container").css("display","block");
    $scope.myValue=false;
    $("#favourites_container").hide();
    $scope.slideval=true;
    $("#graph").css("display","none");
    $("#table").css("display","none");
    $("#stockprogress").css("display","block");
    if($("#stockprogress").css('display')=='block'){
    $("#star").prop("disabled", true ); 
    $("#fb").prop("disabled", true ); 
    }
    $("#graphprogress").css("display","block");
    $scope.checkfav();
    $scope.enable();
    $http.get(
       'index.php?searchsymbol='+$scope.searchText+'',
      ).then(function successCallback(response) {
        
        var json = response.data;
        if(($.isEmptyObject(json)) || (typeof json != 'object')){
          var err="";
          var errg = "";
          $("#graph").css("display","block");
          $("#table").css("display","block");
          $("#stockprogress").css("display","none");
          $("#graphprogress").css("display","none");
          err+="<div class='col-lg-5 Errordesign'>Error!Failed to get Current Stock Data</div>";
          errg+="<div class='col-lg-5 Errordesign' id='grapherror'>Error!Failed to get Price Data</div>";
          $("#table").append(err);
          $("#graph").append(errg);
        }else{
        var obj = response.data;
        var header = obj['Meta Data'];
        var value = header["2. Symbol"];
        $scope.symbol = value;
        var Timeseriesvalues = obj["Time Series (Daily)"];
        var timekeys = Object.keys(Timeseriesvalues);
        var lastsession = Timeseriesvalues[timekeys[0]];
        var timestamp = header["3. Last Refreshed"];
        var previoussession = Timeseriesvalues[timekeys[1]];
        var open = lastsession["1. open"];
        var close = lastsession["4. close"];
        $scope.close = parseFloat(close).toFixed(2);
        var change = lastsession["4. close"]-previoussession["4. close"];
        $scope.change = parseFloat(change).toFixed(2);
        var changepercent = (change/lastsession["4. close"])*100;
        $scope.changepercent = parseFloat(changepercent).toFixed(2);
        $scope.volume = lastsession["5. volume"];
        var html = '';
        html+='<table border ="1px" id="infoTable">';
        html+='<tr class="grey">';
        html+='<td class="header">'+'Stock Ticker Symbol'+'</td>';
        html+='<td class="results">'+header["2. Symbol"]+'</td>';
        html+='</tr>';
        html+='<tr>';
        html+='<td class="header">'+'Last Price'+'</td>';
        html+='<td class="results">'+parseFloat(close).toFixed(2)+'</td>';
        html+='</tr>';
        html+='<tr class="grey">';
        html+='<td class="header">'+'Change'+'</td>';
        if (change>0){
          html+='<td class="results" style="color:#21cc21">'+parseFloat(change).toFixed(2)+'&nbsp;('+parseFloat(changepercent).toFixed(2)+')<img src="Green_Arrow_Up.png" style="width:10px;margin-left:10px;"></td>';
          }else{
          html+='<td class="results" style="color:red">'+parseFloat(change).toFixed(2)+'&nbsp;('+parseFloat(changepercent).toFixed(2)+')<img style="width:10px;margin-left:10px;" src="Red_Arrow_Down.png"></td>';
          }
        html+='</tr>';
        html+='<tr>';
        html+='<td class="header">'+'Timestamp'+'</td>';
        html+='<td class="results">'+header["3. Last Refreshed"]+'</td>';
        html+='</tr>';
        html+='<tr class="grey">';
        html+='<td class="header">'+'Open'+'</td>';
        html+='<td class="results">'+parseFloat(open).toFixed(2)+'</td>';
        html+='</tr>';
        html+='<tr>';
        html+='<td class="header">'+'Close'+'</td>';
        html+='<td class="results">'+parseFloat(close).toFixed(2)+'</td>';
        html+='</tr>';
        html+='<tr class="grey">';
        html+='<td class="header">'+'Day\'s Range'+'</td>';
        html+='<td class="results">'+parseFloat(lastsession["3. low"]).toFixed(2)+' - '+parseFloat(lastsession["2. high"]).toFixed(2)+'</td>';
        html+='</tr>';
        html+='<tr>';
        html+='<td class="header">'+'Volume'+'</td>';
        html+='<td class="results">'+lastsession["5. volume"]+'</td>';
        html+='</tr>';
        html+='</table>';
        $("#stockprogress").css("display","none");
        if($("#stockprogress").css('display')=='none'){
          $("#star").prop("disabled", false ); 
          $("#fb").prop("disabled", false ); 
        }
        $("#graphprogress").css("display","none");
        $("#graph").css("display","block");
        $("#table").css("display","block");
        var myelement = angular.element( document.querySelector( '#table' ) );
        myelement.empty().append(html);
        var la = '';
        var price = [];
        var dates = [];
        var vol = [];
        var jj = Object.keys(Timeseriesvalues).length;
        if (jj<120){
          var kk = jj;
        }else{
          var kk = 120;
        }
        for (var x = 0; x < kk; x++) {
          lastsession = Timeseriesvalues[timekeys[x]];
          price.push(lastsession["4. close"]);
          vol.push(lastsession["5. volume"]);
        } 
        var n = timekeys.length;
        for (var i = 0; i < kk; i++){
          var each =  timekeys[i];
          var m = each.length;
          for (var j=0;j<m;j++){
            var month = each.substring(5,7);
            var day = each.substring(8,10);
            var formatted = month+'/'+day;
          }
          dates.push(formatted);
        } 
        $scope.price = price;
        $scope.vol = vol;
        $scope.dates = dates;
        $scope.timestamp =timestamp;
        loadgraph(price,vol,dates,value,timestamp);
      } 
    });
 }  

$scope.pricegraph = function(price,vol,dates,timestamp){
  loadgraph(price,vol,dates,$scope.searchText,timestamp);
}

$scope.ftgraph = function(apiindicator){
      $http.get(
      'index.php?la='+apiindicator+'&value='+$scope.searchText+'',
      ).then(function successCallback(response) {
        var obj1 = response.data;
        var Header = obj1['Meta Data'];
        var Indicator = Header['2: Indicator']
        if(Indicator == "Simple Moving Average (SMA)"){
          onelinegraphs($scope.searchText,'sma','SMA',2.5,obj1);
        }
        if(Indicator == "Exponential Moving Average (EMA)"){
          onelinegraphs($scope.searchText,'ema','EMA',2.5,obj1);
        }
        if(Indicator == "Relative Strength Index (RSI)"){
          onelinegraphs($scope.searchText,'rsi','RSI',10,obj1);
        }
        if(Indicator == "Average Directional Movement Index (ADX)"){
          onelinegraphs($scope.searchText,'adx','ADX',5,obj1);
        }
        if(Indicator == "Commodity Channel Index (CCI)"){
          onelinegraphs($scope.searchText,'cci','CCI',100,obj1);
        }
        if(Indicator == "Stochastic (STOCH)"){
          twolinegraphs($scope.searchText,'stoch','STOCH',obj1);
        }
        if(Indicator == "Bollinger Bands (BBANDS)"){
          bbandsgraph($scope.searchText,obj1);
        }
        if(Indicator == "Moving Average Convergence/Divergence (MACD)"){
          macdgraph($scope.searchText,obj1);
        } 
    });
  } 

    $scope.getnews = function(){ 
      $("#historical_subcontainer").css("display","none");
      $("#news_subcontainer").css("display","block");
      $http.get(
        'index.php?newsvalue='+$scope.searchText+'',
        ).then(function successCallback(response) {
          var json = response.data;
        if(($.isEmptyObject(json)) || (typeof json != 'object')){
          var err="";
          err+="<div class='col-lg-7 Errordesign' id='hisdes'>Error!Failed to get News Data</div>"
          $("#news_subcontainer").append(err);
        }
          else{
        var objnews = response.data;
        var titles = objnews[0];
        var links = objnews[1];
        var dates = objnews[2];
        var authors = objnews[3];
        var html="";
        for (i=0;i<5;i++){
          html+="<div id='eachnews' class='col-lg-10'>";
          html+="<a href='"+links[i]+"' target='_blank'>"+titles[i]+"</a>"
          html+="<p style='margin-top: 20px;'>Author: "+authors[i]+"</p>";
          html+="<p>Date: "+dates[i].substring(0,26)+" EDT</p>"
          html+="</div>";
        }
        
        $("#news_subcontainer").empty().append(html);
        $("#sub_maincontainer").hide();
      }
    });
    }
    
    $scope.showstock = function(){
      $("#news_subcontainer").hide();
      $("#sub_maincontainer").show();
      $("#historical_subcontainer").css("display","none");
    }

    $scope.sharefb = function(){
      var chart=$("#graph").highcharts();
      var exportUrl = 'http://export.highcharts.com/';
      var options = chart.options;
      //POST parameter for Highcharts export server
      var object = {
          options: JSON.stringify(options),
          type: 'image/png',
          async: true
      };
      //Ajax request
      $.ajax({
          type: 'post',
          url: exportUrl,
          data: object,
          success: function (data) {
              src = exportUrl + data;
              $scope.src = src;
              $('meta[name=keywords]').attr('content', src);
              FB.init({
              appId : '1892200027762603',
              cookie: true
              });

              FB.ui(
              {
              method: 'feed',
              name: 'RavibalanApp',
              link: 'http://homework8vpravi-env.us-east-1.elasticbeanstalk.com/HW8.html',
              caption: 'Highcharts graph',
              description: 'Hey this my application ?',
              message: ''
              });
                  }
              });
      
      
  }
       
    $scope.showhist = function(){
      $("#news_subcontainer").hide();
      $("#sub_maincontainer").hide();
      $("#historical_subcontainer").css("display","block");
      $("#histprogress").css("display","block");
      $http.get(
      'index.php?searchsymbol='+$scope.searchText+'',
      ).then(function successCallback(response) {
        var json = response.data;
        if(($.isEmptyObject(json)) || (typeof json != 'object')){
          var err="";
          $("#histprogress").css("display","none");
          err+="<div class='col-lg-7 Errordesign' id='histdes'>Error!Failed to get Historical Charts Data</div>"
          $("#historical_subcontainer").empty().append(err);
        }
          else{
          var obj = response.data;
          var val = $scope.searchText;
          var Timeseriesvalues = obj["Time Series (Daily)"];
          var timekeys = Object.keys(Timeseriesvalues);
          var jj = Object.keys(Timeseriesvalues).length;
          var histprice = [];
          for (var y = 0; y < jj; y++) {
            lastsession = Timeseriesvalues[timekeys[y]];
            histprice.push(lastsession["4. close"]);
          }
          var histdates = [];
          for (var s = 0; s < jj; s++){
            var each1 =  timekeys[s];
            histdates.push(each1);
          }
          loadhistgraph(histprice,histdates,val);
        }
      });
    }

    $scope.showfavourites = function(){
      $(".main-container").css("display","none");
      $scope.myValue=true;
      $("#favourites_container").show();
      $scope.slideval=false;
    }

    $scope.showmain = function(){
      if($('#graph').html() != ''){
        $("#favourites_container").hide();
        $scope.slideval=true;
        $(".main-container").css("display","block");
        $scope.myValue=false;
      }
      // var slideval = $('[ng-controller="fetchCtrl"]').scope().myValue;
      // slideval=true;
    }

    $scope.addtofav = function(){
      $("#star").attr("class","glyphicon glyphicon-star");
      $("#star").css("color","#ecec0e");
      if (typeof(Storage) !== "undefined") {
        var key = $scope.symbol;
        var KEY = key.toUpperCase();
        var each = [KEY,$scope.close,$scope.change,$scope.changepercent,$scope.volume];
        var neworder = $scope.order;
        localStorage.setItem(KEY,JSON.stringify(each));
        if (!($.inArray(KEY,neworder) >= 0)){
          neworder.push(KEY);
        }
      } else {
        alert("Browser doesnt support local storage");
      }
      var html ='';
      keys = Object.keys(localStorage);
      for (var i in $scope.order){
        var item = $scope.order[i]; 
        var value = JSON.parse(localStorage.getItem(item));
        var symbol = value[0];
        html+='<tr id=\"'+value[0]+'\">';
        html+='<td id="symbol"><a href="javascript:void(0)" onclick="showmain()">'+value[0]+'</a></td>';
        html+='<td>'+value[1]+'</td>';
        if (value[2]>0){
          html+='<td style="color:#21cc21">'+value[2]+' ('+value[3]+')<img src="Green_Arrow_Up.png" style="width:10px;margin-left:10px;"></td>';
        }
        else{
          html+='<td style="color:red">'+value[2]+' ('+value[3]+')<img style="width:10px;margin-left:10px;" src="Red_Arrow_Down.png"></td>';
        }
        html+='<td>'+value[4]+'</td>';
        html+='<td><button class="glyphicon glyphicon-trash" id="delete" key=\"'+value[0]+'\" onclick="removeval(\''+symbol+'\')"></button></td>';
        html+='</tr>';
      }
      $("#tbody").empty().append(html);
    }

$scope.loopHTML = function(List,obj){
  var html = '';
  for (var j in List){
    var item = List[j]; 
    var value = obj[item];
    var symbol = value[0];
    html+='<tr id=\"'+value[0]+'\">';
    html+='<td id="symbol">'+value[0]+'</td>';
    html+='<td>'+value[1]+'</td>';
    if (value[2]>0){
      html+='<td style="color:#21cc21">'+value[2]+' ('+value[3]+')<img src="Green_Arrow_Up.png" style="width:10px;margin-left:10px;"></td>';
    }
    else{
      html+='<td style="color:red">'+value[2]+' ('+value[3]+')<img style="width:10px;margin-left:10px;" src="Red_Arrow_Down.png"></td>';
    }
    html+='<td>'+value[4]+'</td>';
    html+='<td><button class="glyphicon glyphicon-trash" id="delete" key=\"'+value[0]+'\" onclick="removeval(\''+symbol+'\')"></button></td>';
    html+='</tr>';
  }
  $("#tbody").empty().append(html);
}

    $scope.selectorderby = function(){
      var OriginalList = $scope.order;
      var sortby = $("#defaultButtonSpan").html();
      var orderby = $("#defaultOrderButton").html();
      if (sortby!="Default"){
        $("#orderbtn").prop("disabled", false );
      }
      if (sortby == "Symbol"){
        var html ='';
        if(orderby=="Descending"){
          var temp =OriginalList.sort()
          var List=temp.reverse();
        }
        else if (orderby == "Ascending"){
          var List=OriginalList.sort();
        }
          for (var j in List){
            var item = List[j]; 
            var value = JSON.parse(localStorage.getItem(item));
            var symbol = value[0];
            html+='<tr id=\"'+value[0]+'\">';
            html+='<td id="symbol">'+value[0]+'</td>';
            html+='<td>'+value[1]+'</td>';
            if (value[2]>0){
              html+='<td style="color:#21cc21">'+value[2]+' ('+value[3]+')<img src="Green_Arrow_Up.png" style="width:10px;margin-left:10px;"></td>';
            }
            else{
              html+='<td style="color:red">'+value[2]+' ('+value[3]+')<img style="width:10px;margin-left:10px;" src="Red_Arrow_Down.png"></td>';
            }
            html+='<td>'+value[4]+'</td>';
            html+='<td><button class="glyphicon glyphicon-trash" id="delete" key=\"'+value[0]+'\" onclick="removeval(\''+symbol+'\')"></button></td>';
            html+='</tr>';
          }
          $("#tbody").empty().append(html);
      }else if(sortby =="Price"){
          var priceorder = [];
          var priceobj = {};
          for (e in OriginalList){
            var each = OriginalList[e];
            var eachval = JSON.parse(localStorage.getItem(each));
            priceobj[eachval[1]]=eachval;
            priceorder.push(parseFloat(eachval[1]).toFixed(2));
          }
          var tempasc = priceorder.sort((a, b) => a - b);
        if(orderby =="Ascending"){
          var PriceList = tempasc;
        }else if (orderby == "Descending"){
          var PriceList = tempasc.reverse();
        }
        $scope.loopHTML(PriceList,priceobj);
      }else if(sortby =="Change"){
        var changeorder = [];
        var changeobj = {};
        for (e in OriginalList){
          var each = OriginalList[e];
          var eachval = JSON.parse(localStorage.getItem(each));
          changeobj[eachval[2]]=eachval;
          changeorder.push(eachval[2]);
        }
        var tempasc = changeorder.sort((a, b) => a - b);
        if(orderby =="Ascending"){
          var ChangeList = tempasc;
        }else if (orderby == "Descending"){
          var ChangeList = tempasc.reverse();
        }
        $scope.loopHTML(ChangeList,changeobj);
      }else if(sortby =="Change Percent"){
        var changeperorder = [];
        var changeperobj = {};
        for (e in OriginalList){
          var each = OriginalList[e];
          var eachval = JSON.parse(localStorage.getItem(each));
          changeperobj[eachval[3]]=eachval;
          changeperorder.push(eachval[3]);
        }
        var tempasc = changeperorder.sort((a, b) => a - b);
        if(orderby =="Ascending"){
          var ChangeperList = tempasc;
        }else if (orderby == "Descending"){
          var ChangeperList = tempasc.reverse();
        }
        $scope.loopHTML(ChangeperList,changeperobj);
      }else if(sortby =="Volume"){
        var volorder = [];
        var volobj = {};
        for (e in OriginalList){
          var each = OriginalList[e];
          var eachval = JSON.parse(localStorage.getItem(each));
          volobj[eachval[4]]=eachval;
          volorder.push(parseInt(eachval[4]));
        }
        var tempasc = volorder.sort((a, b) => a - b);
        if(orderby =="Ascending"){
          var volList = tempasc;
        }else if (orderby == "Descending"){
          var volList = tempasc.reverse();
        }
        $scope.loopHTML(volList,volobj);
      }else if (sortby == "Default"){
        var html ='';
        for (var j in OriginalList){
          var item = OriginalList[j]; 
          var value = JSON.parse(localStorage.getItem(item));
          var symbol = value[0];
          html+='<tr id=\"'+value[0]+'\">';
          html+='<td id="symbol">'+value[0]+'</td>';
          html+='<td>'+value[1]+'</td>';
          if (value[2]>0){
            html+='<td style="color:#21cc21">'+value[2]+' ('+value[3]+')<img src="Green_Arrow_Up.png" style="width:10px;margin-left:10px;"></td>';
          }
          else{
            html+='<td style="color:red">'+value[2]+' ('+value[3]+')<img style="width:10px;margin-left:10px;" src="Red_Arrow_Down.png"></td>';
          }
          html+='<td>'+value[4]+'</td>';
          html+='<td><button class="glyphicon glyphicon-trash" id="delete" key=\"'+value[0]+'\" onclick="removeval(\''+symbol+'\')"></button></td>';
          html+='</tr>';
        }
        $("#tbody").empty().append(html);
      }    
    }    
}]);
    
    function dropdownorder(val){
          $(".btn.dropdown-toggle#orderbtn").html('<span id="defaultOrderButton">'+val+'</span><span class="caret"></span>'); 
          if (val != "Ascending"){
            $("#showasc").css("display","block");
          }
        }
    function dropdown(val) {
      $(".btn.dropdown-toggle#btnsort").html('<span id="defaultButtonSpan">'+val+'</span><span class="caret"></span>'); 
      if (val != "Default"){
        $("#show").css("display","block");
      }
      if (val == "Default"){
        $("#orderbtn").prop("disabled", true );
      }

      
    }
    


