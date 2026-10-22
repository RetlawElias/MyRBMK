export function neutron(x,y, typ)
{
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.speed = 10;
    this.moveAngle = getRandomIntInclusive(0,1000); 
    this.lifetime = 10;
    this.time = 0;
    this.typ = typ
    this.active = false;
    this.color = 'rgba(0,0,0,1)';

    this.newPos = function()
    {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
    this.newPosi = function()
    {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += (this.speed / 2) * Math.sin(this.angle);
        this.y -= (this.speed / 2) * Math.cos(this.angle);
    }
    this.newExplosi = function()
    {
        ExploAlpha -= 0.004;
    }

}        


export function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}