from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, models, schemas, auth
from backend.database import get_db

router = APIRouter(prefix="/api/pricing", tags=["pricing"])

@router.get("", response_model=List[schemas.PricingResponse])
def read_pricings(db: Session = Depends(get_db)):
    return crud.get_pricings(db)

@router.post("", response_model=schemas.PricingResponse)
def create_pricing(
    pricing: schemas.PricingCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.create_pricing(db=db, pricing=pricing)

@router.put("/{pricing_id}", response_model=schemas.PricingResponse)
def update_pricing(
    pricing_id: int,
    pricing: schemas.PricingUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_pricing = crud.update_pricing(db, pricing_id, pricing)
    if not db_pricing:
        raise HTTPException(status_code=404, detail="Pricing package not found")
    return db_pricing

@router.delete("/{pricing_id}")
def delete_pricing(
    pricing_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_pricing = crud.delete_pricing(db, pricing_id)
    if not db_pricing:
        raise HTTPException(status_code=404, detail="Pricing package not found")
    return {"message": "Pricing package deleted successfully"}
