import {getRandomIntInclusive, neutron } from "./objects.js";

document.addEventListener("DOMContentLoaded", () => 
{
    startGame();
});


// Game Management
var debug = false;
var gameover = false;
var graphite = true;
var water = false;
var Coolant = false; // DEMO
var paused = false;
var drawLater = false;

// Game Vars
var Selling = false;
var AutomaticControlRods = true;
var RepairTurbine = false;
var RepairFuel = false;
var RepairControlRod = false;
var RepairPipes = false;


var pipesPower = 0;
var neutronflux = 0;
var setFlux = 400;
var maxNeutronsNumber = 10000;
var neutrons = [];
var squares = [];
var map = [];
var supermap = [];
var cellSize = 13;
//var neutronSize = ;
var cellDistance = 20;
var cellMarginTop = 100;
var cellMarginLeft = 400;
var cr = 'rgb('+
    Math.floor(Math.random()*256)+','+
    Math.floor(Math.random()*256)+','+
    Math.floor(Math.random()*256)+')';
var Height = 35; 
var Width = 32;
var NeutronSize = 5;
var MaxControlRodDepth = Height;
var ControlRodDepth = 0;
var ReactorHeat = 20;
var MaxReactorHeat = 0;
var EnergyOutput = 0;
var ControlRodPercent = 0;
var Explosion;
var ExploAlpha = 1;
var MapDesign = [];
var PipesHealth = 100;
var TurbineHealth = 100;
var ControlRodHealth = 100;
//var FuelHealth = 100;
var Money = 0;
var PriceRange = 1;
var Cooldown = 0;
var CooldownInterval = 0;
var RepairCostPipes = 5000;
var RepairCostFuel = 10000;
var RepairCostTurbine = 2000;
var RepairCostRods = 8000;
var clock = 0;
var ReactorSize = 2;
var quota = [2500,10000,20000,40000,100000,150000,200000,250000,300000,450000,500000];
var quotaLevel = 1;
var soldEnergy = 0;
var UpgradeCost = 1000;
var FissionEvents = 2;
var HeatResist = 1;
var UpgradePoints = 0;
var Income = 1;
var DamageResist = 1;
var FuelEffi = 1;
var PipesRepairSpeed = 0.1;
var TurbineRepairSpeed = 0.1;
var RodsRepairSpeed = 0.1;
var FuelRepairSpeed = 0.1;
var RepairCost = 1000;
var FuelColor = "rgba(0, 255, 0, 0.8)";
var RodsColor = "rgba(100, 100, 100, 1)";
var WaterColor = "rgba(50, 50, 255, 0.2)";
var ModeIterator = 0;
var TextColor = "black";
var NeutronColor = "black";
var TurbineEffi = 0;


var CurrentMixtureReactivity = 10;
var CurrentMixtureHealth = 100;

var mixture = [];
var mixtureName = [];
var mixtureCost = 0;
var mixtureReactivity = 0;
var mixtureHealth = 0;


const Elements = Object.freeze({
    URANIUM_233: 0,
    URANIUM_235: 1,
    URANIUM_238: 2,
    THORIUM_232: 3,
    PLUTONIUM_239: 4,
    NEPTUNIUM_238: 5,
    AMERICIUM_239: 6
});

const ElementsReactivitys = Object.freeze({
    URANIUM_233: 6,
    URANIUM_235: 40,
    URANIUM_238: 10,
    THORIUM_232: 16,
    PLUTONIUM_239: 80,
    NEPTUNIUM_238: 20,
    AMERICIUM_239: 60
});

const ElementsNames = Object.freeze({
    URANIUM_233: "Uranium-233",
    URANIUM_235: "Uranium-235",
    URANIUM_238: "Uranium-238",
    THORIUM_232: "Thorium-232",
    PLUTONIUM_239: "Plutonium-239",
    NEPTUNIUM_238: "Neptunium-238",
    AMERICIUM_239: "Americium-239"
});

const ElementsHealth = Object.freeze({
    URANIUM_233: 60,
    URANIUM_235: 140,
    URANIUM_238: 100,
    THORIUM_232: 200,
    PLUTONIUM_239: 130,
    NEPTUNIUM_238: 50,
    AMERICIUM_239: 70
});

const ElementsNeutronType = Object.freeze({
    URANIUM_233: "Extremly Fast",
    URANIUM_235: "Very Fast",
    URANIUM_238: "Normal",
    THORIUM_232: "Slow",
    PLUTONIUM_239: "Very Fast",
    NEPTUNIUM_238: "Extremly Fast",
    AMERICIUM_239: "Normal"
});

const ElementsCost = Object.freeze({
    URANIUM_233: 10000,
    URANIUM_235: 40000,
    URANIUM_238: 13000,
    THORIUM_232: 8000,
    PLUTONIUM_239: 80000,
    NEPTUNIUM_238: 25000,
    AMERICIUM_239: 40000
});

function mixtureClear()
{
    mixture = [];
    mixtureName = [];
    mixtureCost = 0;
}


function mixtureAdd(Element)
{
    switch(Element)
    {
    	case 0:
	    mixture.push(Element);
	    mixtureCost /= mixture.length;
	    mixtureCost *= mixture.length - 1;
	    mixtureCost += 30.5 / mixture.length;
	    break;
	case 1:
            mixture.push(Element);
            mixtureCost /= mixture.length;
            mixtureCost *= mixture.length - 1;
            mixtureCost += 50.5 / mixture.length;
            break;
	case 2:
            mixture.push(Element);
            mixtureCost /= mixture.length;
            mixtureCost *= mixture.length - 1;
            mixtureCost += 20.5 / mixture.length;
            break;
	case 3:
            mixture.push(Element);
            mixtureCost /= mixture.length;
            mixtureCost *= mixture.length - 1;
            mixtureCost += 20.5 / mixture.length;
            break;
	case 4:
            mixture.push(Element);
            mixtureCost /= mixture.length;
            mixtureCost *= mixture.length - 1;
            mixtureCost += 20.5 / mixture.length;
            break;
	case 5:
            mixture.push(Element);
            mixtureCost /= mixture.length;
            mixtureCost *= mixture.length - 1;
            mixtureCost += 20.5 / mixture.length;
            break;
	case 6:
            mixture.push(Element);
            mixtureCost /= mixture.length;
            mixtureCost *= mixture.length - 1;
            mixtureCost += 20.5 / mixture.length;
            break;
    }
}

function mixtureFinish()
{
    var preName = "";

    for(let i = 0; i < mixture.length; i++)
    {
    	
    }
}

function AddOnclickListeners()
{
    document.getElementById("b1").onclick = Sell;
    document.getElementById("b2").onclick = RepairT;
    document.getElementById("b3").onclick = RepairP;
    document.getElementById("b4").onclick = RepairF;
    document.getElementById("b5").onclick = RepairC;
    document.getElementById("b6").onclick = UpgradeHeight;
    document.getElementById("b7").onclick = UpgradeWidth;
    document.getElementById("b8").onclick = UpgradeButtonOn;
    document.getElementById("b9").onclick = MixtureButtonOn;
    document.getElementById("DarkMode").onclick = DarkMode;
}



