const request = require("supertest");
const app = require("../app");
const pool = require("../config/db");
const bcrypt = require("bcryptjs");

describe("Transaction tests", () => {
    let token, testUser;

    beforeAll(async () => {

        await pool.query("DELETE FROM users");
        await pool.query("DELETE FROM transactions");

        const hashedPassword = await bcrypt.hash("123456", 10);

        await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            ["Test User", "test@example.com", hashedPassword, "admin"]
        );

        const loginRes = await request(app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "123456"
        });

        console.log("LOGIN RESPONSE:", loginRes.body);

        token = loginRes.body.token;
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", ["test@example.com"]);
        testUser = rows[0];
    });

    it("Should create new transaction", async () => {
        const res = await request(app)
            .post("/api/transactions")
            .set("Authorization", `Bearer ${token}`)
            .send({
                type: "income",
                amount: 500,
                category: "Payment",
                description: "Monthly payment",
                date: "2025-01-31"
            });

        console.log(res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "Transaction created successfully!");
    });

    it("Should list user´s transactions.", async () => {
        const res = await request(app)
            .get("/api/transactions")
            .set("Authorization", `Bearer ${token}`);

        console.log(res.body);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    afterAll(async () => {
        await pool.query("DELETE FROM transactions");
        await pool.query("DELETE FROM users");
        await pool.end();
    });
});
