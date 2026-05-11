export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold">
          Shared Audit Result
        </h1>

        <p className="mt-4 text-zinc-400">
          Public audit ID:
        </p>

        <div className="mt-6 bg-zinc-900 p-6 rounded-2xl">
          <p className="text-2xl font-semibold">
            {id}
          </p>
        </div>

      </div>
    </main>
  );
}