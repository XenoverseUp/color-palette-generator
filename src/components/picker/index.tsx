import * as Tabs from "@radix-ui/react-tabs"

import For from "@components/common/for"

import cx, { type Class } from "@utils/cx"

import HueSaturationWheel from "./hue-saturation-wheel"
import HueWBMap from "./hue-wb-map"
import SaturationWBPyramid from "./saturation-wb-pyramid"

interface Props {
  className?: Class
}

enum TabKeys {
  HueSaturationWheel = "hue-saturation-wheel",
  HueWBMap = "hue-luminosity-map",
  SaturationWBPyramid = "saturation-white-balance",
}

export default function Picker({ className }: Props) {
  return (
    <div className={cx(className)}>
      <Tabs.Root
        defaultValue={TabKeys.HueWBMap}
        className="bg-muted-background relative grid h-full w-full place-items-center"
      >
        {/* Picker Select */}

        <Tabs.List
          aria-label="Select your color picker type."
          className="text-paragraph absolute top-4 -space-x-1.5 rounded-xl border bg-white p-1 text-gray-600"
        >
          <For
            each={Object.entries({
              [TabKeys.HueSaturationWheel]: "Hue &#45; Saturation Wheel",
              [TabKeys.HueWBMap]: "Hue &#45; W/B Map",
              [TabKeys.SaturationWBPyramid]: "Saturation &#45; W/B Pyramid",
            })}
          >
            {([key, value]) => (
              <Tabs.Trigger
                key={`tab-${key}`}
                value={key}
                className="state-active:bg-muted-accent text-paragraph state-active:text-accent cursor-pointer rounded-lg px-5 py-1 font-[480] transition"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            )}
          </For>
        </Tabs.List>

        {/* Pickers */}

        <For
          each={Object.entries({
            [TabKeys.HueSaturationWheel]: HueSaturationWheel,
            [TabKeys.HueWBMap]: HueWBMap,
            [TabKeys.SaturationWBPyramid]: SaturationWBPyramid,
          })}
        >
          {([key, Component]) => (
            <Tabs.Content
              key={`tab-content-${key}`}
              value={key}
              className="size-full"
            >
              <Component />
            </Tabs.Content>
          )}
        </For>
      </Tabs.Root>
    </div>
  )
}
