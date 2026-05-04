<div align="center">

# 📱 anom-originals-app

**The core application powering the Anom Originals experience.**

[![Part of ANOMS](https://img.shields.io/badge/ecosystem-ANOMS--Hub-ff00ff?style=for-the-badge&logo=github)](https://github.com/Anoms-Hub/ANOMS-Hub)
[![Type](https://img.shields.io/badge/type-application-00e5ff?style=for-the-badge)](#)

*The engine behind the universe. Built to scale.*

---

</div>

## 🚀 What Is anom-originals-app?

anom-originals-app is the **main application** for the Anom Originals ecosystem. It contains the full-stack codebase — frontend interfaces, backend services, API layer, authentication, database schemas, UI components, and feature modules.

This is where the AO experience comes to life for users.

---

## 📂 Folder Structure

```
anom-originals-app/
├── frontend/     # 🖥️ Client-side application and views
├── backend/      # ⚙️ Server-side logic and business rules
├── api/          # 🔌 API endpoints and route definitions
├── auth/         # 🔐 Authentication and authorization
├── database/     # 🗄️ Schemas, migrations, and seed data
├── ui/           # 🎨 Reusable UI components and design tokens
├── modules/      # 📦 Feature modules and plugins
└── README.md
```

---

## 🏗️ Architecture Overview

| Layer | Folder | Responsibility |
|-------|--------|----------------|
| **Presentation** | `frontend/` + `ui/` | User interface, views, reusable components, design tokens |
| **API** | `api/` | REST/GraphQL endpoints, request validation, response formatting |
| **Business Logic** | `backend/` + `modules/` | Core features, business rules, feature-specific modules |
| **Security** | `auth/` | User login, session management, role-based access, OAuth |
| **Data** | `database/` | Database schemas, migrations, queries, seed data |

---

## 📦 What Goes Where

### `frontend/`
Client-side application code — pages, views, routing, state management, and client-side rendering logic.

### `backend/`
Server-side application code — controllers, services, middleware, business logic, and server configuration.

### `api/`
API layer — endpoint definitions, route handlers, request/response schemas, versioning, and API documentation.

### `auth/`
Authentication and authorization — login flows, token management, OAuth integrations, role definitions, and permission guards.

### `database/`
Data layer — database schema definitions, migration scripts, seed data, query builders, and connection configuration.

### `ui/`
Shared UI library — reusable components, design tokens from Brand-Kit (colors, spacing, typography), icons, and layout primitives.

### `modules/`
Feature modules — self-contained features that can be developed, tested, and deployed independently. Each module encapsulates its own routes, logic, and UI.

---

## 🔗 Connected Repos

- **[anom-artsy](https://github.com/Anoms-Hub/anom-artsy)** — Art assets displayed in the app
- **[ANOMS-Brand-Kit](https://github.com/Anoms-Hub/ANOMS-Brand-Kit)** — Design system that drives the UI
- **[ANOMS-Originals-Store](https://github.com/Anoms-Hub/ANOMS-Originals-Store)** — Store data served through the app
- **[ANOMS-GitHub-Ops](https://github.com/Anoms-Hub/ANOMS-GitHub-Ops)** — CI/CD pipelines that build and deploy the app
- **[ANOMS-Hub](https://github.com/Anoms-Hub/ANOMS-Hub)** — Central ecosystem docs and architecture decisions

---

<div align="center">

**Part of the [ANOMS ecosystem](https://github.com/Anoms-Hub/ANOMS-Hub) 💜**

</div>
