import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function RecipeCard({ recipe }) {
  const { title, slug, cookingTime, image, thumbnail } = recipe.fields;
  return (
    <div >
      <h1>
        {title}
      </h1>
      {/* {thumbnail}  */}
      <Image
        src={`https:${thumbnail.fields.file.url}`}
        alt={title}
        width={600}
        height={400}
      />
      <div className="content">
        <div className="info">
          <p>Takes approx {cookingTime} mins to make</p>
        </div>
      </div>
      <div className="actions">
        <Link href={`/recipes/${slug}`}>
          <div className="btn">View Recipe</div>
        </Link>
      </div>
    </div>
  )
}

export default RecipeCard
