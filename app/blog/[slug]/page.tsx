export default function BlogPage({ params }: { params: { slug: string } }) {
    console.log('params',params);
  return <div>Blog Page {params.slug}</div>;
}

