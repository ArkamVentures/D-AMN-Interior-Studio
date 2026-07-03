from typing import List, Optional, Any
from pydantic import BaseModel, EmailStr
from datetime import datetime, date

# --- User Schemas ---
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# --- HomeContent Schemas ---
class HomeContentBase(BaseModel):
    banner_title: Optional[str] = None
    banner_text: Optional[str] = None
    banner_image: Optional[str] = None
    featured_services: Optional[Any] = None

class HomeContentUpdate(HomeContentBase):
    pass

class HomeContentResponse(HomeContentBase):
    id: int
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# --- AboutContent Schemas ---
class AboutContentBase(BaseModel):
    company_story: Optional[str] = None
    mission: Optional[str] = None
    vision: Optional[str] = None
    founder_name: Optional[str] = None
    founder_title: Optional[str] = None
    founder_bio: Optional[str] = None
    founder_image: Optional[str] = None
    founder_experience: Optional[str] = None

class AboutContentUpdate(AboutContentBase):
    pass

class AboutContentResponse(AboutContentBase):
    id: int
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# --- Service Schemas ---
class ServiceBase(BaseModel):
    name: str
    description: str
    icon: Optional[str] = None
    price_range: Optional[str] = None
    order_num: Optional[int] = 0
    is_active: Optional[bool] = True

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(ServiceBase):
    name: Optional[str] = None
    description: Optional[str] = None

class ServiceResponse(ServiceBase):
    id: int

    class Config:
        from_attributes = True

# --- Portfolio Schemas ---
class PortfolioBase(BaseModel):
    title: str
    client_name: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None
    completion_date: Optional[date] = None
    description: Optional[str] = None
    images: Optional[Any] = None
    featured: Optional[bool] = False
    before_after: Optional[bool] = False

class PortfolioCreate(PortfolioBase):
    pass

class PortfolioUpdate(PortfolioBase):
    title: Optional[str] = None

class PortfolioResponse(PortfolioBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Pricing Schemas ---
class PricingBase(BaseModel):
    package_name: str
    price: str
    features: Optional[Any] = None
    is_active: Optional[bool] = True
    is_popular: Optional[bool] = False

class PricingCreate(PricingBase):
    pass

class PricingUpdate(PricingBase):
    package_name: Optional[str] = None
    price: Optional[str] = None

class PricingResponse(PricingBase):
    id: int

    class Config:
        from_attributes = True

# --- BlogPost Schemas ---
class BlogPostBase(BaseModel):
    title: str
    content: str
    featured_image: Optional[str] = None
    author: Optional[str] = None
    publish_date: Optional[date] = None
    tags: Optional[Any] = None
    status: Optional[str] = "draft"
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostUpdate(BlogPostBase):
    title: Optional[str] = None
    content: Optional[str] = None

class BlogPostResponse(BlogPostBase):
    id: int

    class Config:
        from_attributes = True

# --- ContactInfo Schemas ---
class ContactInfoBase(BaseModel):
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    whatsapp_number: Optional[str] = None
    whatsapp_link: Optional[str] = None
    business_hours: Optional[str] = None
    social_links: Optional[Any] = None

class ContactInfoUpdate(ContactInfoBase):
    pass

class ContactInfoResponse(ContactInfoBase):
    id: int

    class Config:
        from_attributes = True

# --- ContactMessage Schemas ---
class ContactMessageBase(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    service: str
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessageUpdate(BaseModel):
    is_read: bool

class ContactMessageResponse(ContactMessageBase):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
