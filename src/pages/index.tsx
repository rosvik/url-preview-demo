import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { FormEvent, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [input, setInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<URL>();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = new URL(input);
      setPreviewUrl(url);
      setInput("");
    } catch (error) {
      alert("Hey! That's not a valid URL!");
    }
  };

  return (
    <>
      <Head>
        <title>Super awesone URL preview</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <h1>Super awesone URL preview</h1>
          <form onSubmit={onSubmit}>
            <input
              type="url"
              name="url"
              placeholder="https://example.com"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
          <div className={styles.urlPreview}>
            {previewUrl && (
              <a href={previewUrl.href} target="_blank" rel="noreferrer">
                {previewUrl.href}
              </a>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
