# 🚀 Next-Gen Loyalty Management System (LMS)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.0.0-blue)
![NestJS](https://img.shields.io/badge/nestjs-%5E10.0.0-red.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

## 📖 Overview

Welcome to the **Loyalty Management System (LMS)**, a comprehensive and flexible platform designed to boost customer retention and engagement. This project leverages the power of **NestJS** to provide a scalable backend for managing complex loyalty programs, marketing campaigns, and reward structures.

From simple point accumulation to complex rule-based rewards (like daily streaks or category-specific bonuses), this system is built to handle diverse business needs with precision.

## ✨ Key Features

*   **🏆 Dynamic Loyalty Programs:** Create and configure loyalty schemes with custom validity periods and notifications.
*   **📈 Flexible Accumulation Rules:**
    *   **Points per Spend:** Award points based on transaction value (e.g., Points per Rupee).
    *   **Behavioral Rewards:** Incentivize actions like **First Purchase** or **Daily Login Streaks**.
    *   **Category-Based Rules:** Define specific multipliers or rewards for different product categories.
*   **📢 Campaign Management:** Integrated management for broader marketing campaigns alongside loyalty specific programs.
*   **📑 Automated Documentation:** Fully interactive API documentation generated via **Swagger/OpenAPI**.
*   **🛡️ Enterprise-Grade Security:** Built on robust authentication standards (JWT Bearer Auth).
*   **🧩 Modular Architecture:** Scalable and maintainable codebase using NestJS modules and TypeORM.

## 🛠️ Tech Stack

*   **Framework:** [NestJS](https://nestjs.com/)
*   **Language:** TypeScript
*   **ORM:** TypeORM
*   **Documentation:** Swagger UI
*   **Package Manager:** NPM

## 🚀 Getting Started

Follow these instructions to get the Loyalty Management System up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16+ recommended)
*   [Git](https://git-scm.com/)
*   A database instance (PostgreSQL/MySQL as configured in TypeORM)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sidhardev/lms.git
    cd lms
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory:
    ```bash
    cp .env.example .env
    ```
    *Configure your database connection strings and JWT secrets here.*

4.  **Run the application:**
    ```bash
    # Development mode
    npm run start:dev

    # Production build
    npm run build
    npm run start:prod
    ```

5.  **Access Documentation:**
    Once running, visit `http://localhost:3000/api` to view the Swagger API documentation.

## 🧪 Testing

Ensure system reliability with the integrated test suite.

```bash
npm test
```


```

## 🤝 Contributing

Contributions make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.