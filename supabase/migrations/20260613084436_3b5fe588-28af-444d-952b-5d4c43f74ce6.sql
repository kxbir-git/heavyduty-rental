
DROP POLICY "Anyone create booking" ON public.bookings;
CREATE POLICY "Anyone create booking" ON public.bookings FOR INSERT
  WITH CHECK (
    length(customer_name) BETWEEN 1 AND 200
    AND length(customer_email) BETWEEN 3 AND 200
    AND customer_email LIKE '%@%'
    AND end_date >= start_date
    AND (user_id IS NULL OR user_id = auth.uid())
  );
