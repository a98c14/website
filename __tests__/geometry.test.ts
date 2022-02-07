import { dist } from "@core/math/vector";

test("adds 1 + 2 to equal 3", () => {
    const p1 = { x: 0, y: 4 };
    const p2 = { x: 3, y: 0 };
    expect(dist(p1, p2)).toBe(5);
});
