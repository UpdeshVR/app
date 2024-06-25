export function registerScaleGesture() {
  AFRAME.registerComponent("scale-gesture", {
    schema: {
      enabled: { default: true },
    },

    init: function () {
      this.modelEntity = document.querySelector("#model");
      this.model = this.modelEntity.object3D;

      this.startDistance = 0;
      this.startScale = new THREE.Vector3();
      this.initScale = new THREE.Vector3();

      this.bindMethods();
      this.addEventListeners();
    },

    bindMethods: function () {
      this.onTouchStart = this.onTouchStart.bind(this);
      this.onTouchMove = this.onTouchMove.bind(this);
      this.onTouchEnd = this.onTouchEnd.bind(this);
      this.onWheel = this.onWheel.bind(this);
    },

    addEventListeners: function () {
      const sceneEl = this.el.sceneEl;
      sceneEl.addEventListener("touchstart", this.onTouchStart);
      sceneEl.addEventListener("touchmove", this.onTouchMove);
      sceneEl.addEventListener("touchend", this.onTouchEnd);
      sceneEl.addEventListener("wheel", this.onWheel);
    },

    removeEventListeners: function () {
      const sceneEl = this.el.sceneEl;
      sceneEl.removeEventListener("touchstart", this.onTouchStart);
      sceneEl.removeEventListener("touchmove", this.onTouchMove);
      sceneEl.removeEventListener("touchend", this.onTouchEnd);
      sceneEl.removeEventListener("wheel", this.onWheel);
    },

    onTouchStart: function (event) {
      if (event.touches.length === 2) {
        this.startDistance = this.getDistance(
          event.touches[0],
          event.touches[1]
        );
        this.startScale.copy(this.model.scale);
      }
    },

    onTouchMove: function (event) {
      if (event.touches.length === 2) {
        const currentDistance = this.getDistance(
          event.touches[0],
          event.touches[1]
        );
        this.scaleModel(currentDistance / this.startDistance);
      }
    },

    onTouchEnd: function (event) {
      if (event.touches.length === 0) {
        this.startDistance = 0;
      }
    },

    onWheel: function (event) {
      const scaleFactor = 1 + event.deltaY * -0.001;
      this.scaleModel(scaleFactor);
    },

    scaleModel: function (scaleFactor) {
      this.model.scale.set(
        this.model.scale.x * scaleFactor,
        this.model.scale.y * scaleFactor,
        this.model.scale.z * scaleFactor
      );
    },

    getDistance: function (touch1, touch2) {
      const dx = touch1.pageX - touch2.pageX;
      const dy = touch1.pageY - touch2.pageY;
      return Math.sqrt(dx * dx + dy * dy);
    },

    remove: function () {
      this.removeEventListeners();
    },
  });

  // document.querySelector('a-scene').setAttribute('scale-gesture', '');
}
