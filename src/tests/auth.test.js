const request = require("supertest");
const app = require("../app");
const pool = require("../config/db");
const bcrypt = require("bcryptjs");

describe("Authentication Tests", () => {
    let testUser;

    beforeAll(async () => {
        await pool.query("DELETE FROM users");
        const hashedPassword = await bcrypt.hash("123456", 10);
        await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            ["Test User", "test@example.com", hashedPassword, "admin"]
        );
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", ["test@example.com"]);
        testUser = rows[0];
    });

    it("Should return error while trying to login with invalid credentials", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "wrong@example.com",
            password: "wrongpassword"
        });
        console.log(res.body); 

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("message", "Invalid credentials.");
    });

    it("Should login successfully and return token", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "123456"
        });

        console.log(res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    afterAll(async () => {
        await pool.query("DELETE FROM users");
        await pool.end();
    });
});