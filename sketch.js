var dog,dogImg,dogImgHappy;
var database;
var foodStock;
var fedTime, lastFed
var feedPet, addFood;
var foodObj


function preload(){
   dogImg=loadImage("dogImg.png");
   dogImgHappy=loadImage("dogImg1.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(500,500);
  dog=createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale=0.1;
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  feedPet=createButton("feed the dog")
feedPet.position(700,95);
feedPet.mousePressed(feedDog);
addFood= createButton("add food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog.addImage(dogImgHappy);
  }
fedTime = database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed =  data.val()
})
drawSprites()
  fill("white")
  stroke("black")
textSize(15)
  text("food remaining : "+  foodStock,170,200);
  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("last feed:"+lastFed%12+"PM",350,50);
    
     if(lastFed===0){
      text("last feed :12 AM",350,50);

    }
    else{
      text("last feed:"+lastFed+"AM",350,30);
    }
  
  
}


function readStock(data){
  foodStock=data.val();
}


function writeStock(x){
  
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
  
}


function feedDog(){
  dog.addImage(dogImgHappy);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update
  {
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  }
}