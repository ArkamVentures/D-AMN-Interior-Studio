import shutil
from typing import List, Optional
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from .. import crud, models, schemas, auth
from ..database import get_db
from ..config import settings

router = APIRouter(prefix="/api/portfolio", tags=["portfolio"])

@router.get("", response_model=List[schemas.PortfolioResponse])
def read_portfolios(featured: Optional[bool] = None, db: Session = Depends(get_db)):
    return crud.get_portfolios(db, featured=featured)

@router.post("", response_model=schemas.PortfolioResponse)
def create_portfolio(
    portfolio: schemas.PortfolioCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.create_portfolio(db=db, portfolio=portfolio)

@router.put("/{portfolio_id}", response_model=schemas.PortfolioResponse)
def update_portfolio(
    portfolio_id: int,
    portfolio: schemas.PortfolioUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_portfolio = crud.update_portfolio(db, portfolio_id, portfolio)
    if not db_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    return db_portfolio

@router.delete("/{portfolio_id}")
def delete_portfolio(
    portfolio_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_portfolio = crud.delete_portfolio(db, portfolio_id)
    if not db_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    return {"message": "Portfolio item deleted successfully"}

@router.post("/upload")
def upload_portfolio_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    file_location = f"{settings.UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    return {"url": f"/uploads/{file.filename}"}
