// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../src/app";

describe("TESTING GET PUBLIC GAMES ENDPOINTS...", () => {
    it("should return all games", async () => {
        const response = await request(app).get("/api/public/games");

        expect(response.body[0]).toHaveProperty("platforms");
        expect(response.body[0]).toHaveProperty("igdb_link");
        expect(response.body[0]).toHaveProperty("igdb_rating");
        expect(response.body[0]).toHaveProperty("developer");
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
        expect(response.redirect).toBeFalsy();
        expect(response.type).toBe("application/json");
        expect(response.charset).toBe("utf-8");
        expect(response.ok).toBeTruthy();
    });

    it("should return a random game", async () => {
        const response = await request(app).get("/api/public/games/random");

        expect(response.body[0]).toHaveProperty("platforms");
        expect(response.body[0]).toHaveProperty("igdb_link");
        expect(response.body[0]).toHaveProperty("igdb_rating");
        expect(response.body[0]).toHaveProperty("developer");
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.status).toBe(200);
        expect(response.redirect).toBeFalsy();
        expect(response.type).toBe("application/json");
        expect(response.charset).toBe("utf-8");
        expect(response.ok).toBeTruthy();
    });

    it("should return a game by id", async () => {
        const game = await request(app).get(`/api/public/games/random`);
        const response = await request(app).get(`/api/public/games/${game.body[0].id}`);

        expect(response.body).toHaveProperty("platforms");
        expect(response.body).toHaveProperty("igdb_link");
        expect(response.body).toHaveProperty("igdb_rating");
        expect(response.body).toHaveProperty("developer");
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
