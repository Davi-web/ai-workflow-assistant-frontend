export default function Page({ params }: { params: { author: string } }) {
    console.log("Params in pull/[number]/page.tsx:", params);
  return (
    <div>
        Hello ${params.author}
    </div>
  )
}