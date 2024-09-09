class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    // this.speed = carDetails.speed;
    // this.isTrunkOpen = carDetails.isTrunkOpen;
  }

  displayInfo() {
    const isTrunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h Trunk: ${isTrunkStatus}`);
  }
  go() {
    if(!this.isTrunkOpen) {
      this.speed += 5;
    }
    
    if(this.speed > 200) {
      this.speed = 200;
    }
    
  }
  openTrunk() {
    if(this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closedTrunk() {
    this.isTrunkOpen = false;
  }

  brake() {
    this.speed -= 5;
      if(this.speed < 0) {
        this.speed = 0;
      }
  }
}

class  RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails)
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    if(this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk')
  }

  closedTrunk() {
    console.log('Race cars do not have a trunk')
  }
}

const car = new Car({
  brand: 'Toyota', 
  model: 'Corolla',
})
const car2 = new Car({
  brand: 'Tesla', 
  model: 'Model 3',
})
const raceCar = new Car ({
  brand: 'McLaren', 
  model: 'F1',
})

console.log(car)
// car.go()
// car.openTrunk()
car.displayInfo();

console.log(car2)
// car2.brake()
// car2.displayInfo();

// raceCar.go();
// raceCar.go();
// raceCar.go();
// raceCar.displayInfo();
// raceCar.openTrunk();
// raceCar.displayInfo();
// raceCar.brake();
// raceCar.displayInfo();
// console.log(raceCar)