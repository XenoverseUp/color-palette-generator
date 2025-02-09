import { AnimatePresence } from "motion/react"
import { useState } from "react"
import For from "@components/common/for"
import cx from "@utils/cx"
import { useSelectionStore } from "@stores/selection.store"
import { ColorRelationship } from "."
import Node from "./node"
import ReferenceLine from "./reference-line"

// eslint-disable-next-line
export const relationshipMap: Record<ColorRelationship, Array<number>> = {
  monochromatic: [0],
  "diad-positive": [0, 2],
  "diad-negative": [0, 10],
  complementary: [0, 6],
  "split-complementary": [0, 5, 7],
  triad: [0, 4, 8],
  analogous: [0, 1, 11],
  "double-complementary-positive": [0, 1, 6, 7],
  "double-complementary-negative": [0, 5, 6, 11],
  "rectangular-tetrad-positive": [0, 2, 6, 8],
  "rectangular-tetrad-negative": [0, 4, 6, 10],
  "square-tetrad": [0, 3, 6, 9],
  polychromatic: [0, 2, 4, 6, 8, 10],
}

const slices = [
  "M 0 0 L 0 -140 A 140 140 0 0 1 70 -121 Z",
  "M 0 0 L 70 -121 A 140 140 0 0 1 121 -70 Z",
  "M 0 0 L 121 -70 A 140 140 0 0 1 140 0 Z",
  "M 0 0 L 140 0 A 140 140 0 0 1 121 70 Z",
  "M 0 0 L 121 70 A 140 140 0 0 1 70 121 Z",
  "M 0 0 L 70 121 A 140 140 0 0 1 0 140 Z",
  "M 0 0 L 0 140 A 140 140 0 0 1 -70 121 Z",
  "M 0 0 L -70 121 A 140 140 0 0 1 -121 70 Z",
  "M 0 0 L -121 70 A 140 140 0 0 1 -140 0 Z",
  "M 0 0 L -140 0 A 140 140 0 0 1 -121 -70 Z",
  "M 0 0 L -121 -70 A 140 140 0 0 1 -70 -121 Z",
  "M 0 0 L -70 -121 A 140 140 0 0 1 0 -140 Z",
]

interface Props {
  relationship: ColorRelationship
}

export default function ColorHarmonyWheel({ relationship }: Props) {
  const getHueRotated = useSelectionStore.use.getHueRotated()
  const [hovering, setHovering] = useState<number | null>(null)

  return (
    <svg
      viewBox="-160 -160 320 320"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      {/* Color Wheel Slices */}
      <g id="color-wheel" transform="rotate(-15)">
        <For each={slices}>
          {(path, section) => (
            <path
              key={`harmony-slices-${section}`}
              d={path}
              fill={getHueRotated(section * 30)!.css()}
              className={cx({
                "opacity-50": hovering !== null && hovering !== section,
              })}
            />
          )}
        </For>
      </g>

      {/* Visual Reference Lines */}

      <g id="reference-lines">
        {relationship !== "analogous" && (
          <For element={AnimatePresence} each={relationshipMap[relationship]}>
            {(section, i, sections) => {
              if (sections.length === 1) return
              if (sections.length === 2 && i === 0) return

              if (i == sections.length - 1)
                return (
                  <ReferenceLine
                    key={`${relationship}-reference-line-${section}`}
                    from={section}
                    to={sections[0]}
                  />
                )

              return (
                <ReferenceLine
                  key={`${relationship}-reference-line-${section}`}
                  from={section}
                  to={sections[i + 1]}
                />
              )
            }}
          </For>
        )}
      </g>

      {/* Color Stop Nodes */}

      <g id="nodes">
        <For element={AnimatePresence} each={relationshipMap[relationship]}>
          {(section) => (
            <Node
              key={`relationship-node-${section}`}
              r={1}
              color={getHueRotated(section * 30)!}
              {...{ setHovering, section }}
            />
          )}
        </For>
      </g>
    </svg>
  )
}
