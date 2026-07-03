from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend import models, auth
from backend.database import get_db
from pydantic import BaseModel
from typing import Any

router = APIRouter(prefix="/api/settings", tags=["settings"])

class SiteSettingsPayload(BaseModel):
    data: Any

@router.get("")
def get_settings(db: Session = Depends(get_db)):
    """Public endpoint — returns all website content."""
    record = db.query(models.SiteSettings).filter(models.SiteSettings.id == 1).first()
    if not record:
        return {"data": {}}
    return {"data": record.data}

@router.put("")
def save_settings(
    payload: SiteSettingsPayload,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    """Admin-only endpoint — saves all website content."""
    record = db.query(models.SiteSettings).filter(models.SiteSettings.id == 1).first()
    if record:
        record.data = payload.data
    else:
        record = models.SiteSettings(id=1, data=payload.data)
        db.add(record)
    db.commit()
    db.refresh(record)
    return {"ok": True, "data": record.data}
