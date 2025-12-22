import sqlite3
from pathlib import Path

# EXACT SAME DB PATH AS backend
DB_PATH = Path(__file__).resolve().parents[1] / "app" / "db" / "elyaitra.db"

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

flowcharts = [
    {
        "subject": "chemistry",
        "unit": "3",
        "title": "Solar Cells",
        "image": "/static/flowcharts/chemistry/chem-mod3.png",
    },
]

for fc in flowcharts:
    cur.execute(
        """
        INSERT INTO flowcharts (subject, unit, title, image_path)
        VALUES (?, ?, ?, ?)
        """,
        (fc["subject"], fc["unit"], fc["title"], fc["image"]),
    )

conn.commit()
conn.close()

print("✅ Flowcharts seeded successfully into elyaitra.db")
