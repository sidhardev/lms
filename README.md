# Loyalty Management System (LMS)

## Overview

The Loyalty Management System is a comprehensive backend API built with NestJS that enables businesses to create, manage, and execute customer loyalty programs, promotional campaigns, and discount strategies. The system is designed to help businesses reward customer engagement, boost sales through targeted campaigns, and segment customers based on various criteria.

---

## 🎯 Key Features & Use Cases

### 1. **User Management & Authentication**

#### Features:
- **User Registration (Sign Up)**
  - OTP-based email verification for secure registration
  - Password encryption using cryptographic hashing
  - User profile creation with first name, last name, and email
  
- **User Sign In**
  - Secure email and password authentication
  - JWT token generation for session management
  - Role-based access (USER or ADMIN)

- **Password Recovery**
  - Forgot password functionality with email verification
  - Temporary reset tokens with expiration
  - Password reset via secure token validation

- **OTP Verification**
  - One-time password (OTP) generation and sending
  - Time-limited OTP validation (5 minutes)
  - Email-based verification

#### Use Cases:
- New users can securely register and verify their email
- Existing users can sign in and access loyalty programs
- Users can recover their accounts if they forget their passwords
- Email verification adds an extra security layer to prevent unauthorized account creation

---

### 2. **Campaign Management**

The system supports two main types of campaigns:

#### **A. Discount Coupon Campaigns**

**Purpose:** Provide discounts on customer orders using coupon codes or automatic rules

**Sub-types:**
1. **Order Discounts** 
2. **Free Shipping** 

**Discount Rules Available:**
- **Whole Cart Discount** 
- **Bulk Purchase Discount** 
- **Category-Based Discount** 
- **Product Discount** 
- **Brand Discount** 
- **Custom Cart Total** 

**Configuration Options:**
- **Discount Type:** 
- **Maximum Uses:** 
- **Redemption Type:** 
- **User Eligibility:** 
  - New users only
  - Existing/old users
  - Limited user groups
  - Specific customer segments
- **Validity Settings:**
  - One-time or recurring use
  - Specific days of week (Monday-Sunday)
  - Time windows (start time and end time)
- **Geographic Restrictions:** Target by country, state, or city
- **Notifications:** Send campaign notifications via multiple channels

**Status Management:** Active or Inactive


---

#### **B. Loyalty Programs**

**Purpose:** Reward customer loyalty through points accumulation and redemption

**Accumulation Rules (How customers earn points):**

1. **Points Per Rupee**
   - Customers earn fixed points for every rupee spent
   - Configurable point rate (e.g., 1 rupee = 10 points)

2. **First Purchase Bonus**
   - Award bonus points on customer's first purchase
   - Encourages initial transaction
   - Can be fixed amount or percentage-based

3. **Daily Login Streak**
   - Customers earn points for consecutive daily logins
   - Encourages app/platform engagement
   - Bonus multiplier for longer streaks

4. **Category-Based Points**
   - Different point values for different product categories
   - E.g., electronics might give 15 points per rupee, while groceries give 5 points
   - Encourages purchase of higher-margin categories

**Validity Configuration:**
- Valid specific days of the week
- Operating hours (start time and end time)
- Campaign start and end dates
- Notifications about program status and changes


---


### 3. **Customer Segmentation**

**Purpose:** Group customers based on specific criteria for targeted marketing

#### **User Segments and Product Segments**

Segments based on customer behavior and characteristics:

#### **User Segments**

**Membership Criteria:**

**Engagement Criteria:**

**Discount Criteria:**

**Transaction Criteria:**

---

#### **Product Segments**

Segments based on inventory and product characteristics:

**Stock Level Categories:**


**Purchase Frequency by Product:**


**Price-Based Categories:**

**Product Interaction:**


---

### 4. **Notification System**

**Purpose:** Send campaign and promotion updates through multiple channels

**Supported Channels:**
- Email
- SMS
- Push notifications
- In-app notifications

**Notification Components:**
- Custom title
- Custom body/message
- Banner images
- Call-to-action (CTA) button text and link

**Associated With:**
- Discount campaigns
- Loyalty programs
- Promotions
- General campaign communications


---

## 📋 Core API Endpoints

