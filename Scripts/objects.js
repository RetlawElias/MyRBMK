export function neutron(x,y, typ, speedType)
{
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.moveAngle = getRandomIntInclusive(0,1000); 
    this.lifetime = 10;
    this.time = 0;
    this.speedType = speedType;
    this.typ = typ
    this.active = false;
    this.color = 'rgba(0,0,0,1)';

    this.newPos = function()
    {
        var speed = 0;
        switch(this.speedType)
        {
            case "Extremly Fast":
                speed = 15;
                break;
            case "Very Fast":
                speed = 12;
                break;
            case "Fast":
                speed = 10;
                break;
            case "Normal":
                speed = 8;
                break;
            case "Slow":
                speed = 5;
                break;
        }
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += speed * Math.sin(this.angle);
        this.y -= speed * Math.cos(this.angle);
    }
    this.newPosi = function()
    {
        var speed = 0;
        switch(this.speedType)
        {
            case "Extremly Fast":
                speed = 15;
                break;
            case "Very Fast":
                speed = 12;
                break;
            case "Fast":
                speed = 10;
                break;
            case "Normal":
                speed = 8;
                break;
            case "Slow":
                speed = 5;
                break;
        }
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += (speed / 2) * Math.sin(this.angle);
        this.y -= (speed / 2) * Math.cos(this.angle);
    }
    this.newExplosi = function()
    {
        ExploAlpha -= 0.004;
    }
    this.slowDown = function()
    {
        switch(this.speedType)
        {
            case "Extremly Fast":
                this.speedType = "Very Fast";
                break;
            case "Very Fast":
                this.speedType = "Fast";
                break;
            case "Fast":
                this.speedType = "Normal";
                break;
            case "Normal":
                this.speedType = "Slow";
                break;
        }
    }

}        


export function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}