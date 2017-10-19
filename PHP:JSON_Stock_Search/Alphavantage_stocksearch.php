<!DOCTYPE html>
<html>
<head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<title>Stock Search</title>
</head>
<style>
	html,body{
	height: 1282px;
	margin: 0px;
	padding: 0px;
	}
   #container{
    width: 500px;
    margin-top:10px;
   }
   body{
   	font-family: sans-serif;
   }
   form {
	border: solid 1px #d4cece;
	border-radius: 3px;
	padding: 10px 15px;
	background-color: whitesmoke;
	margin: 0 auto;
	margin-bottom: 10px;
	font-size: 17px;
	font-family: serif;
	height: 170px;
   }
   form p{
   	margin: 0;
    margin-top:20px;
    font-style: italic;
    float:left;
	margin-left: 20px;
   }
   h2{
	margin: 0;
	font-size: 30px;
	text-align: center;
	font-style:italic;
   }
   hr{
    margin-bottom: 20px;
    border: solid 1px lightgrey;
   }
   #table{
    font-size: 13px;
   }
   #table table {
	border: solid 1px #d4cece;
	border-collapse: collapse;
	width: 1000px;
	background-color: #fbfbfb;
	text-align: center;
   }
   #table .header{
	background-color: #e8e6e6;
	text-align: left;
	font-weight: bold;
	width: 200px;
	border-bottom:solid 1px #d4cece;
   	border-right:solid 1px #d4cece;
   }
   #table .results{
	border-bottom:solid 1px #d4cece;
   }
   #table td {
   	padding:3px;
   }
   #table tr:last-child td {
   	border-bottom:0;
   }
	#news tr:last-child td {
	border-bottom: 0;
	}
   td p{
   	margin: 0;
   }
   td a{
   	text-decoration: none;
   	margin:10px;
   }
   #graph{
	width: 1000px;
	height: 600px;
	border: solid 1px #d4cece;
	margin-top: 14px;
   }
   #newss{
   	border: solid 1px #d4cece;
    margin-top: 13px;
    width: 1000px;
   }
   #news td{
   	border-bottom: solid 1px #d4cece;
    padding: 5px;
    font-size: 13px;
    font-family: sans-serif;
    background-color: #f9f9f9;
   }
   #news a{
   	text-decoration: none;
   	color:blue;
   }
   .greyarrow{
   	width: 40px;
	height: 20px;
   }
   .toggletext{
   	margin-top:0;
   	font-size: 12px;
    color: #a29c9c;
    padding-top: 15px;
   }
   .btns{
   	border-radius: 5px;
   	padding: 3px 10px;
   	background-color: white;
    border: solid 0.6px lightgrey;
   }
   #first,#second{
   	background: linear-gradient(#e6e5e5,white);
   	width: 1002px;
   }
