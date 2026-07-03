import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.database import engine, Base
from backend.config import settings
from backend.routers import auth, home, about, services, portfolio, pricing, blog, contact, settings as settings_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Damn Aluminium Fabrication API")

# Setup CORS — read from env so Railway can add extra origins easily
origins = [o.strip() for o in settings.ALLOWED_ORIGINS.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory for static file serving
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include routers
app.include_router(auth.router)
app.include_router(home.router)
app.include_router(about.router)
app.include_router(services.router)
app.include_router(portfolio.router)
app.include_router(pricing.router)
app.include_router(blog.router)
app.include_router(contact.router)
app.include_router(settings_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Damn Aluminium Fabrication API"}
