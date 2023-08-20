// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../src/app";

describe("TESTING GET PUBLIC MOVIES ENDPOINTS...", () => {
    it("should return all movies", async () => {
        const response = await request(app).get("/api/public/movies");

        expect(response.body[0]).toHaveProperty("tmdb_link");
        expect(response.body[0]).toHaveProperty("tmdb_rating");
        expect(response.body[0]).toHaveProperty("duration");
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
        expect(response.redirect).toBeFalsy();
        expect(response.type).toBe("application/json");
        expect(response.charset).toBe("utf-8");
        expect(response.ok).toBeTruthy();
    });

    it("should return a random movie", async () => {
        const response = await request(app).get("/api/public/movies/random");

        expect(response.body[0]).toHaveProperty("tmdb_link");
        expect(response.body[0]).toHaveProperty("tmdb_rating");
        expect(response.body[0]).toHaveProperty("duration");
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
        expect(response.redirect).toBeFalsy();
        expect(response.type).toBe("application/json");
        expect(response.charset).toBe("utf-8");
        expect(response.ok).toBeTruthy();
    });

    it("should return a movie by id", async () => {
        const movie = await request(app).get("/api/public/movies/random");

        const response = await request(app).get(`/api/public/movies/${movie.body[0].id}`);

        expect(response.body).toHaveProperty("tmdb_link");
        expect(response.body).toHaveProperty("tmdb_rating");
        expect(response.body).toHaveProperty("duration");
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
        expect(response.redirect).toBeFalsy();
        expect(response.type).toBe("application/json");
        expect(response.charset).toBe("utf-8");
        expect(response.ok).toBeTruthy();
    });
});
