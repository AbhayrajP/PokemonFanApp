import React, { Component } from 'react';
import * as styleforPokemon from './Pokemon.css';
import { Link } from "react-router-dom";
import PokemonDetail from './PokemonDetail';


export class Pokemon extends Component {
    indvPokemon = {
        "image_url": "",
        "pokemon_desc": "",
        "loading" : true,
        "generation": "",
    };
    constructor(){
        super();
        this.state = {
            indvPokemon: this.indvPokemon,
        }
    }

    async componentDidMount(){
        let url = this.props?.image;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.indvPokemon.image_url = parsedData?.sprites?.front_default;
        console.log("api call from pokemon", parsedData);
        let url2 = parsedData?.species?.url
        let data2 = await fetch(url2);
        let parsedData2 = await data2.json();
        this.indvPokemon.loading = false;
        let parsingtext = parsedData2?.flavor_text_entries.filter((element)=>{return element?.language?.name==='en'}); 
        let generation = parsedData2?.generation?.name;
        this.indvPokemon.generation = generation.charAt(0).toUpperCase() + generation.slice(1);
        this.indvPokemon.pokemon_desc = parsingtext[0].flavor_text;
        this.setState({indvPokemon : this.indvPokemon})
    }

  render() {
    let {title} = this.props;
    return (
         <>
            {this.state.indvPokemon.loading === true && <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>}
            <div className="card sm-6 md-4 lg-3 mb-4 text-dark bg-light shadow shadow-success shadow-lg p-3" >
            <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                        {this.state.indvPokemon?.generation}
            </span>
                <img src={this.state.indvPokemon?.image_url} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title && (title?.charAt(0).toUpperCase() + title.slice(1))}</h5>
                    <p className="card-text">{this.state.indvPokemon?.pokemon_desc} </p>
                    <Link to="/PokemonFanApp/PokemonDetail" className="btn btn-dark btn-shine">Click Here</Link>
                </div>
            </div>
      </>
    )
  }
}

export default Pokemon