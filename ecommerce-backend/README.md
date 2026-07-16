# E-Commerce Platform (Django + DRF)

A production-inspired e-commerce backend built with Django and Django REST Framework.

The goal of this project is **not only to build an online store**, but to practice backend engineering, clean architecture, database design, REST APIs, authentication, testing, and deployment.

---

# 🎯 Goals

- Learn Django deeply
- Learn Django REST Framework
- Design scalable database models
- Build production-style APIs
- Practice authentication & authorization
- Implement business logic instead of CRUD only
- Produce a portfolio-worthy project

---

# Tech Stack

- Python
- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication
- Docker (later)
- Redis (later)
- Celery (later)
- Pytest
- Git & GitHub

---

# Project Structure

```
config/
core/
users/
catalog/
cart/
orders/
payments/
reviews/
```

---

# Phase 1 — Foundation ✅

## Core

- [x] Project setup
- [x] PostgreSQL
- [x] TimeStampedModel
- [x] Custom User Model
- [x] Authentication configuration

## Catalog

- [x] Category
- [x] Product
- [x] ProductVariant
- [x] Inventory

---

# Phase 2 — Django Admin

## Category Admin

## Stretch Goal

- [ ] ProductVariant Inline
- [ ] Inventory Inline

---

# Phase 3 — Authentication API

## Users

- [ ] Register
- [ ] Login
- [ ] Logout
- [ ] Refresh Token
- [ ] Current User

Learn:

- JWT
- Permissions
- Authentication
- Serializers
- Validation

---

# Phase 4 — Catalog API

## Categories

- [ ] List
- [ ] Detail

## Products

- [ ] List
- [ ] Detail
- [ ] Search
- [ ] Filtering
- [ ] Ordering
- [ ] Pagination

## Product Variants

- [ ] List variants
- [ ] Variant details

Learn:

- Generic Views
- ViewSets
- Routers
- Query optimization
- Serializer nesting

---

# Phase 5 — Cart

Models

- [ ] Cart
- [ ] CartItem

Features

- [ ] Create cart
- [ ] Add product
- [ ] Remove product
- [ ] Update quantity
- [ ] Calculate total

Learn

- Business logic
- Transactions
- Validation

---

# Phase 6 — Orders

Models

- [ ] Order
- [ ] OrderItem

Features

- [ ] Checkout
- [ ] Order creation
- [ ] Order history
- [ ] Order details

Business Rules

- Decrease inventory
- Validate stock
- Prevent overselling

Learn

- Atomic transactions
- Signals vs Services
- Domain logic

---

# Phase 7 — Payments

Models

- [ ] Payment

Features

- [ ] Payment Status
- [ ] Mock Payment Gateway

Statuses

- Pending
- Paid
- Failed
- Refunded

Learn

- Payment workflows
- State management

---

# Phase 8 — Reviews

Models

- [ ] Review

Rules

- One review per user
- Rating 1-5
- Comment

API

- Create
- Update
- Delete
- List

---

# Phase 9 — Images

Models

- [ ] ProductImage

Features

- Upload
- Multiple images
- Thumbnail

---

# Phase 10 — Permissions

Anonymous

- Browse products

Authenticated

- Cart
- Orders
- Reviews

Admin

- CRUD everything

Learn

- Custom Permissions
- Role-based access

---

# Phase 11 — Optimization

Learn

- select_related()
- prefetch_related()
- annotate()
- aggregation()

Reduce N+1 queries.

---

# Phase 12 — Testing

Unit Tests

- Models
- Services

API Tests

- Authentication
- Products
- Cart
- Orders

Goal

- >80% coverage

---

# Phase 13 — Documentation

- [ ] Swagger / OpenAPI
- [ ] API examples
- [ ] README
- [ ] Architecture diagram

---

# Phase 14 — Docker

- Dockerfile
- docker-compose
- PostgreSQL
- Django

---

# Phase 15 — Deployment

Deploy

- Railway
- Render
- Fly.io

Production

- Gunicorn
- WhiteNoise
- Environment Variables

---

# Bonus Features

## Wishlist

- [ ] Wishlist
- [ ] Favorites

## Coupons

- [ ] Coupon
- [ ] Discount

## Shipping

- [ ] Shipping Address
- [ ] Shipping Cost

## Notifications

- [ ] Email Confirmation
- [ ] Order Updates

## Inventory

- [ ] Low stock alerts
- [ ] Stock history

## Admin Dashboard

- [ ] Sales
- [ ] Orders
- [ ] Revenue
- [ ] Best Sellers

## Search

- [ ] PostgreSQL Full Text Search

## Caching

- [ ] Redis
- [ ] Cached product list

## Background Jobs

- [ ] Celery
- [ ] Email sending

---

# Refactoring Goals

As the project grows:

- [ ] Introduce Service Layer
- [ ] Custom Managers
- [ ] Repository Pattern (discussion)
- [ ] DTOs
- [ ] Better domain separation

---

# What I Want to Learn

- Database modeling
- Django ORM
- DRF internals
- Authentication
- Authorization
- Business logic
- Query optimization
- Testing
- Clean Architecture
- Deployment
- Production-ready backend development

---

# Success Criteria

By the end of the project I should be comfortable:

- Designing relational databases
- Building REST APIs
- Writing maintainable Django code
- Using PostgreSQL effectively
- Implementing authentication
- Handling complex business rules
- Optimizing ORM queries
- Writing automated tests
- Deploying production applications
- Explaining architectural decisions during interviews

---

# Future Improvements

- Microservices exploration
- Event-driven architecture
- Elasticsearch
- Kubernetes
- CI/CD
- Monitoring
- Distributed caching
- Message queues