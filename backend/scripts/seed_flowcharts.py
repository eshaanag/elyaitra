import sqlite3
import os

# Adjust path if needed
DB_PATH = os.path.join(os.path.dirname(__file__), "../app.db")

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

flowcharts = [
    {
        "subject": "chemistry",
        "unit": "3",
        "title": "Solar Cells",
        "image": "/static/flowcharts/chemistry/chem-mod3.png",
    },
    # {
    #     "subject": "programming",
    #     "unit": "loops",
    #     "title": "While Loop Execution Flow",
    #     "image": "/static/flowcharts/programming/loops/while-loop.png",
    # },
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

print("✅ Flowcharts seeded successfully")