function startGame() 
{
    colorGrid();
    MapDesign = ['W','C','W','W','W','W','W','F','F','F','W','W','W','W','W','C','W','W','W','W','W','F','F','F','W','W','W','W','W','C','W']; // X * 15 + 2 
        InitializeMap(Height,Width, water, graphite);
    myGameArea.start();
    AddOnclickListeners();
}


var myGameArea = {
    canvas : document.getElementById("canva"),
    start : function() {
	    this.canvas.width = window.innerWidth - 400;
        this.canvas.height = window.innerHeight - 100;
        cellMarginLeft = document.getElementById("canva").width / (4 * ReactorSize);
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);
	 window.addEventListener('keydown', function (e) {
            if (e.key === "ArrowDown" && Cooldown <= 0 && !RepairControlRod) {
		Cooldown = CooldownInterval;
                ControlRodDepth = Math.max(0, ControlRodDepth - 1);
            } else if (e.key === "ArrowUp" && Cooldown <= 0 && !RepairControlRod) {
		Cooldown = CooldownInterval;
                ControlRodDepth = Math.min(Height, ControlRodDepth + 1);
            }
	});
    window.addEventListener('resize', function() {
        document.getElementById("canva").width = window.innerWidth - 400;
        document.getElementById("canva").height = window.innerHeight - 100;
        cellMarginLeft = document.getElementById("canva").width / (4 * ReactorSize);
    });

    },
    updateSize : function()
    {
        
    },
    pause : function() {
        clearInterval(this.interval);
    },
    unpause : function() {
        this.interval = setInterval(updateGameArea, 20);
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function coolEffect(x,y,neu)
{
    //neutrons = [];
    for(let i = 0; i < 100; i++)
    {
        neutrons.push(new neutron(x, y, "shock"));
    }
    for(let i = 0; i < 50; i++)
    {
        neutrons.push(new neutron(x, y, "fire"));
    }

}


function checkCollision(particle,cellDistance, cellMarginTop, cellMarginLeft, map) {
    const particleX = particle.x - cellMarginLeft;
    const particleY = particle.y - cellMarginTop;

    // Determine the row and column the particle is in
    const row = Math.floor(particleY / cellDistance);
    const col = Math.floor(particleX / cellDistance);

    //context.fillRect(row, col, 10, 10);

    if (row >= 0 && row < map.length && col >= 0 && col < map[row].length) {
        // Check if the cell is a "1" (collidable square)
        if (map[row][col] === 0) {
            return { collided: true, row, col, value: supermap[row][col] }; // Include details about the square
        }
	if (map[row][col] === 1) {
            return { collided: true, row, col, value: supermap[row][col] }; // Include details about the square
        }
	if (map[row][col] === 2) {
            return { collided: true, row, col, value: supermap[row][col] }; // Include details about the square
        }
	if (map[row][col] === 3) {
            return { collided: true, row, col, value: supermap[row][col] }; // Include details about the square
        }
        if (map[row][col] === 6) {
	    return { collided: true, row, col, value: supermap[row][col] }; // Include details about the square
        }
        if (map[row][col] === 7) {
	    return { collided: true, row, col, value: supermap[row][col] }; // Include details about the square
        }
	if (map[row][col] === 9) {
	    return { collided: true, row, col, value: supermap[row][col] }; // Include details about the square
	}
    }

    return false; // No collision
}

function colorGrid()
{
    if(quotaLevel >= 1)
    {
    	document.getElementById("grid0").style.backgroundColor = "rgba(0,255,0,1)";
    }
    else
    {
        document.getElementById("grid0").style.backgroundColor = "rgba(255,0,0,1)";
    }

    if(quotaLevel >= 2)
    {
        document.getElementById("grid1").style.backgroundColor = "rgba(0,255,0,1)";
    }
    else
    {
        document.getElementById("grid1").style.backgroundColor = "rgba(255,0,0,1)";
    }

    if(quotaLevel >= 3)
    {
        document.getElementById("grid2").style.backgroundColor = "rgba(0,255,0,1)";
    }
    else
    {
        document.getElementById("grid2").style.backgroundColor = "rgba(255,0,0,1)";
    }

    if(quotaLevel >= 4)
    {
        document.getElementById("grid3").style.backgroundColor = "rgba(0,255,0,1)";
    }
    else
    {
        document.getElementById("grid3").style.backgroundColor = "rgba(255,0,0,1)";
    }

    if(quotaLevel >= 5)
    {
        document.getElementById("grid4").style.backgroundColor = "rgba(0,255,0,1)";
    }
    else
    {
        document.getElementById("grid4").style.backgroundColor = "rgba(255,0,0,1)";
    }

    if(quotaLevel >= 6)
    {
        document.getElementById("grid5").style.backgroundColor = "rgba(0,255,0,1)";
    }
    else
    {
        document.getElementById("grid5").style.backgroundColor = "rgba(255,0,0,1)";
    }

    if(quotaLevel >= 7)
    {
        document.getElementById("grid6").style.backgroundColor = "rgba(0,255,0,1)";
    }
    else
    {
        document.getElementById("grid6").style.backgroundColor = "rgba(255,0,0,1)";
    }

    if(quotaLevel >= 8)
    {
        document.getElementById("grid7").style.backgroundColor = "rgba(0,255,0,1)";
    }
    else
    {
        document.getElementById("grid7").style.backgroundColor = "rgba(255,0,0,1)";
    }

    if(quotaLevel >= 9)
    {
        document.getElementById("grid8").style.backgroundColor = "rgba(0,255,0,1)";
    }
    else
    {
        document.getElementById("grid8").style.backgroundColor = "rgba(255,0,0,1)";
    }
}



       
function updatePrices()
{
    document.getElementById("PRange").textContent = (Math.round(PriceRange * 100) / 100) + "x";
    document.getElementById("TCost").textContent = (RepairCostTurbine) + "€" ;
    document.getElementById("FCost").textContent = (RepairCostFuel) + "€";
    document.getElementById("CCost").textContent = (RepairCostRods) + "€";
    document.getElementById("PCost").textContent = (RepairCostPipes) + "€";
    document.getElementById("HCost").textContent = (RepairCost * (10 + (Height - 35))) + "€";
    document.getElementById("WCost").textContent = ((RepairCost * 5 * ReactorSize) * ReactorSize) + "€";

}


function AssignRepairColors()
{
    let TurbineColor = 'rgb('+
                Math.floor(255 - TurbineHealth)+','+
                Math.floor(TurbineHealth * 2.5)+','+
                Math.floor(0)+')';

    if(TurbineHealth <= 10)
    {
 	if(clock % 50 >= 25)
	{
		document.getElementById("b2").style.backgroundColor = TurbineColor
	}
	else
	{
		document.getElementById("b2").style.backgroundColor = 'rgb(255,255,255)';
	}
    }
    else
    {
    	document.getElementById("b2").style.backgroundColor = TurbineColor
    }

    let PipesColor = 'rgb('+
                Math.floor(255 - PipesHealth)+','+
                Math.floor(PipesHealth * 2.5)+','+
                Math.floor(0)+')';

    if(PipesHealth <= 10)
    {
        if(clock % 50 >= 25)
        {
                document.getElementById("b3").style.backgroundColor = PipesColor;
        }
        else
        {
                document.getElementById("b3").style.backgroundColor = 'rgb(255,255,255)';
        }
    }
    else
    {
        document.getElementById("b3").style.backgroundColor = PipesColor
    }

    let FuelColor = 'rgb('+
                Math.floor(255 - CurrentMixtureHealth)+','+
                Math.floor(CurrentMixtureHealth * 2.5)+','+
                Math.floor(0)+')';


    if(CurrentMixtureHealth <= 10)
    {
        if(clock % 50 >= 25)
        {
                document.getElementById("b4").style.backgroundColor = FuelColor;
        }
        else
        {
                document.getElementById("b4").style.backgroundColor = 'rgb(255,255,255)';
        }
    }
    else
    {
        document.getElementById("b4").style.backgroundColor = FuelColor;
    }


    let ControlRodColor = 'rgb('+
                Math.floor(255 - ControlRodHealth)+','+
                Math.floor(ControlRodHealth * 2.5)+','+
                Math.floor(0)+')';


    if(ControlRodHealth <= 10)
    {
        if(clock % 50 >= 25)
        {
                document.getElementById("b5").style.backgroundColor = ControlRodColor;
        }
        else
        {
                document.getElementById("b5").style.backgroundColor = 'rgb(255,255,255)';
        }
    }
    else
    {
        document.getElementById("b5").style.backgroundColor = ControlRodColor;
    }
}

function WriteDebugText()
{
	if(ReactorHeat >= MaxReactorHeat / 2)
	{
	    ctx.fillStyle = "orange";
	    if(ReactorHeat >= MaxReactorHeat / 1.3)
	    {
	        ctx.fillStyle = "red";
	    }
	}
    
    ctx.fillText("Reactor Heat: " + ReactorHeat + "°C", 50, 15);
    ctx.fillStyle = TextColor;
    ctx.fillText("Control Rods: " + Math.round(Math.abs((ControlRodDepth / Height) * 100 - 100)) + "%", 50, 45);
    

    
    ctx.fillStyle = TextColor;
    ctx.fillStyle = TurbineColor;
    ctx.fillText("Turbine: " + Math.round(TurbineHealth * 10) / 10  + " %", 480, 15);
    ctx.fillStyle = PipesColor;
    ctx.fillText("Pipes: " + Math.round(PipesHealth * 10) / 10 + " %", 480, 45);
    ctx.fillStyle = ControlRodColor;
    ctx.fillText("ControlRods: " + Math.round(ControlRodHealth * 10) / 10 + " %", 630, 15);
    ctx.fillStyle = FuelColor;
    ctx.fillText("Fuel: " + Math.round(CurrentMixtureHealth * 10) / 10 + " %", 650, 45);
    ctx.fillStyle = TextColor;
    ctx.fillText("SoldEnergy: " + Math.round(soldEnergy) + " KWH", 800, 15);
    ctx.fillText("Neutron Flux: " + neutrons.length, 800, 75);
}

function updateGameArea() {
    myGameArea.clear();
    
    
    if(gameover)
    {
        if(clock % 120 < 60)
        {
            myGameArea.canvas.style.backgroundColor = 'rgb(' + Math.floor(80 * (clock % 60) / 20) + ',' + Math.floor(15 * (clock % 60) / 20)+ ',' + Math.floor(15 * (clock % 60) / 20) + ')';
        }
        else
        {
            myGameArea.canvas.style.backgroundColor = 'rgb(' + Math.floor((80 * (clock % 120) / 10) / (clock % 60)) + ',' + Math.floor((15 * (clock % 120) / 10)/ (clock % 60))+ ',' + Math.floor((15 * (clock % 120) / 10) / (clock % 60)) + ')';
        }
    }
    else
    {
        myGameArea.canvas.style.backgroundColor = 'rgb(' + Math.floor(200 + (255 * (ReactorHeat / MaxReactorHeat)) / 20) + ',' + Math.floor(200 - (100 * (ReactorHeat / MaxReactorHeat))) + ',' + Math.floor(200 - (100 * (ReactorHeat / MaxReactorHeat))) +')';
    }
    

    if(paused)
    {
    	myGameArea.pause();
    }
    

    AssignRepairColors();



    Cooldown -= 0.02;
    neutronflux = neutrons.length

    if(document.getElementById("flux").valueAsNumber == NaN)
    {
    	setFlux = 0;
    }
    else
    {
	    setFlux = document.getElementById("flux").valueAsNumber;
    }

    pipesPower = document.getElementById("effi").valueAsNumber / 25;

    CooldownInterval = Math.abs(ControlRodHealth - 100) / 500;
    if(ControlRodHealth <= 0)
    {
        CooldownInterval = 10000000;
    }
    //Let Time pass				
    clock++;
    if(clock == 6000)
    {
	clock = 0;
        if(soldEnergy < quota[quotaLevel])
	{
	    if(quotaLevel > 0)
	    {
	        quotaLevel--;
		soldEnergy = 0;
	    }
	    PriceRange -= 0.75;	    
	}
	else
	{
	    if(quotaLevel < quota.length - 1)
	    {
	        quotaLevel++;
		UpgradePoints += quotaLevel;
		soldEnergy = 0;
	    }
	    PriceRange += 0.75;
	}

	colorGrid();
    }

    updatePrices();


    if(AutomaticControlRods)
    {
	    if (neutronflux > setFlux && Cooldown <= 0 && !RepairControlRod) {
                Cooldown = CooldownInterval + 1 - ((neutronflux / setFlux) * 0.4);
                ControlRodDepth = Math.max(12, ControlRodDepth - 1);
            } else if (neutronflux < setFlux && Cooldown <= 0 && !RepairControlRod) {
                Cooldown = CooldownInterval + 1 - ((neutronflux / setFlux) * 0.2);
                ControlRodDepth = Math.min(Height, ControlRodDepth + 1);
            }
    }



    //Receive Money when Selling
    if(Selling && TurbineHealth >= 50 && !RepairTurbine)
    {
        Money += ((EnergyOutput / 250) * (EnergyOutput / 150) * PriceRange * Income) * (1 + neutronflux / 4000);
	soldEnergy += EnergyOutput / 50;
	if(getRandomIntInclusive(0, 200) == 0)
        {
             TurbineHealth -= 0.5;
        }
    }
    else if(Selling && !RepairTurbine)
    {
        Money += (((EnergyOutput / 1000) * PriceRange) / 50) * TurbineHealth * Income * (1 + neutronflux / 4000);
	soldEnergy += EnergyOutput / 50;
        if(getRandomIntInclusive(0, 200) == 0)
        {
             TurbineHealth -= 0.5;
        }	
    }

    //Normalizer
    if(PipesHealth < 0)
    {
        PipesHealth = 0;
    }
    if(CurrentMixtureHealth < 0)
    {
        CurrentMixtureHealth = 0;
    }
    if(TurbineHealth < 0)
    {
        TurbineHealth = 0;
    }
    if(ControlRodHealth < 0)
    {
        ControlRodHealth = 0;
    }


    //Repairing
    if(RepairControlRod)
    {
        ControlRodHealth += RodsRepairSpeed;
	if(ControlRodHealth >= 100)
	{
	    RepairControlRod = false;
	    ControlRodHealth = 100;
	}
    }
    if(RepairFuel)
    {
        CurrentMixtureHealth += FuelRepairSpeed;
	if(CurrentMixtureHealth >= 100)
        {
            RepairFuel = false;
            CurrentMixtureHealth = 100;
        }

    }
    if(RepairTurbine)
    {
        TurbineHealth += TurbineRepairSpeed;
	if(TurbineHealth >= 100)
        {
            RepairTurbine = false;
            TurbineHealth = 100;
        }
    }
    if(RepairPipes)
    {
        PipesHealth += PipesRepairSpeed;
	if(PipesHealth >= 100)
        {
            RepairPipes = false;
            PipesHealth = 100;
        }
    }

    
    //Text
    const ctx = myGameArea.context;
    ctx.font = "18px Arial";
    ctx.fillStyle = TextColor;
    ctx.strokeStyle = TextColor;


    if(debug)
    {
        WriteDebugText();    
    }

    ctx.fillText("Money: " + Math.round(Money * 100) / 100 + " €", document.getElementById("canva").width - 250, 20);
    ctx.fillText("Quota: " +Math.round(soldEnergy) + "/" + quota[quotaLevel] + " KWH", document.getElementById("canva").width - 250, 50);

    if(EnergyOutput * 160 < quota[quotaLevel])
    {
         ctx.fillStyle = "orange";
         if(EnergyOutput * 200 < quota[quotaLevel])
         {
             ctx.fillStyle = "red";
         }
    }
    else if (EnergyOutput * 100 >= quota[quotaLevel])
    {
    	ctx.fillStyle = "green";
    }
    else
    {
         ctx.fillStyle = "orange";
    }
    ctx.fillText("Energy Output: " + EnergyOutput + " KWH", document.getElementById("canva").width - 250, 80);
    
    
    
    //Pipe Damage
    if(ReactorHeat >= MaxReactorHeat / 1.8)
    {
	if(getRandomIntInclusive(0, Math.round(1000 * ReactorSize / 2)) <= ((1 * ReactorHeat) / 200) / HeatResist)
        {
             PipesHealth -= 0.5;
        }

    }

    //Meltdown
    if(ReactorHeat >= MaxReactorHeat && ReactorHeat <= 300000)
    {
        ReactorHeat = 300001;
        gameover = true;
	    for(let x = 0; x < neutrons.length; x++)
        {
          neutrons.shift();
        }

        Explosion = new neutron(1000 / 2, 1000 / 2, "Explo");

	    
        
        Explosion.moveAngle = 0;
        drawLater = true;
        drawPixels(Explosion.x, Explosion.y, Explosion.lifetime, Explosion.typ, Explosion.active);
    }
    else if(ReactorHeat <= 100000)
    {
        ReactorHeat = 0;  
    }
    else
    {
       
      for(let x = 0; x < neutrons.length; x++)
        {
          neutrons.shift();
        }  
        Explosion.newExplosi();
        drawLater = true;
        
    }
    
    EnergyOutput = 0;

    DrawMap(supermap);
    if(neutrons.length >= maxNeutronsNumber)
    {
        for(let i = 0; i < 1500; i++)
	{
	    neutrons.shift();
	}
    }


    //Neutron Logic
    for(let i = 0; i < neutrons.length; i++)
    {
	if(neutrons[i] != null)
	{
	    if(neutrons[i].lifetime <= 0 || neutrons[i].x >= 2000 || neutrons[i].y >= 1500 || neutrons[i].x <= -1 || neutrons[i].y <= -1)
	    {
	    	neutrons.splice(i, 1);
	    }
	    else
	    {
	    	if(neutrons[i].typ == "shock")
	    	{
	            neutrons[i].newPos();
		    neutrons[i].lifetime -= 0.05;
	    	}
	    	else
 	    	{
	            neutrons[i].newPosi();
		    neutrons[i].lifetime = 0;
	    	}
		neutrons[i].time++;
		if(neutrons[i].time >= 7)
		{
		    neutrons[i].active = true;
		}
            	neutrons[i].moveAngle = 0;
	    	drawPixels(neutrons[i].x, neutrons[i].y, neutrons[i].lifetime, neutrons[i].typ, neutrons[i].active);
	    	const collision = checkCollision(neutrons[i], cellDistance, cellMarginTop, cellMarginLeft, supermap);

            	if (collision.collided) 
		{
		    if(collision.value == 6)
      		    {
			if(getRandomIntInclusive(0, Math.round(250 * DamageResist)) == 0)
			{
			    ControlRodHealth -= 0.5;
			}
      			neutrons.splice(i, 1);
      		    }
      		    else if(collision.value == 7)
      		    {
      			if(neutrons[i].active == true && !RepairFuel)
      			{

			    if(getRandomIntInclusive(0, Math.round(1200 * FuelEffi)) == 0)
                            {
                                CurrentMixtureHealth -= 0.5;
                            }
			    

      			    neutrons[i].lifetime = 0;
				
			    if(getRandomIntInclusive(900, 1500) * FuelEffi * (CurrentMixtureHealth / 100) >= 100)
			    //if(getRandomIntInclusive(300 - CurrentMixtureHealth * 3, (300 - CurrentMixtureHealth * 3) * FuelEffi + 20) >= 301 - CurrentMixtureHealth * 10)
			    {
				for(let iii = 0; iii < FissionEvents; iii++)
				{	
					neutrons.push(new neutron(neutrons[i].x,neutrons[i].y, "shock"));
				}
			    }
      			}
      		    }
		    else if(collision.value == 9)
		    {
			if(getRandomIntInclusive(0,50) == 0)
                        {
                            supermap[collision.row][collision.col] = 0;
                        }																		     
		    }
      		    else
      		    {

      		    if(neutrons[i].speed == 4)
      		    {
      			if(getRandomIntInclusive(0,20) == 0)
      			{
      			    supermap[collision.row][collision.col] += 1;
      			}
			
      		    }
      		    else{
            	    supermap[collision.row][collision.col] += 1;
            	    neutrons[i].speed = 4;
        	    }
      		    }
      		}
	    }
	}
    }

    // Display current time multiplier on canvas
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";

    if(drawLater)
    {
        drawPixels(Explosion.x, Explosion.y, Explosion.lifetime, Explosion.typ, Explosion.active);
    }
}


function drawPixels(x,y,life, typ, live) {

    var cr = "";

    if(typ == "shock")
    {
    cr = NeutronColor;  
    }
    else
    {
    cr = NeutronColor;
    }
    if(typ == "Explo")
    {
        cr = 'rgba(255,255,255,'+ ExploAlpha + ')';
    }

    if(live == true)
    {
      Math.floor(100)+','+
      Math.floor(100)+','+
      Math.floor(100)+')';
    }
    const ctx = myGameArea.context;
    ctx.fillStyle = cr;
    if(typ == "Explo")
    {
        ctx.fillRect(x -1000, y - 1000, 3000, 3000);
    }
    else
	{
    ctx.fillRect(x, y, NeutronSize, NeutronSize);
	}
		// Decayed pixel color
    }

function InitializeMap(height, width, water, graphite)
{
    MaxReactorHeat = 0;
    supermap = [];
    for(let i = 0; i < height; i++)
    {
	let WaterTiles = 0;
	map = [];
        for(let ii = 0; ii < width; ii++)
    	{
	    if(MapDesign[ii] == 'G') // 1 3 13 15
	    {
	        map.push(5);
	    }
	    else if(MapDesign[ii] == 'F') // 5 11 17
	    {
	        map.push(7); //fuel
	    }
	    else if(MapDesign[ii] == 'C')
            {
                map.push(6); //control rod
            }
	    else if(MapDesign[ii] == 'W')
	    {
		WaterTiles++;
	        map.push(0); //water
	    }
	    // 0 = water; 1 = warm water; 2 hot water; 3 = boiling water; 4 = steam; 5 = graphite; 6 = control rod; 7 = fuel
    	}

	MaxReactorHeat += WaterTiles * 8;
	supermap.push(map);
    }
}

function DrawMap()
{
    const ctx = myGameArea.context;
    for(let i = 0; i < supermap.length; i++)
    {
        for(let ii = 0; ii < supermap[i].length; ii++)
        {
      if(supermap[i][ii] == 6 && i >= Height - ControlRodDepth) //ControlRodDepth = 0 -> Height
	{
	    supermap[i][ii] = 8;
	}
	if(supermap[i][ii] == 8 && i < Height - ControlRodDepth)
		{
            supermap[i][ii] = 6;
        }
	    switch(supermap[i][ii])
            {
      		case 0:
		    ctx.fillStyle = WaterColor;
                    ctx.fillRect(ii * cellDistance + cellMarginLeft, i * cellDistance + cellMarginTop, cellSize, cellSize);
      		    break;
      		case 1:
		    ctx.fillStyle = "rgba(50, 0, 10, 0.4)";
                    ctx.fillRect(ii * cellDistance + cellMarginLeft, i * cellDistance + cellMarginTop, cellSize, cellSize);
                    ReactorHeat += 0.5;

		    if(Coolant == true && getRandomIntInclusive(0, 5000) == 10)
	    {
			supermap[i][ii] = 9;
		    }

      		    if(getRandomIntInclusive(0, 200 - (10 * pipesPower)) <= 0 && !RepairPipes)
                    {
                        if(PipesHealth <= 0)
                        {
                            
                        }
                        else if(PipesHealth <= 50)
                        {
			    if(getRandomIntInclusive(0, 50) <= PipesHealth)
                            {
                                supermap[i][ii] -= 1;
                            }
                        }
                        else
                        {
                            supermap[i][ii] -= 1;
                        }
                    }
      		    break;
      		case 2:
		    ctx.fillStyle = "rgba(100, 0, 0, 0.6)";
                    ctx.fillRect(ii * cellDistance + cellMarginLeft, i * cellDistance + cellMarginTop, cellSize, cellSize);
                    ReactorHeat += 3;

		    if(Coolant == true && getRandomIntInclusive(0, 5000) == 10)
                    {
                        supermap[i][ii] = 9;
		    }


      		    if(getRandomIntInclusive(0, 100 - pipesPower * 5) <= 0 && !RepairPipes)
                    {
			if(PipesHealth <= 0)
			{
			    
			}
			else if(PipesHealth <= 50)
			{
			    if(getRandomIntInclusive(0, 50) <= PipesHealth)
	                    {
				supermap[i][ii] -= 1;
			    }
			}
			else
			{
                            supermap[i][ii] -= 1;
			}
                    }
		    else if(getRandomIntInclusive(0, 50 - pipesPower * 5) <= 0 && i != 0 && i != supermap.length - 1 && ii != 0 && ii != supermap[i].length )
		    {
			switch(getRandomIntInclusive(0, 3))
			{
			    case 0:
				if(supermap[i][ii] > supermap[i + 1][ii])
				{
				    supermap[i][ii] -= 1;
				    supermap[i + 1][ii] += 1;
				}
				break;
			    case 1:
                                if(supermap[i][ii] > supermap[i - 1][ii])
                                {
                                    supermap[i][ii] -= 1;
                                    supermap[i - 1][ii] += 1;
                                }
                                break;
			    case 2:
                                if(supermap[i][ii] > supermap[i][ii + 1])
                                {
                                    supermap[i][ii] -= 1;
                                    supermap[i][ii + 1] += 1;
                                }
                                break;
			    case 3:
                                if(supermap[i][ii] > supermap[i][ii - 1])
                                {
                                    supermap[i][ii] -= 1;
                                    supermap[i][ii - 1] += 1;
                                }
                                break;
			}
		    }
		    break;
      		case 3:
		    ctx.fillStyle = "rgba(2000, 0, 0, 0.8)";
                    ctx.fillRect(ii * cellDistance + cellMarginLeft, i * cellDistance + cellMarginTop, cellSize, cellSize);
                    ReactorHeat += 5;

		    if(Coolant == true && getRandomIntInclusive(0, 5000) == 10)
                    {
                        supermap[i][ii] = 9;
                    }

																				     
		    if(getRandomIntInclusive(0, 50 - (pipesPower / 2)) <= 0 && !RepairPipes)
                    {
                        if(PipesHealth <= 0)
                        {
                            
                        }
                        else if(PipesHealth <= 50)
                        {
                            if(getRandomIntInclusive(0, 50) <= PipesHealth)
                            {
                                supermap[i][ii] -= 1;
                            }
                        }
                        else
                        {
                            supermap[i][ii] -= 1;
                        }

                    }
		    else if(getRandomIntInclusive(0, 50 - pipesPower * 5) <= 0 && i != 0 && i != supermap.length - 1 && ii != 0 && ii != supermap[i].length )
                    {
                        switch(getRandomIntInclusive(0, 3))
                        {
                            case 0:
                                if(supermap[i][ii] > supermap[i + 1][ii])
                                {
                                    supermap[i][ii] -= 1;
                                    supermap[i + 1][ii] += 1;
                                }
                                break;
                            case 1:
                                if(supermap[i][ii] > supermap[i - 1][ii])
                                {
                                    supermap[i][ii] -= 1;
                                    supermap[i - 1][ii] += 1;
                                }
                                break;
                            case 2:
                                if(supermap[i][ii] > supermap[i][ii + 1])
                                {
                                    supermap[i][ii] -= 1;
                                    supermap[i][ii + 1] += 1;
                                }
                                break;
                            case 3:
                                if(supermap[i][ii] > supermap[i][ii - 1])
                                {
                                    supermap[i][ii] -= 1;
                                    supermap[i][ii - 1] += 1;
                                }
                                break;
                        }
                    }
	  	    break;
      		case 4:
		    ctx.fillStyle = "rgba(200, 200, 200, 0.2)";
                    ctx.fillRect(ii * cellDistance + cellMarginLeft, i * cellDistance + cellMarginTop, cellSize, cellSize);
                    EnergyOutput += 1;
		    ReactorHeat += 10;
      		    if(getRandomIntInclusive(0, 25 - pipesPower) <= 0 && !RepairPipes)
                    {
                        if(PipesHealth <= 0)
                        {
                            
                        }
                        else if(PipesHealth <= 10)
                        {
                            if(getRandomIntInclusive(0, 50) <= PipesHealth)
                            {
                                supermap[i][ii] -= 1;
                            }
                        }
                        else
                        {
                            supermap[i][ii] -= 1;
                        }
                    }
		    else if(getRandomIntInclusive(0, 50 - pipesPower * 5) <= 0 && i != 0 && i != supermap.length - 1 && ii != 0 && ii != supermap[i].length )
                    {
                        switch(getRandomIntInclusive(0, 3))
                        {
                            case 0:
                                if(supermap[i][ii] > supermap[i + 1][ii])
                                {
                                    supermap[i][ii] -= 1;
                                    supermap[i + 1][ii] += 1;
                                }
                                break;
                            case 1:
                                if(supermap[i][ii] > supermap[i - 1][ii])
                                {
                                    supermap[i][ii] -= 1;
                                    supermap[i - 1][ii] += 1;
                                }
                                break;
                            case 2:
                                if(supermap[i][ii] > supermap[i][ii + 1])
                                {
                                    supermap[i][ii] -= 1;
                                    supermap[i][ii + 1] += 1;
                                }
                                break;
                            case 3:
                                if(supermap[i][ii] > supermap[i][ii - 1])
                                {
                                    supermap[i][ii] -= 1;
                                    supermap[i][ii - 1] += 1;
                                }
                                break;
                        }
                    }
      		    break;
      		case 5:
		    ctx.fillStyle = "rgba(255, 255, 255, 1)";
                    ctx.fillRect(ii * cellDistance + cellMarginLeft, i * cellDistance + cellMarginTop, cellSize, cellSize);
                    break;
      		case 6:
		    ctx.fillStyle = RodsColor;
                    ctx.fillRect(ii * cellDistance + cellMarginLeft, i * cellDistance + cellMarginTop, cellSize, cellSize + 10);
                    break;
		case 7:
		    ctx.fillStyle = FuelColor;
                    ctx.fillRect(ii * cellDistance + cellMarginLeft, i * cellDistance + cellMarginTop, cellSize, cellSize);
		    if(getRandomIntInclusive(10, 200000) <= 1 * (CurrentMixtureReactivity / 10) * CurrentMixtureHealth * FuelEffi && !RepairFuel)
		    {
		        neutrons.push(new neutron(ii * cellDistance + cellMarginLeft, i * cellDistance + cellMarginTop, "shock"));
		    }
		    break;
		case 8:
		    ctx.fillStyle = "rgba(255, 255, 255, 1)";
                    ctx.fillRect(ii * cellDistance + cellMarginLeft, i * cellDistance + cellMarginTop, cellSize, cellSize);
		    break;
		case 9:
		    ctx.fillStyle = "rgba(150, 100, 255, 0.8)";
                    ctx.fillRect(ii * cellDistance + cellMarginLeft, i * cellDistance + cellMarginTop, cellSize, cellSize);
		    ReactorHeat -= 100;
		    break;
      	    }
        }
    }
}

function Sell()
{
    Selling = !Selling;
}
function RepairT()
{
    document.getElementById("PRange").textContent = (Math.round(PriceRange * 100) / 100) + "x";
    document.getElementById("TCost").textContent = (RepairCostTurbine) + "€" ;
    document.getElementById("FCost").textContent = (RepairCostFuel) + "€";
    document.getElementById("CCost").textContent = (RepairCostRods) + "€";
    document.getElementById("PCost").textContent = (RepairCostPipes) + "€";

    if(Money >= RepairCost * 2)
    {
        Money -= RepairCost * 2;
        RepairTurbine = true;
    }
}
function RepairF()
{
    document.getElementById("PRange").textContent = (Math.round(PriceRange * 100) / 100) + "x";
    document.getElementById("TCost").textContent = (RepairCostTurbine) + "€" ;
    document.getElementById("FCost").textContent = (RepairCostFuel) + "€";
    document.getElementById("CCost").textContent = (RepairCostRods) + "€";
    document.getElementById("PCost").textContent = (RepairCostPipes) + "€";	

    if(Money >= RepairCost * 10)
    {
        Money -= RepairCost * 10;
        RepairFuel = true;
    }
}
function RepairC()
{
    document.getElementById("PRange").textContent = (Math.round(PriceRange * 100) / 100) + "x";
    document.getElementById("TCost").textContent = (RepairCostTurbine) + "€" ;
    document.getElementById("FCost").textContent = (RepairCostFuel) + "€";
    document.getElementById("CCost").textContent = (RepairCostRods) + "€";
    document.getElementById("PCost").textContent = (RepairCostPipes) + "€";

    if(Money >= RepairCost * 8)
    {
        Money -= RepairCost * 8;
        RepairControlRod = true;
    }

}
function RepairP()
{
    document.getElementById("PRange").textContent = (Math.round(PriceRange * 100) / 100) + "x";
    document.getElementById("TCost").textContent = (RepairCostTurbine) + "€" ;
    document.getElementById("FCost").textContent = (RepairCostFuel) + "€";
    document.getElementById("CCost").textContent = (RepairCostRods) + "€";
    document.getElementById("PCost").textContent = (RepairCostPipes) + "€";


    if(Money >= RepairCost * 5)
    {
        Money -= RepairCost * 5;
        RepairPipes = true;
    }

}

function UpgradeWidth()
{
    

    if(Money >= ((RepairCost * 5 * ReactorSize) * ReactorSize) && ReactorSize <= 5)
    {
        maxNeutronsNumber += 1000;
        cellMarginLeft = document.getElementById("canva").width / (4 * ReactorSize);

    	Money -= ((RepairCost * 5 * ReactorSize) * ReactorSize);
    	let x = (Width - 3) / ReactorSize;
    	Width += x;
    	for(let i = 0; i < x -1; i++)
    	{
            MapDesign.push(MapDesign[i + 3]);
    	}
    	InitializeMap(Height, Width, true, false);
    	ReactorSize++;
    	cellSize -= 2;
    	cellDistance /= 1.3;
    	NeutronSize--;
    }
    else if(ReactorSize > 5 && Money >= ((RepairCost * 5 * ReactorSize) * ReactorSize))
    {
        maxNeutronsNumber += 1000;
        cellMarginLeft = document.getElementById("canva").width / (4 * ReactorSize);
    	Money -= ((RepairCost * 5 * ReactorSize) * ReactorSize);
        let x = (Width - 3) / ReactorSize;
        Width += x;
        for(let i = 0; i < x -1; i++)
        {
            MapDesign.push(MapDesign[i + 3]);
        }
        InitializeMap(Height, Width, true, false);
        ReactorSize++;
    }
}

function UpdatePrices()
{
    document.getElementById("PRange").textContent = (Math.round(PriceRange * 100) / 100) + "x";
    document.getElementById("TCost").textContent = (RepairCostTurbine) + "€" ;
    document.getElementById("FCost").textContent = (RepairCostFuel) + "€";
    document.getElementById("CCost").textContent = (RepairCostRods) + "€";
    document.getElementById("PCost").textContent = (RepairCostPipes) + "€";
}

function UpgradeHeight()
{
    if(Money >= RepairCost * (10 + (Height - 35)))
    {
        maxNeutronsNumber += 100;
	Money -= RepairCost * (10 + (Height - 35));
    	Height += 1;
    	MaxControlRodDepth = Height;
    	InitializeMap(Height, Width, true, false);
    }
}

function UpgradeButtonOn()
{
    paused = true;
    document.getElementById("Upgrades").style.display = "Block";
}

function UpgradeButtonOff()
{
    if(paused)
    {
        paused = false;
        myGameArea.unpause();
    }
    document.getElementById("Upgrades").style.display = "None";
}


function MixtureButtonOn()
{
    paused = true;
    UpdateMixWindow();
    document.getElementById("MixtureEditor").style.display = "Block";
}

function MixtureButtonOff()
{
    if(paused)
    {
        paused = false;
        myGameArea.unpause();
    }
    document.getElementById("MixtureEditor").style.display = "None";
}

function UpgradePipesOne()
{
    if(UpgradePoints >= 1)
    {
	
	PipesRepairSpeed *= 0.95;
    UpgradePoints -= 2;
    HeatResist += 0.1;
    RepairCostPipes *= 0.95;
    UpdatePrices();
    document.getElementById("UPipes1").style.backgroundColor = "green";
    document.getElementById("UPipes1").style.disabled = true;
    }
}

function UpgradeTurbineOne()
{
    if(UpgradePoints >= 1)
    {
	RepairCostTurbine *= 0.95;
	TurbineRepairSpeed *= 3;
        UpgradePoints -= 2;
        Income += 0.1;
	UpdatePrices();
	document.getElementById("UTurbine1").style.backgroundColor = "green";
    document.getElementById("UTurbine1").style.disabled = true;
    }
}

function UpgradeControlOne()
{
    if(UpgradePoints >= 1)
    {
	RepairCostRods *= 0.95;
	RodsRepairSpeed *= 2;
        UpgradePoints -= 2;
        DamageResist += 0.05;
	    UpdatePrices();
	    document.getElementById("UControl1").style.backgroundColor = "green";
    document.getElementById("UControl1").style.disabled = true;
    }
}

function UpgradeFuelOne()
{
    if(UpgradePoints >= 1)
    {
	RepairCostFuel *= 0.95;
	FuelRepairSpeed *= 0.2;
	UpgradePoints -= 2;
        FuelEffi += 0.05;
	    UpdatePrices();
	    document.getElementById("UFuel1").style.backgroundColor = "green";
    document.getElementById("UFuel1").style.disabled = true;
    }
}

function UpgradePipesTwo()
{

    if(UpgradePoints >= 2)
    {
	PipesRepairSpeed *= 0.9;
	UpdatePrices();
	RepairCostPipes *= 0.9;
        UpgradePoints -= 2;
        HeatResist += 0.1;
	    document.getElementById("UPipes2").style.backgroundColor = "green";
    document.getElementById("UPipes2").style.disabled = true;
    }
}

function UpgradeTurbineTwo()
{
    if(UpgradePoints >= 2)
    {
	RepairCostTurbine *= 0.9;
	UpdatePrices();
	TurbineRepairSpeed *= 0.9;
        UpgradePoints -= 2;
        Income += 0.05;
	    document.getElementById("UTurbine2").style.backgroundColor = "green";
    document.getElementById("UTurbine2").style.disabled = true;
    }
}

function UpgradeControlTwo()
{
    if(UpgradePoints >= 2)
    {
	RepairCostRods *= 5;
	UpdatePrices();
	    RodsRepairSpeed *= 0.9;
        UpgradePoints -= 2;
        DamageResist += 0.05;
	    document.getElementById("UControl2").style.backgroundColor = "green";
    document.getElementById("UControl2").style.disabled = true;
    }
}

function UpgradeFuelTwo()
{
    if(UpgradePoints >= 2)
    {
	RepairCostFuel *= 0.95;
	UpdatePrices();
	FuelRepairSpeed *= 0.9;
        UpgradePoints -= 2;
        FuelEffi += 0.05;
	    document.getElementById("UFuel2").style.backgroundColor = "green";
    document.getElementById("UFuel2").style.disabled = true;
    }
}

function SafeRouteButton()
{
    UpgradeButtonOff();

    if(document.getElementById("UFuel2").style.disabled == true && document.getElementById("UControl2").style.disabled == true && document.getElementById("UTurbine2").style.disabled == true && document.getElementById("UPipes2").style.disabled == true)
	{
		document.getElementById("b8").onclick = UpgradeSafeOn;
	}
}

function UpgradeSafeOn()
{
	document.getElementById("SafeUpgrades").style.display = "Block";    
}
function UpgradeSafeOff()
{
	document.getElementById("SafeUpgrades").style.display = "None"; 
}

function DoubleLinedRods()
{
	if(UpgradePoints >= 4)
    	{
		RepairCostRods *= 1.35;
            	RodsRepairSpeed *= 1.2;
        	UpgradePoints -= 4;
        	DamageResist += 0.5;
            	document.getElementById("DoubleLinedRods").style.backgroundColor = "green";
    		document.getElementById("DoubleLinedRods").style.disabled = true;
		RodsColor = "rgba(140,90,130,1)"
	}
}

function LeadPipes()
{
	if(UpgradePoints >= 3)
        {
	        PipesRepairSpeed *= 0.9;
        	RepairCostPipes *= 1.1;
        	UpgradePoints -= 3;
        	HeatResist += 0.25;
            	document.getElementById("LeadPipes").style.backgroundColor = "green";
    		document.getElementById("LeadPipes").style.disabled = true;
	}
}

function SturdyTurbine()
{
    if(UpgradePoints >= 3)
    {
        RepairCostTurbine *= 1.1;
        TurbineRepairSpeed *= 0.9;
        UpgradePoints -= 3;
        Income -= 0.10;
        document.getElementById("SturdyTurbine").style.backgroundColor = "green";
    	document.getElementById("SturdyTurbine").style.disabled = true;
    }
}

function EightyUranium()
{
    if(UpgradePoints >= 3)
    {
        RepairCostFuel *= 0.8;
        FuelRepairSpeed *= 1.1;
        UpgradePoints -= 3;
        FuelEffi *= 0.95;
        document.getElementById("80Uranium").style.backgroundColor = "green";
    	document.getElementById("80Uranium").style.disabled = true;
	FuelColor = "rgba(0,200,0,0.8)"
    }
}

function CadmiumRods()
{
        if(UpgradePoints >= 3)
        {
                RepairCostRods *= 1.15;
                RodsRepairSpeed *= 1.1;
                UpgradePoints -= 3;
                DamageResist += 2;
                document.getElementById("CadmiumRods").style.backgroundColor = "green";
                document.getElementById("CadmiumRods").style.disabled = true;
                RodsColor = "rgba(170,80,80,1)";
        }
}

function OsmiumPipes()
{
        if(UpgradePoints >= 4)
        {
                PipesRepairSpeed *= 0.5;
                RepairCostPipes *= 1.2;
                UpgradePoints -= 4;
                HeatResist += 0.5;
                document.getElementById("OsmiumPipes").style.backgroundColor = "green";
                document.getElementById("OsmiumPipes").style.disabled = true;
        }
}

function MegaTurbine()
{
    if(UpgradePoints >= 4)
    {
        RepairCostTurbine *= 1.15;
        TurbineRepairSpeed *= 0.8;
        UpgradePoints -= 4;
        Income -= 0.10;
        document.getElementById("MegaTurbine").style.backgroundColor = "green";
        document.getElementById("MegaTurbine").style.disabled = true;
    }
}

function SixtyUranium()
{
    if(UpgradePoints >= 4)
    {
        RepairCostFuel *= 0.6;
        FuelRepairSpeed *= 1.2;
        UpgradePoints -= 4;
        FuelEffi *= 0.85;
        document.getElementById("60Uranium").style.backgroundColor = "green";
        document.getElementById("60Uranium").style.disabled = true;
        FuelColor = "rgba(0,150,0,0.8)"
    }
}

function DarkMode()
{
    switch(ModeIterator)
    {
    	case 0:
	    document.getElementById("bd").style.backgroundColor = "lightgrey";
	    TextColor = "black";
	    break;
	case 1:
	    document.getElementById("bd").style.backgroundColor = "grey";
	    TextColor = "white";
            break;
	case 2:
	    document.getElementById("bd").style.backgroundColor = "black";
	    TextColor = "lightgrey";
	    WaterColor = "rgba(30,30,180,0.8)";
	    NeutronColor = "rgba(150,150,150,1)";
            break;
	case 3:
	    document.getElementById("bd").style.backgroundColor = "white";
	    TextColor = "black";
	    WaterColor = "rgba(50, 50, 255, 0.2)";
	    NeutronColor = "black";
            break;
    }
    ModeIterator++;
	if(ModeIterator >= 4)
	{ModeIterator = 0;}
}


function UpdateTooltip(type)
{
    switch(Number(type))
    {
        case 0:
            document.getElementById("Reactivity").innerText = ElementsReactivitys.URANIUM_233;
            document.getElementById("Health").innerText = ElementsHealth.URANIUM_233;
            document.getElementById("NeutronType").innerText = ElementsNeutronType.URANIUM_233;
            document.getElementById("Price").innerText = ElementsCost.URANIUM_233;
            document.getElementById("Name").innerText = ElementsNames.URANIUM_233;
            document.getElementById("ToolTip").style.backgroundColor = 'rgba(140,230,0,0.5)';
            break;
        case 1:
            document.getElementById("Reactivity").innerText = ElementsReactivitys.URANIUM_235;
            document.getElementById("Health").innerText = ElementsHealth.URANIUM_235;
            document.getElementById("NeutronType").innerText = ElementsNeutronType.URANIUM_235;
            document.getElementById("Price").innerText = ElementsCost.URANIUM_235;
            document.getElementById("Name").innerText = ElementsNames.URANIUM_235;
            document.getElementById("ToolTip").style.backgroundColor = 'rgba(20,240,0,0.6)';
            break;
        case 2:
            document.getElementById("Reactivity").innerText = ElementsReactivitys.URANIUM_238;
            document.getElementById("Health").innerText = ElementsHealth.URANIUM_238;
            document.getElementById("NeutronType").innerText = ElementsNeutronType.URANIUM_238;
            document.getElementById("Price").innerText = ElementsCost.URANIUM_238;
            document.getElementById("Name").innerText = ElementsNames.URANIUM_238;
            document.getElementById("ToolTip").style.backgroundColor = 'rgba(0,180,0, 0.6)';
            break;
        case 3:
            document.getElementById("Reactivity").innerText = ElementsReactivitys.THORIUM_232;
            document.getElementById("Health").innerText = ElementsHealth.THORIUM_232;
            document.getElementById("NeutronType").innerText = ElementsNeutronType.THORIUM_232;
            document.getElementById("Price").innerText = ElementsCost.THORIUM_232;
            document.getElementById("Name").innerText = ElementsNames.THORIUM_232;
            document.getElementById("ToolTip").style.backgroundColor = 'rgba(140,60,20,0.4)';
            break;
        case 4:
            document.getElementById("Reactivity").innerText = ElementsReactivitys.PLUTONIUM_239;
            document.getElementById("Health").innerText = ElementsHealth.PLUTONIUM_239;
            document.getElementById("NeutronType").innerText = ElementsNeutronType.PLUTONIUM_239;
            document.getElementById("Price").innerText = ElementsCost.PLUTONIUM_239;
            document.getElementById("Name").innerText = ElementsNames.PLUTONIUM_239;
            document.getElementById("ToolTip").style.backgroundColor = 'rgba(180,180,180,0.6)';
            break;
        case 5:
            document.getElementById("Reactivity").innerText = ElementsReactivitys.NEPTUNIUM_238;
            document.getElementById("Health").innerText = ElementsHealth.NEPTUNIUM_238;
            document.getElementById("NeutronType").innerText = ElementsNeutronType.NEPTUNIUM_238;
            document.getElementById("Price").innerText = ElementsCost.NEPTUNIUM_238;
            document.getElementById("Name").innerText = ElementsNames.NEPTUNIUM_238;
            document.getElementById("ToolTip").style.backgroundColor = 'rgba(160,210,160,0.7)';
            break;
        case 6:
            document.getElementById("Reactivity").innerText = ElementsReactivitys.AMERICIUM_239;
            document.getElementById("Health").innerText = ElementsHealth.AMERICIUM_239;
            document.getElementById("NeutronType").innerText = ElementsNeutronType.AMERICIUM_239;
            document.getElementById("Price").innerText = ElementsCost.AMERICIUM_239;
            document.getElementById("Name").innerText = ElementsNames.AMERICIUM_239;
            document.getElementById("ToolTip").style.backgroundColor = 'rgba(180,180,60,0.7)';
            break;
        default:
            console.log(type + ", " + typeof(type));
            break;
    }
}

function UpdateMixWindow()
{
    document.getElementById("opt0").innerText = ElementsNames.URANIUM_233;
    document.getElementById("opt1").innerText = ElementsNames.URANIUM_235;
    document.getElementById("opt2").innerText = ElementsNames.URANIUM_238;
    document.getElementById("opt3").innerText = ElementsNames.THORIUM_232;
    document.getElementById("opt4").innerText = ElementsNames.PLUTONIUM_239;
    document.getElementById("opt5").innerText = ElementsNames.NEPTUNIUM_238;
    document.getElementById("opt6").innerText = ElementsNames.AMERICIUM_239;
}


