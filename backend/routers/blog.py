import shutil
from typing import List
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from backend import crud, models, schemas, auth
from backend.database import get_db
from backend.config import settings

router = APIRouter(prefix="/api/blog", tags=["blog"])

@router.get("", response_model=List[schemas.BlogPostResponse])
def read_blog_posts(db: Session = Depends(get_db)):
    return crud.get_blog_posts(db)

@router.get("/{post_id}", response_model=schemas.BlogPostResponse)
def read_blog_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud.get_blog_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return db_post

@router.post("", response_model=schemas.BlogPostResponse)
def create_blog_post(
    post: schemas.BlogPostCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.create_blog_post(db=db, post=post)

@router.put("/{post_id}", response_model=schemas.BlogPostResponse)
def update_blog_post(
    post_id: int,
    post: schemas.BlogPostUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_post = crud.update_blog_post(db, post_id, post)
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return db_post

@router.delete("/{post_id}")
def delete_blog_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_post = crud.delete_blog_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted successfully"}

@router.post("/upload-image")
def upload_blog_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    file_location = f"{settings.UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    return {"url": f"/uploads/{file.filename}"}
