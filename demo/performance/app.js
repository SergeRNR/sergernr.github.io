{
    let $body = document.body;

    let bodyDims = $body.getBoundingClientRect();
    let iconProto = document.querySelector('.proto');
    let iconDims = iconProto.getBoundingClientRect();

    let maxWidth = Math.floor(bodyDims.width - iconDims.width);
    let maxHeight = Math.floor(bodyDims.height - iconDims.height);

    let delta = 2;

    class App {
        constructor() {
            this.minimum = 20;
            this.count = this.minimum;
            this.enable = true;
            this.optimize = false;
            this.update = this.update.bind(this);
        }

        init() {
            $body.removeChild(iconProto);
            iconProto.classList.remove('proto');

            this.addListeners();
            this.restart();
            this.frame = window.requestAnimationFrame(this.update);
        }

        restart() {
            if (this.movers) {
                for (let i=0, l=this.movers.length; i<l; i++) {
                    $body.removeChild(this.movers[i]);
                }
                bodyDims = $body.getBoundingClientRect();
                $body.appendChild(iconProto);
                iconDims = iconProto.getBoundingClientRect();
                $body.removeChild(iconProto);
                maxWidth = Math.floor(bodyDims.width - iconDims.width);
                maxHeight = Math.floor(bodyDims.height - iconDims.height);
            }

            for (let i=0; i<this.count; i++) {
                let node = iconProto.cloneNode();
                let top = Math.floor(Math.random() * (maxHeight));
                let left = Math.floor(Math.random() * (maxWidth));
                let direction = {};

                top % 2 === 0 ? direction.y = 1 : direction.y = -1;
                left % 2 === 0 ? direction.x = 1 : direction.x = -1;

                node.style.top = `${top}px`;
                node.style.left = `${left}px`;
                node.position = { top, left };
                node.direction = direction;

                $body.appendChild(node);
            }

            this.movers = document.querySelectorAll('.mover');
        }

        update() {
            for (let i=0; i<this.count; i++) {
                let node = this.movers[i];
                let { direction, position } = node;
                let top, left;

                if (this.optimize) {
                    top = direction.y > 0 ? position.top + delta : position.top - delta;
                    left = direction.x > 0 ? position.left + delta : position.left - delta;
                } else {
                    top = direction.y > 0 ? node.offsetTop + delta : node.offsetTop - delta;
                    left = direction.x > 0 ? node.offsetLeft + delta : node.offsetLeft - delta;
                }

                if (left < 0 || left === 0) {
                    left = 0;
                    direction.x = 1;
                } else if (left > maxWidth) {
                    left = maxWidth;
                    direction.x = -1;
                }

                if (top < 0 || top === 0) {
                    top = 0;
                    direction.y = 1;
                } else if (top > maxHeight) {
                    top = maxHeight;
                    direction.y = -1;
                }

                node.style.top = `${top}px`;
                node.style.left = `${left}px`;
                node.position = { top, left };
                node.direction = direction;
            }
            this.frame = window.requestAnimationFrame(this.update);
        }

        addListeners() {
            let $buttonRemove = document.querySelector('#btnRemove');

            document.querySelector('#btnOptimize').addEventListener('click', ((e) => {
                if (this.optimize) {
                    e.target.textContent = 'Optimize';
                    this.optimize = false;
                } else {
                    e.target.textContent = 'Un-optimize';
                    this.optimize = true;
                }
            }).bind(this));

            document.querySelector('#btnAdd').addEventListener('click', ((e) => {
                this.count += this.minimum;
                if ($buttonRemove.disabled) {
                    $buttonRemove.disabled = false;
                }
                this.restart();
            }).bind(this));

            $buttonRemove.addEventListener('click', ((e) => {
                this.count -= this.minimum;
                if (this.count === this.minimum) {
                    $buttonRemove.disabled = true;
                }
                this.restart();
            }).bind(this));
        }
    }

    const app = new App();
    app.init();
}