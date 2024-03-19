import React, { Component } from 'react'
import Pokemon from './Pokemon'

export default class Home extends Component {
    pokemon = [];
    constructor(){
        super();
        console.log("Pokemon component loaded");
        this.state = {
            pokemon: this.pokemon.results,
            loading: false,
            currentUrl : `https://pokeapi.co/api/v2/pokemon/?&offset=0&limit=20`,
            next: null,
            previous: null,
        }
    }

   async componentDidMount(){
        let url = this.state.currentUrl;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log("api data from home:",parsedData);
        this.setState({pokemon : parsedData?.results,
            next : parsedData?.next,
            previous :parsedData?.previous,
        })
    }

    async handlePageNavigationClick(pageNavigagtion) {
        if(pageNavigagtion === 'Next'){
            await this.setState({
                currentUrl: this.state.next,
            })
        }else{
            await this.setState({
                currentUrl: this.state.previous,
            })
        }
         console.log("currentUrl is: ", this.state.currentUrl);
         this.componentDidMount();
         this.render();

     }  

  render() {
    return (
      <div className="container my-3">
        <div className="row">
            {this.state.pokemon && this.state.pokemon.map((element)=>{
                return <div className="col-md-4 align-items-stretch" key={element.url}>
                <Pokemon title={element.name} image={element.url}></Pokemon>
                </div>   
            })}
             
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.previous === null} className="btn btn-primary mx-2 my-2" onClick={() => this.handlePageNavigationClick('Previous')}> &larr; Previous</button>   
            <button className="btn btn-primary mx-2 my-2" onClick={() => this.handlePageNavigationClick('Next')}>Next &rarr;</button>
        </div> 
        
      </div>
    )
  }
}
