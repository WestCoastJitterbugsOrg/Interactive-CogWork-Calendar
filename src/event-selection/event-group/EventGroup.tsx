import { StateContext } from "@app/App";
import { EventItem } from "@app/event-selection";
import { useSelectors } from "@app/store";
import { useContext, useState } from "react";
import { EventGroupHeader } from "./EventGroupHeader";

interface EventGroupProps {
  category: string;
}

export default function EventGroup({ category: categoryId }: EventGroupProps) {
  const [expanded, setExpanded] = useState(false);
  const { state, dispatch } = useContext(StateContext);

  const { events, category, globalCheckState } = useSelectors(
    state,
    (state) => {
      const category = state.categories.byId[categoryId];
      const events = category.events.reduce(
        (events, eventId) => [...events, state.events.byId[eventId]],
        [] as Wcj.Event[]
      );

      const eventsShown = events.filter((event) => event.showInCalendar).length;
      const globalCheckState =
        eventsShown === 0
          ? ("none" as const)
          : eventsShown === events.length
          ? ("all" as const)
          : ("some" as const);

      return {
        category,
        events,
        globalCheckState,
      };
    }
  );

  if (category == null) {
    throw Error(`Category ${categoryId} does not exist in state`);
  }

  const setAllChecked = (show: boolean) => {
    dispatch({
      type: "categoryToggled",
      payload: { id: categoryId, show },
    });
  };

  return (
    <div className="bg-wcj-sand">
      <EventGroupHeader
        title={categoryId}
        expanded={expanded}
        checked={globalCheckState}
        toggleExpanded={() => setExpanded(!expanded)}
        toggleChecked={() => setAllChecked(globalCheckState !== "all")}
      />

      <div
        className={
          "bg-wcj-sand overflow-hidden " + (expanded ? "max-h-full" : "max-h-0")
        }
      >
        {events.map((event) => (
          <EventItem
            event={event}
            toggle={() =>
              dispatch({
                type: "eventToggled",
                payload: { id: event.id },
              })
            }
            showInfo={(clickEvent) => {
              clickEvent.stopPropagation();
              dispatch({
                type: "eventModalRequested",
                payload: event.id,
              });
            }}
            checked={!!event.showInCalendar}
            key={event.id}
          />
        ))}
      </div>
    </div>
  );
}