</style>
<script type="text/javascript">
	function formatdate(date){
		month = date.substring(5,7);
		day = date.substring(8,10);
		year = date.substring(0,4);
		formatted = month+'/'+day+'/'+year;
		return formatted;
	}
 	function loadgraph(price,volume,dates,value,timestamp){
 		var lastrefreshed = formatdate(timestamp);
 		var ints= price.map(parseFloat).reverse();
      	var vols = volume.map(parseFloat).reverse();
      	var date = dates.reverse();
      	var min_p = Math.min.apply(null,ints)-5;
         Highcharts.chart('graph', {
	        title: {
	            text: 'Stock Price ('+lastrefreshed+')'
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
	            tickInterval: 5,
	            min:min_p
	        },
	        {
	         title: {
	                text: 'Volume'
	            },
	            tickInterval: 80000000,
	            opposite: true
	        }],
	        legend: {
	            align: 'right',
	            verticalAlign: 'middle',
	            layout: 'vertical',
	        },
	        plotOptions: {
	            series : {
	               stacking: 'normal'
	            },
	            area: {
	                marker: {
	                    radius: 1
	                },
	                lineWidth: 2,
	                states: {
	                    hover: {
	                        lineWidth: 1
	                    }
	                },
	                threshold: null
	            }
	        },

	        series: [{
	            type: 'area',
	            name: value,
	            data: ints,
	            color:'#ff471a',
	            fillColor: {
	            linearGradient: [0, 0, 0, 3],
	             stops: [
	                        [0, '#ff6666'],
	                        [1, '#ff6666']
	                    ]
	        }
	        },{
	         type: 'column',
	            name:value+' Volume',
	            yAxis: 1,
	            data: vols,
	            color:'#ffffff',
	            fillColor: {
	            linearGradient: [0, 0, 0, 1],
	            stops: [
	                [0, '#ffffff'],
	                [1, '#ffffff']
	            ]
	         }
	        }]
	    });
	}
	function macdgraph(value){
		var url = 'https://www.alphavantage.co/query?function=macd&symbol='+value+'&interval=daily&time_period=10&series_type=close&apikey=T9B64Y0EZDLS1SKT&outputsize=full';
		var getJSON = function(url, callback) {
		    var xhr = new XMLHttpRequest();
		    xhr.open('GET', url, true);
		    xhr.responseType = 'json';
		    xhr.onload = function() {
		      var status = xhr.status;
		      if (status === 200) {
		        callback(null, xhr.response);
		      } else {
		        callback(status, xhr.response);
		      }
	    	};
	    	xhr.send();
		};
		getJSON(url,function(err, json_obj) {
		  if (err !== null) {
		    alert('Something went wrong: ' + err);
		  } else {
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
		        legend: {
		            align: 'right',
		            verticalAlign: 'middle',
		            layout: 'vertical',
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
		});
	}
	function bbandsgraph(value){
		var url = 'https://www.alphavantage.co/query?function=BBANDS&symbol='+value+'&interval=daily&time_period=5&series_type=close&nbdevup=3&nbdevdn=3&apikey=T9B64Y0EZDLS1SKT&outputsize=full';
		var getJSON = function(url, callback) {
		    var xhr = new XMLHttpRequest();
		    xhr.open('GET', url, true);
		    xhr.responseType = 'json';
		    xhr.onload = function() {
		      var status = xhr.status;
		      if (status === 200) {
		        callback(null, xhr.response);
		      } else {
		        callback(status, xhr.response);
		      }
	    	};
	    	xhr.send();
		};
		getJSON(url,function(err, json_obj) {
		  if (err !== null) {
		    alert('Something went wrong: ' + err);
		  } else {
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
		        legend: {
		            align: 'right',
		            verticalAlign: 'middle',
		            layout: 'vertical',
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
		});
	}
	function onelinegraphs(value,api_indicator,indicator,tickinterval){
		var url = 'https://www.alphavantage.co/query?function='+api_indicator+'&symbol='+value+'&interval=daily&time_period=10&series_type=close&apikey=T9B64Y0EZDLS1SKT&outputsize=full';
		var getJSON = function(url, callback) {
		    var xhr = new XMLHttpRequest();
		    xhr.open('GET', url, true);
		    xhr.responseType = 'json';
		    xhr.onload = function() {
		      var status = xhr.status;
		      if (status === 200) {
		        callback(null, xhr.response);
		      } else {
		        callback(status, xhr.response);
		      }
	    	};
	    	xhr.send();
		};
		getJSON(url,function(err, json_obj) {
		  if (err !== null) {
		    alert('Something went wrong: ' + err);
		  } else {
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
		        legend: {
		            align: 'right',
		            verticalAlign: 'middle',
		            layout: 'vertical',
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
		});
	}
	function twolinegraphs(value,api_indicator,indicator){
		var url = 'https://www.alphavantage.co/query?function='+api_indicator+'&symbol='+value+'&interval=daily&time_period=10&slowkmatype=1&slowdmatype=1&series_type=close&apikey=T9B64Y0EZDLS1SKT&outputsize=full';
		var getJSON = function(url, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'json';
			xhr.onload = function() {
				var status = xhr.status;
				if (status === 200) {
				callback(null, xhr.response);
				} else {
				callback(status, xhr.response);
				}
			};
			xhr.send();
		};
		getJSON(url,function(err, json_obj) {
		  if (err !== null) {
		    alert('Something went wrong: ' + err);
		  } else {
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
		        legend: {
		            align: 'right',
		            verticalAlign: 'middle',
		            layout: 'vertical',
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
		});
	}
	function loadnews(titles,links,dates){
		var html = "";
		html+="<table id='newss'>";
		for (i=0;i<5;i++){
			html+="<tr>";
			html+="<td><a href='"+links[i]+"' target='_blank'>"+titles[i]+"</a>&nbsp;&nbsp;Publicated Time: "+dates[i].substring(0,26)+"</td>"
			html+="</tr>";
		}
		html+="</table>"
		document.write(html);
	}
	function show(){
		var x = document.getElementById("news");
		if (x.style.display === "none") {
			x.style.display = "block";
		} 
		var y = document.getElementById("first");
		if (y.style.display ==="block"){
			y.style.display = "none";
		}
		var z = document.getElementById("second");
		if (z.style.display ==="none"){
			z.style.display = "block";
		}
	}
	function hide(){
		var x = document.getElementById("news");
		if (x.style.display === "block") {
			x.style.display = "none";
		} 
		var y = document.getElementById("first");
		if (y.style.display ==="none"){
			y.style.display = "block";
		}
		var z = document.getElementById("second");
		if (z.style.display ==="block"){
			z.style.display = "none";
	    	}
	}
 </script>
<center><body>
	<div id="container">
		<form method="post">
			<h2>Stock Search</h2>
			<hr>
			Enter the Stock Ticker Symbol*: <input type="text" name="symbol" style="margin-bottom: 8px;" id="s1" value=""<br>
			<input class="btns" type = "submit" name="Search" value="Search" style="margin-left: 109px;">
			<input class="btns" type = "reset" name="Clear" value="Clear" id="del" style="padding:3px 17px;">
			<p>* - Mandatory</p>
		</form>
	</div>
	<div id="content">
		<script type="text/javascript">
			<?php
			$name = isset($_POST['symbol']) ? $_POST['symbol'] : '';
			?>	
			var elem = document.getElementById("s1");
			var clearval=<?php echo json_encode($name); ?>;
			elem.value = clearval;
			document.getElementById("del").addEventListener("click",function(){
				document.getElementById("content").innerHTML="";
			});
		</script>
		<?php
			date_default_timezone_set('America/New_York');
			if (isset($_POST["symbol"])){
			 	$value = $_POST["symbol"]; 
			 	if ($value == ""){
			 		echo '<script language="javascript">';
					echo 'alert("Please enter a value")';
					echo '</script>';
			 	}
			 	else{
					$json = file_get_contents('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='.$value.'&apikey=T9B64Y0EZDLS1SKT&outputsize=full');
					$obj = json_decode($json,true);
					if($obj){
						echo '<div id = "table">';
						echo '<table border ="1px" id="infoTable">';
						if (sizeof($obj)==1){
							echo '<tr>';
							echo '<td class="header">'.'Error'.'</td>';
							echo '<td>' . 'Error.NO record has been found,please enter a valid symbol' . '</td>';
							echo '</tr>';
						}
						else{
							$header = $obj["Meta Data"];
							$timestamp = $header["3. Last Refreshed"];
							$Timeseriesvalues = $obj["Time Series (Daily)"];
							$timekeys = array_keys($Timeseriesvalues);
							$lastsession = $Timeseriesvalues[$timekeys[0]];
							$previoussession = $Timeseriesvalues[$timekeys[1]];
							$change = $lastsession["4. close"]-$previoussession["4. close"];
							$changepercent = ($change/$lastsession["4. close"])*100;
							echo '<tr>';
							echo '<td class="header">'.'Stock Ticker Symbol'.'</td>';
							echo '<td class="results">'.$header["2. Symbol"].'</td>';
							echo '</tr>';
							echo '<tr>';
							echo '<td class="header">'.'Close'.'</td>';
							echo '<td class="results">'.$lastsession["4. close"].'</td>';
							echo '</tr>';
							echo '<tr>';
							echo '<td class="header">'.'Open'.'</td>';
							echo '<td class="results">'.$lastsession["1. open"].'</td>';
							echo '</tr>';
							echo '<tr>';
							echo '<td class="header">'.'Previous Close'.'</td>';
							echo '<td class="results">'.$previoussession["4. close"].'</td>';
							echo '</tr>';
							echo '<tr>';
							echo '<td class="header">'.'Change'.'</td>';
							if ($change>0){
								echo '<td class="results">'.round($change,2).'<img src="Green_Arrow_Up.png" style="width:10px;margin-left:10px;"></td>';
							}else{
								echo '<td class="results">'.round($change,2).'<img style="width:10px;margin-left:10px;" src="Red_Arrow_Down.png"></td>';
							}
							echo '</tr>';
							echo '<tr>';
							echo '<td class="header">'.'Change Percent'.'</td>';
							if ($changepercent>0){
								echo '<td class="results">'.round($changepercent,2).'<img style="width:10px;margin-left:10px;" src="Green_Arrow_Up.png"></td>';
							}else{
								echo '<td class="results">'.round($changepercent,2).'<img style="width:10px;margin-left:10px;" src="Red_Arrow_Down.png"></td>';
							}
							echo '</tr>';
							echo '<tr>';
							echo '<td class="header">'.'Day\'s Range'.'</td>';
							echo '<td class="results">'.$lastsession["3. low"].'-'.$lastsession["2. high"].'</td>';
							echo '</tr>';
							echo '<tr>';
							echo '<td class="header">'.'Volume'.'</td>';
							echo '<td class="results">'.$lastsession["5. volume"].'</td>';
							echo '</tr>';
							echo '<tr>';
							echo '<td class="header">'.'Timestamp'.'</td>';
							echo '<td class="results">'.$header["3. Last Refreshed"].'</td>';
							echo '</tr>';
							echo '<tr>';
							echo '<td class="header">'.'Indicators'.'</td>';
							echo '<td class="results">'.'<p><a href="javascript:void(0);" id="price">Price</a>&nbsp;<a href="javascript:void(0);" id="sma">SMA</a>&nbsp;<a href="javascript:void(0);" id="ema">EMA</a>&nbsp;<a href="javascript:void(0);" id="stoch">STOCH</a>&nbsp;<a href="javascript:void(0);" id="rsi">RSI</a>&nbsp;<a href="javascript:void(0);" id="adx">ADX</a>&nbsp;<a href="javascript:void(0);" id="cci">CCI</a>&nbsp;<a href="javascript:void(0);" id="bbands">BBANDS</a>&nbsp;<a href="javascript:void(0);" id="macd">MACD</a>'.'</td>';
							echo '</tr>';
							echo '</table></div>';
							$price = array();
							$dates = array();
							$vol = array();
							for ($x = 0; $x < 120; $x++) {
								$lastsession = $Timeseriesvalues[$timekeys[$x]];
								array_push($price,$lastsession["4. close"]);
								array_push($vol,$lastsession["5. volume"]);
							} 
							$n = sizeof($timekeys);
							for ($i = 0; $i < 120; $i++){
								$each =  $timekeys[$i];
								$m = sizeof($each);
								for ($j=0;$j<$m;$j++){
									$month = substr($each,5,2);
									$day = substr($each,8,2);
									$formatted = $month.'/'.$day;
									array_push($dates,$formatted);
								}
							}
							$y_price = json_encode($price);
							$x_dates = json_encode($dates);
							$y_volume = json_encode($vol);
							echo '<div id = "graph">';
							echo '<script type="text/javascript">loadgraph(' . $y_price . ','.$y_volume.','.$x_dates.',\''.$value.'\',\''.$timestamp.'\');';
							$sma ='sma';
							$SMA ='SMA';
							$ema = 'ema';
							$EMA = 'EMA';
							$stoch = 'stoch';
							$STOCH = 'STOCH';
							$rsi = 'rsi';
							$RSI = 'RSI';
							$adx = 'adx';
							$ADX = 'ADX';
							$cci = 'cci';
							$CCI = 'CCI';
							$tick2 = 10;
							$tick1 = 2.5;
							$tick3 = 100;
							$tick4 = 5;
							echo 'document.getElementById("price").addEventListener("click", function(){loadgraph(' . $y_price . ','.$y_volume.','.$x_dates.',\''.$value.'\',\''.$timestamp.'\');});';
							echo 'document.getElementById("sma").addEventListener("click", function(){onelinegraphs(\''.$value.'\',\''.$sma.'\',\''.$SMA.'\',\''.$tick1.'\');});';
							echo 'document.getElementById("ema").addEventListener("click", function(){onelinegraphs(\''.$value.'\',\''.$ema.'\',\''.$EMA.'\',\''.$tick1.'\');});';
							echo 'document.getElementById("stoch").addEventListener("click", function(){twolinegraphs(\''.$value.'\',\''.$stoch.'\',\''.$STOCH.'\');});';
							echo 'document.getElementById("rsi").addEventListener("click", function(){onelinegraphs(\''.$value.'\',\''.$rsi.'\',\''.$RSI.'\',\''.$tick2.'\');});';
							echo 'document.getElementById("adx").addEventListener("click", function(){onelinegraphs(\''.$value.'\',\''.$adx.'\',\''.$ADX.'\',\''.$tick4.'\');});';
							echo 'document.getElementById("cci").addEventListener("click", function(){onelinegraphs(\''.$value.'\',\''.$cci.'\',\''.$CCI.'\',\''.$tick3.'\');});';
							echo 'document.getElementById("bbands").addEventListener("click", function(){bbandsgraph(\''.$value.'\');});';
							echo 'document.getElementById("macd").addEventListener("click", function(){macdgraph(\''.$value.'\');});';
							echo '</script>';
							echo '</div>';	
							$url = 'https://seekingalpha.com/api/sa/combined/'.$value.'.xml';
							$xml = simplexml_load_file($url);
							if($xml){
								$item=$xml->channel->item;
								$flag = 0;
								$titles = array();
								$links = array();
								$dates = array();
								foreach ($item as $node){ 
									$title = (string) $node->title;
									$link = (string)$node->link;
									$date = (string)$node->pubDate;
									if ($link == 'https://seekingalpha.com/symbol/AAPL/news?source=feed_symbol_AAPL' or $link == 'https://seekingalpha.com'){
										continue;
									}
									else{
										$flag+=1;
										if ($flag > 5){
											break;
										}
										else{
											array_push($titles,$title);
											array_push($links,$link);
											array_push($dates,$date);
										}
									}
								}
								$news_titles = json_encode($titles);
								$news_dates = json_encode($dates);
								$news_links= json_encode($links,JSON_UNESCAPED_SLASHES);
								echo '<span id="first" onclick="show()" style="display:block">';
								echo '<p class = "toggletext">Click to show stock news</p>';
								echo '<img class="greyarrow" src="Gray_Arrow_Down.png">';
								echo '</span>';
								echo '<span id="second" onclick="hide()"style="display:none;">';
								echo '<p class = "toggletext">Click to hide stock news</p>';
								echo '<img class="greyarrow" src="Gray_Arrow_Up.png">';
								echo '</span>';
								echo '<div id="news" style="display:none">';
								echo '<script type="text/javascript">loadnews('.$news_titles.','.$news_links.','.$news_dates.');</script>';
								echo '</div>';	
							}		
						}
					} 
				} 
			}	
		?>
	</div>
</body></center>
</html>
