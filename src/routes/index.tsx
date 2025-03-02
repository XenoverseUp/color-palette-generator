import BottomBar from "@components/bottombar"
import Picker from "@components/picker"
import Sidebar from "@components/sidebar"

export default function Editor() {
  return (
    <main className="grid h-screen grid-cols-[21rem_1fr] grid-rows-[1fr_3.75rem] divide-x divide-y overflow-hidden">
      <Sidebar className="col-span-1 row-span-2" />
      <Picker className="col-span-1 row-span-1 flex min-h-0 overflow-hidden" />
      <BottomBar className="col-span-1 row-span-1" />
    </main>
  )
}
