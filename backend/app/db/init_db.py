from app.db.database import engine, Base
from app.models.user import User  # important: import model

def init_db():
    Base.metadata.create_all(bind=engine)
