from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime, Date, JSON
from sqlalchemy.sql import func
from backend.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    password_hash = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class HomeContent(Base):
    __tablename__ = "home_content"

    id = Column(Integer, primary_key=True, index=True)
    banner_title = Column(String(255))
    banner_text = Column(Text)
    banner_image = Column(String(255))
    featured_services = Column(JSON)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class AboutContent(Base):
    __tablename__ = "about_content"

    id = Column(Integer, primary_key=True, index=True)
    company_story = Column(Text)
    mission = Column(Text)
    vision = Column(Text)
    founder_name = Column(String(100))
    founder_title = Column(String(100))
    founder_bio = Column(Text)
    founder_image = Column(String(255))
    founder_experience = Column(String(50))
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    description = Column(Text)
    icon = Column(String(255))
    price_range = Column(String(50))
    order_num = Column(Integer)
    is_active = Column(Boolean, default=True)

class Portfolio(Base):
    __tablename__ = "portfolio"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    client_name = Column(String(100))
    location = Column(String(200))
    category = Column(String(50))
    completion_date = Column(Date)
    description = Column(Text)
    images = Column(JSON)
    featured = Column(Boolean, default=False)
    before_after = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Pricing(Base):
    __tablename__ = "pricing"

    id = Column(Integer, primary_key=True, index=True)
    package_name = Column(String(100))
    price = Column(String(50))
    features = Column(JSON)
    is_active = Column(Boolean, default=True)
    is_popular = Column(Boolean, default=False)

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    content = Column(Text)
    featured_image = Column(String(255))
    author = Column(String(100))
    publish_date = Column(Date)
    tags = Column(JSON)
    status = Column(String(20), default="draft")
    seo_title = Column(String(255))
    seo_description = Column(Text)

class ContactInfo(Base):
    __tablename__ = "contact_info"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(20))
    email = Column(String(100))
    address = Column(Text)
    whatsapp_number = Column(String(20))
    whatsapp_link = Column(String(255))
    business_hours = Column(String(200))
    social_links = Column(JSON)

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    phone = Column(String(50))
    email = Column(String(100), nullable=True)
    service = Column(String(100))
    message = Column(Text)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class SiteSettings(Base):
    """Single-row table storing all website content as JSON.
    id=1 is always the active settings record."""
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, default=1)
    data = Column(JSON, nullable=False, default=dict)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
