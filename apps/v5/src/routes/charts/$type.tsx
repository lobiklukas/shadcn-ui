import { createFileRoute, notFound } from "@tanstack/react-router"

const chartTypes = ["area", "bar", "line", "pie", "radar", "radial", "tooltip"]

export const Route = createFileRoute("/charts/$type")({
  component: ChartsPage,
  loader: ({ params }) => {
    if (!chartTypes.includes(params.type)) throw notFound()
    return { type: params.type }
  },
})

function ChartsPage() {
  const { type } = Route.useLoaderData()
  return <div className="container py-8"><h1 className="text-3xl font-bold">Charts: {type} (TODO)</h1></div>
}
