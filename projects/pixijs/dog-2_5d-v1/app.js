// Create a Pixi application and append it to the scene
const app = new PIXI.Application({
    width: 600, height: 600, backgroundColor: 0xbbbbbb, resolution: window.devicePixelRatio || 1
}); 
document.getElementById("display").appendChild(app.view); 
const stage = app.stage; 
const container = new PIXI.Container(); 
stage.addChild(container); 

// Load texture
const texture = PIXI.Texture.fromImage('images/pup.png'); 
const displacementTexture = PIXI.Texture.fromImage('images/pup-depthmap.png'); 

// Create sprites from texture
const pup = PIXI.Sprite.from(texture); 
container.addChild(pup); 
const displacementSprite = PIXI.Sprite.from(displacementTexture); 
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT; 

// Create displacement filter
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite); 
displacementFilter.padding = 10; 

// Position stuff
pup.x = 100; 
pup.y = 100; 
displacementSprite.position = pup.position;

stage.addChild(displacementSprite); 

pup.filters = [displacementFilter]; 
displacementFilter.scale.x = 0; 
displacementFilter.scale.y = 10; 
displacementFilter.scale.r = 50; 
displacementFilter.scale.xReal = displacementFilter.scale.x; 
displacementFilter.scale.yReal = displacementFilter.scale.y; 
displacementFilter.scale.theta = 0; 
displacementFilter.scale.taox = 10; 
displacementFilter.scale.taoy = 7; 

displacementSprite.xReal = displacementSprite.x; 
displacementSprite.yReal = displacementSprite.y; 
displacementSprite.r = 50; 
displacementSprite.theta = 0; 
displacementSprite.taox = 10; 
displacementSprite.taoy = 7; 
app.ticker.add( (delta) => {

    // displacementSprite.theta += delta; 
    // delta %= 360 * displacementSprite.taox * displacementSprite.taoy; 
    // displacementSprite.x = displacementSprite.xReal + (displacementSprite.r * Math.sin(displacementSprite.theta / displacementSprite.taox)); 
    // displacementSprite.y = displacementSprite.yReal + (displacementSprite.r * Math.sin(displacementSprite.theta / displacementSprite.taoy)); 
    //if(displacementSprite.x > displacementSprite.width) displacementSprite.x = 0; 

    displacementFilter.scale.theta += delta; 
    delta %= 360 * displacementFilter.scale.taox * displacementFilter.scale.taoy; 
    displacementFilter.scale.x = displacementFilter.scale.xReal + (displacementFilter.scale.r * Math.sin(displacementFilter.scale.theta / displacementFilter.scale.taox)); 
    displacementFilter.scale.y = displacementFilter.scale.yReal + (displacementFilter.scale.r * Math.sin(displacementFilter.scale.theta / displacementFilter.scale.taoy)); 

    //displacementSprite.x += delta; 
}); 