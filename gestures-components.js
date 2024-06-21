const oneFingerRotateComponent = {
    schema: {
        factor: {default: 5},
      },
      init() {
        this.handleEvent = this.handleEvent.bind(this)
        this.el.sceneEl.addEventListener('twofingermove', this.handleEvent)
        this.el.classList.add('cantap')  // Needs "objects: .cantap" attribute on raycaster.
      },
      remove() {
        this.el.sceneEl.removeEventListener('twofingermove', this.handleEvent)
      },
      handleEvent(event) {
        this.el.object3D.rotation.y += event.detail.positionChange.x * this.data.factor
      },
}

const pinchScaleComponent ={
    schema: {
        min: {default: 0.33},
        max: {default: 3},
        scale: {default: 0},  // If scale is set to zero here, the object's initial scale is used.
      },
      init() {
        const s = this.data.scale
        this.initialScale = (s && {x: s, y: s, z: s}) || this.el.object3D.scale.clone()
        this.scaleFactor = 1
        this.handleEvent = this.handleEvent.bind(this)
        this.el.sceneEl.addEventListener('twofingermove', this.handleEvent)
        this.el.classList.add('cantap')  // Needs "objects: .cantap" attribute on raycaster.
      },
      remove() {
        this.el.sceneEl.removeEventListener('twofingermove', this.handleEvent)
      },
      handleEvent(event) {
        this.scaleFactor *= 1 + event.detail.spreadChange / event.detail.startSpread
        this.scaleFactor = Math.min(Math.max(this.scaleFactor, this.data.min), this.data.max)
    
        this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x
        this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y
        this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z
      },
}

export {
    oneFingerRotateComponent,
    pinchScaleComponent,
}