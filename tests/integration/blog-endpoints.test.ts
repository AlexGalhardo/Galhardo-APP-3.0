// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../src/app";

describe("Testing blog endpoints...", () => {
    it("should return all blogs posts", async () => {
        const response = await request(app).get("/api/public/blog");

        expect(response.body[0]).toHaveProperty("category");
        expect(response.body[0]).toHaveProperty("body");
        expect(response.body[0]).toHaveProperty("slug");
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
        expect(response.redirect).toBeFalsy();
        expect(response.type).toBe("application/json");
        expect(response.charset).toBe("utf-8");
        expect(response.ok).toBeTruthy();
    });

    it("should return a random blog", async () => {
        const response = await request(app).get("/api/public/blog/random");

        expect(response.body[0]).toHaveProperty("category");
        expect(response.body[0]).toHaveProperty("body");
        expect(response.body[0]).toHaveProperty("slug");
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
        expect(response.redirect).toBeFalsy();
        expect(response.type).toBe("application/json");
        expect(response.charset).toBe("utf-8");
        expect(response.ok).toBeTruthy();
    });

    it("should return a blog by id", async () => {
        const blog = await request(app).get("/api/public/blog/random");

        const response = await request(app).get(`/api/public/blog/${blog.body[0].id}`);

        expect(response.body).toHaveProperty("category");
        expect(response.body).toHaveProperty("body");
        expect(response.body).toHaveProperty("slug");
        expect(response.body).toHaveProperty("id");
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
        expect(response.redirect).toBeFalsy();
        expect(response.type).toBe("application/json");
        expect(response.charset).toBe("utf-8");
        expect(response.ok).toBeTruthy();
    });
});
