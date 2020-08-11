import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import { Map, TileLayer, Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';

import axios from 'axios';

import api from '../../services/api'

import "./styles.css"

import logo from '../../assets/logo.svg';

const URL_UF = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

interface Item{
    id: number;
    title:string;
    img:string;
}

interface IbgeUfResponse{
    sigla:string
}

interface IbgeCityResponse{
    nome:string
}

const CreatePoint = () => {

    const [items, setItems]                         = useState<Item[]>([]);
    const [ufs, setUfs]                             = useState<string[]>([]);
    const [cities, setCities]                       = useState<string[]>([]);
    const [selectedUf, setSelectedUf]               = useState('0');
    const [selectedCity, setSelectedCity]           = useState('0');
    const [selectedPosition, setSelectedPosition]   = useState<[number, number]>([0, 0]);
    const [initialPosition, setInitialPosition]     = useState<[number, number]>([0, 0]);
    const [formData, setFormData]                   = useState({
        name: "",
        email: "",
        whatsapp: ""
    })
    const [selectItems, setSelectItems]             = useState<number[]>([]);

   const history = useHistory();

   useEffect(() => {

        api.get('items').then(response  => {
        
            setItems([{"id": 1, "title":"Baterias", "img": "http://localhost:3000/uploads/baterias.svg"},
                        {"id": 2, "title":"Eletronicos", "img": "http://localhost:3000/uploads/eletronicos.svg"},
                        {"id": 3, "title":"Organicos", "img": "http://localhost:3000/uploads/organicos.svg"},
                        {"id": 4, "title":"Papeis", "img": "http://localhost:3000/uploads/papeis.svg"},
                        {"id": 5, "title":"Oleo", "img": "http://localhost:3000/uploads/oleo.svg"},
                        {"id": 6, "title":"Lampadas", "img": "http://localhost:3000/uploads/lampadas.svg"}]);
        });

   }, [])

   useEffect(() => {

        axios.get<IbgeUfResponse[]>(URL_UF).then(response  => {
            
            const initials = response.data.map(uf => uf.sigla)

            setUfs(initials)
        });

   }, [])

    useEffect(() => {

        if(selectedUf === '0'){
            return ;
        }

        let URL_MUN = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`;
        
        axios.get<IbgeCityResponse[]>(URL_MUN).then(response  => {
            
            const cities = response.data.map(c => c.nome)

            setCities(cities)
        });

    }, [selectedUf])

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;

            setInitialPosition([latitude, longitude])
            setSelectedPosition([latitude, longitude])
        })

   }, [])

    function handleUf(event:ChangeEvent<HTMLSelectElement>){

      const uf = event.target.value

      setSelectedUf(uf)
    }

    function handleCity(event:ChangeEvent<HTMLSelectElement>){

        const city = event.target.value
  
        setSelectedCity(city)
      }

    function handleMap(event:LeafletMouseEvent){

        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    }

    function handleInput(event:ChangeEvent<HTMLInputElement>){

        const {name, value} = event.target;

        setFormData({ ...formData, [name]: value})
    }

    function handleSelectItem(id:number){

        const already = selectItems.findIndex(item => item == id);

        if(already >= 0){
            const filter = selectItems.filter(item =>item !== id);

            setSelectItems(filter)
        }
        else{
            setSelectItems([ ...selectItems, id])
        }

    }

    async function handleSubmit(event:FormEvent){

        event.preventDefault();

        const {name, email, whatsapp}   = formData;
        const uf                        = selectedUf;
        const city                      = selectedCity;
        const [latitude, longitude]     = selectedPosition;
        const items                     = selectItems;
        const data = {
            name, email, whatsapp,
            uf,
            city,
            latitude, longitude,
            items
        }

       // await api.post("/save", data)

       alert("Cadastro efetuado com sucesso.");

       history.push("/");
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />Voltar para Home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do Ponto de Coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">
                            Nome da Entidade
                        </label>
                        <input type="text" name="name" id="name" onChange={handleInput}/>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">
                                Email
                            </label>
                            <input type="email" name="email" id="email" onChange={handleInput} />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">
                                Whatsapp
                            </label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInput} />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione um endereço</span>
                    </legend>
                    <Map center={initialPosition} zoom={15} onClick={handleMap}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        <Marker position={selectedPosition} />
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf"id="uf" value={selectedUf} onChange={handleUf}>
                                <option value="">Selecione o Estado</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city"id="city" value={selectedCity} onChange={handleCity}>
                                <option value="">Selecione uma Cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                             <li key={item.id} 
                                 onClick={() => handleSelectItem(item.id)}
                                 className={selectItems.includes(item.id) ? 'selected' : ''}>

                                <img src={item.img} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>
                <button type="submit">Enviar....</button>
            </form>
        </div>
    )
}

export default CreatePoint