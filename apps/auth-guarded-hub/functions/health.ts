export default async () =>
  Response.json({ ok: true, time: new Date().toISOString() });
