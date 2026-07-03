from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend import crud, models, schemas, auth
from backend.database import get_db

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

# --- Contact Messages Routes ---

@router.post("/messages", response_model=schemas.ContactMessageResponse)
def create_contact_message(
    message: schemas.ContactMessageCreate,
    db: Session = Depends(get_db)
):
    return crud.create_contact_message(db, message)

@router.get("/messages", response_model=list[schemas.ContactMessageResponse])
def get_contact_messages(
    skip: int = 0, limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.get_contact_messages(db, skip, limit)

@router.patch("/messages/{message_id}/read", response_model=schemas.ContactMessageResponse)
def update_message_status(
    message_id: int,
    update_data: schemas.ContactMessageUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    from fastapi import HTTPException
    db_message = crud.update_contact_message_status(db, message_id, update_data)
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_message

@router.delete("/messages/{message_id}")
def delete_contact_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    from fastapi import HTTPException
    db_message = crud.delete_contact_message(db, message_id)
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"ok": True}

