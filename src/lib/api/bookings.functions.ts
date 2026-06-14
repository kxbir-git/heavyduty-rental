import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const bookingSchema = z.object({
  equipment_slug: z.string().min(1).max(100).nullable().optional(),
  customer_name: z.string().trim().min(1).max(100),
  customer_email: z.string().trim().email().max(200),
  customer_phone: z.string().trim().max(20).optional().nullable(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  total_amount: z.number().nonnegative().max(100_000_000),
  notes: z.string().max(2000).optional().nullable(),
});

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let equipmentId: string | null = null;
    if (data.equipment_slug) {
      const { data: eq } = await supabaseAdmin
        .from("equipment")
        .select("id")
        .eq("slug", data.equipment_slug)
        .eq("is_active", true)
        .maybeSingle();
      equipmentId = eq?.id ?? null;
    }

    const { error } = await supabaseAdmin.from("bookings").insert({
      equipment_id: equipmentId,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone || null,
      start_date: data.start_date,
      end_date: data.end_date,
      total_amount: data.total_amount,
      notes: data.notes || null,
      user_id: null,
      status: "pending",
    });

    if (error) {
      console.error("[submitBooking] insert failed", error);
      throw new Error("Unable to submit booking");
    }

    return { ok: true };
  });
