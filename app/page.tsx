"use client";

import { useState } from "react";
import ProfileWizard from "@/components/ProfileWizard";
import Bookshelf from "@/components/Bookshelf";
import RouteSelector from "@/components/RouteSelector";
import RoutePage from "@/components/RoutePage";
import type { ReaderProfile, Route } from "@/lib/types";

type AppState =
  | { screen: "wizard" }
  | { screen: "bookshelf"; reader: ReaderProfile }
  | { screen: "selector"; reader: ReaderProfile }
  | { screen: "route"; reader: ReaderProfile; route: Route };

export default function Home() {
  const [state, setState] = useState<AppState>({ screen: "wizard" });

  if (state.screen === "wizard") {
    return (
      <ProfileWizard
        onComplete={(reader) => setState({ screen: "bookshelf", reader })}
      />
    );
  }

  if (state.screen === "bookshelf") {
    return (
      <Bookshelf
        reader={state.reader}
        onOpenRoutes={() => setState({ screen: "selector", reader: state.reader })}
        onBack={() => setState({ screen: "wizard" })}
      />
    );
  }

  if (state.screen === "selector") {
    return (
      <RouteSelector
        reader={state.reader}
        onSelect={(route) => setState({ screen: "route", reader: state.reader, route })}
        onOpenBookshelf={() => setState({ screen: "bookshelf", reader: state.reader })}
      />
    );
  }

  return (
    <RoutePage
      route={state.route}
      reader={state.reader}
      onBack={() => setState({ screen: "selector", reader: state.reader })}
    />
  );
}
