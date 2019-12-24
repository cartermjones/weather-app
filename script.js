$(document).ready(function(){
	

	var latitude;
	var longitude;

	if (navigator.geolocation) { 
 	 navigator.geolocation.getCurrentPosition(showPosition);
	} else {
	}

	function showPosition(position){
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
		
		$.getJSON(api, function(data) {
			// Getting weather details
			$("#place").html(data.name + ", " + data.sys.country);
			$("#temp").html(Math.round(data.main.temp) + " &deg;C");
			$("#condition").html(data.weather[0].main);
			$("#wind").html(data.wind.speed + " KM/H");
			$("#humid").html(data.main.humidity + "%");
			switch(data.weather[0].main){
				case "Clouds": 
					$("body").css("animation-name", "clouds"); 
					$("i").addClass("fa");
					$("i").addClass("fa-cloud");
					break;
				case "Clear": 
					break;
				case "Thunderstorm":
					$("body").css("animation-name", "storm");
					$("body").css("animation-duration", ".5s")
					break;
				default : 
					break;
			}


			$("button").click(function(){		
				if($("button").html() === "Fahrenheit"){
					
						$("#temp").html((Math.round((data.main.temp) * (9/5) + 32)) + " &deg;F");
						$("button").html("Celsius");
				}

				else if ($("button").html() === "Celsius"){
						$("#temp").html(Math.round(data.main.temp) + " &deg;C");
						$("button").html("Fahrenheit");
					};
				}); 
			});
			}

	});