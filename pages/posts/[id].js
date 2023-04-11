import Head from 'next/head';
import Date from '../../components/Date';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <header>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          {/* <div>{postData.id}</div> */}
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
        </header>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
