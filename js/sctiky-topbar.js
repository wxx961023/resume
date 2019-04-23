!function () {
    var view = document.querySelector("#topNavBar")
    var controller = {
        view: null,
        init: function () {
            this.view = view
            this.bindEvents() //this.bindEvents.call(this)
        },
        bindEvents: function () {
            var view = this.view
            window.addEventListener('scroll', function () {
                if (window.scrollY > 0) {
                    view.classList.add('sticky')
                } else {
                    view.classList.remove('sticky')
                }
                findClosestAndRemoveOffset()
            })
        }
    }
    controller.init(view)
    // controller.init.call(controller,view)
}.call()