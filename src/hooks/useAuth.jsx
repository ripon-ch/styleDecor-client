// ==========================================
// FILE 2: Check if useAuth hook is correct
// Location: src/hooks/useAuth.jsx
// VERIFY this file exists and has this content:
// ==========================================

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

// If this file doesn't exist or is different, create it with the above content

// ==========================================
// DEBUGGING: Check what's being sent to backend
// ==========================================

// Open browser DevTools > Network tab when you try to login
// Look for the request to /api/auth/login
// Click on it and check:
// 1. Request Headers - should have Content-Type: application/json
// 2. Request Payload - should have email and password
// 3. Response - should have token and user

// Common issues:
// - If you see it after login, the token isn't being stored in localStorage

// ==========================================
// QUICK TEST COMMANDS
// ==========================================

/*
# Test backend directly
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@styledecor.com","password":"customer123"}'

# Should return:
# {"success":true,"token":"...", "user":{...}}

# If that works but frontend doesn't, the issue is in the frontend
*/
