import React from 'react'
import Button from './Bt'
import Header from './Header'
import Container from './Content'
import Add from './add'

var Name = ["Palo Alto","San Jose","Santa Cruz","Honolulu"];


const st1 ={
    marginTop:'10px',
    backgroundColor:"#8b8681",
    marginLeft:'200px',
    width:'300px',
    height:'30px',
    borderWidth:'0',
    fontSize:'15px',
    textAlign:'center',
    borderRadius:'10px',
    outline: 'none',
    userSelect: 'none'
};

const st2={
    display:"none"
};


class Content  extends React.Component{
    constructor(props)
    {
        super(props);
        this.state ={
            City:'',
            currentCity:'',
            temperature:'',
            country:'',
            max:'',
            min:'',
            wind:'',
            visible:false
        };
        this.handleClick = this.handleClick.bind(this);
        this.Del = this.Del.bind(this);
        this.addClick = this.addClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    async handleChange (event){
        let value = document.getElementById("input").value;
       if(event.key === 'Enter'){
           this.setState({
               currentCity: value,
               temperature:'',
               country:'',
               max:'',
               min:'',
               wind:'',
               visible:false
           });
           await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${"0864d179e5b022a16b1b5e7bbbf6d9f6&units=imperial"}`).then(function (data) {
               return data.json();
           }).then(data => {
               Name.push(value);
               this.setState({
                   currentCity: value,
                   temperature: data.main.temp,
                   country:data.sys.country,
                   max:data.main.temp_max,
                   min:data.main.temp_min,
                   wind:data.wind.speed,
                   pic:"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                   visible:false
               });
               const elem = document.getElementById(value);
               elem.style.backgroundColor="#2d56ff";
               elem.style.color="rgb(255,255,255)";
               const all=document.getElementsByTagName('button');
               for(let i = 0;i<all.length;i++){
                   if(all[i]!==elem){
                       all[i].style.backgroundColor="rgba(0,0,0,0)";
                       all[i].style.color="#000000";
                   }
               }
           }).catch(() =>{
               Name.splice(Name.indexOf(value),1);
           });
           document.getElementById("input").value = '';
       }
    }


   async handleClick(event) {
        const City=event.target.id;
        const elem = document.getElementById(event.target.id);
        elem.style.backgroundColor="#2d56ff";
        elem.style.color="rgb(255,255,255)";
        const all=document.getElementsByTagName('button');
        for(let i = 0;i<all.length;i++){
            if(all[i]!==elem){
                all[i].style.backgroundColor="rgba(0,0,0,0)";
                all[i].style.color="#000000";
            }
        }
        const URL =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${"0864d179e5b022a16b1b5e7bbbf6d9f6&units=imperial"}`);
        const data =  await URL.json();
        this.setState({
            currentCity: City,
            temperature: data.main.temp,
            country:data.sys.country,
            max:data.main.temp_max,
            min:data.main.temp_min,
            wind:data.wind.speed,
            pic:"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
            visible:false
        });
    }

    async Del(){
        Name.splice(Name.indexOf(this.state.currentCity),1);
        this.setState({
            currentCity:'',
            temperature:'',
            country:'',
            max:'',
            min:'',
            wind:'',

        });
    }

    async addClick(){
        this.setState({
            City:'',
            currentCity:'',
            temperature:'',
            country:'',
            max:'',
            min:'',
            wind:'',
            visible:true
        });
    }


     render() {
        const Bts = Name.map(item => {return(
            <Button props={item} name = {item} onClick={this.handleClick} Del={this.Del}/>)
        });
        let ch = '';
        let wd = '';
        if(this.state.currentCity){
            ch = '°';
            wd = 'mi/hr'
        }
        return(
            <div>
                <Header/>
                <weather>
                    <p>Current:{this.state.temperature + ch}</p>
                    <p>High:{this.state.max + ch}</p>
                    <p>Low:{this.state.min + ch}</p>
                    <p>Wind speed:{this.state.wind + wd}</p>
                </weather>
                <title className="Title">Select a city</title>
                <Container city={Name.indexOf(this.state.currentCity) !== -1 ? this.state.currentCity : ''} pic={this.state.pic}/>
                <buttons>{Bts}</buttons>
                <input type="text" style={this.state.visible ? st1 : st2} onKeyDown={this.handleChange} id="input"/>
                <Add onClick={this.addClick}/>
            </div>
        )
    }
}



export default Content