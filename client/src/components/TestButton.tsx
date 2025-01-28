import { Button } from "@/components/ui/button"

export function TestButton() {
  return (
    <div className="flex space-x-4 p-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}