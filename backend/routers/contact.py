from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.get("", response_model=schemas.ContactInfoResponse)
def get_contact_info(db: Session = Depends(get_db)):
    return crud.get_contact_info(db)

@router.put("", response_model=schemas.ContactInfoResponse)
def update_contact_info(
    info: schemas.ContactInfoUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.update_contact_info(db, info)
