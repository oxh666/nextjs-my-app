import Link from "next/link";
import { data } from "./data";
export default function PhotosPage() {

    return <div>
        <main className="flex flex-row flex-wrap">
            {data.map(({ id, src }) => (
                <Link href={`/photos/${id}`} key={id}>
                        <img title={'可以点击，编号为'+id+"号图片"} src={src} alt={id} width={100} height={100} />
                </Link>
            ))}
        </main>
    </div>;
}
