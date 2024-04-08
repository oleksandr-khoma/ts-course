abstract class Shape {
    readonly color: string;
    readonly name: string;

    protected constructor(color: string, name: string) {
        this.color = color;
        this.name = name;
    }

    abstract calculateArea(): number;
}

class Circle extends Shape {
    private readonly radius: number;

    constructor(radius: number, color: string, name: string) {
        super(color, name);
        this.radius = radius;
    }

    calculateArea(): number {
        return Math.PI * (this.radius ** 2);
    }
}

class Rectangle extends Shape {
    private readonly width: number;
    private readonly height: number;

    constructor(width: number, height: number, color: string, name: string) {
        super(color, name);
        this.width = width;
        this.height = height;
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    print(): void {
        console.log(`${this.name} area = width * height`);
    }
}

class Square extends Shape {
    private readonly side: number;

    constructor(side: number, color: string, name: string) {
        super(color, name);
        this.side = side;
    }

    calculateArea(): number {
        return this.side * this.side;
    }

    print(): void {
        console.log(`${this.name} area = side * side`);
    }
}

class Triangle extends Shape {
    private readonly base: number;
    private readonly height: number;

    constructor(base: number, height: number, color: string, name: string) {
        super(color, name);
        this.base = base;
        this.height = height;
    }

    calculateArea(): number {
        return (this.base * this.height) / 2;
    }
}
