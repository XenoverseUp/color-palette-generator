import { Hexagon } from "@phosphor-icons/react"
import { ColumnsPlusRight } from "@phosphor-icons/react/dist/ssr"
import { Color } from "chroma-js"
import Button from "@components/common/button"
import For from "@components/common/for"
import useCopyToClipboard from "@hooks/useCopyToClipboard"
import { useHover } from "@hooks/useHover"
import getOptimizedTextColor from "@utils/get-optimized-text-color"
import { useColorModeStore } from "@stores/color-mode.store"
import { usePaletteStore } from "@stores/palette.store"
import { PaletteColor, useSelectionStore } from "@stores/selection.store"

export default function ColorSlots() {
  const selectType = useSelectionStore.use.type()
  const color = useSelectionStore.use.color()
  const deleteColor = usePaletteStore.use.delete()
  const clearSelection = useSelectionStore.use.clearSelection()

  if (selectType === null || color === null) return

  return (
    <div className="px-sidebar mb-5">
      <ColorDisplay color={color.value} />

      {/* Color Slots */}

      <div className="mb-4 flex justify-between">
        <For times={6}>{(i) => <Slot index={i} key={`color-slot-${i}`} />}</For>
      </div>

      {/* Buttons */}

      <div className="flex items-center justify-end gap-0.5">
        {selectType === "palette" && (
          <Button
            onClick={() => (
              deleteColor((color as PaletteColor).index), clearSelection()
            )}
            className="mr-auto px-0 text-red-500"
          >
            Clear
          </Button>
        )}
        <Button>Clean</Button>
        <Button type="fill" icon={ColumnsPlusRight}>
          Insert
        </Button>
      </div>
    </div>
  )
}

function ColorDisplay({ color }: { color: Color }) {
  const getColorString = useColorModeStore.use.getColorString()
  const getRoundedColorString = useColorModeStore.use.getRoundedColorString()

  const [ref, hovering] = useHover<HTMLButtonElement>({
    delay: 1000,
  })

  const { copied, copy } = useCopyToClipboard({
    data: getColorString(color),
    timeout: 1000,
  })

  const colorString = getRoundedColorString(color)

  return (
    <div
      className="mb-3 flex w-full items-center justify-between rounded p-4 transition"
      style={{
        background: color.css(),
        color: getOptimizedTextColor(color).css(),
      }}
    >
      <span className="flex gap-1 font-medium">
        <Hexagon weight="fill" size={20} />
        Base
      </span>

      <button
        type="button"
        onClick={copy}
        className="text-caption no-opsz cursor-pointer text-end"
        ref={ref}
      >
        {copied ? "Copied!" : hovering ? "Copy" : colorString}
      </button>
    </div>
  )
}

function Slot({ index }: { index: number }) {
  return (
    <button
      data-index={index}
      className="bg-muted-background size-10 rounded border-[1.5px]"
    ></button>
  )
}
