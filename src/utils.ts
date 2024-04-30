export type OpenGraphData = Array<{
  property: string;
  content: string;
}>;

export function ogdGet(data: OpenGraphData, property: string) {
  return data.find((o) => o.property == property)?.content;
}
