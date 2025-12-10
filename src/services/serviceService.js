import { supabase } from '../lib/supabase';

export const serviceService = {
  async getAll(filters = {}) {
    let query = supabase?.from('services')?.select(`
        *,
        service_images (
          id,
          image_url,
          alt_text,
          is_primary,
          display_order
        )
      `)?.eq('is_active', true)?.order('created_at', { ascending: false });

    if (filters?.category) {
      query = query?.eq('service_category', filters?.category);
    }

    if (filters?.search) {
      query = query?.or(`service_name.ilike.%${filters?.search}%,description.ilike.%${filters?.search}%`);
    }

    if (filters?.minCost) {
      query = query?.gte('cost', filters?.minCost);
    }

    if (filters?.maxCost) {
      query = query?.lte('cost', filters?.maxCost);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data?.map(service => ({
      id: service?.id,
      serviceName: service?.service_name,
      description: service?.description,
      cost: service?.cost,
      unit: service?.unit,
      serviceCategory: service?.service_category,
      isActive: service?.is_active,
      images: service?.service_images?.map(img => ({
        id: img?.id,
        imageUrl: img?.image_url,
        altText: img?.alt_text,
        isPrimary: img?.is_primary,
        displayOrder: img?.display_order,
      })),
      createdAt: service?.created_at,
      updatedAt: service?.updated_at,
    }));
  },

  async getById(id) {
    const { data, error } = await supabase?.from('services')?.select(`
        *,
        service_images (
          id,
          image_url,
          alt_text,
          is_primary,
          display_order
        )
      `)?.eq('id', id)?.single();

    if (error) throw error;

    return {
      id: data?.id,
      serviceName: data?.service_name,
      description: data?.description,
      cost: data?.cost,
      unit: data?.unit,
      serviceCategory: data?.service_category,
      isActive: data?.is_active,
      images: data?.service_images?.map(img => ({
        id: img?.id,
        imageUrl: img?.image_url,
        altText: img?.alt_text,
        isPrimary: img?.is_primary,
        displayOrder: img?.display_order,
      })),
      createdAt: data?.created_at,
      updatedAt: data?.updated_at,
    };
  },

  async create(service) {
    const { data: { user } } = await supabase?.auth?.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase?.from('services')?.insert({
        service_name: service?.serviceName,
        description: service?.description,
        cost: service?.cost,
        unit: service?.unit,
        service_category: service?.serviceCategory,
        is_active: service?.isActive ?? true,
      })?.select()?.single();

    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase?.from('services')?.update({
        service_name: updates?.serviceName,
        description: updates?.description,
        cost: updates?.cost,
        unit: updates?.unit,
        service_category: updates?.serviceCategory,
        is_active: updates?.isActive,
        updated_at: new Date()?.toISOString(),
      })?.eq('id', id)?.select()?.single();

    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase?.from('services')?.delete()?.eq('id', id);

    if (error) throw error;
  },
};