### Authentication & Users
- `POST /auth/signin` - User login
- `POST /auth/forget-password` - Request password reset
- `GET /auth/reset-password?token=` - Verify password reset token
- `POST /auth/reset-password` - Complete password reset
- `POST /user/send-otp` - Send OTP to email
- `POST /user/verify-otp` - Verify OTP and get JWT token
- `POST /user/signup` - Create new user account (requires OTP verification)

### Campaign Management
- `POST /campaigns/discount-coupon/create` - Create discount or free shipping campaign
- `POST /campaigns/loyaltyprogram/create` - Create loyalty program
- `GET /campaigns/get?page=1&limit=10` - List all campaigns (paginated)
- `GET /campaigns/discount-coupon/active` - Get active campaigns
- `PATCH /campaigns/discount-coupon/:id/status` - Change campaign status
- `DELETE /campaigns/coupon/:id` - Delete campaign

### Promotions
- `POST /promotion` - Create new promotion
- `GET /promotion/get?page=1&limit=10` - List promotions (paginated)
- `DELETE /promotion/delete/:id` - Delete promotion

### Segments
- `POST /segment/create` - Create customer or product segment
- `GET /segment/get?page=1&limit=10` - List segments (paginated)
- `GET /segment/:id` - Get segment details
- `DELETE /segment/:id` - Delete segment

### Notifications
- `GET /notifications` - Get notification endpoints

---

## 🔧 Technical Stack

- **Framework:** NestJS (Node.js framework for building scalable server-side applications)
- **Database:** PostgreSQL (with TypeORM for database management)
- **Authentication:** JWT (JSON Web Tokens) with Passport.js
- **Email Service:** Nodemailer (for sending OTPs and password reset emails)
- **Validation:** class-validator and class-transformer
- **API Documentation:** Swagger
- **Password Encryption:** Crypto library with scrypt hashing

---

## 🏗️ Project Architecture

### Module Structure:

```
src/
├── auth/                 # User authentication & authorization
├── user/                 # User profile management
├── mail/                 # Email and OTP services
├── campaigns/            # Campaign management
│   ├── order-campaign/   # Discount coupon campaigns
│   ├── loyalty-program/  # Loyalty program management
│   └── shipping_campaign/# Shipping promotion campaigns
├── promotion/            # General promotions
├── segment/              # Customer & product segmentation
└── notifications/        # Notification management
```

---


## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL database
- npm or yarn

### Environment Setup
Create a `.env` file with:
```
DB_HOST=your_db_host
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=lms_database
JWT_SECRET=your_secret_key
MAIL_HOST=your_mail_host
MAIL_PORT=587
MAIL_USER=your_email@domain.com
MAIL_PASS=your_email_password
PORT=3000
```

### Installation & Running
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm build

# Start production server
npm start:prod
```

### API Documentation
Once the server is running, access the Swagger API documentation at:
```
http://localhost:3000/api
```


---

## 🔐 Security Features

- **Password Encryption:** Passwords are hashed using scrypt algorithm
- **JWT Authentication:** Secure token-based authentication
- **OTP Verification:** Time-limited OTP for email verification
- **Email Validation:** All email inputs are validated
- **Role-Based Access:** Different access levels for USER and ADMIN roles
- **Token Expiration:** JWT tokens expire after 1 day

---

## 📝 Notes

- All dates are stored in timestamp format (ISO 8601)
- Pagination is supported on list endpoints (page and limit parameters)
- Empty/null values are handled gracefully across all endpoints
- Notifications can be sent through multiple channels for the same campaign
- Discount campaigns can be restricted by geography (country, state, city)
- Loyalty points are configurable per campaign/rule
- Customer segments are created based on defined criteria and can include multiple conditions

---

## 🤝 Integration Points

This LMS system is designed to integrate with:
- **Payment Gateway:** For tracking transactions and applying discounts
- **Email Service:** For sending OTPs and campaign notifications
- **E-commerce Platform:** For accessing user, product, and order data
- **Push Notification Service:** For sending mobile notifications
- **SMS Service:** For sending promotional messages
- **Analytics Platform:** For tracking campaign performance and ROI

---
**Version:** 1.0  
**Last Updated:** January 22, 2026
