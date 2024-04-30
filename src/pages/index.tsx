import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type OpenGraphData = Array<{
  property: string;
  content: string;
}>;

export default function Home() {
  const [input, setInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<URL>();
  const [ogd, setOgd] = useState<OpenGraphData>();

  const title = ogd && ogdGet(ogd, "og:title");
  const description = ogd && ogdGet(ogd, "og:description");
  const image = ogd && ogdGet(ogd, "og:image");

  useEffect(() => {
    if (previewUrl) {
      setOgd(undefined);
      (async function () {
        let response = await fetch(`/api/ogd?url=${previewUrl.href}`);
        if (!response.ok) return;
        let data = (await response.json()) as OpenGraphData;
        console.log(data);
        setOgd(data);
      })();
    }
  }, [previewUrl]);

  return (
    <>
      <Head>
        <title>Super Awesome URL Preview</title>
      </Head>
      <main className={styles.main}>
        <h1>Super Awesome URL Preview</h1>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            let urlText = input.startsWith("http") ? input : `https://${input}`;
            setPreviewUrl(new URL(urlText));
            setInput("");
          }}
        >
          <input
            type="text"
            name="url"
            placeholder="https://example.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        {previewUrl && (
          <div className={styles.urlPreview}>
            {image && (
              <Image
                width={400}
                height={300}
                src={image ? image : ""}
                style={{ objectFit: "contain", maxWidth: "100%" }}
                alt=""
              />
            )}
            <div className={styles.content}>
              <div>
                <h2>{title ? title : previewUrl.host}</h2>
              </div>
              {description && <p>{description}</p>}
              <Link href={previewUrl.href}>{previewUrl.href}</Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function ogdGet(data: OpenGraphData, property: string) {
  return data.find((o) => o.property == property)?.content;
}
