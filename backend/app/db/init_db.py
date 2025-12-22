from app.db.database import get_db_connection

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # --------------------
    # Tables
    # --------------------
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS flashcards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT NOT NULL,
        unit TEXT NOT NULL,
        question TEXT NOT NULL,
        answer TEXT NOT NULL
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS flowcharts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT NOT NULL,
        unit TEXT NOT NULL,
        title TEXT NOT NULL,
        image_path TEXT NOT NULL
    )
    """)

    # --------------------
    # 🔥 SEED FLASHCARDS (THIS WAS MISSING)
    # --------------------
    cursor.execute(
        "SELECT COUNT(*) FROM flashcards WHERE subject = 'chemistry' AND unit = '3'"
    )
    exists = cursor.fetchone()[0]

    if exists == 0:
        cursor.execute(
            """
            INSERT INTO flashcards (subject, unit, question, answer)
            VALUES (?, ?, ?, ?)
            """,
            (
                "chemistry",
                "3",
                "What is a for loop?",
                "A for loop is a control structure used to repeat a block of code a fixed number of times."
            )
        )

    conn.commit()
    conn.close()
