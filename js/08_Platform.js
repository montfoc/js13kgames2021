class Platform {
  constructor(topLeftCoordinate, width, height, isAffectedByGravity, isSolidObject) {
    this.position = topLeftCoordinate;
    this.oldPosition = new Coord(topLeftCoordinate.x, topLeftCoordinate.y);
    this.width = width;
    this.height = height;
    this.color = "#663333";
    this.boundingContainer = new BoundingBox(this.position, this.width, this.height);
    this.isAffectedByGravity = !!isAffectedByGravity;
    this.isSolidObject = !isSolidObject;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.sprite = new Rectangle(this.position, this.width, this.height);
  }

  applyGravity(gravity) {
    if (this.isAffectedByGravity) {
      // && !this.isOverSolidObject
      if (!gravity)
        gravity = DEFAULT_GRAVITY;
      this.ySpeed += LOOP_TIME * gravity;
    }
  }

  move() {
    this.applyGravity();
    this.position.x += this.xSpeed;
    this.position.y += this.ySpeed;
  }

  draw(context) {
    this.sprite.draw(context, this.color);
  }
}