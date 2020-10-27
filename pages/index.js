import React from 'react';
import Prismic from 'prismic-javascript';
import Head from 'next/head';

const Index = (props) => {
    return (
    <div
      style= {{ 
          backgroundColor: props.data.corfundo, 
          color: props.data.textcolor 
      }}
    >
      <head>
        <title>{props.data.pagetitle}</title>
      </head>
      <div className="w-1/2 mx-auto text-center">
        <h1 className="font-bold text-4xl p-6">{props.data.title}</h1>
        <img className="mx-auto rounded-full shadow-2xl w-1/4" src={props.data.logo.url}/>
        <div>
           {props.data.body.map((item) => {
              if (item.slice_type === 'secao'){
                  return (
                    <h2 className="font-bold text-2xl pt-2" >{item.primary.nome}</h2>
                  )
                }
              if (item.slice_type === 'link'){
                  return(
                    <div>
                      <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 inline-block" href={item.primary.destino.url}>{item.primary.texto_do_botao}</a>
                    </div>
                  )
              }
              return null
          })}
        </div>
        <div className="no-underline my-4">Desenvolvido por Bruno Martins, código fonte disponível em: 
          <a className="underline" href="https://www.github.com/brunomartinsdossantos" className="w-1/1 mx-auto text-center"> https://github.com/BrunoMartinsdosSantos/sociallinks</a>
        </div>
      </div>
    </div>
    );
}

export async function getServerSideProps(props){
    console.log('server');
    const client = Prismic.client('https://brunomartins.cdn.prismic.io/api/v2');
    const centrallinks = await client.getSingle("centrallinks");
    console.log(centrallinks);
    return {props: {
      data: centrallinks.data,
    }};
}

export default Index;