import shutil
from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from backend import crud, models, schemas, auth
from backend.database import get_db
from backend.config import settings

router = APIRouter(prefix="/api/about", tags=["about"])

@router.get("", response_model=schemas.AboutContentResponse)
def get_about_content(db: Session = Depends(get_db)):
    return crud.get_about_content(db)

@router.put("", response_model=schemas.AboutContentResponse)
def update_about_content(
    content: schemas.AboutContentUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.update_about_content(db, content)

@router.post("/upload-founder")
def upload_founder_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    file_location = f"{settings.UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    update_data = schemas.AboutContentUpdate(founder_image=f"/uploads/{file.filename}")
    crud.update_about_content(db, update_data)
    
    return {"info": f"file '{file.filename}' saved at '{file_location}'"}
