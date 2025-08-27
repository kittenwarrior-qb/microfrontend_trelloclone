import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ======================= BOARDS =======================
app.get("/api/boards", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM boards");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/boards", async (req, res) => {
  try {
    const { name, color } = req.body;
    const [result] = await pool.query(
      "INSERT INTO boards (name, color) VALUES (?, ?)",
      [name, color || "#1890ff"]
    );
    res.json({ id: result.insertId, name, color: color || "#1890ff" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/boards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    await pool.query("UPDATE boards SET name=?, color=? WHERE id=?", [
      name,
      color,
      id,
    ]);
    const [rows] = await pool.query("SELECT * FROM boards WHERE id=?", [id]);
    res.json(rows[0]);

    res.json({ message: "Board updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/boards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM boards WHERE id=?", [id]);
    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================= LISTS =======================
app.get("/api/boards/:boardId/lists", async (req, res) => {
  try {
    const { boardId } = req.params;
    const [rows] = await pool.query("SELECT * FROM lists WHERE board_id=?", [
      boardId,
    ]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/boards/:boardId/lists", async (req, res) => {
  try {
    const { boardId } = req.params;
    const { name } = req.body;
    const [result] = await pool.query(
      "INSERT INTO lists (board_id, name) VALUES (?, ?)",
      [boardId, name]
    );
    res.json({ id: result.insertId, board_id: boardId, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete("/api/lists/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM lists WHERE id=?", [id]);
    res.json({ message: "List deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================= CARDS =======================
app.get("/api/lists/:listId/cards", async (req, res) => {
  try {
    const { listId } = req.params;
    const [rows] = await pool.query("SELECT * FROM cards WHERE list_id=?", [
      listId,
    ]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post("/api/lists/:listId/cards", async (req, res) => {
  try {
    const { listId } = req.params;
    const { title } = req.body;
    const [result] = await pool.query(
      "INSERT INTO cards (list_id, title) VALUES (?, ?)",
      [listId, title]
    );
    res.json({ id: result.insertId, list_id: listId, title });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body; 
    await pool.query("UPDATE cards SET title=? WHERE id=?", [title, id]);
    const [rows] = await pool.query("SELECT * FROM cards WHERE id=?", [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM cards WHERE id=?", [id]);
    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, list_id } = req.body;
    const updates= [];
    const values = [];

    if (title !== undefined) {
      updates.push("title=?");
      values.push(title);
    }
    if (list_id !== undefined) {
      updates.push("list_id=?");
      values.push(list_id);
    }
    values.push(id);

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    await pool.query(`UPDATE cards SET ${updates.join(", ")} WHERE id=?`, values);

    const [rows] = await pool.query("SELECT * FROM cards WHERE id=?", [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ======================= SERVER =======================
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
