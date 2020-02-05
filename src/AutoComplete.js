import React from "react";
import Downshift from "downshift";

import { SLACK_BEARER } from "./slackConfig";

import { Icon } from "./shared";

class AutoComplete extends React.Component {
  state = {
    datas: [],
    isLoading: true,
    error: "null"
  };

  componentDidMount() {
    if (localStorage.getItem("users") === null) {
      fetch(`https://slack.com/api/users.list?token=${SLACK_BEARER}`)
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            //this.setState({ datas: data.members, isLoading: false });
            this.setUsers(data.members);
          } else {
            this.setState({ error: "data.error", isLoading: false });
          }
        })
        .catch(error => this.setState({ error, isLoading: false }));
    } else {
      this.getUsers();
    }
  }

  setUsers(data) {
    localStorage.setItem("users", JSON.stringify(data));
    this.setState({
      datas: JSON.parse(localStorage.getItem("users")),
      isLoading: true
    });
  }

  getUsers() {
    this.setState({
      datas: JSON.parse(localStorage.getItem("users")),
      isLoading: true
    });

    console.log(this.state.datas)
    for ( var i in this.state.datas) {
        return console.log(this.state.datas[i])
    }

  }

  render() {
    return (
      <Downshift
        onInputValueChange={() => this.setState({ menuIsOpen: false })}
        onChange={selection => {
          if (selection) {
            this.props.onChange(selection);
            console.log("selection", selection);
          } else {
            console.log("no fucking selection!");
          }
        }}
        itemToString={item => (item ? item.profile.real_name_normalized : "")}
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
          clearSelection,
          openMenu
        }) => (
          <div className="list">
            {selectedItem ? (
              <span onClick={clearSelection}>
                <Icon />
              </span>
            ) : (
              ""
            )}
            <input
              type="text"
              name="name"
              className="question"
              required
              {...getInputProps({
                // here's the interesting part
                onFocus: openMenu
              })}
            />
            <label {...getLabelProps()}>
              <span>{this.props.label}</span>
            </label>
            <ul {...getMenuProps()}>
              {isOpen
                ? this.state.datas
                    .filter(
                      item => !item.deleted && !item.is_bot && !item.is_app_user
                    )
                    .filter(
                      item =>
                        !inputValue ||
                        item.profile.display_name
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()) ||
                        item.profile.real_name_normalized
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
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
                              highlightedIndex === index ? "#f7e357" : null
                          }
                        })}
                      >
                        {item.profile.image_original ? (
                          <img
                            src={item.profile.image_original}
                            alt="profile pictures"
                          />
                        ) : (
                          ""
                        )}
                        <span className="profile">
                          @{item.profile.real_name} - {" "}
                          {item.profile.real_name_normalized}
                        </span>
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    );
  }
}
export default AutoComplete;
