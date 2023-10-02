import { Metadata } from "next/types"
import Content, {meta} from "../content/about.mdx"
import matter from "gray-matter"
import Head from "next/head";
import { MDXProvider } from '@mdx-js/react';


interface PageProps {
    children: React.ReactNode;
    meta: { title: string; description: string; navigation: false };
  }

const data = matter.read("app/content/about.mdx")

export const metadata: Metadata = data.data

export default function Page({children, ...props}: PageProps) {
    return (
        <div className="max-w-none mx-auto sm:w-3/5 prose prose-reader-light prose-reader-base prose-reader-compact px-4 pt-10 pb-20 sm:px-6">
            <Content>
                <Head>
                    <title>{props.meta.title}</title>
                    <meta name="description" content={props.meta.title} />
                </Head>
            </Content>
        </div>
    )
}
