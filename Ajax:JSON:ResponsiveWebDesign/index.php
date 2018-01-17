<?php


function autocomplete($search){
	$json = file_get_contents('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input='.$search.'');
	return $json;	
}	

function getQuote($value){
	$json = file_get_contents('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='.$value.'&apikey=&outputsize=full');
	return $json;
}
function getGraph($value,$api_indicator){
	$json = file_get_contents('https://www.alphavantage.co/query?function='.$api_indicator.'&symbol='.$value.'&interval=daily&time_period=10&series_type=close&apikey=&outputsize=full');
	return $json;

}
function getNews($value){
	$xml = simplexml_load_file('https://seekingalpha.com/api/sa/combined/'.$value.'.xml');
	$item=$xml->channel->item;
	$flag = 0;
	$titles = array();
	$links = array();
	$dates = array();
	$authors = array();
	foreach ($item as $node){ 
		$title = (string) $node->title;
		$link = (string)$node->link;
		$date = (string)$node->pubDate;
		$sub = $node->children('sa', true);
		$author = (string)$sub->author_name;
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
				array_push($authors,$author);
			}
		}
	}
	$news = [$titles,$links,$dates,$authors];
	$json = json_encode($news);
	return $json;
}

$search = $_GET['searchText'];

if ($search) {
   	echo autocomplete($search);
}

$value = $_GET['searchsymbol'];
if($value){
	echo getQuote($value);
}

$graphvalue = $_GET['value'];
$api_indicator = $_GET['la']; 
if(($graphvalue) & ($api_indicator)){
	echo getGraph($graphvalue,$api_indicator);
}

$news_value = $_GET['newsvalue'];
if($news_value){
	echo getNews($news_value);
}

?>