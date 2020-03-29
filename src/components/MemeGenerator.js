import React from 'react'
import './Input.css'

class MemeGenerator extends React.Component {
    constructor(){
        super()
        this.state={
            topText:'',
            bottomText:'',
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
        .then(response=>response.json())
        .then(response => {
            const {memes} = response.data
            this.setState({ allMemeImgs: memes })
        })
    }

    handleChange(event){
        const {name,value} = event.target
        this.setState({ [name]: value})
    }

    handleSubmit(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg})
    }

render(){
    return (
        <div>
            <br/>
            <form onSubmit={this.handleSubmit}>
                <input
                    className ='input'
                    type='text'
                    name='topText'
                    placeholder='Top Text'
                    value={this.state.topText}
                    onChange={this.handleChange}
                    />
                    <br/>
                    <br/>
                <input
                    className ='input'
                    type='text'
                    name='bottomText'
                    placeholder='Bottom Text'
                    value={this.state.bottomText}
                    onChange={this.handleChange}
                    />
                    <br/>
                    <br/>
                <button className='button'>Generate</button>
            </form>
            <br/>
            <div>
                <img 
                className='img'
                height= '600px'
                width = '600px'
                src={this.state.randomImg} 
                alt=''
               
                
                />
                <h1 className='toptext'>{this.state.topText}</h1>
                <h1 className='bottomtext'>{this.state.bottomText}</h1>
            </div>
        </div>
    )
}
}

export default MemeGenerator
