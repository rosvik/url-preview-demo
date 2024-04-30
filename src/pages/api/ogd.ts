import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const previewUrl = req.query.url as string;
  if (!previewUrl) return res.status(400);

  const response = await fetch(`https://og.248.no/api?url=${previewUrl}`);
  if (!response.ok) res.status(500);

  const data = await response.json();
  console.log(data);
  res.status(200).json(data);
}
