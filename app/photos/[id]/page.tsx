import { data } from "../data";
export default function PhotoPage({ params }: { params: { id: string } }) {
    const photo = data.find((item) => item.id === params.id);
    return <div>
        <img className="w-full h-full object-cover" src={photo?.src} alt={photo?.id} width={100} height={100} />
    </div>;
}

