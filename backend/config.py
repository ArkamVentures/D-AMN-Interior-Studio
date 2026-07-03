import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# Always resolve .env relative to this file's directory (backend/)
_env_file = Path(__file__).parent / ".env"

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./damn_aluminium.db"
    SECRET_KEY: str = "change-me-in-production-please"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 5242880
    ALLOWED_ORIGINS: str = "http://localhost:5173,https://damn-aluminium.vercel.app"

    model_config = SettingsConfigDict(env_file=str(_env_file), extra="ignore")

settings = Settings()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
