import { dist } from "@core/math/vector";

test("is distance between points correct", () => {
    const p1 = { x: 0, y: 4 };
    const p2 = { x: 3, y: 0 };
    expect(dist(p1, p2)).toBe(5);

    const p3 = { x: 0, y: 5 };
    const p4 = { x: 12, y: 0 };
    expect(dist(p3, p4)).toBe(13);

    const p5 = { x: 0, y: 7 };
    const p6 = { x: 24, y: 0 };
    expect(dist(p5, p6)).toBe(25);
});
