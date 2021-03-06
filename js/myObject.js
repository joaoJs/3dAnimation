class myObject {
  constructor() {
    this.x = getRandomPosition();
    this.y = getRandomPositionY();
    this.z = getRandomPosition();
    this.speed = getRandomSpeed();
    this.size = getRandomSize();
    this.rotation = getRandomAngle();
    this.comesClose = getRandomBoolean();
    this.goesFar = getRandomBoolean();
    this.goesUp = true;
    this.goesDown = false;
    this.goesLeft = getRandomBoolean();
    this.goesRight = getRandomBoolean();
    this.shape = {};
  }

  setShape() {
    var color = generateRandomColor();
    var shape = new THREE.Mesh(
        new THREE.OctahedronGeometry(this.size, 0),
        new THREE.MeshStandardMaterial( {
            color: color,
            metalness: 1,
            roughness: 0.8
        } )
    );
    shape.position.x = this.x;
    shape.position.y = this.y;
    shape.position.z = this.z;
    shape.rotateZ(this.rotation);
    shape.castShadow = true;
    // shapesArray.push(shape);
    this.shape = shape;
  }

  move() {
    if (this.shape.position.z <= -500) {
      this.comesClose = true;
      this.goesFar = false;
    } else if (this.shape.position.z >= 200) {
      this.goesFar = true;
      this.comesClose = false;
    }
    if (this.goesFar) {
      this.shape.position.z -= this.speed;
    } else {
      this.shape.position.z += this.speed;
    }

    if (this.shape.position.x >= 200) {
      this.goesLeft = true;
      this.goesRight = false;
    } else if (this.shape.position.x <= -200) {
      this.goesLeft = false;
      this.goesRight = true;
    }
    if (this.goesLeft) {
      this.shape.position.x-= this.speed;
    } else {
      this.shape.position.x+= this.speed;
    }

    if (this.shape.position.y <= -100) {
      this.goesUp = true;
      this.goesDown = false;
    } else if (this.shape.position.y >= 250) {
      this.goesUp = false;
      this.goesDown = true;
    }
    if (this.goesUp) {
      this.shape.position.y += this.speed;
    } else if (this.goesDown) {
      this.shape.position.y -= this.speed;
    }
  }

}

function getRandomAngle() {
  const r = Math.random() + 3;
  return Math.PI / r;
}

function getRandomBoolean() {
  const booleans = [true, false];
  const r = Math.floor(Math.random() * 2);
  return booleans[r];
}

function getRandomSize() {
  return Math.floor(Math.random() * 5) + 2;
}

function getRandomSpeed() {
  return Math.random() * 0.1 + 0.05;
}

function generateRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function getRandomPosition() {
    return Math.floor(Math.random() * 10) - 5;
}

function getRandomPositionY() {
    return Math.floor(Math.random()) - 100;
}
