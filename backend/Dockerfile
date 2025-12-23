FROM python:3.11-slim

# System dependencies required for hnswlib / chromadb
RUN apt-get update && apt-get install -y \
    build-essential \
    g++ \
    gcc \
    cmake \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements first for better layer caching
COPY requirements.txt .

# Upgrade pip
RUN pip install --upgrade pip

# 🔴 CRITICAL FIX:
# Remove any Pydantic v2 artifacts and FORCE Pydantic v1
RUN pip uninstall -y pydantic pydantic-core pydantic-settings || true
RUN pip install --no-cache-dir --no-deps pydantic==1.10.13

# Install remaining dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Railway listens on 8080 internally
CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8080"]
