# Ecommerce Client Application

A production-oriented ecommerce frontend project focused on learning React architecture, Material UI 5, and scalable frontend engineering.

## Goals

Learn how to:

* Design a scalable React application
* Build reusable UI components with MUI 5
* Manage server and client state correctly
* Integrate with Django REST APIs
* Apply production frontend practices

---

# Tech Stack

## Core

* React
* TypeScript
* Vite

## UI

* Material UI 5
* Emotion
* MUI Theme System

## Data & State

* TanStack Query — server state
* Zustand — client state

## Forms

* React Hook Form
* Zod

## Quality

* ESLint
* Prettier
* Vitest
* React Testing Library

---

# Architecture Principles

## Server State

Handled by TanStack Query:

* Products
* Categories
* Orders
* User data

## Client State

Handled by React/Zustand:

* Theme
* Modals
* Drawers
* UI preferences

---

# Roadmap

## Phase 1 — Foundation

Build:

* React + TypeScript setup
* MUI theme
* Routing
* Project structure
* Code quality tools

Learn:

* Component architecture
* Design systems

---

## Phase 2 — MUI 5 Practice

Build reusable components:

* Navbar
* Product cards
* Forms
* Tables
* Dialogs

Learn:

* MUI theming
* Responsive design
* Component composition

---

## Phase 3 — API Integration

Connect Django REST API.

Learn:

* API layers
* Error handling
* Loading states
* Data fetching patterns

---

## Phase 4 — Ecommerce Features

Implement:

* Product catalog
* Search and filtering
* Authentication
* Cart
* Wishlist
* Checkout
* Orders

---

## Phase 5 — Production Improvements

Add:

* Testing
* Performance optimization
* Accessibility
* Deployment
* Monitoring

---

# Folder Structure

```
src/
├── app/
├── pages/
├── features/
│   ├── auth/
│   ├── products/
│   ├── cart/
│   └── orders/
├── components/
├── services/
├── hooks/
├── types/
└── utils/
```

---

# Engineering Rules

1. Keep components focused on one responsibility.
2. Separate UI from business logic.
3. Use TanStack Query for backend data.
4. Use local state for UI behavior.
5. Keep features independent.
6. Add dependencies only when they solve a real problem.

---

# Learning Approach

For every decision:

1. Understand the problem.
2. Compare solutions.
3. Choose intentionally.
4. Implement.
5. Review trade-offs.

The goal is not only to build a shop, but to develop frontend architecture skills.
