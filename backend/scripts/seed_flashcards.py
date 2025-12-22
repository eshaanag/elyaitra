import sqlite3

conn = sqlite3.connect("app.db")
cur = conn.cursor()

flashcards = [
    {
"subject":"chemistry",
"unit":"3",
"question":"What is ?",
"answer": (
"A for loop is a control structure used to execute a block of code "
"a fixed number of times. It consists of initialization, condition "
"checking, and updation of the loop variable."
        ),
    },
    {
"subject":"programming",
"unit":"loops",
"question":"Difference between for loop and while loop.",
"answer": (
"For loop is used when the number of iterations is known in advance, "
"whereas while loop is used when the number of iterations is not known."
        ),
    },
]

for fc in flashcards:
    cur.execute(
        """
        INSERT INTO flashcards (subject, unit, question, answer)
        VALUES (?, ?, ?, ?)
        """,
        (fc["subject"], fc["unit"], fc["question"], fc["answer"]),
    )

conn.commit()
conn.close()

print("Flashcards seeded successfully")

