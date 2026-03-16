// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined so they are available for the tests.
 */
export class Size {
    constructor (width = 80, height = 60) {
    this.width = width;
    this.height = height;
    }
    // @ts-ignore
    resize(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
    }
}

export class Position {
    constructor (x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    // @ts-ignore
    move(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
}

export class ProgramWindow {
    constructor (){
        this.screenSize = new Size(800, 600);
        this.size = new Size();
        this.position = new Position();
    }
    // @ts-ignore
    resize(newSize) {
        const maxWidth = this.screenSize.width - this.position.x;
        const maxHeight = this.screenSize.height - this.position.y;
        const newWidth = Math.max(1, newSize.width);
        const newHeight = Math.max(1, newSize.height);

        this.size.width = Math.min(newWidth, maxWidth);
        this.size.height = Math.min(newHeight, maxHeight);
    }
    // @ts-ignore
    move(newPosition) {
        const maxX = this.screenSize.width - this.size.width;
        const maxY = this.screenSize.height - this.size.height;
        const newX = Math.max(0, newPosition.x);
        const newY = Math.max(0, newPosition.y);

        this.position.x = Math.min(newX, maxX);
        this.position.y = Math.min(newY, maxY);
    }
}
// @ts-ignore
export function changeWindow(programWindow) {
    programWindow.resize(new Size(400, 300));
    programWindow.move(new Position(100, 150));
    return programWindow;
}