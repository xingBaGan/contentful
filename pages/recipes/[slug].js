import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: 'recipe' });
  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    }
  });

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const res = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug,
  });

  return {
    props: {
      recipe: res.items[0],
      revalidate: 1,
    }
  }
}

export default function RecipeDetails({ recipe}) {
  // console.log('recipe', recipe);
  const { title, cookingTime, thumbnail, method } = recipe.fields;
  return (
    <div>
      <Image
        src={`https:${thumbnail.fields.file.url}`}
        width={800}
        height={400}
      ></Image>
      <div>{title}</div>
      <p>Takes approx {cookingTime} mins to make</p>
      <p>
        {documentToReactComponents(method)}
      </p>
    </div>
  )
}