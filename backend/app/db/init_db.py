from app.db.database import engine, Base
from app.models.user import User  # important: import model
from app.db.database import engine, Base
from app.models.payment import Payment  # 👈 ADD THIS


def init_db():
    Base.metadata.create_all(bind=engine)
