# Showcase Auth Flow Audit & Bug Report

**Auditor:** Nova  
**Date:** 2026-06-10  

## Summary
| Severity | Count |
|----------|-------|
| 🔴 Critical | 2 |
| 🟡 Warning | 2 |
| 🔵 Improvement | 2 |

---

## 🔴 Critical (security/data loss)

### 1. Unauthenticated Access Fallback
**File:** `lib/server/current-user.ts`  
**Issue:** `getCurrentUserView` falls back to returning hardcoded demo user data (e.g., Maya Rivera) if the session user is not found. A logged-out user could view an authenticated UI, bypassing access controls.  
**Fix:** Return `null` or redirect to login when no valid session user exists. Remove the hardcoded fallback.

### 2. Race Condition in Profile Slug Creation
**File:** `lib/server/bootstrap-user.ts`  
**Issue:** `getAvailableSlug` checks slug availability and returns a candidate, but `createProfile` inserts afterwards outside a transaction. Concurrent bootstrap requests could retrieve the same slug and throw a unique constraint error.  
**Fix:** Wrap slug check + profile creation in a database transaction, or use a retry loop with unique constraint handling.

---

## 🟡 Warning (potential bugs, edge cases)

### 3. Missing Error Handling for Database Operations
**Files:** `lib/server/bootstrap-user.ts`, `lib/server/current-user.ts`  
**Issue:** Functions like `upsertUserByAuth`, `getProfileByUserId`, and `createProfile` are invoked without `try/catch`. A database outage or constraint failure results in unhandled promise rejections with no error boundary.  
**Fix:** Wrap database calls in try/catch blocks. Return structured error responses and surface them in the UI.

### 4. Missing Server-Side Zod Validation for Authentication
**Files:** `app/auth/sign-in/actions.ts`, `app/auth/sign-up/actions.ts`  
**Issue:** Auth server actions use manual `if (!email)` checks instead of Zod schemas (unlike the rest of the app which uses Zod for profiles and posts). Malformed emails or weak passwords pass through to Supabase unchecked.  
**Fix:** Apply Zod validation consistent with the rest of the codebase (`lib/validators/`).

---

## 🔵 Improvement (UX, performance, cleanup)

### 5. No Client-Side Form Validation
**Files:** `app/auth/sign-in/page.tsx`, `app/auth/sign-up/page.tsx`  
**Issue:** Auth forms lack client-side validation (no React Hook Form). Users must submit and wait for a server round-trip to see simple errors like empty fields.  
**Fix:** Add client-side validation using Zod schemas with React Hook Form or similar.

### 6. Missing Auth UX Elements
**Files:** `app/auth/sign-in/page.tsx`, `app/auth/sign-up/page.tsx`  
**Issues:**
- No "Forgot Password" link
- Sign-up missing password confirmation field
- No password visibility toggle
- Hardcoded default login values (`maya@showcase.app` / `showcase`) may confuse real users
