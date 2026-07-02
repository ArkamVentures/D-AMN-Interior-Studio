from sqlalchemy.orm import Session
from backend import models, schemas, auth

# --- User ---
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# --- HomeContent ---
def get_home_content(db: Session):
    content = db.query(models.HomeContent).first()
    if not content:
        content = models.HomeContent(banner_title="Welcome", banner_text="Home of Damn Aluminium Fabrication")
        db.add(content)
        db.commit()
        db.refresh(content)
    return content

def update_home_content(db: Session, content_update: schemas.HomeContentUpdate):
    db_content = get_home_content(db)
    update_data = content_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_content, key, value)
    db.commit()
    db.refresh(db_content)
    return db_content

# --- AboutContent ---
def get_about_content(db: Session):
    content = db.query(models.AboutContent).first()
    if not content:
        content = models.AboutContent(company_story="Our Story")
        db.add(content)
        db.commit()
        db.refresh(content)
    return content

def update_about_content(db: Session, content_update: schemas.AboutContentUpdate):
    db_content = get_about_content(db)
    update_data = content_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_content, key, value)
    db.commit()
    db.refresh(db_content)
    return db_content

# --- Services ---
def get_services(db: Session):
    return db.query(models.Service).order_by(models.Service.order_num).all()

def create_service(db: Session, service: schemas.ServiceCreate):
    db_service = models.Service(**service.model_dump())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

def update_service(db: Session, service_id: int, service: schemas.ServiceUpdate):
    db_service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if db_service:
        update_data = service.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_service, key, value)
        db.commit()
        db.refresh(db_service)
    return db_service

def delete_service(db: Session, service_id: int):
    db_service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if db_service:
        db.delete(db_service)
        db.commit()
    return db_service

# --- Portfolio ---
def get_portfolios(db: Session, featured: bool = None):
    query = db.query(models.Portfolio)
    if featured is not None:
        query = query.filter(models.Portfolio.featured == featured)
    return query.order_by(models.Portfolio.created_at.desc()).all()

def create_portfolio(db: Session, portfolio: schemas.PortfolioCreate):
    db_portfolio = models.Portfolio(**portfolio.model_dump())
    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio

def update_portfolio(db: Session, portfolio_id: int, portfolio: schemas.PortfolioUpdate):
    db_portfolio = db.query(models.Portfolio).filter(models.Portfolio.id == portfolio_id).first()
    if db_portfolio:
        update_data = portfolio.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_portfolio, key, value)
        db.commit()
        db.refresh(db_portfolio)
    return db_portfolio

def delete_portfolio(db: Session, portfolio_id: int):
    db_portfolio = db.query(models.Portfolio).filter(models.Portfolio.id == portfolio_id).first()
    if db_portfolio:
        db.delete(db_portfolio)
        db.commit()
    return db_portfolio

# --- Pricing ---
def get_pricings(db: Session):
    return db.query(models.Pricing).all()

def create_pricing(db: Session, pricing: schemas.PricingCreate):
    db_pricing = models.Pricing(**pricing.model_dump())
    db.add(db_pricing)
    db.commit()
    db.refresh(db_pricing)
    return db_pricing

def update_pricing(db: Session, pricing_id: int, pricing: schemas.PricingUpdate):
    db_pricing = db.query(models.Pricing).filter(models.Pricing.id == pricing_id).first()
    if db_pricing:
        update_data = pricing.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_pricing, key, value)
        db.commit()
        db.refresh(db_pricing)
    return db_pricing

def delete_pricing(db: Session, pricing_id: int):
    db_pricing = db.query(models.Pricing).filter(models.Pricing.id == pricing_id).first()
    if db_pricing:
        db.delete(db_pricing)
        db.commit()
    return db_pricing

# --- BlogPost ---
def get_blog_posts(db: Session):
    return db.query(models.BlogPost).all()

def get_blog_post(db: Session, post_id: int):
    return db.query(models.BlogPost).filter(models.BlogPost.id == post_id).first()

def create_blog_post(db: Session, post: schemas.BlogPostCreate):
    db_post = models.BlogPost(**post.model_dump())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def update_blog_post(db: Session, post_id: int, post: schemas.BlogPostUpdate):
    db_post = get_blog_post(db, post_id)
    if db_post:
        update_data = post.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_post, key, value)
        db.commit()
        db.refresh(db_post)
    return db_post

def delete_blog_post(db: Session, post_id: int):
    db_post = get_blog_post(db, post_id)
    if db_post:
        db.delete(db_post)
        db.commit()
    return db_post

# --- ContactInfo ---
def get_contact_info(db: Session):
    info = db.query(models.ContactInfo).first()
    if not info:
        info = models.ContactInfo(email="contact@example.com")
        db.add(info)
        db.commit()
        db.refresh(info)
    return info

def update_contact_info(db: Session, info_update: schemas.ContactInfoUpdate):
    db_info = get_contact_info(db)
    update_data = info_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_info, key, value)
    db.commit()
    db.refresh(db_info)
    return db_info
