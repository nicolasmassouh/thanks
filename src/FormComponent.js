import React from 'react';
import Downshift from 'downshift';

class FormComponent extends React.Component {
    constructor(props) {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        datas : [],
        isLoading: false,
        error: null,
        items :[
          {value: 'apple'},
          {value: 'pear'},
          {value: 'orange'},
          {value: 'grape'},
          {value: 'banana'},
        ]
      };
    }

    
  
/**
 * 
 * CREATE (ThomasQA:Person {name:'Thomas QA', team:'BoT'})
 * 
 * CREATE
	(ThomasQA)-[:THANKS {date:['2019-02-15']}]->(ML),
	(ThomasQA)-[:THANKS {date:['2019-02-15']}]->(Dacos)
 * 
 */
componentDidMount() {
  this.setState({ isLoading: true });
  fetch('https://slack.com/api/users.list?token=xoxp-3098545631-626670726228-921013605399-5c5fc9eb5a037194bc982ea5740bd6eb')
    .then(response => response.json())
    .then(data => this.setState({ datas:data.members, isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }));
  }

    handleSubmit(event) {
      event.preventDefault();
      const data = {
        from:event.target[0].value,
        to:event.target[1].value,
        desc:event.target[2].value
      }
      console.log(data);
      //const data = new FormData(event.target);
      fetch('/api/form-submit-url', {
        method: 'POST',
        body: data,
      });
    }

    render() {
        return (
          <React.Fragment>
          <Downshift
    // onChange={selection => {
    //   if (selection) {
    //     console.log("selection", selection)
    //   } else {
    //     console.log("no selection")
    //   }
    // }}
    itemToString={item => (item ? item.value : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
      openMenu,
    }) => (
      <div>
        <label {...getLabelProps()}></label>
        <input
          {...getInputProps({
            // here's the interesting part
            onFocus: openMenu,
          })}
        />
        <ul {...getMenuProps()}>
          {isOpen
            ? this.state.datas
                .filter(item => !inputValue || item.name.includes(inputValue))
                .map((item, index) => (
                  <li className="question"
                    {...getItemProps({
                      key: item.id,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : null,
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.name}
                  </li>
                ))
            : null}
        </ul>
      </div>
    )}
  </Downshift>
        </React.Fragment>
        );
    }
  }

  /**
   * <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" className="question" id="nme" required autoComplete="on" />
                <label htmlFor="nme"><span>What's your name?</span></label>
                <input type="text" name="name" className="question" id="snme" required autoComplete="on" />
                <label htmlFor="snme"><span>What's the name of your love</span></label>
                <textarea name="message" rows="2" className="question" id="msg" required autoComplete="off"></textarea>
                <label htmlFor="msg"><span>What's your message?</span></label>
                <input type="submit" value="Submit!" />
            </form> */

export default FormComponent;