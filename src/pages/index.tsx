import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [input, setInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<URL>();

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
            setPreviewUrl(new URL(input));
            setInput("");
          }}
        >
          <input
            type="url"
            name="url"
            placeholder="https://example.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        {previewUrl && (
          <Link href={previewUrl.href} className={styles.urlPreview}>
            <div className="aside">
              {/* <Image
                width={200}
                height={200}
                src={``}
                alt="Preview"
              /> */}
            </div>
            <div className="content">
              <div>
                <h2>{previewUrl.host}</h2>
              </div>
              <div>{previewUrl.href}</div>
            </div>
          </Link>
        )}
      </main>
    </>
  );
}
