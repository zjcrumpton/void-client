import keys from "../keys/onKeyDown";
class Player {
    _state;
    constructor({ speed = 1.5, position: { x = 0, y = 0 }, size: { height = 20, width = 20 } }) {
        this._state = {
            speed,
            position: { x, y },
            size: { height, width }
        };
    }
    get state() {
        return this._state;
    }
    render = (context, ratio) => {
        console.log('xx width, width * ratio', this._state.size.width, this._state.size.width * ratio); // eslint-disable-line
        context.fillStyle = 'blue';
        context.fillRect(this._state.position.x, this._state.position.y, this.state.size.width * ratio, this.state.size.height * ratio);
    };
    update = () => {
        if (keys.isPressed.left) {
            this.state.position.x -= this.state.speed;
        }
        if (keys.isPressed.right) {
            this.state.position.x += this.state.speed;
        }
        if (keys.isPressed.up) {
            this.state.position.y -= this.state.speed;
        }
        if (keys.isPressed.down) {
            this.state.position.y += this.state.speed;
        }
    };
}
export default Player;
//# sourceMappingURL=Player.js.map