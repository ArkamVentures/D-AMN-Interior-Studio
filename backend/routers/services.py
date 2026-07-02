from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/services", tags=["services"])

@router.get("", response_model=List[schemas.ServiceResponse])
def read_services(db: Session = Depends(get_db)):
    return crud.get_services(db)

@router.post("", response_model=schemas.ServiceResponse)
def create_service(
    service: schemas.ServiceCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.create_service(db=db, service=service)

@router.put("/{service_id}", response_model=schemas.ServiceResponse)
def update_service(
    service_id: int,
    service: schemas.ServiceUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_service = crud.update_service(db, service_id, service)
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    return db_service

@router.delete("/{service_id}")
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_service = crud.delete_service(db, service_id)
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted successfully"}
