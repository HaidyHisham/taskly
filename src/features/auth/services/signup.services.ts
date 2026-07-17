const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
import type { ISignUp } from '../types/signup.types';

export const signUpService = async (data: ISignUp) => {
    const response = await fetch(`${BASE_URL}/auth/v1/signup`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'apikey':`${API_KEY}`
        },
        body:JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result?.msg || 'Failed to create account');

  return result;


};