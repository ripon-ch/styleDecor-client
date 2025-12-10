import { supabase } from '../lib/supabase';

export const authService = {
  async signIn(email, password) {
    const { data, error } = await supabase?.auth?.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signUp(email, password, fullName, phone, address, role = 'customer') {
    const { data, error } = await supabase?.auth?.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone || '',
          address: address || '',
          role: role,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase?.auth?.signOut();
    if (error) throw error;
  },

  async resetPassword(email) {
    const { data, error } = await supabase?.auth?.resetPasswordForEmail(email);
    if (error) throw error;
    return data;
  },

  async updatePassword(newPassword) {
    const { data, error } = await supabase?.auth?.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return data;
  },
};