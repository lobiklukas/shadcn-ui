import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/view/$style/$name")({
  component: ViewPage,
})

function ViewPage() {
  const { style, name } = Route.useParams()
  return <div>View: {style}/{name} (TODO)</div>
}
