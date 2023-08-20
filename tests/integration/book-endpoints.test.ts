// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../src/app";

describe("TESTING GET PUBLIC BOOKS ENDPOINTS...", () => {
    it("should return all books", async () => {
        const response = await request(app).get("/api/public/books");

        expect(response.body[0]).toHaveProperty("pages");
        expect(response.body[0]).toHaveProperty("author");
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
        expect(response.redirect).toBeFalsy();
        expect(response.type).toBe("application/json");
        expect(response.charset).toBe("utf-8");
        expect(response.ok).toBeTruthy();
    });

    it("should return a random book", async () => {
        const response = await request(app).get("/api/public/books/random");

        expect(response.body[0]).toHaveProperty("pages");
        expect(response.body[0]).toHaveProperty("author");
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
        expect(response.redirect).toBeFalsy();
        expect(response.type).toBe("application/json");
        expect(response.charset).toBe("utf-8");
        expect(response.ok).toBeTruthy();
    });

    it("should return a book by id", async () => {
        const book = await request(app).get(`/api/public/books/random`);
        const response = await request(app).get(`/api/public/books/${book.body[0].id}`);

        expect(response.body).toHaveProperty("pages");
        expect(response.body).toHaveProperty("author");
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
