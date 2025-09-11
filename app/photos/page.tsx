'use client'
import { data } from "./data";
import { Image } from 'antd';
export default function PhotosPage() {

    return <div>
        <main className="flex flex-row flex-wrap">
            <Image.PreviewGroup
                preview={{
                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
            >
                {data.map(({ id, src }) => (
                    <Image width={100} height={100} src={src} alt={id} key={id} />
                ))}
            </Image.PreviewGroup>
        </main>
    </div>;
}
