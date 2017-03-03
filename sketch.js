//  Original Code by Jaap de Maat & Sion Fletcher - CSM GCD BA Y1 Unit 3 - Jan 2017
//  reference: http://www.lyceelecorbusier.eu/p5js/?p=2591
//  edited by Tze Ki Woo(Kiki) - Feb2017
// Yahoo Weather API/ ellipse ver development : add text



var formResolution = 15;
var stepSize = 2;
var distortionFactor = 1;
var initRadius = 150;
var centerX, centerY;
var x = [];
var y = [];

var filled = false;
var freeze = false;
var mode = 0;


function setup() {
  //set Canvas to size of window
  createCanvas(600, 600);
  smooth();
  

  centerX = 600/2; 
  centerY = 600/2;
  var angle = radians(360/float(formResolution));
  for (var i=0; i<formResolution; i++){
    x[i] = cos(angle*i) * initRadius;
    y[i] = sin(angle*i) * initRadius;  
  }

  stroke(0, 50);
  


//Intoduction Page
  background(232,149,35);
    
    
  //create Button object 1 (Hong Kong)
  button1 = createButton('Hong Kong');
  button1.position(100, 20);
  //Load Data when Button 1 is Pressed
  button1.mousePressed(function() {
  loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22kowloon%2C%20Hong%20Kong%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  weatherLoaded);
  });

  //create Button object 2 (Toronto, Canada)
  button2 = createButton('Toronto');
  button2.position(195, 20);
  //Load Data when Button 2 is Pressed
  button2.mousePressed(function() {
  loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22toronto%2C%20Canada%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  weatherLoaded);
  });
  
  //create Button object 3 (Los Angeles, CA, US)
  button3 = createButton('Los Angeles');
  button3.position(270, 20);
  //Load Data when Button 3 is Pressed
  button3.mousePressed(function() {
  loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22los%20angeles%2C%20USA%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  weatherLoaded);
  });
  
  //create Button object 4 (Osaka, Japan)
  button4 = createButton('Osaka');
  button4.position(370, 20);
  //Load Data when Button 4 is Pressed
  button4.mousePressed(function() {
  loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22osaka%2C%20Japan%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  weatherLoaded);
  });
  
  //create Button object 5 (Seoul, Korea)
  button5 = createButton('Seoul');
  button5.position(445, 20);
  //Load Data when Button 5 is Pressed
  button5.mousePressed(function() {
  loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22seoul%2C%20korea%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  weatherLoaded);
  });
  
}
 
 function draw(){
  // floating towards mouse position
  if (mouseX != 0 || mouseY != 0) {
    centerX += (mouseX-centerX) * 0.01;
    centerY += (mouseY-centerY) * 0.01;
  }

  // calculate new points
  for (var i=0; i<formResolution; i++){
    x[i] += random(-stepSize,stepSize);
    y[i] += random(-stepSize,stepSize);
  // ellipse(x[i], y[i], 5, 5);
  }

  strokeWeight(0.75);
  if (filled) fill(random(255));
  else noFill();

  if (mode == 0) {
    beginShape();
    // start controlpoint
    curveVertex(x[formResolution-1]+centerX, y[formResolution-1]+centerY);

    // only these points are drawn
    for (var i=0; i<formResolution; i++){
      curveVertex(x[i]+centerX, y[i]+centerY);
    }
    curveVertex(x[0]+centerX, y[0]+centerY);

    // end controlpoint
    curveVertex(x[1]+centerX, y[1]+centerY);
    endShape();
   
   
   
   
    

    
  }
}

 function mousePressed() {
  // init forms on mouse position
  centerX = mouseX; 
  centerY = mouseY;

  // circle
  if (mode == 0) {
    centerX = mouseX;
    centerY = mouseY;
    var angle = radians(360/float(formResolution));
    var radius = initRadius * random(0.5,1.0);
    for (var i=0; i<formResolution; i++){
      x[i] = cos(angle*i) * radius;
      y[i] = sin(angle*i) * radius;
    }
  }
}






 function weatherLoaded(data) {
  var temp = data.query.results.channel.item.condition.temp;
  var windSpeed = data.query.results.channel.wind.speed;
  var windDirection = data.query.results.channel.wind.direction;
  
  //forcast data
  var tempD2H = data.query.results.channel.item.forecast[0].high;
  var tempD2L = data.query.results.channel.item.forecast[0].low;
  


//print data to the console
print(temp);
print(windSpeed);
print(tempD2H);
print(tempD2L);


  background(232,149,35);
  textFont("Times");
  textSize(14);
    fill(0);
    noStroke();
    m = month()
    d = day()
    y = year()
    text('Today is '+ d + ' / ' + m + ' / ' + y, 240, 575)
     
    textSize(20); 
    fill(255,241,0)
    text(windSpeed, 170, 550);
    fill(159,255,177);
    text(temp, 310, 550);
    fill(255);
    text(windDirection, 525, 550);

  //windSpeed data
  fill(255,241,0);
  noStroke();
  ellipse(600 / 2, 600 / 2, windSpeed * 10, windSpeed * 10);
  fill(255,241,0);
  text("Wind speed", 72, 550);
  
  //temp data
  noFill();
  strokeWeight(7);
  stroke(159,255,177);
  ellipse(300, 300, temp * 2, temp * 2);
  fill(159,255,177);
  noStroke();
  text("Temp", 260, 550);
  
  //windDirection
  fill(255);
  text("windDirection", 400, 550);
  translate(600 / 2, 600 / 2);
  fill(255);
  noStroke();
  angleMode(DEGREES);
  rotate(windDirection);
  triangle(30, 60, 50, 30, 60, 60);


}