!function () {
    var view = document.querySelector('section.message')

    var model = {
        //获取数据
        init: function () {
            var APP_ID = 'XIFMRkgaxti8aXTwaVfMe0JQ-gzGzoHsz';
            var APP_KEY = 'wRnwckuHlGX43xuc761xQw3F';
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        fetch: function () {
            var query = new AV.Query('Message');
            return query.find()
        },
        //创建数据
        save: function (name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                'name': name,
                'content': content
            })

        }
    }

    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            this.model.fetch().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}: ${item.content}`
                        this.messageList.appendChild(li)
                    })

                }
            )
        },
        bindEvents: function () {
            this.form.addEventListener('submit', function (e) {
                e.preventDefault()
                this.saveMessage()
            }.bind(this))//用bind 将this 绑定到function里面
        },
        saveMessage: function () {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name, content)
            .then(function(object){
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                this.messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
            })
        }
    }
    controller.init(view, model)
}.call()


