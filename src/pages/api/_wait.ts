const active = false;

export default async function wait(): Promise<void> {
  if (active) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
