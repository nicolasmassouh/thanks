import React from 'react'
import Downshift from 'downshift'
class AutoComplete extends React.Component {
  state = {
    datas: [],
    isLoading: true,
    error: null,
  }
  componentDidMount() {
    fetch(
      'https://slack.com/api/users.list?token=xoxb-3098545631-921533883047-tjp27whRu4c32LrkIev7H1Iz',
    )
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          this.setState({ datas: data.members, isLoading: false })
        } else {
          this.setState({ error: data.error, isLoading: false })
        }
      })
      .catch(error => this.setState({ error, isLoading: false }))
  }

  render() {
    return (
        <Downshift
        onChange={selection => {
          if (selection) {
              this.props.onChange(selection)
            console.log("selection",selection.name)
          } else {
            console.log("no selection")
          }
        }}
        itemToString={item => (item ? item.name : '')}
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
            
            <input type="text" name="name" className="question" 
              {...getInputProps({
                // here's the interesting part
                onFocus: openMenu,
              })}
    

            />
            <label {...getLabelProps()}></label>
            <ul {...getMenuProps()}>
              {isOpen
                ? this.state.datas
                    .filter(
                      item => !inputValue || item.name.includes(inputValue),
                    )
                    .map((item, index) => (
                      <li
                        className="listbox"
                        {...getItemProps({
                          key: item.id,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? 'lightgray' : null,
                            fontWeight:
                              selectedItem === item ? 'bold' : 'normal',
                          },
                        })}
                      >
                        @{item.name} ({item.real_name})
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    )
  }
}
export default AutoComplete






