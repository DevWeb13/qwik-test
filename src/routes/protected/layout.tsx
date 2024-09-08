import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';

interface Session {
  expires: string;
}

export const onRequest: RequestHandler = async (event) => {
  const session: Session | null = await event.sharedMap.get('session');

  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/auth/signin?redirectTo=${event.url.pathname}`);
  }
};

export default component$(() => {
  return <Slot />;
});
