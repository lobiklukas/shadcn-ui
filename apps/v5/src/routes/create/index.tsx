import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/create/")({
  component: CreatePage,
  head: () => ({
    meta: [
      { title: "New Project" },
      { name: "description", content: "Customize everything." },
    ],
  }),
})

function CreatePage() {
  return <div className="container py-8"><h1 className="text-3xl font-bold">Create (TODO)</h1></div>
}
