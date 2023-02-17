export default function desafioLista(){

    return (
       <div>
            {generate(10)}
       </div>
    )
}

function generate(total){
    const result = []
    for(var i = 0; i < total; i++){
        result.push(<span>{i}<br /></span>)
    }
    return result;
}