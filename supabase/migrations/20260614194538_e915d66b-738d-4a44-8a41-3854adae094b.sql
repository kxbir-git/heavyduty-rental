DROP POLICY IF EXISTS "Anyone create booking" ON public.bookings;
REVOKE INSERT ON public.bookings FROM anon;
CREATE POLICY "Authenticated users create own bookings" ON public.bookings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);