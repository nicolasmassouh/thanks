import React from 'react'
import AutoComplete from './AutoComplete'
class FormComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      author: '',
      target: '',
      message: '',
      datas: [],
      isLoading: true,
      error: null,
    };
  }
  
  
  handleSubmit = (event) => {
    event.preventDefault()
    const dt = {
      author: this.state.author.id,
      target: this.state.target,
      message: this.state.message,
    };
    console.log(dt);

    const data = {
    //"channel":this.state.author.id,
    "channel":"UFXLSFSMB",
    "text": `Hello ${this.state.target.profile.first_name}, *${this.state.author.profile.first_name}* wanted to thank you for ${this.state.message}... Thanks for that! :slightly_smiling_face: :+1:`
    }

    fetch('/slack/api/chat.postMessage', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer xoxb-3098545631-921533883047-tjp27whRu4c32LrkIev7H1Iz'
        })
      })
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <AutoComplete onChange={author => this.setState({ author })} />
          <AutoComplete onChange={target => this.setState({ target })} />  
          <textarea name="message" rows="2" className="question" id="msg" required autoComplete="off" onInput={({ target }) => this.setState({ message: target.value })}></textarea>
          <label htmlFor="msg"><span>What's your message ?</span></label>
          <input type="submit" value="Submit!"  />
        </form>
      </React.Fragment>
    )
  }
}
export default FormComponent