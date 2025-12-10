import { supabase } from '../lib/supabase';

export const bookingService = {
  async getAll(userId, role) {
    let query = supabase?.from('bookings')?.select(`
        *,
        services (
          id,
          service_name,
          cost,
          unit
        ),
        customer:customer_id (
          id,
          full_name,
          email,
          phone
        ),
        decorator:decorator_id (
          id,
          full_name,
          email,
          phone
        )
      `)?.order('created_at', { ascending: false });

    if (role === 'customer') {
      query = query?.eq('customer_id', userId);
    } else if (role === 'decorator') {
      query = query?.eq('decorator_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data?.map(booking => ({
      id: booking?.id,
      customerId: booking?.customer_id,
      serviceId: booking?.service_id,
      decoratorId: booking?.decorator_id,
      bookingDate: booking?.booking_date,
      eventDate: booking?.event_date,
      location: booking?.location,
      specialRequirements: booking?.special_requirements,
      status: booking?.status,
      totalAmount: booking?.total_amount,
      service: booking?.services ? {
        id: booking?.services?.id,
        serviceName: booking?.services?.service_name,
        cost: booking?.services?.cost,
        unit: booking?.services?.unit,
      } : null,
      customer: booking?.customer ? {
        id: booking?.customer?.id,
        fullName: booking?.customer?.full_name,
        email: booking?.customer?.email,
        phone: booking?.customer?.phone,
      } : null,
      decorator: booking?.decorator ? {
        id: booking?.decorator?.id,
        fullName: booking?.decorator?.full_name,
        email: booking?.decorator?.email,
        phone: booking?.decorator?.phone,
      } : null,
      createdAt: booking?.created_at,
      updatedAt: booking?.updated_at,
    }));
  },

  async getById(id) {
    const { data, error } = await supabase?.from('bookings')?.select(`
        *,
        services (
          id,
          service_name,
          description,
          cost,
          unit
        ),
        customer:customer_id (
          id,
          full_name,
          email,
          phone
        ),
        decorator:decorator_id (
          id,
          full_name,
          email,
          phone
        )
      `)?.eq('id', id)?.single();

    if (error) throw error;

    return {
      id: data?.id,
      customerId: data?.customer_id,
      serviceId: data?.service_id,
      decoratorId: data?.decorator_id,
      bookingDate: data?.booking_date,
      eventDate: data?.event_date,
      location: data?.location,
      specialRequirements: data?.special_requirements,
      status: data?.status,
      totalAmount: data?.total_amount,
      service: data?.services ? {
        id: data?.services?.id,
        serviceName: data?.services?.service_name,
        description: data?.services?.description,
        cost: data?.services?.cost,
        unit: data?.services?.unit,
      } : null,
      customer: data?.customer ? {
        id: data?.customer?.id,
        fullName: data?.customer?.full_name,
        email: data?.customer?.email,
        phone: data?.customer?.phone,
      } : null,
      decorator: data?.decorator ? {
        id: data?.decorator?.id,
        fullName: data?.decorator?.full_name,
        email: data?.decorator?.email,
        phone: data?.decorator?.phone,
      } : null,
      createdAt: data?.created_at,
      updatedAt: data?.updated_at,
    };
  },

  async create(booking) {
    const { data: { user } } = await supabase?.auth?.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase?.from('bookings')?.insert({
        customer_id: user?.id,
        service_id: booking?.serviceId,
        decorator_id: booking?.decoratorId || null,
        booking_date: new Date()?.toISOString()?.split('T')?.[0],
        event_date: booking?.eventDate,
        location: booking?.location,
        special_requirements: booking?.specialRequirements || '',
        total_amount: booking?.totalAmount,
        status: 'pending',
      })?.select()?.single();

    if (error) throw error;

    return {
      id: data?.id,
      customerId: data?.customer_id,
      serviceId: data?.service_id,
      decoratorId: data?.decorator_id,
      bookingDate: data?.booking_date,
      eventDate: data?.event_date,
      location: data?.location,
      specialRequirements: data?.special_requirements,
      status: data?.status,
      totalAmount: data?.total_amount,
      createdAt: data?.created_at,
    };
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase?.from('bookings')?.update({
        status: status,
        updated_at: new Date()?.toISOString(),
      })?.eq('id', id)?.select()?.single();

    if (error) throw error;
    return data;
  },

  async assignDecorator(id, decoratorId) {
    const { data, error } = await supabase?.from('bookings')?.update({
        decorator_id: decoratorId,
        status: 'confirmed',
        updated_at: new Date()?.toISOString(),
      })?.eq('id', id)?.select()?.single();

    if (error) throw error;
    return data;
  },
};