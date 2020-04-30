/*global THREE:true*/
/*global Draw:true*/

Draw = function(res, camera){
    this.res = res;
    this.camera = camera;
    this.bias = new THREE.Vector3(0, 0, 0);
    this.scale = new THREE.Vector3(0.5, 0.5, 0);

    var geometry = new THREE.PlaneBufferGeometry(2 * (res.x-2.0)/res.x , 2 * (res.y-2.0)/ res.y);
    
    
    this.uniforms = {
        res: {value: new THREE.Vector2()},
        bias: {value: new THREE.Vector3()},
        scale: {value: new THREE.Vector3()},
        bufferTexture: {value: new THREE.Texture()}
    };
    var material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        fragmentShader: document.getElementById( "Draw" ).innerHTML,
        depthWrite: false,
        depthTest: false,
        blending: THREE.NoBlending
    });

    /*
    var material = new THREE.ShaderMaterial({
        uniforms: {
            res: {value: new THREE.Vector2()},
            bias: {value: new THREE.Vector3()},
            scale: {value: new THREE.Vector3()},
            bufferTexture: {value: new THREE.Texture()}
        },
        fragmentShader: document.getElementById( 'Draw' ).innerHTML
    });*/

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene = new THREE.Scene();
    this.scene.add(this.mesh);
}

Draw.prototype.process = function(renderer, input, output){
    this.uniforms.res.value = this.res;
    this.uniforms.bias.value = this.bias;
    this.uniforms.scale.value = this.scale;
    this.uniforms.bufferTexture.value = input;
    renderer.setRenderTarget(output);
    renderer.clear(false);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    console.log("I'm HERE in DRAW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}

Draw.prototype.displayVelocity = function() {
    this.bias = new THREE.Vector3(0.5,0.5,0.5);
    this.scale = new THREE.Vector3(0.5,0.5,0); 
}

Draw.prototype.displayDensity = function() {
    this.bias = new THREE.Vector3(0,0,0);
    this.scale = new THREE.Vector3(0.5,0.6,1); 
}
