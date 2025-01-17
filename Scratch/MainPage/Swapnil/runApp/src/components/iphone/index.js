// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
import titleStyle from '../title/titleStyle';
import buttonStyle from '../recButton/buttonStyle';
import clothesTitleStyle from '../clothesTitle/clothesTitleStyle';
import clothesInfoStyle from '../clothesInfo/clothesInfoStyle';
import style_map_iphone from '../button2/style_map_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
// import the Title component
import Title from '../title';
//import the Button2 component
import Button2 from '../button2';
//import the Gym/Park title
import GymPark_Button from '../recButton';
//import the clothes Title component
import Clothes_Title from '../clothesTitle';
//import the clothes Info component
import Clothes_Info from '../clothesInfo';

export default class Iphone extends Component {
	constructor(props){
		super(props);
        this.state.showRecs = true;
	}
    
    //Getting the full data from the api(7Days)
   fetchCurrentWeatherData = () =>
	{
		var url = "http://api.apixu.com/v1/forecast.json?key=98f84e1e0ddc449f8c7223104170703&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseCurrentWeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		this.setState({
			showRecs: false
		});
	}
    //Passing the current data from the json Format
	parseCurrentWeatherDataResponse = (parsed_json) =>
	{
		var today = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay()];
		var conditionText = parsed_json['current']['condition']['text'];
        var showClothesInfo="";
        var gymParkTitle="";
        var parkName = "";
        var clothesTitle="Whats recommended?";
        var cText = conditionText.toLowerCase();
		var displayRecommendation = "";
        
		if((cText.includes("sun"))|(cText.includes("clear"))|(cText.includes("shin"))|(cText.includes("dry")))
		{
			showClothesInfo="Its a great day, so wear something lightweight and dont forget your water bottle!";
            gymParkTitle="Park";    
		}
		else if((cText.includes("rain"))|(cText.includes("drizzle"))|(cText.includes("storm"))|(cText.includes("wet"))|(cText.includes("shower")))
		{
			showClothesInfo="Rainy: Its not so great outside. I would recommend wearing something that will keep you warm.";
            gymParkTitle="Gym";
            
   
		}
		else if((cText.includes("snow")))
		{
			showClothesInfo="Snow: Not a great day to run, best thing is to go to the Gym.";
            gymParkTitle="Gym";
		}
		else
		{
            showClothesInfo="Cloudy: Its a okay day a little cloudy but should be fine to run, so wear something warm and dont forget your water bottle!";
            gymParkTitle="Park";   
		}
    
        

		this.setState({
            displayConditionText: conditionText,
            showclothesInfo: showClothesInfo,
            showGymParkTitle: gymParkTitle,
            showClothesTitle: clothesTitle,
		})
	}
	// Render
	render() {
        var userMessage;
        if(this.state.showGymParkTitle == "Gym"){
            userMessage = 
            <div class={style.backgroundGym}>
                    <h2>{this.state.showGymParkTitle}</h2>
                     <div class={style.gymLogo}>
                       <img src={'../../assets/design/gymLogo.png'} height={300}/>
                      </div>
                       
                           <center><h4>Address: 15 Godward Square, London E1 4FZ</h4>
                                <h4>Hours: Wednesday	7am–10:30pm,Thursday	7am–10:30pm,Friday	7am–9pm, Saturday	10am–6pm,Sunday	10am–6pm,Monday	7am–10:30pm,Tuesday	7am–10:30pm</h4>
                                <h4> Phone: 020 7882 8040  </h4>
                               </center>
                               
                    
                    <div>
                        <h2>{this.state.showClothes}</h2>
                        <h3>{this.state.showClothesInfo}</h3>
                    </div>
                <div class= { style_iphone.container }>
                        <Button/>
                        <Button2/>
                </div>
            
            </div>
        }
        if(this.state.showGymParkTitle == "Park"){
            userMessage = 
            <div class={style.backgroundPark}>
                    <h2>{this.state.showGymParkTitle}</h2>
                     <div class={ style.gymLogo }>
                       <img src={'../../assets/design/ParkLogo.png'} height={300}/>
                      </div>
                       
                           <center><h3>Address: London W2 2UH </h3>
                           <h4>  Hours: 
                                    Wednesday	5am–12am
                                    Thursday	5am–12am
                                    Friday	5am–12am
                                    Saturday	5am–12am
                                    Sunday	5am–12am
                                    Monday	5am–12am
                                    Tuesday	5am–12am
                                    </h4><h4>Phone: 0300 061 2000</h4>
                               </center>
                               
                    
                    <div>
                        <h2>{this.state.showClothesTitle}</h2>
                        <h3>{this.state.showclothesInfo}</h3>
                    </div>
                <div class= { style_iphone.container }>
                        <Button/>
                        <Button2/>
                </div>
            
            </div>
            }
        
		return (
			<div class={style.container}>
                <div class={buttonStyle.container}>
                        { this.state.showRecs ? <GymPark_Button class={buttonStyle.recButton}  clickFunction={  this.fetchCurrentWeatherData }/ > : null }
                 
                </div>
            <div>
                    {userMessage}
                </div>
                
			</div> 
		);
	}
}
    
var lat;
var lon;
var latitudeLongitude;
var options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};
navigator.geolocation.watchPosition(success, error, options);
function success(pos) {

	lat = pos.coords.latitude;
	lon = pos.coords.longitude;
	latitudeLongitude = lat + "," + lon;
	//latitudeLongitude = pos.coords.latitude + "," + pos.coords.longitude;
};
function error(err)
{
	console.warn(`ERROR(${err.code}): ${err.message}`);
};


function createImage(src)
{
	var img = new Image();
	img.src = src;
	return img;
}