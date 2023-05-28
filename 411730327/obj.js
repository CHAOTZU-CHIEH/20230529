class Obj {
  constructor(args) {//宣告物件的基本資料
    this.p = args.p || createVector(random(width), random(height))//一個物件開始的位置
    this.v = createVector(random(-2, 1), random(-1, 5))//速度
    this.size = random(2, 5)
    this.color = random(fill_colors)
    this.stroke = random(stroke_colors)
  }

  draw() {
    push();
     translate(this.p.x, this.p.y)
     scale(1,-1)//放大縮小的指令
     fill(this.color)
     stroke(this.stroke)
     strokeWeight(3)
     beginShape()
        for (var i = 0; i < points.length; i++) {
          curveVertex(points[i][0] * this.size, points[i][1] * this.size)
        }
     endShape()
    pop()
  }

  update() {
    this.p.add(this.v)

    let mouseV = createVector(mouseX, mouseY)
    let delta = mouseV.sub(this.p).limit(this.v.mag()*2)
    this.p.add(delta)

    if (this.p.x <= 0 || this.p.x >= width) {
      this.v.x = -this.v.x
    }
    if (this.p.y <= 0 || this.p.y >= height) {
      this.v.y = -this.v.y
    }
  }

  isBallInRanger() {
    let d = dist(mouseX, mouseY, this.p.x, this.p.y)
    if (d < this.size * 4) {
      return true
    } else {
      return false
    }
  }
}
