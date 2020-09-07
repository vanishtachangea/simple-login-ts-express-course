export interface ITile {
    id: string;
    colour: string;
    xPos: number;
    yPos: number;
    isMarked: boolean;
    isTraversed: boolean;
}

class Tile implements ITile {

    public id: string;
    public colour: string;
    public xPos: number;
    public yPos: number;
    public isMarked: boolean = false;
    public isTraversed: boolean = false;

    constructor(id: string, colour: string, x: number, y: number, isMarked?: boolean, isTraversed?: boolean) {
        this.id = id;
        this.colour = colour;
        this.xPos = x;
        this.yPos = y;
        if (isMarked)
            this.isMarked = isMarked;
        if (isTraversed)
            this.isTraversed = isTraversed;
    }
}

export default Tile;
