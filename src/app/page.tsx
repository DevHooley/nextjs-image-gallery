export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="py-4 container-fluid d-flex justify-content-center">
      Home Page
    </div>
  );
}
