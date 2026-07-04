# ---------- Stage 1 : Build React ----------
FROM node:22-alpine AS frontend

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build


# ---------- Stage 2 : Build FastAPI ----------
FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Copy React build into FastAPI static folder
COPY --from=frontend /frontend/dist ./frontend/dist

RUN mkdir -p uploads temp/chroma database

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]