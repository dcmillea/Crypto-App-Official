export default function Page({ params }: { params: { coinId: string } }){
    return(
        <div>
        This is the <strong>{params.coinId}</strong> Page
        </div>
    );
}