// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../src/app";

describe("TESTING GET PUBLIC TV SHOWS ENDPOINTS...", () => {
    it("should return all tvshows", async () => {
        const response = await request(app).get("/api/public/tvshows");

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

    it("should return a random tv show", async () => {
        const response = await request(app).get("/api/public/tvshows/random");

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

    it("should return a tvshow by id", async () => {
        const tvshow = await request(app).get("/api/public/tvshows/random");

        const response = await request(app).get(`/api/public/tvshows/${tvshow.body[0].id}`);

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
