import os
import shutil
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from .. import crud, models, schemas, auth
from ..database import get_db
from ..config import settings

router = APIRouter(prefix="/api/home", tags=["home"])

@router.get("", response_model=schemas.HomeContentResponse)
def get_home_content(db: Session = Depends(get_db)):
    return crud.get_home_content(db)

@router.put("", response_model=schemas.HomeContentResponse)
def update_home_content(
    content: schemas.HomeContentUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.update_home_content(db, content)

@router.post("/upload-banner")
def upload_banner(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    file_location = f"{settings.UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    # Update db entry
    update_data = schemas.HomeContentUpdate(banner_image=f"/uploads/{file.filename}")
    crud.update_home_content(db, update_data)
    
    return {"info": f"file '{file.filename}' saved at '{file_location}'"}
