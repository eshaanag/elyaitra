FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    g++ \
    gcc \
    cmake \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ✅ EXPLICITLY COPY BACKEND REQUIREMENTS
COPY backend/requirements.txt ./requirements.txt

RUN pip install --upgrade pip
RUN pip uninstall -y pydantic pydantic-core pydantic-settings || true
RUN pip install --no-cache-dir pydantic==1.10.13
RUN pip install --no-cache-dir --no-deps -r requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# ✅ COPY ONLY BACKEND CODE
COPY backend ./app

CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8080"]
