const instructionsComponent = () => ({
  init() {
    const scene = this.el.sceneEl;
    const model = document.getElementById('model')
    scene.setAttribute('rotate-gesture', '')
    
  },
})

export { instructionsComponent }
