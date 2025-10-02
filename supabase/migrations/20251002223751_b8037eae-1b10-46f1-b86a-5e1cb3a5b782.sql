-- Fix search path for security
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.alunos
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();