import { Wcj } from "../types";

export async function loadCogworkData(): Promise<Wcj.EventCategory[]> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/cogwork`);

  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject("Could not load data");
  }
}